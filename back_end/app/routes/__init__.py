#  In this file, you’ll import all the route modules and register them as blueprints.
#  It helps in organizing different route files (e.g., user_routes.py, product_routes.py).
from .user_routes import user_routes
from .projects_routes import projects_routes
from .coderfair_routes import coderfair_routes
from .role_routes import role_routes

# Registering blueprints (routes) here
def init_routes(app):
    
    # Register user routes blueprint
    app.register_blueprint(user_routes, url_prefix='/users')
    app.register_blueprint(projects_routes, url_prefix= '/projects')
    app.register_bluepring(coderfair_routes, url_prefix= '/coderfair')

    app.register_bluepring(role_routes, url_prefix= '/roles')