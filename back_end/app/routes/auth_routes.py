# log in and log out
# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from flask_bcrypt import Bcrypt
from app.models.user import UserModel
from flask_jwt_extended import create_access_token

# used to convert string to ObjectId

auth_routes = Blueprint("auth_routes", __name__)


# Define a simple route inside this blueprint
@auth_routes.route("/log_in/", methods=["POST"])
def log_in():
    data = request.get_json()
    username = data["username"]

    user = UserModel(current_app.mongo)
    user_database = user.find_user_by_username(username)

    print(user_database)

    password = data["password"]
    bcrypt = Bcrypt(current_app)
    # retrive hasshed password from the database
    hashed_password = user_database["password"]

    is_valid = bcrypt.check_password_hash(hashed_password, password)
    if is_valid and user_database["username"] == username:
        user_database.pop("password", None)
        # Generate a token
        token_holder = create_access_token(identity=username)
        return jsonify({"user_database": user_database, "token_holder": token_holder})
    else:
        return jsonify({"message": "Error incorrect password or username"})


@auth_routes.route("/log_out")
def log_out():
    return jsonify({"message": "List will be here"})
