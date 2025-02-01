

from flask import Blueprint, jsonify, request, current_app
from ..models.coderfair import CoderfairModel
import datetime

coderfair_routes = Blueprint('coderfiar_routes', __name__)

@coderfair_routes.route("/coderfair", methods=["POST"])
def create_coderfair():
    mongo = current_app.config["MONGO"]
    codefair_model = CoderfairModel(mongo)
    data = request.get_json()

    # Make sure all the necessary fields are provided
    required_fields = ["id", "fair_date", "description"]
    for field in required_fields:
         if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Extract fields from the request
    id = data["id"]
    fair_date = data["fair_date"]
    description = data["description"]
    created_at = datetime.utcnow()  # Current time for creation
    updated_at = created_at  # Initially set update_at to created_at

        # Create the coderfair using the model
    new_coderfair_id = coderfair_model.create_coderfair(id, fair_date, description, created_at, updated_at)

        # Respond with success and the ID of the newly created coderfair
    return jsonify({"message": "Coderfair created", "coderfair_id": new_coderfair_id}), 201



#read
@coderfair_routes.route('/codefairs/<int:user_id>')
def get_coderfair(id):
    mongo = current_app.config["MONGO"]
    coderfair_model = CoderfairModel(mongo)
    coderfair = coderfair_model.find_coderfair_by_id(id)
    if coderfair:
        return jsonify(coderfair), 200
    else:
        return jsonify({"error": "Coderfair not found"}), 404
    #return jsonify({'message': f'codefair info with ID {id}'})




@coderfair_routes.route('/codefairs/<int:user_id>')
def update_codefairs(user_id):
    pass
def update_coderfair(id):
    mongo = current_app.config["MONGO"]
    coderfair_model = CoderfairModel(mongo)
    data = request.get_json()



    return jsonify({'message': f'update coderfair info with ID {user_id}'})





@coderfair_routes.route('/codefairs/<int:user_id>')
def delete_coderfair(id):
    
    mongo = current_app.config["MONGO"]
    coderfair_model = CoderfairModel(mongo)
    result = coderfair_model.collection.delete_one({"id": id})




    return jsonify({'message': f'delete coderfair info with ID{user_id}'})