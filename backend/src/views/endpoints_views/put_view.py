from flask import request
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_response import HttpResponse
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController
from src.controller.EditarPerfilController import EditarPerfilController

# Instanciação dos controladores
gerenciamento_viagens_controller = GerenciamentoViagensController()
editar_perfil_controller = EditarPerfilController()

# Mapeamento de endpoints para seus respectivos controladores
put_endpoint_controllers = {
    "editar_viagem": gerenciamento_viagens_controller.editar_viagem,
    "cancelar_viagem": gerenciamento_viagens_controller.cancelar_viagem,
    "editar_perfil": editar_perfil_controller.editar_perfil
}

class PutView:

    def __init__(self) -> None:
        self.endpoint_controllers = put_endpoint_controllers
        print("PutView initialized with endpoints:", self.endpoint_controllers.keys())

    def call_controller(self, endpoint, http_request) -> HttpResponse:
        try:
            # Coleta os dados do formulário e os arquivos da requisição
            form_data = http_request.body
            files = http_request.files

            # Validação dos dados
            validator = JsonValidator()
            validator.json_validator(form_data, endpoint)
            print(f"Endpoint chamado: {endpoint}")
            print(f"Dados da requisição: {form_data}")

            # Determina qual objeto controller será utilizado
            controller_handler = self.endpoint_controllers.get(endpoint)
            if not controller_handler:
                raise ValueError(f"Endpoint '{endpoint}' não encontrado")

            print(f"Chamando controlador para o endpoint: {endpoint}")

            # Chama o controller adequado
            formatted_response = controller_handler(form_data, files.get('foto_perfil') if files else None)
            print(f"Resposta formatada: {formatted_response}")

            if isinstance(formatted_response, HttpResponse):
                return formatted_response

            return HttpResponse(status_code=200, body=formatted_response)
        except Exception as e:
            print(f"Erro no controlador PUT: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
