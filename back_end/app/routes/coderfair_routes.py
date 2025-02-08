# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify

coderfair_routes = Blueprint('coderfair_routes', __name__)

# Define a simple route inside this blueprint
@coderfair_routes.route('/')
def get_coderfairs():
    return jsonify({'message': 'List of coderfairs will be here'})

@coderfair_routes.route('/<string:coderfair_id>')
def get_coderfair(coderfair_id):
    return jsonify({'message': f'Coderfair with ID {coderfair_id}'})

@coderfair_routes.route('/delete/<string:coderfair_id>')
def delete_coderfair(coderfair_id):
    return jsonify({'message': f'Coderfair with ID {coderfair_id}'})

@coderfair_routes.route('/update/<string:coderfair_id>')
def update_coderfair(coderfair_id):
    return jsonify({'message': f'Coderfair with ID {coderfair_id}'})

@coderfair_routes.route('/create/<string:coderfair_id>')
def create_coderfair(coderfair_id):
    return jsonify({'message': f'Coderfair with ID {coderfair_id}'})