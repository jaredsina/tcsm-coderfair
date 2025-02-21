from flask_pymongo import PyMongo


class UserModel:
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["users"]


    def create_user(self, first_name, last_name, email, username):
        user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            #is_admin and is_staff are booleans
            "is_admin": is_admin,
            "is_staff": is_staff,
        }
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)

    def find_user_by_username(self, username):
        return self.collection.find_one({"username": username})

    def find_user_by_id(self, id):
        return self.collection.find_one({"_id": id})
    
    def list_staff(self, is_staff):
        return self.collection.find({"is_staff": is_staff})

    def list_users(self):
        return list(self.collection.find())
    
    def update_user(self, id, update_data):
        result = self.collection.update_one({"_id": id}, {"$set": update_data})
        return result
    
    def delete_user(self, id):
        result = self.collection.delete_one({"_id": id})
        return result 