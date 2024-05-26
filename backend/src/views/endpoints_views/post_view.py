from flask import jsonify
from src.validators.json_validator import JsonValidator
from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse
from src.controller.CadastroController import CadastroController
from src.controller.LoginController import LoginController
from src.controller.NotificacoesController import NotificacoesController
from src.controller.PagamentoController import PagamentoController
from src.controller.ReviewController import ReviewMotoristaController
from src.controller.SuporteController import SuporteController
from src.controller.AdicionarVeiculoController import AdicionarVeiculoController  
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController 
from src.controller.GooglemapsController import MapsController
from src.controller.UsuarioController import UsuarioController

# Instanciação dos controladores
cadastro_controller = CadastroController()
login_controller = LoginController()
notificacoes_controller = NotificacoesController()
pagamento_controller = PagamentoController()
review_motorista_controller = ReviewMotoristaController()
suporte_controller = SuporteController()
adicionar_veiculo_controller = AdicionarVeiculoController()
gerenciamento_viagens_controller = GerenciamentoViagensController()
maps_controller = MapsController()
usuario_controller = UsuarioController()

# Mapeamento de endpoints para seus respectivos controladores
post_endpoint_controllers = {
    "cadastro": cadastro_controller.cadastrar_usuario,
    "login": login_controller.authenticate_login,
    "enviar_notificacao": notificacoes_controller.enviar_notificacao,
    "processar_pagamento": pagamento_controller.processar_pagamento,
    "adicionar_review_motorista": review_motorista_controller.adicionar_review_motorista,
    "adicionar_review_passageiro": review_motorista_controller.adicionar_review_passageiro,
    "criar_ticket": suporte_controller.enviar_mensagem,
    "adicionar_veiculo": adicionar_veiculo_controller.adicionar_veiculo,
    "adicionar_viagem": gerenciamento_viagens_controller.adicionar_viagem,
    "editar_viagem": gerenciamento_viagens_controller.editar_viagem,
    "cancelar_viagem": gerenciamento_viagens_controller.cancelar_viagem,
    "calcular_percurso": maps_controller.calcular_percurso,
    "ponto_em_raio": maps_controller.ponto_em_raio,
    "menor_distancia_entre_rota_e_ponto": maps_controller.menor_distancia_entre_rota_e_ponto,
    "get_endereco": maps_controller.get_endereco,
    "obter_usuario": usuario_controller.obter_usuario,
    "enviar_mensagem_suporte": suporte_controller.enviar_mensagem
}


class PostView:

    def __init__(self) -> None:
        self.endpoint_controllers = post_endpoint_controllers
        print("PostView initialized with endpoints:", self.endpoint_controllers.keys())  # Log dos endpoints disponíveis

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
            print(f"Erro no controlador POST: {e}")  # Log de erro
            return HttpResponse(status_code=500, body={"error": str(e)})
