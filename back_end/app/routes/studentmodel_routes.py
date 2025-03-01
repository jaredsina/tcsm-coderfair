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
        cloudinary.uploader.destroy(public_id)

    except Exception as e:
        return jsonify({"message": "Error deleting student", "error": str(e)}), 400

    return jsonify({"message": f"deleted student with ID {student_id}"}), 200


@studentmodel_routes.route("/update/<string:student_id>", methods=["PUT"])
def update_student(student_id):
    try:
        data = request.get_json()
        update_data = data["update_data"]

        student = StudentModel(current_app.mongo)
        result, public_id, old_public_id, same_avatar_image = student.update_student(
            ObjectId(student_id), update_data
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
        return jsonify({"message": "Error updating student", "error": str(e)}), 400

    return jsonify(
        {"message": "Student updated sucessfully", "student_id": str(result)}
    ), 201


@studentmodel_routes.route("/create", methods=["POST"])
def create_student():
    try:
        data = request.get_json()
        name = data["name"]
        bio = data["bio"]
        avatar_image = data["avatar_image"]

        # Upload an image
        upload_result = cloudinary.uploader.upload(
            avatar_image,
            public_id=name,
        )
        print(upload_result["secure_url"])

        # Optimize delivery by resizing and applying auto-format and auto-quality
        optimize_url, _ = cloudinary_url(name, fetch_format="auto", quality="auto")
        print(optimize_url)

        # Transform the image: auto-crop to square aspect_ratio
        auto_crop_url, _ = cloudinary_url(
            name, width=500, height=500, crop="auto", gravity="auto"
        )
        print(auto_crop_url)
        # print(name, bio, avatar_image) test
        new_student = StudentModel(current_app.mongo)
        response = new_student.create_student(name, bio, avatar_image)

    except Exception as e:
        return jsonify({"message": "Error creating student", "error": str(e)}), 400

    return jsonify(
        {"message": "Student created sucessfully", "student_id": str(response)}
    ), 201
