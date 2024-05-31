import pytest
from unittest.mock import patch, MagicMock
from src.controller.UsuarioController import UsuarioController

class TestUsuarioController:

    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_sucesso(self, mock_db):
        # Simulando dados de usuário existente
        mock_user_data = {'display_name': 'João', 'email': 'joao@example.com'}
        mock_db.reference().get.return_value = mock_user_data

        data = {'user_id': 'exemplo_user_id'}
        response = UsuarioController.obter_usuario(data)

        assert response.status_code == 200
        assert response.body == mock_user_data

    def test_obter_usuario_sem_id(self):
        data = {}
        response = UsuarioController.obter_usuario(data)

        assert response.status_code == 400
        assert "ID do usuário não fornecido" in response.body["error"]

    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_usuario_nao_encontrado(self, mock_db):
        # Simulando dados de usuário não encontrado
        mock_db.reference().get.return_value = None

        data = {'user_id': 'exemplo_user_id'}
        response = UsuarioController.obter_usuario(data)

        assert response.status_code == 404
        assert "Usuário não encontrado" in response.body["error"]

    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_erro(self, mock_db):
        # Simulando erro ao obter usuário
        mock_db.reference().get.side_effect = Exception('Erro simulado')

        data = {'user_id': 'exemplo_user_id'}
        response = UsuarioController.obter_usuario(data)

        assert response.status_code == 500
        assert "Erro simulado" in response.body["error"]
