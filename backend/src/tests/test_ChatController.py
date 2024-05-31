import pytest
from unittest.mock import MagicMock, patch
from src.controller.ChatController import ChatController

@pytest.fixture
def chat_controller():
    socketio = MagicMock()
    return ChatController(socketio)

# Verifica se a função handle_message envia uma mensagem com sucesso quando todos os campos obrigatórios estão presentes e corretos.
def test_handle_message_success(chat_controller):
    data = {'room': 'room1', 'message': 'Hello, World!', 'user': 'user1'}
    
    with patch('src.controller.ChatController.send') as mock_send:
        response = chat_controller.handle_message(data)
        mock_send.assert_called_once_with({'user': 'user1', 'message': 'Hello, World!'}, room='room1')
        assert response == {"status": "Mensagem enviada com sucesso"}

# Verifica se a função handle_message retorna um erro quando faltam campos obrigatórios (como room, message ou user) na mensagem.
def test_handle_message_missing_fields(chat_controller):
    data = {'room': 'room1', 'message': 'Hello, World!'}
    
    response = chat_controller.handle_message(data)
    assert response == {"error": "Campos 'room', 'message' e 'user' são obrigatórios."}

# Testa se a função handle_message retorna uma mensagem de erro adequada quando os campos obrigatórios estão presentes mas vazios.
def test_handle_message_empty_fields(chat_controller):
    data = {'room': 'room1', 'message': '', 'user': 'user1'}
    
    response = chat_controller.handle_message(data)
    assert response == {"error": "Campos 'room', 'message' e 'user' são obrigatórios."}

# Testa se a função handle_message retorna uma mensagem de erro adequada quando ocorre uma exceção ao enviar a mensagem.
def test_handle_message_send_error(chat_controller):
    data = {'room': 'room1', 'message': 'Hello, World!', 'user': 'user1'}

    with patch('src.controller.ChatController.send', side_effect=Exception("Send error")):
        response = chat_controller.handle_message(data)
        assert response == {"error": "Erro ao enviar mensagem: Send error"}

# Verifica se a função join permite que um usuário entre na sala com sucesso quando todos os campos obrigatórios estão presentes e corretos.
def test_join_success(chat_controller):
    data = {'room': 'room1', 'user': 'user1'}
    
    with patch('src.controller.ChatController.join_room') as mock_join_room:
        with patch('src.controller.ChatController.send') as mock_send:
            response = chat_controller.join(data)
            mock_join_room.assert_called_once_with('room1')
            mock_send.assert_called_once_with({'message': 'user1 entrou na sala.'}, room='room1')
            assert response == {"status": "Entrou na sala com sucesso"}

# Verifica se a função join retorna um erro quando faltam campos obrigatórios (como room ou user) na solicitação para entrar na sala.
def test_join_missing_fields(chat_controller):
    data = {'room': 'room1'}
    
    response = chat_controller.join(data)
    assert response == {"error": "Campos 'room' e 'user' são obrigatórios."}

# Testa se a função join retorna uma mensagem de erro adequada quando os campos obrigatórios estão presentes mas vazios.
def test_join_empty_fields(chat_controller):
    data = {'room': '', 'user': 'user1'}
    
    response = chat_controller.join(data)
    assert response == {"error": "Campos 'room' e 'user' são obrigatórios."}

# Testa se a função join retorna uma mensagem de erro adequada quando ocorre uma exceção ao tentar entrar na sala.
def test_join_room_error(chat_controller):
    data = {'room': 'room1', 'user': 'user1'}

    with patch('src.controller.ChatController.join_room', side_effect=Exception("Join room error")):
        response = chat_controller.join(data)
        assert response == {"error": "Erro ao entrar na sala: Join room error"}

# Verifica se a função leave permite que um usuário saia da sala com sucesso quando todos os campos obrigatórios estão presentes e corretos.
def test_leave_success(chat_controller):
    data = {'room': 'room1', 'user': 'user1'}
    
    with patch('src.controller.ChatController.leave_room') as mock_leave_room:
        with patch('src.controller.ChatController.send') as mock_send:
            response = chat_controller.leave(data)
            mock_leave_room.assert_called_once_with('room1')
            mock_send.assert_called_once_with({'message': 'user1 saiu da sala.'}, room='room1')
            assert response == {"status": "Saiu da sala com sucesso"}

# Verifica se a função leave retorna um erro quando faltam campos obrigatórios (como room ou user) na solicitação para sair da sala.
def test_leave_missing_fields(chat_controller):
    data = {'room': 'room1'}
    
    response = chat_controller.leave(data)
    assert response == {"error": "Campos 'room' e 'user' são obrigatórios."}

# Testa se a função leave retorna uma mensagem de erro adequada quando os campos obrigatórios estão presentes mas vazios.
def test_leave_empty_fields(chat_controller):
    data = {'room': '', 'user': 'user1'}
    
    response = chat_controller.leave(data)
    assert response == {"error": "Campos 'room' e 'user' são obrigatórios."}

# Testa se a função leave retorna uma mensagem de erro adequada quando ocorre uma exceção ao tentar sair da sala.
def test_leave_room_error(chat_controller):
    data = {'room': 'room1', 'user': 'user1'}

    with patch('src.controller.ChatController.leave_room', side_effect=Exception("Leave room error")):
        response = chat_controller.leave(data)
        assert response == {"error": "Erro ao sair da sala: Leave room error"}

# Testa se a função handle_message consegue enviar uma mensagem longa (mais de 1000 caracteres).
def test_handle_message_long_message(chat_controller):
    data = {'room': 'room1', 'message': 'a' * 1001, 'user': 'user1'}
    
    with patch('src.controller.ChatController.send') as mock_send:
        response = chat_controller.handle_message(data)
        mock_send.assert_called_once_with({'user': 'user1', 'message': 'a' * 1001}, room='room1')
        assert response == {"status": "Mensagem enviada com sucesso"}

# Testa se a função handle_message consegue enviar uma mensagem contendo caracteres especiais, como um script HTML.
def test_handle_message_special_characters(chat_controller):
    data = {'room': 'room1', 'message': '<script>alert("Hello!")</script>', 'user': 'user1'}
    
    with patch('src.controller.ChatController.send') as mock_send:
        response = chat_controller.handle_message(data)
        mock_send.assert_called_once_with({'user': 'user1', 'message': '<script>alert("Hello!")</script>'}, room='room1')
        assert response == {"status": "Mensagem enviada com sucesso"}
