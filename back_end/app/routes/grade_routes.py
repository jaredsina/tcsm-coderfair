# app/routes/role_routes.py
from flask import Blueprint, jsonify, request, current_app
from app.models.grade import GradeModel

from bson import ObjectId

grade_routes = Blueprint('grade_routes', __name__)

# Define a simple route inside this blueprint
@grade_routes.route('/')
def get_grades():
    return jsonify({'message': 'List of grades will be here'})

@grade_routes.route('/<string:grade_id>')
def get_grade(grade_id):
    return jsonify({'message': f'Grade with ID {grade_id}'})

@grade_routes.route('/delete/<string:grade_id>', methods=["DELETE"])
def delete_grade(grade_id):
    try:
        grade_id = ObjectId(grade_id)
        grade = GradeModel(current_app.mongo)
        grade.delete_grade(grade_id)
        
    except Exception as e:
        return jsonify({"message": "Error deleting grade", "error": str(e)}), 400
    
    return jsonify({"message": f"deleted grade with ID {grade_id}"}), 200

@grade_routes.route('/update/<string:grade_id>', methods=["PUT"])
def update_grade(grade_id):
    try:
        data = request.get_json()
        update_data = data["update_data"]
        grade = GradeModel(current_app.mongo)
        response = grade.update_grade(ObjectId(grade_id), update_data)

    except Exception as e:
        return jsonify({"message": "Error updating grade", "error": str(e)}), 400
    
    return jsonify({"message": "Grade updated successfully", "grade_id": str(response)}), 201

@grade_routes.route('/create', methods=["POST"])
def create_grade():
    try:
        data = request.get_json()
        concept_tier = data["concept_tier"]
        concept_mastery = data["concept_mastery"]
        presentation = data["presentation"]
        creativity = data["creativity"]
        judge_id = data["judge_id"]
        project_id = data["project_id"]
        overall_comments = data["overall_comments"]

        new_grade = GradeModel(current_app.mongo)
        response = new_grade.create_grade(concept_tier, concept_mastery, presentation, creativity, judge_id, project_id, overall_comments)
        
    except Exception as e:
        return jsonify({"message": "Error creating grade", "error": str(e)}), 400
    
    return jsonify({'message': "Student created sucessfully", "student_id": str(response)}), 201