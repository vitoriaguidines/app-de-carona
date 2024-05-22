from cerberus import Validator
from src.errors.error_types.http_unprocessable_entity import HttpUnprocessableEntityError

body_models = {
    "cadastro": {
        "nome": {"type": "string", "required": True},
        "email": {"type": "string", "required": True},
        "senha": {"type": "string", "required": True}
    },
    "login": {
        "email": {"type": "string", "required": True},
        "senha": {"type": "string", "required": True}
    },
    "enviar_notificacao": {
        "token": {"type": "string", "required": True},
        "titulo": {"type": "string", "required": True},
        "corpo": {"type": "string", "required": True}
    },
    "processar_pagamento": {
        "id_viagem": {"type": "string", "required": True},
        "id_usuario": {"type": "string", "required": True}
    },
    "adicionar_review_motorista": {
        "motorista_id": {"type": "string", "required": True},
        "passageiro_id": {"type": "string", "required": True},
        "avaliacao": {"type": "integer", "required": True},
        "comentario": {"type": "string"}
    },
    "adicionar_review_passageiro": {
        "motorista_id": {"type": "string", "required": True},
        "passageiro_id": {"type": "string", "required": True},
        "avaliacao": {"type": "integer", "required": True},
        "comentario": {"type": "string"}
    },
    "origem_destino": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True}
    },
    "raio": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True},
        "raio": {"type": "integer", "required": True}
    },
    "obter_usuario": {
        "user_id": {"type": "string", "required": True}
    },
    "calcular_percurso": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True}
    },
    "ponto_em_raio": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True},
        "raio": {"type": "integer", "required": True}
    },
    "enviar_mensagem_suporte": {
        "user_id": {"type": "string", "required": True},
        "mensagem": {"type": "string", "required": True}
    },
    "menor_distancia_entre_rota_e_ponto": {
        "origem": {"type": "list", "schema": {"type": "float"}, "required": True},
        "destino": {"type": "list", "schema": {"type": "float"}, "required": True},
        "destino_carona": {"type": "list", "schema": {"type": "float"}, "required": True}
    },
    "get_endereco": {
        "lat": {"type": "float", "required": True},
        "lng": {"type": "float", "required": True}
    }
}

class JsonValidator:

    def __init__(self) -> None:
        self.body = body_models

    def json_validator(self, request: any, endpoint: str) -> None:

        # Determina qual corpo de validação será utilizado
        body_validator = Validator(self.body.get(endpoint, {}))

        # Compara o que foi recebido com o modelo de validação
        response = body_validator.validate(request)

        # Caso formato indesejado, gera erro
        if response is False:
            raise HttpUnprocessableEntityError(body_validator.errors)
