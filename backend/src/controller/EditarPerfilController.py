import logging
from firebase_admin import db
from datetime import timedelta
from src.views.http_types.http_response import HttpResponse
from src.drivers.firebase_config import get_bucket  # Adicione a importação correta

class EditarPerfilController:
    @staticmethod
    def validar_dados(data):
        required_fields = ['user_id', 'nome', 'email']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        return True, {}

    @staticmethod
    def editar_perfil(data, foto_perfil=None):
        try:
            # Valida os dados de entrada
            is_valid, validation_response = EditarPerfilController.validar_dados(data)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            user_id = data['user_id']
            nome = data['nome']
            email = data['email']
            foto_url = None

            # Upload da foto de perfil, se fornecida
            if foto_perfil:
                bucket = get_bucket()  # Use a função para obter o bucket
                blob = bucket.blob(f'profile_pictures/{user_id}')
                blob.upload_from_file(foto_perfil, content_type=foto_perfil.content_type)
                foto_url = blob.generate_signed_url(timedelta(days=365))  # URL assinada válida por um ano

            # Referência para o usuário específico no banco de dados
            user_ref = db.reference(f'users/{user_id}')

            # Verifique se o usuário existe
            if not user_ref.get():
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            # Atualiza os dados do usuário no Realtime Database
            update_data = {
                'display_name': nome,
                'email': email,
            }
            if foto_url:
                update_data['foto_url'] = foto_url
            
            user_ref.update(update_data)

            logging.info(f"Perfil do usuário {user_id} atualizado com sucesso.")
            return HttpResponse(status_code=200, body={"message": "Perfil atualizado com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao editar perfil: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
