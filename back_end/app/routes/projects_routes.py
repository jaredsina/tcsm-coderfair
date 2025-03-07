# app/routes/user_routes.py
import cloudinary
from cloudinary.utils import cloudinary_url

from flask import Blueprint, jsonify, current_app, request
from app.models.project import ProjectModel
from flask_jwt_extended import jwt_required

# used to convert string to ObjectId
from bson import ObjectId

projects_routes = Blueprint("projects_routes", __name__)


# Define a simple route inside this blueprint
@projects_routes.route("/")
def get_projects():
    try:
        new_project = ProjectModel(current_app.mongo)
        projects = new_project.list_all_projects()

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting projects", "error": str(e)}), 400

        # If no exceptions are raised, return a success message and status code 200
    return jsonify(projects), 200


# Define a simple route inside this blueprint
@projects_routes.route("/coderfair/<string:coderfair_id>", methods=["GET"])
def get_coderfair_projects(coderfair_id):
    try:
        new_project = ProjectModel(current_app.mongo)
        projects = new_project.list_coderfair_projects(ObjectId(coderfair_id))

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting projects", "error": str(e)}), 400

        # If no exceptions are raised, return a success message and status code 200
    return jsonify(projects), 200


@projects_routes.route("/<string:project_id>", methods=["GET"])
def get_project(project_id):
    try:
        # we will get the project_id from the request json
        # Need to convert the string to an ObjectId to match the data type in the database
        project_id = ObjectId(project_id)
        new_project = ProjectModel(current_app.mongo)
        project = new_project.find_project_by_id(project_id)

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify(project), 200


@projects_routes.route("/delete/<string:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    try:
        # Need to convert the string to an ObjectId to match the data type in the database
        project_id = ObjectId(project_id)
        new_project = ProjectModel(current_app.mongo)
        public_id = new_project.delete_project(project_id)
        cloudinary.uploader.destroy(f"{public_id.replace(' ', '')}_image")
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error deleting project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"project_id": str(project_id)}), 200


@projects_routes.route("/update/<string:project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    try:
        student_id = request.form.get("student_id")
        coderfair_id = request.form.get("coderfair_id")
        name = request.form.get("name")
        description = request.form.get("description")
        category = request.form.get("category")
        project_image = request.files.get("project_image")
        presentation_video_url = request.form.get("presentation_video_url")
        code_access_link = request.form.get("code_access_link")
        coding_language = request.form.get("coding_language")
        project_username = request.form.get("project_username")
        project_password = request.form.get("project_password")
        notes = request.form.get("notes")
        is_featured = request.form.get("is_featured")

        if not project_image:
            update_data = {
                "student_id": ObjectId(student_id),
                "coderfair_id": ObjectId(coderfair_id),
                "name": name,
                "description": description,
                "category": category,
                "presentation_video_url": presentation_video_url,
                "code_access_link": code_access_link,
                "coding_language": coding_language,
                "project_username": project_username,
                "project_password": project_password,
                "notes": notes,
                "is_featured": is_featured,
            }

        else:
            cloudinary.uploader.upload(
                project_image, public_id=f"{name.replace(' ','')}_image", overwrite=True
            )
            auto_crop_url, _ = cloudinary_url(
                f"{name.replace(' ','')}_image",
                width=500,
                height=500,
                crop="auto",
                gravity="auto",
            )
            project_image = auto_crop_url

            update_data = {
                "student_id": ObjectId(student_id),
                "coderfair_id": ObjectId(coderfair_id),
                "name": name,
                "description": description,
                "category": category,
                "project_image": project_image,
                "presentation_video_url": presentation_video_url,
                "code_access_link": code_access_link,
                "coding_language": coding_language,
                "project_username": project_username,
                "project_password": project_password,
                "notes": notes,
                "is_featured": is_featured,
            }
        project = ProjectModel(current_app.mongo)
        image = project.update_project(ObjectId(project_id), update_data)

    except Exception as e:
        print(e)
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error updating project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify(
        {
            **update_data,
            "_id": project_id,
            "student_id": student_id,
            "coderfair_id": coderfair_id,
            "project_image": image,
        }
    ), 200


@projects_routes.route("/create/", methods=["POST"])
@jwt_required()
def create_project():
    try:
        # we will get the project data from the request json
        student_id = request.form.get("student_id")
        coderfair_id = request.form.get("coderfair_id")
        name = request.form.get("name")
        description = request.form.get("description")
        category = request.form.get("category")
        project_image = request.files.get("project_image")
        presentation_video_url = request.form.get("presentation_video_url")
        code_access_link = request.form.get("code_access_link")
        coding_language = request.form.get("coding_language")
        project_username = request.form.get("project_username")
        project_password = request.form.get("project_password")
        notes = request.form.get("notes")
        is_featured = request.form.get("is_featured")

        project = ProjectModel(current_app.mongo)

        # Check if student has a project for the coderfair
        if project.check_duplicate(ObjectId(student_id), ObjectId(coderfair_id)):
            raise ValueError(
                f"A project with student_id {student_id} and coderfair_id {coderfair_id} already exists."
            )

        if project_image:
            cloudinary.uploader.upload(
                project_image,
                public_id=f"{name.replace(' ','')}_image",
            )

            auto_crop_url, _ = cloudinary_url(
                project_username, width=500, height=500, crop="auto", gravity="auto"
            )
            project_image = auto_crop_url
        else:
            project_image = ""

        response = project.create_project(
            ObjectId(student_id),
            ObjectId(coderfair_id),
            name,
            description,
            category,
            project_image,
            presentation_video_url,
            code_access_link,
            coding_language,
            project_username,
            project_password,
            notes,
            is_featured,
        )

    except Exception as e:
        return jsonify({"message": "Error creating project", "error": str(e)}), 400

    return jsonify(
        {
            "student_id": student_id,
            "coderfair_id": coderfair_id,
            "name": name,
            "description": description,
            "category": category,
            "project_image": project_image,
            "presentation_video_url": presentation_video_url,
            "code_access_link": code_access_link,
            "coding_language": coding_language,
            "project_username": project_username,
            "project_password": project_password,
            "notes": notes,
            "is_featured": is_featured,
            "_id": response,
        }
    ), 201
