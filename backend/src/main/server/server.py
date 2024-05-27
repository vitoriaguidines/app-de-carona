from flask import Flask
from flask_cors import CORS
from src.main.routes.tag_routes import tags_routes_bp
from src.drivers.firebase_config import initialize_firebase_app

# Inicialize o Firebase
initialize_firebase_app()

app = Flask(__name__)
CORS(app)

app.register_blueprint(tags_routes_bp)
