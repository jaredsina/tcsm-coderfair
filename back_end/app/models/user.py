from flask_pymongo import PyMongo


class UserModel:
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["users"]

    def create_user(self, id, first_name, last_name, email, username, is_admin, is_staff):
        user_data = {
            "id": id,
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
        return self.collection.find_one({"id": id})
    
    def list_staff(self, is_staff):
        return self.collection.find({"is_staff": is_staff})

    def list_users(self):
        return list(self.collection.find())