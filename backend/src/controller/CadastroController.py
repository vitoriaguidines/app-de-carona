
from firebase_admin import auth
from firebase_admin import db
from src.drivers.firebase_config import initialize_firebase_app
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

            # Validação básica dos dados
            if not email or not password or not display_name:
                return HttpResponse(status_code=400, body={"error": "Campos obrigatórios faltando."})

            # Criação do usuário no Firebase Authentication
            user_record = auth.create_user(
                email=email,
                password=password,
                display_name=display_name
            )

            # Salva os dados do usuário no Realtime Database
            db.reference(f'users/{user_record.uid}').set({
                'email': email,
                'display_name': display_name,
                'user_id': user_record.uid
            })

            return HttpResponse(status_code=200, body={"uid": user_record.uid, "message": "Usuário cadastrado com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=400, body={"error": str(e)})