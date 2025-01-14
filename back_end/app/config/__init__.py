import configparser
from flask_pymongo import PyMongo

def init_config(app):
    # Read the configuration file
    config = configparser.ConfigParser()
    config.read('config.ini')

    # Set the uri for MongoDB
    app.config['MONGO_URI'] = config['MONGO']['DB_URI']

    # Initialize PyMongo with the Flask app
    mongo = PyMongo(app)

    # Check the connection to MongoDB
    try: 
        mongo.cx.admin.command('ping')
        print('MongoDB connection successful')
    except Exception as e:
        print(f'MongoDB connection failed: {e}')

    