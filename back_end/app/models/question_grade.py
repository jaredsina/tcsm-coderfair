from flask_pymongo import PyMongo

class Question_GradeModel:
  def __init__(self, mongo: PyMongo):
    self.collection = mongo.cx["test"]["question_grades"]

  def create_question_grade(self, id, grade_id, question_id, score, comments):
    question_grade_data = {
      "id": id,
      "grade_id": grade_id,
      "question_id": question_id,
      "score": score,
      "comments": comments,
    }
    result = self.collection.insert_one(question_grade_data)
    return str(result.inserted_id)
  
  def find_question_grade_by_id(self, id):
    return self.collection.find_one({"_id": id})
  
  def list_question_grades_by_score(self, score):
    return list(self.collection.find({"score": score}))

  #question grades per grade
  def list_grade_question_grades(self, grade_id):
    return list(self.collection.find({"grade_id": grade_id}))
  
  #question grades per question
  def list_question_question_grades(self, question_id):
    return list(self.collection.find({"question_id": question_id}))
  
  def list_question_grades(self):
    return list(self.collection.find())

  def update_question_grade(self, id, update_data):
    result = self.collection.update_one({"_id": id}, {"$set": update_data})
    return result
  
  def delete_question_grade(self, id):
    result = self.collection.delete_one({"_id": id})
    return result