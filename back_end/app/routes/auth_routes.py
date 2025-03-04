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
    user_database = user.find_user_by_id(user_id)
    print(user_database["password"])

    hashed_password = (user_database["password"])
    
    is_valid = bcrypt.check_password_hash(hashed_password, password )
    if is_valid:
        user_database.pop("password", None)
        return jsonify(user_database)
    else:
        return jsonify({"message":"Error incorrect password"})


@auth_routes.route("/log_out")
def log_out():
    return jsonify({"message": "List will be here"})
