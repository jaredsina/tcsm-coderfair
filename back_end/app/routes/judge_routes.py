# app/routes/judge_route.py
from flask import Blueprint, jsonify, current_app, request
from app.models.judge import JudgeModel

# used to convert string to ObjectId
from bson import ObjectId

judge_routes = Blueprint("judge_routes", __name__)


# Define a simple route inside this blueprint
@judge_routes.route("/")
def get_judges():
    try:
        new_judge = JudgeModel(current_app.mongo)
        judges = new_judge.list_all_judges()

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting judges", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify(judges), 200


@judge_routes.route("/<string:judge_id>")
def get_judge(judge_id):
    try:
        # we will get the judge_id from the request json
        # Need to convert the string to an ObjectId to match the data type in the database
        judge_id = ObjectId(judge_id)
        new_judge = JudgeModel(current_app.mongo)
        judge = new_judge.find_judge_by_id(judge_id)

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting judge", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify(judge), 200


@judge_routes.route("/delete/<string:judge_id>", methods=["DELETE"])
def delete_judge(judge_id):
    try:
        # Need to convert the string to an ObjectId to match the data type in the database
        judge_id = ObjectId(judge_id)
        new_judge = JudgeModel(current_app.mongo)
        response = new_judge.delete_judge(judge_id)
        print(response)
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error deleting judge", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": f"judge with ID {judge_id}"}), 200


@judge_routes.route("/update/<string:judge_id>", methods=["PUT"])
def update_judge(judge_id):
    try:
        # we will get the judge_id from the request json
        data = request.get_json()
        print(data)
        # updated_judge = data["updated_judge"]
        updated_judge = {
            "user_id": ObjectId(data["user_id"]),
            "coderfair_id": ObjectId(data["coderfair_id"]),
        }
        new_judge = JudgeModel(current_app.mongo)
        response = new_judge.update_judge(judge_id, updated_judge)

    except Exception as e:
        print(e)
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error updating judge", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": str(response)}), 200


@judge_routes.route("/create", methods=["POST"])
def create_judge():
    try:
        # we will get the judge data from the request json
        data = request.get_json()
        user_id = ObjectId(data["user_id"])
        coderfair_id = data["coderfair_id"]

        # Use the JudgeModel class to create a new judge
        new_judge = JudgeModel(current_app.mongo)

        response = new_judge.create_judge(user_id, coderfair_id)
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error creating judge", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 201
    return jsonify(
        {"message": "Judge created successfully", "judge_id": str(response)}
    ), 201
