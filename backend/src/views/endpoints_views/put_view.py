from flask import jsonify
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController

# Instanciação dos controladores
gerenciamento_viagens_controller = GerenciamentoViagensController()

# Mapeamento de endpoints para seus respectivos controladores
put_endpoint_controllers = {
    "editar_viagem": gerenciamento_viagens_controller.editar_viagem,
    "cancelar_viagem": gerenciamento_viagens_controller.cancelar_viagem
}

class PutView:

    def __init__(self) -> None:
        self.endpoint_controllers = put_endpoint_controllers
        print("PutView initialized with endpoints:", self.endpoint_controllers.keys())  # Log dos endpoints disponíveis

    def call_controller(self, endpoint, http_request: HttpRequest) -> HttpResponse:
        try:
            validator = JsonValidator()

            # Chama função de validação de requisições
            validator.json_validator(http_request.body, endpoint)
            print(f"Endpoint chamado: {endpoint}")  # Log de endpoint
            print(f"Dados da requisição: {http_request.body}")  # Log de dados

            # Determina qual objeto controller será utilizado
            controller_handler = self.endpoint_controllers.get(endpoint)
            if not controller_handler:
                raise ValueError(f"Endpoint '{endpoint}' não encontrado")

            print(f"Chamando controlador para o endpoint: {endpoint}")  # Log do controlador chamado
            # Coleta corpo JSON da requisição
            config = http_request.body 

            # Chama o controller adequado
            formatted_response = controller_handler(config)
            print(f"Resposta formatada: {formatted_response}")  # Log da resposta

            if isinstance(formatted_response, HttpResponse):
                return formatted_response

            return HttpResponse(status_code=200, body=formatted_response)
        except Exception as e:
            print(f"Erro no controlador PUT: {e}")  # Log de erro
            return HttpResponse(status_code=500, body={"error": str(e)})
