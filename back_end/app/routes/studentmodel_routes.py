# app/routes/coderfair_routes.py
from flask import Blueprint, jsonify, current_app, request
from app.models.student import StudentModel
from app.models.grade import GradeModel
from app.models.project import ProjectModel

from bson import ObjectId

studentmodel_routes = Blueprint('studentmodel_routes', __name__)

# Define a simple route inside this blueprint
@studentmodel_routes.route('/', methods=["GET"])
def get_students():
    try:
        student = StudentModel(current_app.mongo)
        students = student.list_students()

    except Exception as e:
        return jsonify({"message": "Error getting students", "error": str(e)})
    
    return jsonify(students), 200

@studentmodel_routes.route('/top/<string:coderfair_id>', methods=["GET"])
def get_top_students(coderfair_id):
    grade = GradeModel(current_app.mongo)
    project_ids = grade.list_top_grades()

    project = ProjectModel(current_app.mongo)
    students = project.list_top_projects(coderfair_id, project_ids)
    return students
    #get all the projects for the coderfair
    #create grade object
    #run method with loop through projects, return 

@studentmodel_routes.route('/<string:student_id>', methods=["GET"])
def get_student(student_id):
    try:
        student_id = ObjectId(student_id)
        student = StudentModel(current_app.mongo)
        student = student.find_student_by_id(student_id)

    except Exception as e:
        return jsonify({"message": "Error getting student", "error": str(e)}), 400
    
    return jsonify(student), 200

@studentmodel_routes.route('/delete/<string:student_id>', methods=["DELETE"])
def delete_student(student_id):
    try:
        student_id = ObjectId(student_id)
        student = StudentModel(current_app.mongo)
        student.delete_student(student_id)

    except Exception as e:
        return jsonify({"message": "Error deleting student", "error": str(e)}), 400
    
    return jsonify({"message": f"deleted student with ID {student_id}"}), 200

@studentmodel_routes.route('/update/<string:student_id>', methods=["PUT"])
def update_student(student_id):
    try:
        data = request.get_json()
        update_data = data["update_data"]

        student = StudentModel(current_app.mongo)
        response = student.update_student(ObjectId(student_id), update_data)

    except Exception as e:
        return jsonify({"message": "Error updating student", "error": str(e)}), 400
    
    return jsonify({"message": "Student updated sucessfully", "student_id": str(response)}), 201

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