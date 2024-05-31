import pytest
from unittest.mock import patch, MagicMock
from src.controller.SuporteController import SuporteController

class TestSuporteController:

    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_sucesso(self, mock_db):
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

        response = SuporteController.enviar_mensagem(data)

        assert response.status_code == 200
        assert response.body == {"message": "Mensagem de suporte enviada com sucesso."}
        mock_ref.push.assert_called_once()
        mock_set.assert_called_once()

    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_falha(self, mock_db):
        data = {
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }

        response = SuporteController.enviar_mensagem(data)

        assert response.status_code == 400
        assert "Campos 'user_id' e 'mensagem' são obrigatórios." in response.body["error"]

    @patch('src.controller.SuporteController.db')
    def test_enviar_mensagem_erro(self, mock_db):
        data = {
            'user_id': 'exemplo_user_id',
            'mensagem': 'Esta é uma mensagem de teste para o suporte.'
        }

        # Simulando uma exceção durante o envio da mensagem
        mock_db.reference.side_effect = Exception('Erro simulado')

        response = SuporteController.enviar_mensagem(data)

        assert response.status_code == 500
        assert "Erro simulado" in response.body["error"]