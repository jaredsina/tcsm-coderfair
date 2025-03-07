from flask_pymongo import PyMongo


class GradeModel:
    def __init__(self, mongo: PyMongo):
        self.collection = mongo.cx["test"]["grades"]

    def create_grade(
        self,
        concept_tier,
        concept_mastery,
        presentation,
        creativity,
        overall_grade,
        user_id,
        project_id,
        overall_comments,
    ):
        grade_data = {
            "concept_tier": concept_tier,
            "concept_mastery": concept_mastery,
            "presentation": presentation,
            "creativity": creativity,
            "overall_grade": overall_grade,
            "user_id": user_id,
            "project_id": project_id,
            "overall_comments": overall_comments,
        }
        result = self.collection.insert_one(grade_data)
        info = self.collection.aggregate(
            [
                {"$match": {"_id": result.inserted_id}},
                {
                    "$lookup": {
                        "from": "projects",
                        "localField": "project_id",
                        "foreignField": "_id",
                        "as": "project",
                    }
                },
                {
                    "$project": {
                        "_id": {"$toString": "$_id"},
                        "concept_tier": 1,
                        "concept_mastery": 1,
                        "presentation": 1,
                        "creativity": 1,
                        "overall_grade": 1,
                        "user_id": {"$toString": "$user_id"},
                        "project_id": {"$toString": "$project_id"},
                        "overall_comments": 1,
                        "project.name": 1,
                    }
                },
            ]
        )
        return list(info)

    def find_grade_by_id(self, id):
        return list(
            self.collection.aggregate(
                [
                    {"$match": {"_id": id}},
                    {
                        "$project": {
                            "_id": 0,
                            "user_id": 0,
                            "project_id": 0,
                        }
                    },
                ]
            )
        )

    def list_project_grades(self, project_id):
        return list(self.collection.find({"project_id": project_id}))

    def list_judge_grades(self, user_id):
        grades = self.collection.aggregate(
            [
                {"$match": {"user_id": user_id}},
                {
                    "$lookup": {
                        "from": "projects",
                        "localField": "project_id",
                        "foreignField": "_id",
                        "as": "project",
                    }
                },
                {
                    "$project": {
                        "_id": {"$toString": "$_id"},
                        "concept_tier": 1,
                        "concept_mastery": 1,
                        "presentation": 1,
                        "creativity": 1,
                        "overall_grade": 1,
                        "user_id": {"$toString": "$user_id"},
                        "project_id": {"$toString": "$project_id"},
                        "overall_comments": 1,
                        "project.name": 1,
                    }
                },
            ]
        )
        return list(grades)

    def list_grades(self):
        grades = self.collection.aggregate(
            [
                {
                    "$lookup": {
                        "from": "projects",
                        "localField": "project_id",
                        "foreignField": "_id",
                        "as": "project",
                    }
                },
                {
                    "$project": {
                        "_id": {"$toString": "$_id"},
                        "concept_tier": 1,
                        "concept_mastery": 1,
                        "presentation": 1,
                        "creativity": 1,
                        "overall_grade": 1,
                        "user_id": {"$toString": "$user_id"},
                        "project_id": {"$toString": "$project_id"},
                        "overall_comments": 1,
                        "project.name": 1,
                    }
                },
            ]
        )
        return list(grades)

    def update_grade(self, id, update_data):
        result = self.collection.update_one({"_id": id}, {"$set": update_data})
        return result

    def delete_grade(self, id):
        result = self.collection.delete_one({"_id": id})
        return result
