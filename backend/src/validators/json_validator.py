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
    },
    "adicionar_veiculo": {
        "user_id": {"type": "string", "required": True},
        "driver_id": {"type": "string", "required": True},
        "marca": {"type": "string", "required": True},
        "modelo": {"type": "string", "required": True},
        "placa": {"type": "string", "required": True},
        "cor": {"type": "string", "required": True},
        "ano": {"type": "integer", "required": True}
    },
    "adicionar_viagem": {
        "origem": {"type": "string", "required": True},
        "destino": {"type": "string", "required": True},
        "horario": {"type": "string", "required": True},
        "preco": {"type": "float", "required": True},
        "motorista_id": {"type": "string", "required": True},
        "carro_id": {"type": "string", "required": True},
        "vagas": {"type": "integer", "required": True},
        "passageiros": {"type": "list", "schema": {"type": "string"}, "required": False},
        "detalhes": {"type": "string", "required": False},
        "status": {"type": "string", "required": False}
    },
    "editar_viagem": {
        "viagem_id": {"type": "string", "required": True},
        "motorista_id": {"type": "string", "required": False},
        "origem": {"type": "string", "required": False},
        "destino": {"type": "string", "required": False},
        "horario": {"type": "string", "required": False},
        "vagas": {"type": "integer", "required": False},
        "passageiros": {"type": "list", "schema": {"type": "string"}, "required": False},
        "preco": {"type": "float", "required": False},
        "status": {"type": "string", "required": False}
    },
    "cancelar_viagem": {
        "viagem_id": {"type": "string", "required": True}
    },
    "listar_viagens_motorista": {
        "motorista_id": {"type": "string", "required": True}
    }
   # "listar_viagens_passageiro": {
    #    "passageiro_id": {"type": "string", "required": True}
    #},
    #"obter_detalhes_viagem": {
     #   "viagem_id": {"type": "string", "required": True}
    #}
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
