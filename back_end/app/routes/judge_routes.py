# app/routes/judge_route.py
from flask import Blueprint, jsonify, current_app
from app.models.judge import JudgeModel

# used to convert string to ObjectId
from bson import ObjectId

judge_routes = Blueprint("judge_routes", __name__)


# Define a simple route inside this blueprint
@judge_routes.route("/")
def get_judges():
    ## EXAMPLE CODE ##
    new_judge = JudgeModel(current_app.mongo)
    judges = new_judge.list_all_judges()

    ## EXAMPLE CODE END ##

    return jsonify({"message": f"List of judges will be here: {judges}"})


@judge_routes.route("/<string:judge_id>")
def get_judge(judge_id):
    ## EXAMPLE CODE ##

    # we will get the judge_id from the request json

    # Need to convert the string to an ObjectId to match the data type in the database
    judge_id = ObjectId(judge_id)
    new_judge = JudgeModel(current_app.mongo)
    judge = new_judge.find_judge_by_id(judge_id)

    ## EXAMPLE CODE END ##

    return jsonify({"message": f"judge with ID {judge}"})


@judge_routes.route("/delete")
def delete_judge():
    ## EXAMPLE CODE ##

    # we will get the judge_id from the request json
    judge_id = "679ab202a7c5c4c7d7f827f6"
    # Need to convert the string to an ObjectId to match the data type in the database
    judge_id = ObjectId(judge_id)
    new_judge = JudgeModel(current_app.mongo)
    new_judge.delete_judge(judge_id)

    ## EXAMPLE CODE END ##

    return jsonify({"message": f"judge with ID {judge_id}"})


@judge_routes.route("/update")
def update_judge():
    ## EXAMPLE CODE ##
    # we will get the judge_id and update set from the request json
    judge_id = "679ab202a7c5c4c7d7f827f6"
    new_judge = JudgeModel(current_app.mongo)
    response = new_judge.update_judge(
        ObjectId(judge_id), {"user_id": 2, "coderfair_id": 2}
    )

    ## EXAMPLE CODE END ##

    return jsonify({"message": str(response)})


@judge_routes.route("/create")
def create_judge():
    ## EXAMPLE CODE ##
    new_judge = JudgeModel(current_app.mongo)
    new_judge.create_judge(1, 1)

    ## EXAMPLE CODE END ##
    return jsonify({"message": "judge with ID 1 created"})
