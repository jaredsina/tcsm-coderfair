# app/routes/useroles_route.py
from flask import Blueprint, jsonify

userroles_routes = Blueprint('userroles_routes', __name__)

# Define a simple route inside this blueprint
@userroles_routes.route('/')
def get_userroles():
    return jsonify({'message': 'List of userroles will be here'})

@userroles_routes.route('/<int:userrole_id>')
def get_userrole(userrole_id):
    return jsonify({'message': f'Userrole with ID {userrole_id}'})

@userroles_routes.route('/<int:userrole_id>')
def delete_userrole(userrole_id):
    return jsonify({'message': f'Userrole with ID {userrole_id}'})

@userroles_routes.route('/<int:userrole_id>')
def update_userrole(userrole_id):
    return jsonify({'message': f'Userrole with ID {userrole_id}'})

@userroles_routes.route('/<int:userrole_id>')
def create_userrole(userrole_id):
    return jsonify({'message': f'Userrole with ID {userrole_id}'})