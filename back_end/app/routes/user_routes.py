# app/routes/user_routes.py
from flask import Blueprint, jsonify

user_routes = Blueprint('user_routes', __name__)

# Define a simple route inside this blueprint
@user_routes.route('/')
def get_users():
    return jsonify({'message': 'List of users will be here'})

@user_routes.route('/<int:user_id>')
def get_user(user_id):
    return jsonify({'message': f'User with ID {user_id}'})

@user_routes.route('/codefairs/<int:user_id>')
def get_coderfairs(user_id):
    return jsonify({'message': f'codefair info with ID {user_id}'})

@user_routes.route('/codefairs/<int:user_id>')
def update_codefairs(user_id):
    return jsonify({'message': f'update coderfair info with ID {user_id}'})

@user_routes.route('/codefairs/<int:user_id>')
def delete_coderfairs(user_id):
    return jsonify({'message': f'delete coderfair info with ID{user_id}'})