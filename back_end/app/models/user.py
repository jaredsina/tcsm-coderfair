from flask_pymongo import PyMongo


class UserModel:
    
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["users"]

                                      
    def create_user(self, first_name, last_name, email, username, avatar_image, is_admin, is_staff):
        user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "avatar_image": avatar_image,
            #is_admin and is_staff are booleans
            "is_admin": is_admin,
            "is_staff": is_staff,
        }
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)

    def find_user_by_username(self, username):
        return self.collection.find_one({"username": username})

    def find_user_by_id(self, id):
        return self.collection.find_one({"_id": id}, {"_id":0})
    
    def list_staff(self, is_staff):
        return self.collection.find({"is_staff": is_staff})

    def list_users(self):
        return list(self.collection.find({},{"_id":0}))
    
    def update_user(self, id, update_data):
        same_avatar_image = False
        if "avatar_image" in update_data:
            user_info = self.collection.find_one({"_id": id}, {"username": 1, "_id": 0})
            old_public_id = user_info["username"]

        elif "username" in update_data:
            user_info = self.collection.find_one({"_id": id}, {"username": 1, "_id": 0})
            old_public_id = user_info["username"]
            user_info = self.collection.find_one({"_id": id}, {"avatar_image": 1, "_id": 0})
            same_avatar_image = user_info["avatar_image"]

        else: 
            old_public_id = False


        result = self.collection.update_one({"_id": id}, {"$set": update_data})
        new_user_info = self.collection.find_one({"_id": id}, {"username": 1, "_id": 0})
        public_id = new_user_info["username"]
        return result, public_id, old_public_id, same_avatar_image
    
    def delete_user(self, id):
        student_info = self.collection.find_one({"_id": id}, {"username": 1, "_id": 0})
        public_id = student_info["username"]
        self.collection.delete_one({"_id": id})
        return public_id 