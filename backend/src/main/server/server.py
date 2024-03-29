from flask import Flask
from flask_cors import CORS

from src.main.routes.tag_routes import tags_routes_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(tags_routes_bp)

