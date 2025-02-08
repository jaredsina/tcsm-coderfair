# Create the Flask application instance here (name it app)
from app import create_app

# if __name__ == '__main__': ensures that the application only runs if the script
# is executed directly (not imported as a module elsewhere).
if __name__ == "__main__":
    app = create_app()

    # Run the app with the development server (useful for development)
    app.run(port=8000, debug=True)
