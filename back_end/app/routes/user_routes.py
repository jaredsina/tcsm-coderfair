# app/routes/user_routes.py
from app.models.user import UserModel
from flask import Blueprint, jsonify, request, current_app
import cloudinary
from cloudinary.utils import cloudinary_url


from bson import ObjectId

user_routes = Blueprint("user_routes", __name__)


# Define a simple route inside this blueprint
@user_routes.route("/<string:user_id>")
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

        print(username)
        if avatar_image:
            upload_result = cloudinary.uploader.upload(
                avatar_image,
                public_id=username,
            )
            print(upload_result["secure_url"])

            optimize_url, _ = cloudinary_url(
                username, fetch_format="auto", quality="auto"
            )
            print(optimize_url)

            auto_crop_url, _ = cloudinary_url(
                username, width=500, height=500, crop="auto", gravity="auto"
            )
            print(auto_crop_url)
            avatar_image = auto_crop_url
        else:
            avatar_image = ""

        user_model = UserModel(current_app.mongo)
        response = user_model.create_user(
            first_name, last_name, email, username, avatar_image, is_admin, is_staff
        )

    except Exception as e:
        return jsonify({"message": "Error creating user", "error": str(e)}), 400

    return jsonify(
        {"message": "User created successfully", "user_id": str(response)}
    ), 201


@user_routes.route("/delete/<string:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        user_id = ObjectId(user_id)
        new_user = UserModel(current_app.mongo)
        public_id = new_user.delete_user(user_id)
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        return jsonify({"message": "Error deleting user", "error": str(e)}), 400

    return jsonify({"message": f"deleted user with ID {user_id}"}), 200


@user_routes.route("/update/<string:user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        data = request.get_json()
        update_data = data["update_data"]
        user = UserModel(current_app.mongo)
        result, public_id, old_public_id, same_avatar_image = user.update_user(
            ObjectId(user_id), update_data
        )
        if old_public_id:
            if same_avatar_image:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(
                    same_avatar_image,
                    public_id=public_id,
                )
                print(upload_result["secure_url"])

                # Optimize delivery by resizing and applying auto-format and auto-quality
                optimize_url, _ = cloudinary_url(
                    public_id, fetch_format="auto", quality="auto"
                )
                print(optimize_url)

                # Transform the image: auto-crop to square aspect_ratio
                auto_crop_url, _ = cloudinary_url(
                    public_id, width=500, height=500, crop="auto", gravity="auto"
                )
                print(auto_crop_url)

            else:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(
                    update_data["avatar_image"],
                    public_id=public_id,
                )
                print(upload_result["secure_url"])

                # Optimize delivery by resizing and applying auto-format and auto-quality
                optimize_url, _ = cloudinary_url(
                    public_id, fetch_format="auto", quality="auto"
                )
                print(optimize_url)

                # Transform the image: auto-crop to square aspect_ratio
                auto_crop_url, _ = cloudinary_url(
                    public_id, width=500, height=500, crop="auto", gravity="auto"
                )
                print(auto_crop_url)

    except Exception as e:
        return jsonify({"message": "Error updating user", "error": str(e)}), 400

    return jsonify({"message": "User updated sucessfully", "user_id": str(result)}), 201
