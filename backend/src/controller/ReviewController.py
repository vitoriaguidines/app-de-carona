from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class ReviewMotoristaController:
    @staticmethod
    def adicionar_review_motorista(data):
        try:
            motorista_id = data.get('motorista_id')
            passageiro_id = data.get('passageiro_id')
            avaliacao = data.get('avaliacao')
            comentario = data.get('comentario')

            if not all([motorista_id, passageiro_id, avaliacao]):
                return HttpResponse(status_code=400, body={"error": "Motorista ID, Passageiro ID e Avaliação são obrigatórios."})

            # Referência para o nó de avaliações dos motoristas no Firebase
            ref_avaliacoes_motoristas = db.reference(f'motoristas/{motorista_id}/avaliacoes')

            # Adiciona a nova avaliação ao nó de avaliações dos motoristas
            nova_avaliacao_ref = ref_avaliacoes_motoristas.push()
            nova_avaliacao_ref.set({
                'passageiro_id': passageiro_id,
                'avaliacao': avaliacao,
                'comentario': comentario
            })

            return HttpResponse(status_code=200, body={"message": "Avaliação do motorista adicionada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def adicionar_review_passageiro(data):
        try:
            motorista_id = data.get('motorista_id')
            passageiro_id = data.get('passageiro_id')
            avaliacao = data.get('avaliacao')
            comentario = data.get('comentario')

            if not all([motorista_id, passageiro_id, avaliacao]):
                return HttpResponse(status_code=400, body={"error": "Motorista ID, Passageiro ID e Avaliação são obrigatórios."})

            # Referência para o nó de avaliações dos passageiros no Firebase
            ref_avaliacoes_passageiros = db.reference(f'passageiros/{passageiro_id}/avaliacoes')

            # Adiciona a nova avaliação ao nó de avaliações dos passageiros
            nova_avaliacao_ref = ref_avaliacoes_passageiros.push()
            nova_avaliacao_ref.set({
                'motorista_id': motorista_id,
                'avaliacao': avaliacao,
                'comentario': comentario
            })

            return HttpResponse(status_code=200, body={"message": "Avaliação do passageiro adicionada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
