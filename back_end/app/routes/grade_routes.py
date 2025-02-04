# app/routes/role_routes.py
from flask import Blueprint, jsonify

grade_routes = Blueprint('grade_routes', __name__)

# Define a simple route inside this blueprint
@grade_routes.route('/')
def get_grades():
    return jsonify({'message': 'List of grades will be here'})

@grade_routes.route('/<string:grade_id>')
def get_grade(grade_id):
    return jsonify({'message': f'Grade with ID {grade_id}'})

@grade_routes.route('/delete/<string:grade_id>')
def delete_grade(grade_id):
    return jsonify({'message': f'Grade with ID {grade_id}'})

@grade_routes.route('/update/<string:grade_id>')
def update_grade(grade_id):
    return jsonify({'message': f'Grade with ID {grade_id}'})

@grade_routes.route('/create/<string:grade_id>')
def create_grade(grade_id):
    return jsonify({'message': f'Grade with ID {grade_id}'})