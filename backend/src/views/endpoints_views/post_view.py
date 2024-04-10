from src.views.http_types.http_response import HttpResponse
from src.views.http_types.http_request import HttpRequest
from src.controller.PSimpleController import PostController# exemplo
from src.controller.CadastroController import CadastroController  # Importe o CadastroController
from src.controller.LoginController import LoginController

# Exemplo de controlador para POST
post_controller = PostController()

class PostView:
    def __init__(self) -> None:
        # Mapeia endpoints para seus respectivos métodos no controlador
        self.endpoint_controllers = {
            "example_endpoint": post_controller.example_method,
            "cadastro": CadastroController.cadastrar_usuario,  #Adicione o endpoint de cadastro
            "login": LoginController.authenticate_login

        }

    def call_controller(self, endpoint, http_request: HttpRequest) -> HttpResponse:
        if endpoint in self.endpoint_controllers:
            controller_handler = self.endpoint_controllers[endpoint]
            formatted_response = controller_handler(http_request.body)
            if isinstance(formatted_response, HttpResponse):
                return formatted_response
            else:
                # Certifique-se de que este ramo também retorne uma instância de HttpResponse
                return HttpResponse(status_code=200, body=formatted_response)
        else:
            # Retorna uma instância de HttpResponse para o caso de erro também
            return HttpResponse(status_code=404, body={"error": "Endpoint not found"})