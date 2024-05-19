from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class GerenciamentoViagensController:
    @staticmethod
    def adicionar_viagem(data):
        try:
            motorista_id = data.get('motorista_id')
            origem = data.get('origem')
            destino = data.get('destino')
            horario = data.get('horario')
            vagas = data.get('vagas')
            preco = data.get('preco')

            if not all([motorista_id, origem, destino, horario, vagas, preco]):
                return HttpResponse(status_code=400, body={"error": "Todos os campos são obrigatórios."})

            viagens_ref = db.reference('viagens')
            nova_viagem_ref = viagens_ref.push()
            nova_viagem_ref.set({
                'motorista_id': motorista_id,
                'origem': origem,
                'destino': destino,
                'horario': horario,
                'vagas': vagas,
                'preco': preco,
                'viagem_id': nova_viagem_ref.key,
                'status': 'ativa'
            })

            return HttpResponse(status_code=200, body={"viagem_id": nova_viagem_ref.key, "message": "Viagem adicionada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def editar_viagem(data):
        try:
            viagem_id = data.get('viagem_id')
            motorista_id = data.get('motorista_id')
            origem = data.get('origem')
            destino = data.get('destino')
            horario = data.get('horario')
            vagas = data.get('vagas')
            preco = data.get('preco')

            if not viagem_id:
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')

            if not viagem_ref.get():
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            updates = {}
            if motorista_id:
                updates['motorista_id'] = motorista_id
            if origem:
                updates['origem'] = origem
            if destino:
                updates['destino'] = destino
            if horario:
                updates['horario'] = horario
            if vagas:
                updates['vagas'] = vagas
            if preco:
                updates['preco'] = preco

            viagem_ref.update(updates)

            return HttpResponse(status_code=200, body={"message": "Viagem editada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def cancelar_viagem(data):
        try:
            viagem_id = data.get('viagem_id')

            if not viagem_id:
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')

            if not viagem_ref.get():
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            # Atualiza o status da viagem para 'cancelada'
            viagem_ref.update({'status': 'cancelada'})

            return HttpResponse(status_code=200, body={"message": "Viagem cancelada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
