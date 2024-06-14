from flask_socketio import SocketIO, join_room, leave_room, send
import logging

class ChatController:
    def __init__(self, socketio):
        self.socketio = socketio

    def handle_message(self, data):
        room = data.get('room')
        message = data.get('message')
        user = data.get('user')

        if not room or not message or not user:
            logging.error("Campos 'room', 'message' e 'user' são obrigatórios.")
            return {"error": "Campos 'room', 'message' e 'user' são obrigatórios."}

        try:
            self.socketio.send({'user': user, 'message': message}, room=room)
            logging.info(f"Mensagem enviada para a sala {room} por {user}.")
            return {"status": "Mensagem enviada com sucesso"}
        except Exception as e:
            logging.error(f"Erro ao enviar mensagem: {str(e)}")
            return {"error": f"Erro ao enviar mensagem: {str(e)}"}

    def join(self, data):
        room = data.get('room')
        user = data.get('user')

        if not room or not user:
            logging.error("Campos 'room' e 'user' são obrigatórios.")
            return {"error": "Campos 'room' e 'user' são obrigatórios."}

        try:
            join_room(room)
            self.socketio.send({'message': f"{user} entrou na sala."}, room=room)
            logging.info(f"{user} entrou na sala {room}.")
            return {"status": "Entrou na sala com sucesso"}
        except Exception as e:
            logging.error(f"Erro ao entrar na sala: {str(e)}")
            return {"error": f"Erro ao entrar na sala: {str(e)}"}

    def leave(self, data):
        room = data.get('room')
        user = data.get('user')

        if not room or not user:
            logging.error("Campos 'room' e 'user' são obrigatórios.")
            return {"error": "Campos 'room' e 'user' são obrigatórios."}

        try:
            leave_room(room)
            self.socketio.send({'message': f"{user} saiu da sala."}, room=room)
            logging.info(f"{user} saiu da sala {room}.")
            return {"status": "Saiu da sala com sucesso"}
        except Exception as e:
            logging.error(f"Erro ao sair da sala: {str(e)}")
            return {"error": f"Erro ao sair da sala: {str(e)}"}
