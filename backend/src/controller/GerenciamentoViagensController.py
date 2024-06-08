import json
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
            required_fields = ['origem', 'destino', 'horario', 'preco', 'motorista_id', 'carro_id', 'vagas']
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
                'passageiros': [],
                'preco': data['preco'],
                'viagem_id': nova_viagem_ref.key,
                'status': 'ativa',
                'carro_id': data['carro_id']
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
            return HttpResponse(status_code=200, body=todas_viagens)
        except Exception as e:
            logging.error(f"Erro ao obter viagens ativas: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def encontrar_viagem_mais_proxima(data):
        try:
            origem_passageiro = data['origem_passageiro']
            destino_passageiro = data['destino_passageiro']
            prioridade = data['prioridade']

            response = GerenciamentoViagensController.obter_viagens_ativas()
            if response.status_code != 200:
                return HttpResponse(status_code=500, body={"error": "Erro ao obter viagens ativas"})

            viagens = response.body

            if not viagens:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem ativa encontrada"})


            viagens_validas = []

            for viagem_id, viagem in viagens.items():

                data_origem = {
                    "origem": viagem['origem'],
                    "destino": viagem['destino'],
                    "ponto": origem_passageiro
                }
                
                data_destino = {
                    "origem": viagem['origem'],
                    "destino": viagem['destino'],
                    "ponto": destino_passageiro
                }

                maps_controller = MapsController()
                distancia_origem = maps_controller.menor_distancia_entre_rota_e_ponto(data_origem)
                distancia_destino = maps_controller.menor_distancia_entre_rota_e_ponto(data_destino)

                if distancia_origem < data['distancia_maxima_origem'] and distancia_destino < data['distancia_maxima_destino']:
                    viagens_validas.append({
                        "viagem": viagem,
                        "distancia_origem": distancia_origem,
                        "distancia_destino": distancia_destino,
                        })

            if len(viagem) is not 0:
                if prioridade == "origem":
                    viagens_validas.sort(key=lambda x: (x['distancia_origem'], x['distancia_destino']))
                else:
                    viagens_validas.sort(key=lambda x: (x['distancia_destino'], x['distancia_origem']))

                return HttpResponse(status_code=200, body=viagens_validas)
            else:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem próxima encontrada"})

        except Exception as e:
            logging.error(f"Erro ao encontrar viagem mais próxima: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
