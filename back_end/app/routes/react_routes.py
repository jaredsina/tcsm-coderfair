from flask import Blueprint, send_from_directory, current_app
import os

react_routes = Blueprint("react_routes", __name__)


@react_routes.route("/", defaults={"path": ""})
@react_routes.route("/<path:path>")
def serve(path):
    static_folder = current_app.static_folder  # "../client/dist"

    if path and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    return send_from_directory(static_folder, "index.html")
