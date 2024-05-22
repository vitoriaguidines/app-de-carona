from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
from src.drivers.firebase_config import initialize_firebase_app

class SuporteController:
    @staticmethod
    def enviar_mensagem(data):
        try:
            print(f"Recebendo dados: {data}")  # Log de entrada
            user_id = data.get('user_id')
            mensagem = data.get('mensagem')

            if not user_id or not mensagem:
                return HttpResponse(status_code=400, body={"error": "Campos 'user_id' e 'mensagem' são obrigatórios."})

            # Referência do Realtime Database para mensagens de suporte
            suporte_ref = db.reference('suporte')

            # Cria um novo registro de mensagem de suporte
            nova_mensagem_ref = suporte_ref.push()
            nova_mensagem_ref.set({
                'user_id': user_id,
                'mensagem': mensagem,
                'timestamp': db.ServerValue.TIMESTAMP
            })

            print("Mensagem de suporte enviada com sucesso.")
            return HttpResponse(status_code=200, body={"message": "Mensagem de suporte enviada com sucesso."})
        except Exception as e:
            print(f"Erro ao enviar mensagem de suporte: {e}")  # Log de erro
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
        # Testando a função diretamente
        data = {
            'user_id': 'exemplo_user_id',
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }
        response = SuporteController.enviar_mensagem(data)
        print(f"Status Code: {response.status_code}")
        print(f"Body: {response.body}")
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
