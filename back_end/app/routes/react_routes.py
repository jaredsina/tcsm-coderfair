from flask import Blueprint, send_from_directory, current_app
import os

react_routes = Blueprint("react_routes", __name__)


@react_routes.route("/", defaults={"path": ""})
@react_routes.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(current_app.static_folder + "/" + path):
        return send_from_directory(current_app.static_folder, path)
    else:
        return send_from_directory(current_app.static_folder, "index.html")
