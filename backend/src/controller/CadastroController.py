from firebase_admin import auth
from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

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

            logging.info(f"Usuário cadastrado com sucesso: {user_record.uid}")
            return HttpResponse(status_code=200, body={"uid": user_record.uid, "message": "Usuário cadastrado com sucesso."})

        except auth.EmailAlreadyExistsError:
            logging.error("Erro: O email fornecido já está em uso.")
            return HttpResponse(status_code=400, body={"error": "O email fornecido já está em uso."})
        except auth.InvalidPasswordError:
            logging.error("Erro: A senha fornecida é inválida.")
            return HttpResponse(status_code=400, body={"error": "A senha fornecida é inválida. A senha deve ter pelo menos 6 caracteres."})
        except auth.InvalidEmailError:
            logging.error("Erro: O email fornecido é inválido.")
            return HttpResponse(status_code=400, body={"error": "O email fornecido é inválido."})
        except Exception as e:
            logging.error(f"Erro ao cadastrar usuário: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
