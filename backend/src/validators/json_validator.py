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
        "id_viagem": {"type": "string", "required": True},
        "id_usuario": {"type": "string", "required": True}
    },
    "processar_pagamento": {
        "id_viagem": {"type": "string", "required": True},
        "id_usuario": {"type": "string", "required": True}
    },
    "origem_destino": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True}
    },
    "raio": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True},
        "raio": {"type": "integer", "required": True}
    }
}

class JsonValidator:

    def __init__(self) -> None:
        self.body = body_models

    def json_validator(self, request: any, endpoint) -> None:

        # Determina qual corpo de validação será utilizado
        body_validator = Validator(self.body[endpoint])

        # Compara o que foi recebido com o modelo de validação
        response = body_validator.validate(request.json)

        # Caso formato indesejado, gera erro
        if response is False:
            raise HttpUnprocessableEntityError(body_validator.errors)