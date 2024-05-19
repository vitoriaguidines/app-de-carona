import firebase_admin
from firebase_admin import credentials, messaging
from src.views.http_types.http_response import HttpResponse
from src.drivers.firebase_config import initialize_firebase_app


class NotificacoesController:
    @staticmethod
    def enviar_notificacao(data):
        try:
            # Obtenha os dados necessários da requisição
            token = data.get('token')
            titulo = data.get('titulo')
            corpo = data.get('corpo')

            if not all([token, titulo, corpo]):
                return HttpResponse(status_code=400, body={"error": "Token, título e corpo da notificação são obrigatórios."})

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
            if response:
                return HttpResponse(status_code=200, body={"message": "Notificação enviada com sucesso."})
            else:
                return HttpResponse(status_code=500, body={"error": "Falha ao enviar notificação."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
