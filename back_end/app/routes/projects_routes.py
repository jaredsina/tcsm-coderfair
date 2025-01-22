# app/routes/user_routes.py
from flask import Blueprint, jsonify

projects_routes = Blueprint('projects_routes', __name__)

# Define a simple route inside this blueprint
@projects_routes.route('/')
def get_projects():
    return jsonify({'message': 'List of projects will be here'})

@projects_routes.route('/<int:project_id>')
def get_project(project_id):
    return jsonify({'message': f'Project with ID {project_id}'})

@projects_routes.route('/<int:project_id>')
def delete_project(project_id):
    return jsonify({'message': f'Project with ID {project_id}'})

@projects_routes.route('/<int:project_id>')
def update_project(project_id):
    return jsonify({'message': f'Project with ID {project_id}'})