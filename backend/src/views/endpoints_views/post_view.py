from flask import jsonify
from src.validators.json_validator import JsonValidator

from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse


from src.controller.CadastroController import CadastroController
from src.controller.LoginController import LoginController
from src.controller.NotificacoesController import NotificacoesController
from src.controller.PagamentoController import PagamentoController
from src.controller.ReviewMotoristaController import ReviewMotoristaController
from src.controller.SuporteController import SuportController
from src.controller.AdicionarVeiculoController import AdicionarVeiculoController  
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController 
from src.controller.GooglemapsController import MapsController


cadastro_controller = CadastroController()
login_controller = LoginController()
notificacoes_controller = NotificacoesController()
pagamento_controller = PagamentoController()
review_motorista_controller = ReviewMotoristaController()
suporte_controller = SuportController()
adicionar_veiculo_controller = AdicionarVeiculoController()
gerenciamento_viagens_controller = GerenciamentoViagensController()
maps_controller = MapsController()

post_endpoint_controllers = {
    "cadastro":cadastro_controller.cadastrar_usuario,
    "login":login_controller.authenticate_login,
    "enviar_notificacao":notificacoes_controller.enviar_notificacao,
    "processar_pagamento":pagamento_controller.processar_pagamento,
    "adicionar_review":review_motorista_controller.adicionar_review,
    "criar_ticket":suporte_controller.criar_ticket,
    "adicionar_veiculo":adicionar_veiculo_controller.adicionar_veiculo,
    "adicionar_viagem":gerenciamento_viagens_controller.adicionar_viagem,
    "editar_viagem":gerenciamento_viagens_controller.editar_viagem,
    "cancelar_viagem":gerenciamento_viagens_controller.cancelar_viagem,
    "calcular_percurso":maps_controller.calcular_percurso,
    "ponto_em_raio":maps_controller.ponto_em_raio


}

class PostView:

    def __init__(self) -> None:
        self.endpoint_controllers = post_endpoint_controllers

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
    