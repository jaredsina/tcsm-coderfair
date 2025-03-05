# app/routes/user_routes.py
from app.models.user import UserModel
from flask import Blueprint, jsonify, request, current_app
from flask_bcrypt import Bcrypt
import cloudinary
from cloudinary.utils import cloudinary_url
from flask_jwt_extended import jwt_required

from bson import ObjectId

user_routes = Blueprint("user_routes", __name__)


# Define a simple route inside this blueprint
@user_routes.route("/<string:user_id>")
@jwt_required()
def get_users(user_id):
    try:
        user_id = ObjectId(user_id)
        user_model = UserModel(current_app.mongo)
        user = user_model.find_user_by_id(user_id)
    # if not user:
    # return jsonify({"error" : str(e)}), 500
    except Exception:
        user["_id"] = str(user["_id"])
        return jsonify(user), 200


# route for creating users
@user_routes.route("/create", methods=["POST"])
@jwt_required()
def create_users():
    try:
        # Use form data instead of JSON
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        email = request.form.get("email")
        username = request.form.get("username")
        is_admin = request.form.get("is_admin") == "true"
        is_staff = request.form.get("is_staff") == "true"
        avatar_image = request.files.get("avatar_image")
        password = request.form.get("password")

        bcrypt = Bcrypt(current_app)
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        if avatar_image:
            cloudinary.uploader.upload(
                avatar_image,
                public_id=f"{username.replace(' ','')}_profile_image",
            )

            auto_crop_url, _ = cloudinary_url(
                username, width=500, height=500, crop="auto", gravity="auto"
            )

            avatar_image = auto_crop_url
        else:
            avatar_image = ""

        user_model = UserModel(current_app.mongo)
        response = user_model.create_user(
            first_name,
            last_name,
            email,
            username,
            avatar_image,
            is_admin,
            is_staff,
            hashed_password,
        )

    except Exception as e:
        return jsonify({"message": "Error creating user", "error": str(e)}), 400

    return jsonify(
        {"message": "User created successfully", "user_id": str(response)}
    ), 201


@user_routes.route("/delete/<string:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        user_id = ObjectId(user_id)
        new_user = UserModel(current_app.mongo)
        public_id = new_user.delete_user(user_id)
        cloudinary.uploader.destroy(f"{public_id.replace(' ','')}_profile_image")
    except Exception as e:
        return jsonify({"message": "Error deleting user", "error": str(e)}), 400

    return jsonify({"message": f"deleted user with ID {user_id}"}), 200


@user_routes.route("/update/<string:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        user_id = ObjectId(user_id)

        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        email = request.form.get("email")
        username = request.form.get("username")
        is_admin = request.form.get("is_admin")
        is_staff = request.form.get("is_staff")
        avatar_image = request.files.get("avatar_image")

        if not avatar_image:
            avatar_image = ""
            update_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "username": username,
                "is_admin": is_admin,
                "is_staff": is_staff,
            }

        else:
            cloudinary.uploader.upload(
                avatar_image,
                public_id=f"{username.replace(' ','')}_profile_image",
                overwrite=True,
            )
            auto_crop_url, _ = cloudinary_url(
                f"{username.replace(' ','')}_profile_image",
                width=500,
                height=500,
                crop="auto",
                gravity="auto",
            )
            avatar_image = auto_crop_url

            update_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "username": username,
                "is_admin": is_admin,
                "is_staff": is_staff,
                "avatar_image": avatar_image,
            }

        user = UserModel(current_app.mongo)
        result = user.update_user(user_id, update_data)

    except Exception as e:
        return jsonify({"message": "Error updating user", "error": str(e)}), 400

    return jsonify({"message": "User updated sucessfully", "user_id": str(result)}), 201
