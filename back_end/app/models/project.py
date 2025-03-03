from flask_pymongo import PyMongo

class ProjectModel:

  def __init__(self, mongo: PyMongo):
    self.collection = mongo.cx["test"]["projects"]

  def create_project(self, student_id, coderfair_id, name, description, category, project_image, presentation_video_url, code_access_link, coding_language, project_username, project_password, notes):
    project_data = {
      "student_id": student_id,
      "coderfair_id": coderfair_id,
      "name": name,
      "description": description,
      "category": category,
      "project_image": project_image,
      "presentation_video_url": presentation_video_url,
      "code_access_link": code_access_link,
      "coding_language": coding_language,
      "project_username": project_username,
      "project_password": project_password,
      "notes": notes,
    }

    #insert_one --> add data (document) into collection
    result = self.collection.insert_one(project_data)
    #inserted_id --> id of the document 
    return str(result.inserted_id)
  
  #model methods:

  #find by username
  def find_project_by_username(self, project_username):
    return list(self.collection.find({"project_username": project_username}))
  
  #find by student id
  def find_project_by_student_id(self, student_id):
    return list(self.collection.find({"student_id": student_id}))

  #find by name
  def find_project_by_name(self, name):
    return self.collection.find_one({"name": name})
  
  #find by id 
  def find_project_by_id(self, id):
    return self.collection.find_one({"_id": id},{"_id": 0, "student_id": 0, "coderfair_id": 0})

  #list projects by coderfair
  def list_coderfair_projects(self, coderfair_id):
    return list(self.collection.aggregate(
      [
        {"$match": {"coderfair_id": coderfair_id}},
        {"$lookup": {
          "from": "grades",
          "localField": "_id",
          "foreignField": "project_id",
          "as": "grade"
          }
        },
        {"$lookup": {
          "from": "students",
          "localField": "student_id",
          "foreignField": "_id",
          "as": "student"
          }
        },
        {"$sort": {"grade.overall_grade": -1}},  
        {"$limit": 7},
        {"$project": {
          "_id": 0,
          "student_id": 0,
          "coderfair_id": 0,
          "name": 0,
          "description": 0,
          "category": 0,
          "project_image": 0,
          "presentation_video_url": 0,
          "code_access_link": 0,
          "coding_language": 0,
          "project_username": 0,
          "project_password": 0,
          "notes": 0,
          "grade._id": 0,
          "grade.concept_tier": 0,
          "grade.concept_mastery": 0,
          "grade.presentation": 0,
          "grade.creativity": 0,
          "grade.judge_id": 0,
          "grade.project_id": 0,
          "grade.overall_comments": 0,
          "student._id": 0,
          "student.bio": 0,
          } 
        },
      ]
    ))

  #list all projects
  def list___all_projects(self):
    return list(self.collection.find({},{"_id":0, "student_id": 0, "coderfair_id": 0}))
  
  def update_project(self, id, update_data):
    result = self.collection.update_one({"_id": id}, {"$set": update_data})
    return result
  
  def delete_project(self, id):
    result = self.collection.delete_one({"_id": id})
    return result