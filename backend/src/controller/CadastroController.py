from drivers.firebase_config import initialize_firebase_app
from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

# Inicialize o app Firebase
initialize_firebase_app()

class CadastroController:
    @staticmethod
    def cadastrar_usuario(data):
        try:
            email = data.get('email')
            password = data.get('senha')
            display_name = data.get('nome')

            # Salva os dados do usuário no Realtime Database
            new_user_ref = db.reference('users').push()
            new_user_ref.set({
                'email': email,
                'password': password,
                'display_name': display_name,
                'user_id': new_user_ref.key
            })

            return HttpResponse(status_code=200, body={"uid": new_user_ref.key, "message": "Usuário cadastrado com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=400, body={"error": str(e)})