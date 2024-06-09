from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
from src.drivers.firebase_config import initialize_firebase_app
import logging

class UsuarioController:
    @staticmethod
    def obter_usuario(data):
        try:
            logging.info(f"Recebendo dados: {data}")  # Log de entrada
            user_id = data.get('user_id')

            if not user_id:
                logging.error("ID do usuário não fornecido.")
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Obtém os dados do usuário do Realtime Database
            user_ref = db.reference(f'users/{user_id}')
            user_data = user_ref.get()

            if user_data is None:
                logging.error(f"Usuário {user_id} não encontrado.")
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            # Retorna todos os dados do usuário
            logging.info(f"Dados do usuário {user_id} obtidos com sucesso.")
            return HttpResponse(status_code=200, body=user_data)
        except Exception as e:
            logging.error(f"Erro ao obter usuário: {e}")  # Log de erro
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
        # Testando a função diretamente
        user_id = "exemplo_user_id"
        data = {'user_id': user_id}
        response = UsuarioController.obter_usuario(data)
        print(f"Status Code: {response.status_code}")
        print(f"Body: {response.body}")
    except Exception as e:
        logging.error(f"Erro durante a execução do script: {e}")
