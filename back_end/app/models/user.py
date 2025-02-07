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
        }
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)

    def find_user_by_username(self, username):
        return self.collection.find_one({"username": username})

    def find_user_by_id(self, id):
        return self.collection.find_one({"_id": id})

    def list_users(self):
        return list(self.collection.find())