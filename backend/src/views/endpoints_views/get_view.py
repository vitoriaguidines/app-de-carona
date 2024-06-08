from flask import jsonify, request

from src.controller.GerenciamentoViagensController import GerenciamentoViagensController
from src.controller.GooglemapsController import MapsController
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
import logging

maps_controller = MapsController()
gerenciamento_viagens_controller = GerenciamentoViagensController()

get_endpoint_controllers = {
    "calcular_percurso": maps_controller.calcular_percurso,
    "ponto_em_raio": maps_controller.ponto_em_raio,
    "menor_distancia_entre_rota_e_ponto": maps_controller.menor_distancia_entre_rota_e_ponto,
    "get_endereco": maps_controller.get_endereco,
    "obter_viagens_ativas": gerenciamento_viagens_controller.obter_viagens_ativas
}



class GetView:
    def __init__(self) -> None:
        self.endpoint_controllers = get_endpoint_controllers

    def call_controller(self, endpoint):
        try:
            # Determina qual objeto controller será utilizado
            controller_handler = self.endpoint_controllers.get(endpoint)
            if not controller_handler:
                raise ValueError(f"Endpoint '{endpoint}' não encontrado")

            # Chama o controller adequado
            formatted_response = controller_handler()
            if isinstance(formatted_response, HttpResponse):
                return formatted_response

            return jsonify(formatted_response), 200
        except Exception as e:
            logging.error(f"Erro no controlador GET: {e}")
            return jsonify({"error": str(e)}), 500
