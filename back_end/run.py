# Create the Flask application instance here (name it app)
from app import create_app
from dotenv import load_dotenv
import os

load_dotenv()

# if __name__ == '__main__': ensures that the application only runs if the script
# is executed directly (not imported as a module elsewhere).
if __name__ == "__main__":
    app = create_app()

    port = os.getenv("PORT") or 4000

    # Run the app with the development server (useful for development)
    app.run(port=port, debug=True)
