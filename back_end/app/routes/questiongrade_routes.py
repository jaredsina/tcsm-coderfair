# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify

questiongrade_routes = Blueprint('questiongrade_routes', __name__)

# Define a simple route inside this blueprint
@questiongrade_routes.route('/')
def get_questiongrades():
    return jsonify({'message': 'List of questiongrades will be here'})

@questiongrade_routes.route('/<int:questiongrade_id>')
def get_questiongrade(questiongrade_id):
    return jsonify({'message': f'Questiongrade with ID {questiongrade_id}'})

@questiongrade_routes.route('/<int:questiongrade_id>')
def delete_questiongrade(questiongrade_id):
    return jsonify({'message': f'Questiongrade with ID {questiongrade_id}'})

@questiongrade_routes.route('/<int:questiongrade_id>')
def update_questiongrade(questiongrade_id):
    return jsonify({'message': f'Questiongrade with ID {questiongrade_id}'})

@questiongrade_routes.route('/<int:questiongrade_id>')
def create_questiongrade(questiongrade_id):
    return jsonify({'message': f'Questiongrade with ID {questiongrade_id}'})