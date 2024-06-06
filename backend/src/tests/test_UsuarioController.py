import pytest
from unittest.mock import patch, MagicMock
from src.controller.UsuarioController import UsuarioController

class TestUsuarioController:

    # Teste para verificar a obtenção bem-sucedida de um usuário
    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_sucesso(self, mock_db):
        # Simulando dados de usuário existente
        mock_user_data = {'display_name': 'João', 'email': 'joao@example.com'}
        mock_db.reference().get.return_value = mock_user_data

        # Dados de exemplo para obter um usuário
        data = {'user_id': 'exemplo_user_id'}

        # Chamando o método que obtém o usuário
        response = UsuarioController.obter_usuario(data)

        # Verificando se a resposta é bem-sucedida e contém os dados do usuário
        assert response.status_code == 200
        assert response.body == mock_user_data

    # Teste para verificar o tratamento de falha quando o ID do usuário não é fornecido
    def test_obter_usuario_sem_id(self):
        data = {}
        response = UsuarioController.obter_usuario(data)

        assert response.status_code == 400
        assert "ID do usuário não fornecido" in response.body["error"]

    # Teste para verificar o tratamento quando o usuário não é encontrado
    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_usuario_nao_encontrado(self, mock_db):
        # Simulando dados de usuário não encontrado
        mock_db.reference().get.return_value = None

        # Dados de exemplo para obter um usuário
        data = {'user_id': 'exemplo_user_id'}

        # Chamando o método que obtém o usuário
        response = UsuarioController.obter_usuario(data)

        # Verificando se a resposta indica que o usuário não foi encontrado
        assert response.status_code == 404
        assert "Usuário não encontrado" in response.body["error"]

    # Teste para verificar o tratamento de erro ao obter o usuário
    @patch('src.controller.UsuarioController.db')
    def test_obter_usuario_erro(self, mock_db):
        # Simulando erro ao obter usuário
        mock_db.reference().get.side_effect = Exception('Erro simulado')

        # Dados de exemplo para obter um usuário
        data = {'user_id': 'exemplo_user_id'}

        # Chamando o método que obtém o usuário
        response = UsuarioController.obter_usuario(data)

        # Verificando se a resposta indica um erro e contém a mensagem de erro apropriada
        assert response.status_code == 500
        assert "Erro simulado" in response.body["error"]
