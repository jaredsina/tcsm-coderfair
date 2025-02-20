from flask_pymongo import PyMongo

class CoderfairModel:

  def __init__(self, mongo: PyMongo):
    self.collection = mongo.cx["test"]["coderfairs"]

  def create_coderfair(self, fair_date, description, is_active):
    coderfair_data = {
      "fair_date": fair_date,
      "description": description,
      "is_active": is_active,
     
    }
    result = self.collection.insert_one(coderfair_data)
    return str(result.inserted_id)
  
  def find_coderfair_by_id(self, id):
    return self.collection.find_one({"_id": id}, {"_id":0})
  
  def list_coderfairs(self):
    return list(self.collection.find({},{"_id":0}))

  def update_coderfair(self, id, update_data):
    result = self.collection.update_one({"_id": id}, {"$set": update_data})
    return result
  
  def delete_coderfair(self, id):
    result = self.collection.delete_one({"_id": id})
    return result