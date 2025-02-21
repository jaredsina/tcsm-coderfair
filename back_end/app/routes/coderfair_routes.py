# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from app.models.coderfair import CoderfairModel


# used to convert string to ObjectId
from bson import ObjectId

coderfair_routes = Blueprint("coderfair_routes", __name__)

# Define a simple route inside this blueprint
@coderfair_routes.route("/")
def get_coderfairs():
    try:
        new_coderfair = CoderfairModel(current_app.mongo)
        coderfairs = new_coderfair.list_coderfairs()

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting coderfairs", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    #return jsonify({'message': 'List of coderfairs will be here'})
    return jsonify(coderfairs), 200

@coderfair_routes.route("/<string:coderfair_id>")
def get_coderfair(coderfair_id):
    try: 
        print (coderfair_id)
        # we will get the coderfair_id from the request json
        # Need to convert the string to an ObjectId to match the data type in the database
        coderfair_id = ObjectId(coderfair_id)
        new_coderfair = CoderfairModel(current_app.mongo)
        coderfair = new_coderfair.find_coderfair_by_id(coderfair_id)
    #return jsonify({'message': f'Coderfair with ID {coderfair_id}'})
    
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting coderfair", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify(coderfair), 200

@coderfair_routes.route("/delete/<string:coderfair_id>", methods=["DELETE"])
def delete_coderfair(coderfair_id):
    try:
        # Need to convert the string to an ObjectId to match the data type in the database
        coderfair_id = ObjectId(coderfair_id)
        new_coderfair = CoderfairModel(current_app.mongo)
        new_coderfair.delete_coderfair(coderfair_id)
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error deleting coderfair", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": f"coderfair with ID {coderfair_id} was deleted"}), 200
    #return jsonify({'message': f'Coderfair with ID {coderfair_id}'})

@coderfair_routes.route("/update/<string:coderfair_id>", methods=["PUT"])
def update_coderfair(coderfair_id):
    try:
        # we will get the judge_id from the request json
        data = request.get_json()
        updated_coderfair = data["updated_coderfair"]

        new_coderfair = CoderfairModel(current_app.mongo)
        response = new_coderfair.update_coderfair(ObjectId(coderfair_id), updated_coderfair)

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error updating coderfiar", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": str(response)}), 200
    #return jsonify({'message': f'Coderfair with ID {coderfair_id}'})

#WHEN CREATING THE CODERFAIR DO WE NEED IDS?
@coderfair_routes.route("/create/", methods=["POST"])
def create_coderfair():
    try:
        # we will get the coderfair data from the request json
        data = request.get_json()
        description = data["description"]
        fair_date = data["fair_date"]
        #coderfair_id = data["coderfair_id"]

        # Use the JudgeModel class to create a new judge
        new_coderfair = CoderfairModel(current_app.mongo)

        response = new_coderfair.create_coderfair(description, fair_date)
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error creating coderfair", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 201
    return jsonify(
        {"message": "Coderfair created successfully", "coderfair_id": str(response)}
    ), 201
    #return jsonify({'message': f'Coderfair with ID {coderfair_id}'})