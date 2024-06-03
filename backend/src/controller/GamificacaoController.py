from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class GamificacaoController:
    @staticmethod
    def adicionar_pontos(user_id, pontos):
        try:
            if not user_id or not pontos:
                return HttpResponse(status_code=400, body={"error": "Campos 'user_id' e 'pontos' são obrigatórios."})

            # Atualiza os pontos do usuário
            user_ref = db.reference(f'users/{user_id}')
            user_data = user_ref.get()
            
            if not user_data:
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            novos_pontos = user_data.get('pontos', 0) + pontos
            user_ref.update({'pontos': novos_pontos})

            return HttpResponse(status_code=200, body={"message": "Pontos adicionados com sucesso.", "pontos": novos_pontos})
        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
