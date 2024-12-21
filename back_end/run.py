from app import app

if __name__ == '__main__': # ensures code will only run if the script is directly executed (not imported as a module)
    # Run the app with the development server (useful for development)
    app.run(debug=True, host="0.0.0.0", port=5000)
    # any configurations should be done here
