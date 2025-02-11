# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from app.models.student import StudentModel


from bson import ObjectId

studentmodel_routes = Blueprint('studentmodel_routes', __name__)

# Define a simple route inside this blueprint
@studentmodel_routes.route('/')
def get_studentmodels():
    return jsonify({'message': 'List of studentmodels will be here'})

@studentmodel_routes.route('/<string:studentmodel_id>')
def get_studentmodel(studentmodel_id):
    return jsonify({'message': f'Studentmodel with ID {studentmodel_id}'})

@studentmodel_routes.route('/delete/<string:studentmodel_id>')
def delete_studentmodel(studentmodel_id):
    return jsonify({'message': f'Studentmodel with ID {studentmodel_id}'})

@studentmodel_routes.route('/update/<string:studentmodel_id>')
def update_studentmodel(studentmodel_id):
    return jsonify({'message': f'Studentmodel with ID {studentmodel_id}'})

@studentmodel_routes.route('/create', methods=["POST"])
def create_student():
    try:
        data = request.get_json()
        name = data["name"]
        bio = data["bio"]
        avatar_image = data["avatar_image"]

        #print(name, bio, avatar_image) test
        new_student = StudentModel(current_app.mongo)
        response = new_student.create_student(name, bio, avatar_image)

    except Exception as e:
        return jsonify({"message": "Error creating student", "error": str(e)}), 400

    return jsonify({'message': "Student created sucessfully", "student_id": str(response)}), 201