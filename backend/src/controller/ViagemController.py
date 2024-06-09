import json
from firebase_admin import db

from src.controller.GooglemapsController import MapsController
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse
from datetime import datetime

class ViagemController:
        
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

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
    def buscar_viagens(data):
        try:
            origem_passageiro = data['origem_passageiro']
            destino_passageiro = data['destino_passageiro']
            prioridade = data['prioridade']
            horario = data['horario']
            vagas = data['vagas']

            response = ViagemController.obter_viagens_ativas()
            if response.status_code != 200:
                return HttpResponse(status_code=500, body={"error": "Erro ao obter viagens ativas"})

            viagens = response.body

            if not viagens:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem ativa encontrada"})

            viagens_validas = []

            #pega o atributo horario, transforma em tipo datetime, e deixa so o parte da data YYYY-MM-DD
            horario_formatado = datetime.strptime(horario, "%Y-%m-%dT%H:%M:%SZ").date()

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
                horario_iteracao_formatado = datetime.strptime(viagem['horario'], "%Y-%m-%dT%H:%M:%SZ").date()

                if distancia_origem < data['distancia_maxima_origem'] and distancia_destino < data['distancia_maxima_destino'] and viagem['vagas']>= vagas and horario_formatado==horario_iteracao_formatado:
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


if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
