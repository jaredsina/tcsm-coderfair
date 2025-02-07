from flask_pymongo import PyMongo

class CoderfairModel:

  def __init__(self, mongo: PyMongo):
    self.collection = mongo.cx["test"]["coderfairs"]

  def create_coderfair(self, fair_date, description, created_at, update_at):
    coderfair_data = {
      "fair_date": fair_date,
      "description": description,
      "created_at": created_at,
      "update_at": update_at,
    }
    result = self.collection.insert_one(coderfair_data)
    return str(result.inserted_id)
  
  def find_coderfair_by_id(self, id):
    return self.collection.find_one({"_id": id})
  
  def list_coderfairs(self):
    return list(self.collection.find())
