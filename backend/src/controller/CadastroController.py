from firebase_admin import db
from firebase_admin.auth import create_user
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse
import bcrypt

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

            # Criptografa a senha
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            # Salva os dados do usuário no Realtime Database
            new_user_ref = db.reference('users').push()
            new_user_ref.set({
                'email': email,
                'password': hashed_password.decode('utf-8'),  # Armazena a senha criptografada
                'display_name': display_name,
                'user_id': new_user_ref.key
            })

            return HttpResponse(status_code=200, body={"uid": new_user_ref.key, "message": "Usuário cadastrado com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=400, body={"error": str(e)})
