# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify

question_routes = Blueprint('question_routes', __name__)

# Define a simple route inside this blueprint
@question_routes.route('/')
def get_questions():
    return jsonify({'message': 'List of questions will be here'})

@question_routes.route('/<int:question_id>')
def get_question(question_id):
    return jsonify({'message': f'Question with ID {question_id}'})

@question_routes.route('/<int:question_id>')
def delete_question(question_id):
    return jsonify({'message': f'Question with ID {question_id}'})

@question_routes.route('/<int:question_id>')
def update_question(question_id):
    return jsonify({'message': f'Question with ID {question_id}'})

@question_routes.route('/<int:question_id>')
def create_question(question_id):
    return jsonify({'message': f'Question with ID {question_id}'})