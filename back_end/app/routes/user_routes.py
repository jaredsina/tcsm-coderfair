# app/routes/user_routes.py
from ..models.user import UserModel
from flask import Blueprint, jsonify, request, current_app
from flask_bcrypt import Bcrypt


from bson import ObjectId

user_routes = Blueprint("user_routes", __name__)
bcrypt = Bcrypt(current_app)



# Define a simple route inside this blueprint
@user_routes.route('/user/<string:user_id>')
def get_users(user_id):
    try:
        user_id = ObjectId(user_id)
        user_model = UserModel(current_app.mongo)
        user = user_model.find_user_by_id(user_id)
    #if not user:
        #return jsonify({"error" : str(e)}), 500
    except Exception as e:
        user["_id"] = str(user["_id"])
        return jsonify(user), 200


#route for creating users
@user_routes.route('/create/', methods = ['POST'])
def create_users():
    try:
        data = request.get_json()
        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        username = data["username"]
        is_admin = data ["is_admin"]
        is_staff = data ["is_staff"]
        password = data ["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        

        new_user = UserModel(current_app.mongo)
        response = new_user.create_user(first_name, last_name, email, username, is_admin, is_staff, hashed_password)

        
    except Exception as e:
        return jsonify({"message":"Error creating coderfair", "error": str(e)}), 400
    return jsonify(
        {"message": "Coderfair created successfully", "user_id": str(response)}), 201

@user_routes.route('/user/delete/<string:user_id>', methods=["DELETE"]) 
def delete_user(user_id):
    try: 
        user_id = ObjectId(user_id)
        new_user = user_model(current_app.mongo)
        new_user.delete_user(user_id)
    except Exception as e:
        mongo = current_app.config['MONGO']
        user_model = UserModel(mongo)
    deleted = user_model.delete_user_by_id(user_id)
    if not deleted:
            return jsonify({"error": "User not found"}), 404
    return jsonify ({'message': f'deleting user with ID {user_id}'})

@user_routes.route("/user/update/<string:user_id>", methods=["PUT"])
def update_user(user_id): 
    mongo = current_app.config['MONGO']
    user_model = UserModel(mongo)
    update_data = request.json

    if not update_data:
        return jsonify({"error": "Invalid data provider"}), 400
    
    updated_user = user_model.update_user(user_id, update_data) 

    if not updated_user: 
        return jsonify({"error" : "User not found"}), 404
    return jsonify({"messege" : "User updated succesfuly" , "user": updated_user}), 200
