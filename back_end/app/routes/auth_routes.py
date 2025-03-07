# log in and log out
# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from flask_bcrypt import Bcrypt
from app.models.user import UserModel
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    create_refresh_token,
)

# used to convert string to ObjectId

auth_routes = Blueprint("auth_routes", __name__)


# Define a simple route inside this blueprint
@auth_routes.route("/log_in/", methods=["POST"])
def log_in():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]

        user = UserModel(current_app.mongo)
        user_database = user.find_user_by_username(username)
        if not user_database:
            return jsonify({"error": "Error incorrect username"}), 401

        bcrypt = Bcrypt(current_app)
        # retrive hasshed password from the database
        hashed_password = user_database["password"]

        is_valid = bcrypt.check_password_hash(hashed_password, password)
        if is_valid and user_database["username"] == username:
            user_database.pop("password", None)
            # Generate a token
            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)
            return jsonify(
                {
                    "user_database": user_database,
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }
            )
        else:
            return jsonify({"error": "Error incorrect password or username"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_routes.route("/log_out")
def log_out():
    return jsonify({"message": "List will be here"})


@auth_routes.route("/refresh/", methods=["POST"])
@jwt_required(refresh=True)  # Ensures only refresh tokens can be used
def refresh():
    try:
        # Get the identity from the refresh token
        user_id = get_jwt_identity()

        # Create a new access token
        new_access_token = create_access_token(identity=user_id)

        return jsonify({"access_token": new_access_token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
