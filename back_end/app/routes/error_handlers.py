from flask import jsonify


# Global Error Handlers to handle 400, 404, 500, and all other exceptions in routes
def init_error_handlers(app):
    # Global 400 Error Handler
    @app.errorhandler(400)
    def handle_bad_request(e):
        print(e)
        return jsonify({"message": "Bad Request", "error": str(e)}), 400

    # Global 404 Error Handler
    @app.errorhandler(404)
    def handle_not_found(e):
        print(e)
        return jsonify({"message": "Route Not Found"}), 404

    # Global 500 Error Handler
    @app.errorhandler(500)
    def handle_internal_error(e):
        print(e)
        return jsonify({"message": "Internal Server Error"}), 500

    # Global Exception Handler (Catches all unhandled errors)
    @app.errorhandler(Exception)
    def handle_unexpected_error(e):
        print(e)
        return jsonify({"message": "An unexpected error occurred"}), 500

    app.register_error_handler(400, handle_bad_request)
    app.register_error_handler(404, handle_not_found)
    app.register_error_handler(500, handle_internal_error)
    app.register_error_handler(Exception, handle_unexpected_error)
