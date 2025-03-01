# log in and log out
# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from flask_bcrypt import Bcrypt
from app.models.user import UserModel

# used to convert string to ObjectId
from bson import ObjectId

auth_routes = Blueprint("auth_routes", __name__)


# Define a simple route inside this blueprint
@auth_routes.route("/log_in/<string:user_id>", methods=["POST"])
def log_in(user_id):
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    bcrypt = Bcrypt(current_app)
    # retrive hasshed password from the database
    user = UserModel(current_app.mongo)
    user_id = ObjectId(user_id)
    response = user.find_user_by_id(user_id)
    print(response["password"])
    hashed_password = data["hashed_password"]
    is_valid = bcrypt.check_password_hash(hashed_password, "password")
    return jsonify({"username": "here", "password": "List"})


@auth_routes.route("/log_out")
def log_out():
    return jsonify({"message": "List will be here"})
