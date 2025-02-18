# log in and log out
# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request



# used to convert string to ObjectId
from bson import ObjectId

auth_routes = Blueprint("auth_routes", __name__)



# Define a simple route inside this blueprint
@auth_routes.route("/log_in" , methods=["POST"])
def log_in():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    return jsonify({'username': 'here', 'password': 'List'})
  

@auth_routes.route("/log_out")
def log_out():
  return jsonify({'message': 'List will be here'})
