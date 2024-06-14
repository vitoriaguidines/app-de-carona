import firebase_admin
from firebase_admin import credentials, messaging
from src.views.http_types.http_response import HttpResponse
from src.drivers.firebase_config import initialize_firebase_app
import logging

class NotificacoesController:
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            logging.error(f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}")
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def enviar_notificacao(data):
        try:
            required_fields = ['token', 'titulo', 'corpo']
            is_valid, validation_response = NotificacoesController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            token = data['token']
            titulo = data['titulo']
            corpo = data['corpo']

            # Crie uma mensagem de notificação
            message = messaging.Message(
                notification=messaging.Notification(
                    title=titulo,
                    body=corpo
                ),
                token=token
            )

            # Envie a mensagem de notificação
            response = messaging.send(message)

            # Verifique a resposta e retorne uma mensagem de sucesso
            logging.info(f"Notificação enviada com sucesso: {response}")
            return HttpResponse(status_code=200, body={"message": "Notificação enviada com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao enviar notificação: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    initialize_firebase_app()  # Certifique-se de inicializar o Firebase

    # Teste da função enviar_notificacao
    data = {
        'token': 'exemplo_de_token',
        'titulo': 'Teste de Notificação',
        'corpo': 'Este é um teste de notificação.'
    }
    response = NotificacoesController.enviar_notificacao(data)
    print(f"Status Code: {response.status_code}")
    print(f"Body: {response.body}")
