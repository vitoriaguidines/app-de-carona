from firebase_admin import db
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse

class ViagemController:
    @staticmethod
    def listar_viagens():
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            return HttpResponse(status_code=200, body={"viagens": viagens_data})

        except Exception as e:
            print(f"Erro ao listar viagens: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def listar_viagens_motorista(motorista_id):
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            viagens_motorista = {key: viagem for key, viagem in viagens_data.items() if viagem.get('motorista_id') == motorista_id}

            if not viagens_motorista:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o motorista especificado."})

            return HttpResponse(status_code=200, body={"viagens": viagens_motorista})

        except Exception as e:
            print(f"Erro ao listar viagens do motorista: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def listar_viagens_passageiro(passageiro_id):
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            viagens_passageiro = {key: viagem for key, viagem in viagens_data.items() if passageiro_id in viagem.get('passageiros', [])}

            if not viagens_passageiro:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o passageiro especificado."})

            return HttpResponse(status_code=200, body={"viagens": viagens_passageiro})

        except Exception as e:
            print(f"Erro ao listar viagens do passageiro: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def obter_detalhes_viagem(viagem_id):
        try:
            viagem_ref = db.reference(f'viagens/{viagem_id}')
            viagem_data = viagem_ref.get()

            if not viagem_data:
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            return HttpResponse(status_code=200, body={"viagem": viagem_data})

        except Exception as e:
            print(f"Erro ao obter detalhes da viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def buscar_viagens(destino, vagas, horario):
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            viagens_filtradas = [
                viagem for viagem in viagens_data.values()
                if viagem.get('destino') == destino and viagem.get('vagas', 0) >= vagas and viagem.get('horario') >= horario and viagem.get('status') == 'ativa'
            ]

            """ data_formatada = datetime.strptime(data, "%Y-%m-%d").date()

            viagens_filtradas = [
                viagem for viagem in viagens_data.values()
                if viagem.get('destino') == destino and viagem.get('vagas', 0) >= vagas
                and datetime.strptime(viagem.get('horario'), "%Y-%m-%dT%H:%M:%SZ").date() == data_formatada
                and viagem.get('status') == 'ativa'
            ] """

            # Ordenar por horário de forma crescente
            viagens_filtradas.sort(key=lambda x: datetime.strptime(x['horario'], "%Y-%m-%d %H:%M:%S"))

            return HttpResponse(status_code=200, body={"viagens": viagens_filtradas})

        except Exception as e:
            print(f"Erro ao buscar viagens: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
