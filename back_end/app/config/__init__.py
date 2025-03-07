from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from datetime import timedelta
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()


def init_config(app):
    # Set the uri for MongoDB
    app.config["MONGO_URI"] = os.getenv("DB_URI")

    # making the maanger of the tokens
    app.config["JWT_SECRET_KEY"] = os.getenv("YOUR_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)

    # Initialize PyMongo with the Flask app
    mongo = PyMongo(app)

    # Add the PyMongo object to the Flask app
    app.mongo = mongo

    # Add the database to the Flask app
    app.db = mongo.cx["test"]

    # Check the connection to MongoDB
    try:
        mongo.cx.admin.command("ping")
        print("MongoDB connection successful")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")


def init_cloudinary():
    print("Initializing cloudinary")

    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("API_KEY"),
        api_secret=os.getenv("API_SECRET"),
    )
    print("Cloudinary connection successful")
