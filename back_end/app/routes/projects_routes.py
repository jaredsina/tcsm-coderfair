# app/routes/user_routes.py
from flask import Blueprint, request, jsonify
import cloudinary
from cloudinary.utils import cloudinary_url

projects_routes = Blueprint('projects_routes', __name__)

# Define a simple route inside this blueprint
@projects_routes.route('/')
def get_projects():
    return jsonify({'message': 'List of projects will be here'})

@projects_routes.route('/<string:project_id>')
def get_project(project_id):
    return jsonify({'message': f'Project with ID {project_id}'})

@projects_routes.route('/delete/<string:project_id>')
def delete_project(project_id):
    
    public_id = new_project.delete_user(project_id)
    cloudinary.uploader.destroy(public_id)

    return jsonify({'message': f'Project with ID {project_id}'})

@projects_routes.route('/update/<string:project_id>')
def update_project(project_id):

    return jsonify({'message': f'Project with ID {project_id}'})

@projects_routes.route('/create/<string:project_id>')
def create_project(project_id):
    
    data = request.get_json()
    project_image = data["project_image"]
    project_username = data["project_username"]

    upload_result = cloudinary.uploader.upload(
        project_image,
        public_id = project_username,
    )
    print(upload_result["secure_url"])
    optimize_url, _ = cloudinary_url (project_username, fetch_format = "auto", quality = "auto")

    auto_crop_url, _ = cloudinary_url(   
        project_username, width=500, height=500, crop="auto", gravity="auto"
    )
    print(auto_crop_url)




    return jsonify({'message': f'Project with ID {project_id}'})
