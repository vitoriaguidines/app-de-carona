from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

class GamificacaoController:
    @staticmethod
    def adicionar_pontos(user_id, pontos):
        try:
            if not user_id or pontos is None:
                logging.error("Campos 'user_id' e 'pontos' são obrigatórios.")
                return HttpResponse(status_code=400, body={"error": "Campos 'user_id' e 'pontos' são obrigatórios."})

            if not isinstance(pontos, int) or pontos < 0:
                logging.error("O campo 'pontos' deve ser um inteiro não negativo.")
                return HttpResponse(status_code=400, body={"error": "O campo 'pontos' deve ser um inteiro não negativo."})

            # Atualiza os pontos do usuário
            user_ref = db.reference(f'users/{user_id}')
            user_data = user_ref.get()
            
            if not user_data:
                logging.error(f"Usuário {user_id} não encontrado.")
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            novos_pontos = user_data.get('pontos', 0) + pontos
            user_ref.update({'pontos': novos_pontos})

            logging.info(f"Pontos adicionados ao usuário {user_id}: {novos_pontos}")
            return HttpResponse(status_code=200, body={"message": "Pontos adicionados com sucesso.", "pontos": novos_pontos})
        except Exception as e:
            logging.error(f"Erro ao adicionar pontos: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
