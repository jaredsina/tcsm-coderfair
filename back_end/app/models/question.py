from flask_pymongo import PyMongo


class QuestionModel:
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["question"]

    def create_question(self, id, question):
        question_data = {
            "id": id,
            "question": question,
        }
        result = self.collection.insert_one(question_data)
        return str(result.inserted_id)

    def find_question_by_id(self, id):
        return self.collection.find_one({"id": id})

    def list_questions(self):
        return list(self.collection.find())
