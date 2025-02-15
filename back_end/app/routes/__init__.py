#  In this file, you’ll import all the route modules and register them as blueprints.
#  It helps in organizing different route files (e.g., user_routes.py, product_routes.py).
from .user_routes import user_routes
from .projects_routes import projects_routes
from .coderfair_routes import coderfair_routes
from .judge_routes import judge_routes
from .studentmodel_routes import studentmodel_routes
from .grade_routes import grade_routes


# Registering blueprints (routes) here
def init_routes(app):
    # Register user routes blueprint

    app.register_blueprint(grade_routes, url_prefix="/grades")
    app.register_blueprint(user_routes, url_prefix="/users")
    app.register_blueprint(projects_routes, url_prefix="/projects")
    app.register_blueprint(coderfair_routes, url_prefix="/coderfair")
    app.register_blueprint(judge_routes, url_prefix="/judges")
    app.register_blueprint(studentmodel_routes, url_prefix="/students")


