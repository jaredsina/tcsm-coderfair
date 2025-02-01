from flask_pymongo import PyMongo

class UserModel:

  def __init__(self, mongo: PyMongo):
    self.collection = mongo.db.users


  def create_user(self, id, first_name, last_name, email, username):
    user_data = {
      "id": id,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "username": username,
    }
    result = self.collection.insert_one(user_data)
    return str(result.inserted_id)

  def find_user_by_username(self, username):
    return self.collection.find_one({"username": username})
  
  def find_user_by_id(self, id):
    return self.collection.find_one({"id": id})
  
  def list_users(self):
    return list(self.collection.find())
  
  def delete_user_by_id(self,id): 
    """
    Delete a user by their ID
    """
    result = self.collection.delete_one({"id": id})
    return result.deleted_count > 0 
  
  def update_user(self, id, update_data): 
    result = self.collection.find_one_and_update(
      {"id":id},
      {"Set": update_data},
      return_document=True
    )
    return result