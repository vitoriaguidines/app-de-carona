from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

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
