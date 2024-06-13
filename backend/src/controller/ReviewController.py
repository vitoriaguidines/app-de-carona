from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

from flask import Flask, request, jsonify
from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

app = Flask(__name__)

class ReviewMotoristaController:
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            logging.error(f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}")
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def adicionar_review_motorista(data):
        try:
            required_fields = ['motorista_id', 'passageiro_id', 'avaliacao']
            is_valid, validation_response = ReviewMotoristaController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            motorista_id = data['motorista_id']
            passageiro_id = data['passageiro_id']
            avaliacao = data['avaliacao']
            comentario = data.get('comentario', '')

            # Referência para o nó de avaliações dos motoristas no Firebase
            ref_avaliacoes_motoristas = db.reference(f'motoristas/{motorista_id}/avaliacoes')

            # Adiciona a nova avaliação ao nó de avaliações dos motoristas
            nova_avaliacao_ref = ref_avaliacoes_motoristas.push()
            nova_avaliacao_ref.set({
                'passageiro_id': passageiro_id,
                'avaliacao': avaliacao,
                'comentario': comentario
            })

            logging.info(f"Avaliação adicionada para o motorista {motorista_id} pelo passageiro {passageiro_id}")
            return HttpResponse(status_code=200, body={"message": "Avaliação do motorista adicionada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao adicionar avaliação do motorista: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def adicionar_review_passageiro(data):
        try:
            required_fields = ['motorista_id', 'passageiro_id', 'avaliacao']
            is_valid, validation_response = ReviewMotoristaController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            motorista_id = data['motorista_id']
            passageiro_id = data['passageiro_id']
            avaliacao = data['avaliacao']
            comentario = data.get('comentario', '')

            # Referência para o nó de avaliações dos passageiros no Firebase
            ref_avaliacoes_passageiros = db.reference(f'passageiros/{passageiro_id}/avaliacoes')

            # Adiciona a nova avaliação ao nó de avaliações dos passageiros
            nova_avaliacao_ref = ref_avaliacoes_passageiros.push()
            nova_avaliacao_ref.set({
                'motorista_id': motorista_id,
                'avaliacao': avaliacao,
                'comentario': comentario
            })

            logging.info(f"Avaliação adicionada para o passageiro {passageiro_id} pelo motorista {motorista_id}")
            return HttpResponse(status_code=200, body={"message": "Avaliação do passageiro adicionada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao adicionar avaliação do passageiro: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def obter_avaliacoes(data):
        try:
            user_id = data.get('user_id')

            if not user_id:
                logging.error("ID do usuário não fornecido.")
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Referência para as avaliações do usuário (motorista)
            avaliacoes_motorista_ref = db.reference(f'motoristas/{user_id}/avaliacoes')
            avaliacoes_motorista = avaliacoes_motorista_ref.get() or {}

            # Referência para as avaliações do usuário (passageiro)
            avaliacoes_passageiro_ref = db.reference(f'passageiros/{user_id}/avaliacoes')
            avaliacoes_passageiro = avaliacoes_passageiro_ref.get() or {}

            avaliacoes_list = []

            for key, value in avaliacoes_motorista.items():
                value['id'] = key
                value['tipo'] = 'motorista'
                avaliacoes_list.append(value)

            for key, value in avaliacoes_passageiro.items():
                value['id'] = key
                value['tipo'] = 'passageiro'
                avaliacoes_list.append(value)

            logging.info(f"Avaliações do usuário {user_id} obtidas com sucesso.")
            return HttpResponse(status_code=200, body=avaliacoes_list)
        except Exception as e:
            logging.error(f"Erro ao obter avaliações: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})