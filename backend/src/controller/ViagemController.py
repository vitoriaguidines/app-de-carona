from firebase_admin import db
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
