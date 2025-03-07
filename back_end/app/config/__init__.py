import configparser
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from datetime import timedelta
import cloudinary
import cloudinary.uploader
import cloudinary.api


def init_config(app):
    # Read the configuration file
    config = configparser.ConfigParser()
    config.read("config.ini")

    # Set the uri for MongoDB
    app.config["MONGO_URI"] = config["MONGO"]["DB_URI"]

    # making the maanger of the tokens
    app.config["JWT_SECRET_KEY"] = config["TOKEN"]["YOUR_SECRET_KEY"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)

    # Initialize PyMongo with the Flask app
    mongo = PyMongo(app)

    # Add the PyMongo object to the Flask app
    app.mongo = mongo

    # Add the database to the Flask app
    app.db = mongo.cx["production"]

    # Check the connection to MongoDB
    try:
        mongo.cx.admin.command("ping")
        print("MongoDB connection successful")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")


def init_cloudinary():
    print("Initializing cloudinary")
    config = configparser.ConfigParser()
    config.read("config.ini")
    cloudinary.config(
        cloud_name=config["CLOUDINARY"]["CLOUD_NAME"],
        api_key=config["CLOUDINARY"]["API_KEY"],
        api_secret=config["CLOUDINARY"]["API_SECRET"],
    )
    print("Cloudinary connection successful")
