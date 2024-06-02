from firebase_admin import db

from src.controller.GooglemapsController import MapsController
from src.views.http_types.http_response import HttpResponse
import logging

class GerenciamentoViagensController:
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def adicionar_viagem(data):
        try:
            required_fields = ['motorista_id', 'origem', 'destino', 'horario', 'vagas', 'preco']
            is_valid, validation_response = GerenciamentoViagensController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            viagens_ref = db.reference('viagens')
            nova_viagem_ref = viagens_ref.push()
            nova_viagem_ref.set({
                'motorista_id': data['motorista_id'],
                'origem': data['origem'],
                'destino': data['destino'],
                'horario': data['horario'],
                'vagas': data['vagas'],
                'preco': data['preco'],
                'viagem_id': nova_viagem_ref.key,
                'status': 'ativa'
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
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')
            if not viagem_ref.get():
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            updates = {}
            fields_to_update = ['motorista_id', 'origem', 'destino', 'horario', 'vagas', 'preco']
            for field in fields_to_update:
                if data.get(field):
                    updates[field] = data[field]

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
                return HttpResponse(status_code=400, body={"error": "O ID da viagem é obrigatório."})

            viagem_ref = db.reference(f'viagens/{viagem_id}')
            if not viagem_ref.get():
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            viagem_ref.update({'status': 'cancelada'})
            logging.info(f"Viagem {viagem_id} cancelada com sucesso")
            return HttpResponse(status_code=200, body={"message": "Viagem cancelada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao cancelar viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def obter_viagens_ativas():
        try:
            viagens_ref = db.reference('viagens')
            todas_viagens = viagens_ref.order_by_child('status').equal_to('ativa').get()
            return HttpResponse(status_code=200, body={"viagens": todas_viagens})
        except Exception as e:
            logging.error(f"Erro ao obter viagens ativas: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def encontrar_viagem_mais_proxima(data):
        try:
            destino_passageiro = data['destino_passageiro']

            # Fetch all active trips
            response = GerenciamentoViagensController.obter_viagens_ativas()
            if response.status_code != 200:
                return HttpResponse(status_code=500, body={"error": "Erro ao obter viagens ativas"})

            viagens = response.body.get('viagens', {})

            if not viagens:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem ativa encontrada"})

            menor_distancia = float('inf')
            viagem_mais_proxima = None

            for viagem_id, viagem in viagens.items():
                data_viagem = {
                    "origem": (viagem['origem']['lat'], viagem['origem']['lng']),
                    "destino": (viagem['destino']['lat'], viagem['destino']['lng']),
                    "destino_carona": (destino_passageiro['lat'], destino_passageiro['lng'])
                }
                distancia = MapsController.menor_distancia_entre_rota_e_ponto(data_viagem)['distancia']

                if distancia < menor_distancia:
                    menor_distancia = distancia
                    viagem_mais_proxima = viagem

            if viagem_mais_proxima:
                return HttpResponse(status_code=200, body={"viagem_mais_proxima": viagem_mais_proxima})
            else:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem próxima encontrada"})

        except Exception as e:
            logging.error(f"Erro ao encontrar viagem mais próxima: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
