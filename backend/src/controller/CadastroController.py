import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from src.views.http_types.http_response import HttpResponse

# Caminho relativo ao diretório atual do script
current_dir = os.path.dirname(__file__)
cert_path = os.path.join(current_dir, "app-de-carona-firebase-adminsdk-p4bg0-40ad1ed6d7.json")

# Inicialize o app Firebase apenas uma vez
if not firebase_admin._apps:
    cred = credentials.Certificate(cert_path)
    firebase_admin.initialize_app(cred)

class CadastroController:
    @staticmethod
    def cadastrar_usuario(data):
        # O restante do seu código...
        try:
            # Extrai os dados do usuário do corpo da requisição
            email = data.get('email')
            password = data.get('senha')
            display_name = data.get('nome')

            # Cria o usuário no Firebase Authentication
            user_record = auth.create_user(
                email=email,
                password=password,
                display_name=display_name
            )

            # Retorna uma resposta de sucesso com o UID do usuário criado
            return HttpResponse(status_code=200, body={"uid": user_record.uid, "message": "Usuário cadastrado com sucesso."})

        except Exception as e:
            # Retorna uma resposta de erro se algo der errado
            return HttpResponse(status_code=400, body={"error": str(e)})