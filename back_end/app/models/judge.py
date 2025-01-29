from flask_pymongo import PyMongo


class JudgeModel:
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["judges"]

    def create_judge(self, user_id, coderfair_id):
        judge_data = {
            "user_id": user_id,
            "coderfair_id": coderfair_id,
        }
        result = self.collection.insert_one(judge_data)
        return str(result.inserted_id)

    def find_judge_by_id(self, id):
        return self.collection.find_one({"_id": id})

    # this is for finding who someone was judged by
    def list_judges_by_user_id(self, user_id):
        return list(self.collection.find({"user_id": user_id}))

    def list_coderfair_judges(self, coderfair_id):
        return list(self.collection.find({"coderfair_id": coderfair_id}))

    def list_all_judges(self):
        return list(self.collection.find())

    # id is used to choose the judge to update
    # update data is the new data for any field

    # returns boolean and number of updated documents
    def update_judge(self, id, update_data):
        result = self.collection.update_one({"_id": id}, {"$set": update_data})
        return result

    # returns boolean and number of deleted documents
    def delete_judge(self, id):
        # Need to use _id instead of id because the id is stored as _id in the database
        result = self.collection.delete_one({"_id": id})
        return result
