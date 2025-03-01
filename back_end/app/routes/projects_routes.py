# app/routes/user_routes.py
import cloudinary
from cloudinary.utils import cloudinary_url

from flask import Blueprint, jsonify, current_app, request
from app.models.project import ProjectModel

# used to convert string to ObjectId
from bson import ObjectId

projects_routes = Blueprint("projects_routes", __name__)


# Define a simple route inside this blueprint
@projects_routes.route("/")
def get_projects():
    try:
        new_project = ProjectModel(current_app.mongo)
        project = new_project.list___all_projects()

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error getting projects", "error": str(e)}), 400

        # If no exceptions are raised, return a success message and status code 200
    return jsonify(project), 200


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
def delete_project(project_id):
    try:
        # Need to convert the string to an ObjectId to match the data type in the database
        project_id = ObjectId(project_id)
        new_project = ProjectModel(current_app.mongo)
        response = new_project.delete_project(project_id)
        public_id = new_project.delete_user(project_id)
        cloudinary.uploader.destroy(public_id)
        print(response)
    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error deleting project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": f"project with ID {project_id}"}), 200


@projects_routes.route("/update/<string:project_id>", methods=["PUT"])
def update_project(project_id):
    try:
        # we will get the project_id from the request json
        data = request.get_json()
        print(data)
        # updated_project = data["updated_judge"]
        update_project = {
            "student_id": ObjectId(data["student_id"]),
            "coderfair_id": ObjectId(data["coderfair_id"]),
            "name": data["name"],
            "description": data["description"],
            "category": data["category"],
            "project_image": data["project_image"],
            "presentation_video_url": data["presentation_video_url"],
            "code_access_link": data["code_access_link"],
            "coding_language": data["coding_language"],
            "project_username": data["project_username"],
            "project_password": data["project_password"],
            "notes": data["notes"],
        }
        new_project = ProjectModel(current_app.mongo)
        response = new_project.update_project(ObjectId(project_id), update_project)
        result, public_id, old_public_id, same_project_image = project.update_project(
            ObjectId(project_id), update_data
        )
        if old_public_id:
            if same_project_image:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(
                    same_project_image,
                    public_id=public_id,
                )
                print(upload_result["secure_url"])

                optimize_url, _ = cloudinary_url(
                    public_id, fetch_format="auto", quality="auto"
                )
                print(optimize_url)

                auto_crop_url, _ = cloudinary_url(
                    public_id, width=500, height=500, crop="auto", gravity="auto"
                )
                print(auto_crop_url)

    except Exception as e:
        print(e)
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error updating project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"message": str(response)}), 200


@projects_routes.route("/create/", methods=["POST"])
def create_project():
    try:
        # we will get the project data from the request json
        data = request.get_json()
        student_id = ObjectId(data["student_id"])
        coderfair_id = ObjectId(data["coderfair_id"])
        name = data["name"]
        description = data["description"]
        category = data["category"]
        project_image = data["project_image"]
        presentation_video_url = data["presentation_video_url"]
        code_access_link = data["code_access_link"]
        coding_language = data["coding_language"]
        project_username = data["project_username"]
        project_password = data["project_password"]
        notes = data["notes"]

        upload_result = cloudinary.uploader.upload(
            project_image,
            public_id=project_username,
        )
        print(upload_result["secure_url"])
        optimize_url, _ = cloudinary_url(
            project_username, fetch_format="auto", quality="auto"
        )

        auto_crop_url, _ = cloudinary_url(
            project_username, width=500, height=500, crop="auto", gravity="auto"
        )
        print(auto_crop_url)

        new_project = ProjectModel(current_app.mongo)
        response = new_project.create_project(
            student_id,
            coderfair_id,
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
        )

    except Exception as e:
        return jsonify({"message": "Error creating project", "error": str(e)}), 400

    return jsonify(
        {"message": "Project created successfully", "project_id": str(response)}
    ), 201
