import json
from firebase_admin import db
from src.controller.GooglemapsController import MapsController
from src.views.http_types.http_response import HttpResponse
import logging
from datetime import datetime

class GerenciamentoViagensController:
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            logging.error(f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}")
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def adicionar_viagem(data):
        try:
            required_fields = ['origem', 'destino', 'horario', 'motorista_id', 'carro_id', 'vagas']
            is_valid, validation_response = GerenciamentoViagensController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            viagens_ref = db.reference('viagens')
            nova_viagem_ref = viagens_ref.push()
            nova_viagem_ref.set({
                'motorista_id': data['motorista_id'],
                'origem': data['origem'],  # Deve ser uma string
                'destino': data['destino'],  # Deve ser uma string
                'horario': data['horario'],
                'vagas': data['vagas'],
                'passageiros': data.get('passageiros', []),
                'viagem_id': nova_viagem_ref.key,
                'status': data.get('status', 'ativa'),
                'carro_id': data['carro_id'],
                'detalhes': data.get('detalhes', ''),
                'data_de_criacao': datetime.now().isoformat(),
                'ultima_atualizacao': datetime.now().isoformat()
            })

            logging.info(f"Viagem adicionada com sucesso: {nova_viagem_ref.key}")
            return HttpResponse(status_code=200, body={"viagem_id": nova_viagem_ref.key, "message": "Viagem adicionada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao adicionar viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
        
    @staticmethod
    def editar_viagem(data):
        try:
            viagem_id = data.get('viagem_id')
            if not viagem_id:
                logging.error("O ID da viagem é obrigatório.")
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')
            if not viagem_ref.get():
                logging.error(f"Viagem {viagem_id} não encontrada.")
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            updates = {}
            fields_to_update = ['motorista_id', 'origem', 'destino', 'horario', 'vagas']
            for field in fields_to_update:
                if data.get(field):
                    updates[field] = data[field]

            updates['ultima_atualizacao'] = datetime.now().isoformat()

            viagem_ref.update(updates)
            logging.info(f"Viagem {viagem_id} editada com sucesso")
            return HttpResponse(status_code=200, body={"message": "Viagem editada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao editar viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def cancelar_viagem(data):
        try:
            viagem_id = data.get('viagem_id')
            if not viagem_id:
                logging.error("O ID da viagem é obrigatório.")
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')
            if not viagem_ref.get():
                logging.error(f"Viagem {viagem_id} não encontrada.")
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            viagem_ref.update({'status': 'cancelada', 'ultima_atualizacao': datetime.now().isoformat()})
            logging.info(f"Viagem {viagem_id} cancelada com sucesso")
            return HttpResponse(status_code=200, body={"message": "Viagem cancelada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao cancelar viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def adicionar_passageiro_a_viagem(data):
        try:
            viagem_id = data.get('viagem_id')
            if not viagem_id:
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')
            viagem = viagem_ref.get()
            if not viagem:
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            passageiro_id = data.get('passageiro_id')
            if not passageiro_id:
                return HttpResponse(status_code=400, body={"error": "O ID do passageiro é obrigatório."})

            if 'passageiros' in viagem:
                if passageiro_id in viagem['passageiros']:
                    return HttpResponse(status_code=400, body={"error": "Passageiro já na viagem"})
                passageiros = viagem['passageiros']
            else:
                passageiros = []

            if viagem['vagas'] <= 0:
                return HttpResponse(status_code=400, body={"error": "Não há vagas disponíveis"})

            passageiros.append(passageiro_id)

            updates = {
                'passageiros': passageiros,
                'vagas': viagem['vagas'] - 1,
                'ultima_atualizacao': datetime.now().isoformat()
            }

            viagem_ref.update(updates)
            logging.info(f"Viagem {viagem_id} editada com sucesso")
            return HttpResponse(status_code=200, body={"message": "Passageiro adicionado com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao editar viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
