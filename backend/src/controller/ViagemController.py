import json
import logging
from datetime import datetime, timedelta

from firebase_admin import db
from datetime import datetime

from src.controller.GooglemapsController import MapsController
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse

class ViagemController:
        
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            logging.error(f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}")
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
    def obter_historico_como_motorista(data):
        try:
            user_id = data.get('user_id')

            if not user_id:
                logging.error("ID do usuário não fornecido.")
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Referência para as viagens do usuário como motorista
            viagens_ref = db.reference('viagens')
            todas_viagens = viagens_ref.get() or {}

            historico_viagens_motorista = {viagem_id: viagem for viagem_id, viagem in todas_viagens.items() if viagem.get('motorista_id') == user_id}

            if not historico_viagens_motorista:
                logging.error("Nenhuma viagem encontrada para o motorista especificado.")
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o motorista especificado."})

            logging.info(f"Histórico de viagens como motorista do usuário {user_id} obtido com sucesso.")
            return HttpResponse(status_code=200, body=historico_viagens_motorista)

        except Exception as e:
            logging.error(f"Erro ao obter histórico de viagens como motorista: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def obter_historico_como_passageiro(data):
        try:
            user_id = data.get('user_id')

            if not user_id:
                logging.error("ID do usuário não fornecido.")
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Referência para as viagens do usuário como passageiro
            viagens_ref = db.reference('viagens')
            todas_viagens = viagens_ref.get() or {}

            historico_viagens_passageiro = {viagem_id: viagem for viagem_id, viagem in todas_viagens.items() if user_id in viagem.get('passageiros', [])}

            if not historico_viagens_passageiro:
                logging.error("Nenhuma viagem encontrada para o passageiro especificado.")
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o passageiro especificado."})

            logging.info(f"Histórico de viagens como passageiro do usuário {user_id} obtido com sucesso.")
            return HttpResponse(status_code=200, body=historico_viagens_passageiro)

        except Exception as e:
            logging.error(f"Erro ao obter histórico de viagens como passageiro: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def buscar_viagens(data):
        try:
            required_fields = ['origem_passageiro', 'destino_passageiro', 'prioridade', 'horario', 'vagas', 'distancia_maxima_origem', 'distancia_maxima_destino']
            is_valid, validation_response = ViagemController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

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
    
            # Pega o atributo horario, transforma em tipo datetime, e deixa so a parte da data YYYY-MM-DD
            horario_formatado = datetime.strptime(horario, "%Y-%m-%dT%H:%M:%S.%fZ").date()

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
    
                if viagem['horario'][-1] is not "Z":
                    viagem['horario'] += "Z"

                try:
                    horario_iteracao_formatado = datetime.strptime(viagem['horario'], "%Y-%m-%dT%H:%M:%SZ").date()
                except Exception:
                    horario_iteracao_formatado = datetime.strptime(viagem['horario'], "%Y-%m-%dT%H:%M:%S.%fZ").date()

                tst = abs(horario_formatado - horario_iteracao_formatado)
                if (distancia_origem < data['distancia_maxima_origem'] and distancia_destino < data['distancia_maxima_destino'] and viagem['vagas'] >= vagas and
                        abs(horario_formatado - horario_iteracao_formatado)):

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
        logging.error(f"Erro durante a execução do script: {e}")
