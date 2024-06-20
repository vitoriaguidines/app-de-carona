from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

class FavoritosController:
    @staticmethod
    def adicionar_favorito(user_id, favorito_id, tipo):
        try:
            if not user_id or not favorito_id or not tipo:
                logging.error("Campos 'user_id', 'favorito_id' e 'tipo' são obrigatórios.")
                return HttpResponse(status_code=400, body={"error": "Campos 'user_id', 'favorito_id' e 'tipo' são obrigatórios."})

            # Adiciona o favorito para o usuário
            favoritos_ref = db.reference(f'users/{user_id}/favoritos/{tipo}')
            novo_favorito_ref = favoritos_ref.push()
            novo_favorito_ref.set({
                'favorito_id': favorito_id,
                'tipo': tipo
            })

            logging.info(f"Favorito adicionado para o usuário {user_id} com sucesso.")
            return HttpResponse(status_code=200, body={"message": "Favorito adicionado com sucesso."})
        except Exception as e:
            logging.error(f"Erro ao adicionar favorito: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

