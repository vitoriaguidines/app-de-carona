from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class HistoricoDeCaronasController:
    @staticmethod
    def listar_historico(user_id):
        try:
            if not user_id:
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Obtém o histórico de caronas do usuário
            historico_ref = db.reference(f'users/{user_id}/historico_de_caronas')
            historico_data = historico_ref.get()

            if not historico_data:
                return HttpResponse(status_code=404, body={"error": "Histórico de caronas não encontrado."})

            return HttpResponse(status_code=200, body={"historico_de_caronas": historico_data})
        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
