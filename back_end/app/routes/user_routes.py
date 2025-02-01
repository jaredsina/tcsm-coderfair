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

