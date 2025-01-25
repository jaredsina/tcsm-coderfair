# app/routes/role_routes.py
from flask import Blueprint, jsonify

role_routes = Blueprint('role_routes', __name__)

# Define a simple route inside this blueprint
@role_routes.route('/')
def get_roles():
    return jsonify({'message': 'List of roles will be here'})

@role_routes.route('/<int:role_id>')
def get_role(role_id):
    return jsonify({'message': f'Role with ID {role_id}'})

@role_routes.route('/<int:role_id>')
def delete_role(role_id):
    return jsonify({'message': f'Role with ID {role_id}'})

@role_routes.route('/<int:role_id>')
def update_role(role_id):
    return jsonify({'message': f'Role with ID {role_id}'})

@role_routes.route('/<int:role_id>')
def create_role(role_id):
    return jsonify({'message': f'Role with ID {role_id}'})