from flask import Blueprint, jsonify, request
from src.views.http_types.http_response import HttpResponse
from src.views.main_view import MainView
from src.errors.error_handler import handle_errors
from src.views.http_types.http_request import HttpRequest

tags_routes_bp = Blueprint('ia_routes', __name__)
main_view = MainView()

@tags_routes_bp.route("/<endpoint>", methods=['GET', 'POST', 'PUT'])
def handle_endpoint(endpoint):
    try:
        if request.method == 'GET':
            http_request = HttpRequest(body=request.json)
            response_handler = main_view.endpoints['get_view']
            response = response_handler(endpoint, http_request)

        elif request.method == 'POST':
            http_request = HttpRequest(body=request.json)
            response_handler = main_view.endpoints['post_view']
            response = response_handler(endpoint, http_request)

        elif request.method == 'PUT':
            # Verificar se a requisição é multipart/form-data
            if request.content_type.startswith('multipart/form-data'):
                form_data = request.form.to_dict()
                files = request.files.to_dict()
                http_request = HttpRequest(body=form_data, files=files)
            else:
                http_request = HttpRequest(body=request.json)

            response_handler = main_view.endpoints['put_view']
            response = response_handler(endpoint, http_request)

        else:
            raise ValueError(f"Método HTTP '{request.method}' não suportado para o endpoint '{endpoint}'.")

    except Exception as exception:
        response = handle_errors(exception)

    if isinstance(response.body, HttpResponse):
        return response.body.body, response.status_code

    return response.body, response.status_code
