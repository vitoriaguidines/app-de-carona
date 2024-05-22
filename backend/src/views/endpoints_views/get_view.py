from flask import jsonify, request
from src.controller.GooglemapsController import MapsController
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
import logging

maps_controller = MapsController()

get_endpoint_controllers = {
    "calcular_percurso": maps_controller.calcular_percurso,
    "ponto_em_raio": maps_controller.ponto_em_raio,
    "menor_distancia_entre_rota_e_ponto": maps_controller.menor_distancia_entre_rota_e_ponto,
    "get_endereco": maps_controller.get_endereco
}

maps_controller = MapsController()

get_endpoint_controllers = {
    "calcular_percurso":maps_controller.calcular_percurso,
    "ponto_em_raio":maps_controller.ponto_em_raio,
    "menor_distancia_entre_rota_e_ponto":maps_controller.menor_distancia_entre_rota_e_ponto,
    "get_endereco":maps_controller.get_endereco
}

class GetView:
    def __init__(self) -> None:
        self.endpoint_controllers = get_endpoint_controllers

    def call_controller(self, endpoint):
        try:
            validator = JsonValidator()

            # Chama função de validação de requisições
            validator.json_validator(request.args.to_dict(), endpoint)

            # Determina qual objeto controller será utilizado
            controller_handler = self.endpoint_controllers.get(endpoint)
            if not controller_handler:
                raise ValueError(f"Endpoint '{endpoint}' não encontrado")

            # Coleta os parâmetros da requisição
            config = request.args.to_dict()

            # Chama o controller adequado
            formatted_response = controller_handler(config)
            if isinstance(formatted_response, HttpResponse):
                return jsonify(formatted_response.body), formatted_response.status_code

            return jsonify(formatted_response), 200
        except Exception as e:
            logging.error(f"Erro no controlador GET: {e}")
            return jsonify({"error": str(e)}), 500
