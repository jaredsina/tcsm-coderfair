# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from app.models.student import StudentModel
import cloudinary
from cloudinary.utils import cloudinary_url
from app.models.project import ProjectModel


from bson import ObjectId

studentmodel_routes = Blueprint("studentmodel_routes", __name__)


# Define a simple route inside this blueprint
@studentmodel_routes.route("/", methods=["GET"])
def get_students():
    try:
        student = StudentModel(current_app.mongo)
        students = student.list_students()

    except Exception as e:
        return jsonify({"message": "Error getting students", "error": str(e)}), 400

    return jsonify(students), 200


@studentmodel_routes.route("/top/<string:coderfair_id>", methods=["GET"])
def get_top_students(coderfair_id):
    try:
        project = ProjectModel(current_app.mongo)
        top_students = project.list_coderfair_projects(ObjectId(coderfair_id))

    except Exception as e:
        return jsonify({"message": "Error getting students", "error": str(e)}), 400

    return jsonify(top_students), 200


@studentmodel_routes.route("/<string:student_id>", methods=["GET"])
def get_student(student_id):
    try:
        student_id = ObjectId(student_id)
        student = StudentModel(current_app.mongo)
        student = student.find_student_by_id(student_id)

    except Exception as e:
        return jsonify({"message": "Error getting student", "error": str(e)}), 400

    return jsonify(student), 200


@studentmodel_routes.route("/delete/<string:student_id>", methods=["DELETE"])
def delete_student(student_id):
    try:
        student_id = ObjectId(student_id)
        student = StudentModel(current_app.mongo)

        # deleting image from cloudinary media database
        public_id = student.delete_student(student_id)
        cloudinary.uploader.destroy(f"{public_id.replace(' ', '')}_profile_image")

    except Exception as e:
        return jsonify({"message": "Error deleting student", "error": str(e)}), 400

    return jsonify({"student_id": str(student_id)}), 200


@studentmodel_routes.route("/update/<string:student_id>", methods=["PUT"])
def update_student(student_id):
    try:
        name = request.form.get("name")
        bio = request.form.get("bio")
        avatar_image = request.files.get("avatar_image")

        if not avatar_image:
            avatar_image = ""
            update_data = {
                "name": name,
                "bio": bio,
                "avatar_image": avatar_image,
            }

        else:
            cloudinary.uploader.upload(
                avatar_image,
                public_id=f"{name.replace(' ', '')}_profile_image",
                overwrite=True,
            )
            auto_crop_url, _ = cloudinary_url(
                f"{name.replace(' ','')}_profile_image",
                width=500,
                height=500,
                crop="auto",
                gravity="auto",
            )
            avatar_image = auto_crop_url

            update_data = {
                "name": name,
                "bio": bio,
                "avatar_image": avatar_image,
            }

        student = StudentModel(current_app.mongo)
        result = student.update_student(ObjectId(student_id), update_data)

    except Exception as e:
        return jsonify({"message": "Error updating student", "error": str(e)}), 400

    # Return a copy of update_data with the student_id added
    return jsonify({**update_data, "_id": student_id}), 201


@studentmodel_routes.route("/create", methods=["POST"])
def create_student():
    try:
        name = request.form.get("name")
        bio = request.form.get("bio")
        avatar_image = request.files.get("avatar_image")

        if avatar_image:
            cloudinary.uploader.upload(
                avatar_image,
                public_id=f"{name.replace(' ','')}_profile_image",
                overwrite=True,
            )
            auto_crop_url, _ = cloudinary_url(
                f"{name.replace(' ','')}_profile_image",
                width=500,
                height=500,
                crop="auto",
                gravity="auto",
            )
            avatar_image = auto_crop_url
        else:
            avatar_image = ""

        student = StudentModel(current_app.mongo)
        response = student.create_student(name, bio, avatar_image)

    except Exception as e:
        return jsonify({"message": "Error creating student", "error": str(e)}), 400

    return jsonify(
        {
            "name": name,
            "bio": bio,
            "avatar_image": avatar_image,
            "_id": response,
        }
    ), 201
