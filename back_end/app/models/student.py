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

    def update_student(self, id, update_data):
        result = self.collection.update_one({"_id": id}, {"$set": update_data})
        return result

    def delete_student(self, id):
        student_info = self.collection.find_one({"_id": id}, {"name": 1, "_id": 0})
        public_id = student_info["name"]
        self.collection.delete_one({"_id": id})
        return public_id

    def find_student_by_id(self, id):
        # essentially, the aggregate thing lets you get properties from a model, remove certain ones, and add related properties form a different model
        return list(
            self.collection.aggregate(
                [
                    {"$match": {"_id": id}},
                    {
                        "$lookup": {
                            "from": "projects",
                            "localField": "_id",
                            "foreignField": "student_id",
                            "as": "project",
                        }
                    },
                    {
                        "$project": {
                            "_id": 0,
                            "project._id": 0,
                            "project.student_id": 0,
                            "project.coderfair_id": 0,
                        }
                    },
                ]
            )
        )

    def list_students(self):
        students = self.collection.aggregate(
            [
                {
                    "$project": {
                        "_id": {"$toString": "$_id"},
                        "name": 1,
                        "bio": 1,
                        "avatar_image": 1,
                    }
                }
            ]
        )
        return list(students)
