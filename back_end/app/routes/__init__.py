#  In this file, you’ll import all the route modules and register them as blueprints.
#  It helps in organizing different route files (e.g., user_routes.py, product_routes.py).
from .user_routes import user_routes
from .projects_routes import projects_routes
from .coderfair_routes import coderfair_routes
from .role_routes import role_routes
from .question_routes import question_routes
from .userroles_routes import userroles_routes
from .judge_routes import judge_routes

from .questiongrade_routes import questiongrade_routes


# Registering blueprints (routes) here
def init_routes(app):
    # Register user routes blueprint
    app.register_blueprint(user_routes, url_prefix="/users")
    app.register_blueprint(projects_routes, url_prefix="/projects")
    app.register_blueprint(judge_routes, url_prefix="/judges")
    app.register_blueprint(questiongrade_routes, url_prefix="/questiongrades")
    app.register_blueprint(coderfair_routes, url_prefix="/coderfair")
    app.register_blueprint(role_routes, url_prefix="/roles")
    app.register_blueprint(question_routes, url_prefix="/questions")
    app.register_blueprint(userroles_routes, url_prefix="/userroles")
