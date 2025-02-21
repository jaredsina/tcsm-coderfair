from flask_pymongo import PyMongo
from .grade import GradeModel

class StudentModel:
  def __init__(self, mongo: PyMongo):
    self.collection = mongo.cx["test"]["students"]

  def create_student(self, name, bio, avatar_image):
    student_data = {
      "name": name,
      "bio": bio,
      "avatar_image": avatar_image,
    }
    result = self.collection.insert_one(student_data)
    return str(result.inserted_id)

  def find_student_by_id(self, id):
    #essentially, the aggregate thing lets you get properties from a model, remove certain ones, and add related properties form a different model
    return list(
      self.collection.aggregate(
        [
          {"$match": {"_id": id}},
          {
            "$lookup": {
              "from": "projects",
              "localField": "_id",
              "foreignField": "student_id",
              "as": "project",
            }
          },
          {
            "$project": {
            "_id": 0,
            "project._id": 0,
            "project.student_id": 0,
            "project.coderfair_id": 0,
            }
          },
        ]
      )
    )
  
  def list_students(self):
    students = self.collection.aggregate(
      [
        {
          "$project": {"_id": 0}
        }
      ]
    )
    return list(students)
  
  def list_coderfair_students(data, coderfair_id):
    result = data.find({"coderfair_id": coderfair_id})
    return result

  def update_student(self, id, update_data):
    result = self.collection.update_one({"_id": id}, {"$set": update_data})
    return result
  
  def delete_student(self, id):
    result = self.collection.delete_one({"_id": id})
    return result 