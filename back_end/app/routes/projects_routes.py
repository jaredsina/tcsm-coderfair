# app/routes/user_routes.py
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
        projects = new_project.list_all_projects()

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
def delete_project(project_id):
    try:
        # Need to convert the string to an ObjectId to match the data type in the database
        project_id = ObjectId(project_id)
        new_project = ProjectModel(current_app.mongo)
        new_project.delete_project(project_id)

    except Exception as e:
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error deleting project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    return jsonify({"project_id": str(project_id)}), 200


@projects_routes.route("/update/<string:project_id>", methods=["PUT"])
def update_project(project_id):
    try:
        # we will get the project_id from the request json
        data = request.get_json()
        print(data)
        # updated_project = data["updated_judge"]
        update_project = {
            "student_id": data["student_id"],
            "coderfair_id": data["coderfair_id"],
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
        new_project.update_project(ObjectId(project_id), update_project)

    except Exception as e:
        print(e)
        # If an exception is raised, return an error message and status code 400
        return jsonify({"message": "Error updating project", "error": str(e)}), 400

    # If no exceptions are raised, return a success message and status code 200
    # Reutn a copy of the updated project with the project_id added
    return jsonify({**update_project, "_id": project_id}), 200


@projects_routes.route("/create", methods=["POST"])
def create_project():
    try:
        # we will get the project data from the request json
        data = request.get_json()
        student_id = data["student_id"]
        coderfair_id = data["coderfair_id"]
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

        new_project = ProjectModel(current_app.mongo)
        response = new_project.create_project(
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
            "_id": response,
        }
    ), 201
