from flask_socketio import SocketIO, join_room, leave_room, send

class ChatController:
    def __init__(self, socketio):
        self.socketio = socketio

    def handle_message(self, data):
        room = data.get('room')
        message = data.get('message')
        user = data.get('user')

        if not room or not message or not user:
            return {"error": "Campos 'room', 'message' e 'user' são obrigatórios."}

        try:
            send({'user': user, 'message': message}, room=room)
            return {"status": "Mensagem enviada com sucesso"}
        except Exception as e:
            return {"error": f"Erro ao enviar mensagem: {str(e)}"}

    def join(self, data):
        room = data.get('room')
        user = data.get('user')

        if not room or not user:
            return {"error": "Campos 'room' e 'user' são obrigatórios."}

        try:
            join_room(room)
            send({'message': f"{user} entrou na sala."}, room=room)
            return {"status": "Entrou na sala com sucesso"}
        except Exception as e:
            return {"error": f"Erro ao entrar na sala: {str(e)}"}

    def leave(self, data):
        room = data.get('room')
        user = data.get('user')

        if not room or not user:
            return {"error": "Campos 'room' e 'user' são obrigatórios."}

        try:
            leave_room(room)
            send({'message': f"{user} saiu da sala."}, room=room)
            return {"status": "Saiu da sala com sucesso"}
        except Exception as e:
            return {"error": f"Erro ao sair da sala: {str(e)}"}