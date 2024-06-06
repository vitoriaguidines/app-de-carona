import pytest
from unittest.mock import patch, MagicMock
from src.controller.SuporteController import SuporteController

class TestSuporteController:

    # Teste para verificar se uma mensagem é enviada com sucesso
    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_sucesso(self, mock_db):
        # Dados de exemplo para a mensagem
        data = {
            'user_id': 'exemplo_user_id',
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }

        # Mock para a referência do Realtime Database
        mock_ref = MagicMock()
        mock_db.reference.return_value = mock_ref

        # Mock para o método set
        mock_set = MagicMock()
        mock_ref.push.return_value.set = mock_set

        # Chamando o método que envia a mensagem
        response = SuporteController.enviar_mensagem(data)

        # Verificando se a resposta é bem-sucedida
        assert response.status_code == 200
        assert response.body == {"message": "Mensagem de suporte enviada com sucesso."}
        mock_ref.push.assert_called_once()
        mock_set.assert_called_once()

    # Teste para verificar o tratamento de falha quando campos obrigatórios estão ausentes
    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_falha(self, mock_db):
        # Dados de exemplo sem o campo 'user_id'
        data = {
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }

        # Chamando o método que envia a mensagem
        response = SuporteController.enviar_mensagem(data)

        # Verificando se a resposta indica falha e contém mensagem de erro apropriada
        assert response.status_code == 400
        assert "Campos 'user_id' e 'mensagem' são obrigatórios." in response.body["error"]

    # Teste para verificar o tratamento de erro durante o envio da mensagem
    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_erro(self, mock_db):
        # Dados de exemplo para a mensagem
        data = {
            'user_id': 'exemplo_user_id',
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }

        # Simulando uma exceção durante o envio da mensagem
        mock_db.reference.side_effect = Exception('Erro simulado')

        # Chamando o método que envia a mensagem
        response = SuporteController.enviar_mensagem(data)

        # Verificando se a resposta indica erro e contém a mensagem de erro apropriada
        assert response.status_code == 500
        assert "Erro simulado" in response.body["error"]
