from flask_pymongo import PyMongo

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
    pass