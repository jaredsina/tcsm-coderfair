from flask import Flask
from .routes import init_routes
from .config import init_config

def create_app():
    app = Flask('website')

    #config 
    init_config(app)

    #security key, test mode, debugging window 

    # Register the routes by calling init_routes
    init_routes(app)

    return app