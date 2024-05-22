from flask import jsonify
from src.controller.GooglemapsController import MapsController
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.controller.SimpleController import SimpleController

simple_controller = SimpleController()

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

    def call_controller(self, endpoint, http_request: HttpRequest) -> HttpResponse:
        validator = JsonValidator()

        # Chama função de validação de requisições
        validator.json_validator(jsonify(http_request.body), endpoint)

        # Determina qual objeto controller será utilizado
        controller_handler = self.endpoint_controllers[endpoint]

        # Coleta corpo JSON da requisição
        config = http_request.body 

        # Chama o controller adequado
        formatted_response = controller_handler(config)

        return HttpResponse(status_code=200, body=formatted_response)
