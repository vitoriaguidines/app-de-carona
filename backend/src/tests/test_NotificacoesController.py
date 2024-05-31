import pytest
from unittest.mock import patch
from src.controller.NotificacoesController import NotificacoesController

class TestNotificacoesController:

    @patch('src.controller.NotificacoesController.messaging')
    def test_enviar_notificacao_sucesso(self, mock_messaging):
        data = {
            'token': 'exemplo_de_token',
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }
        mock_messaging.send.return_value = 'resposta_do_envio'

        response = NotificacoesController.enviar_notificacao(data)

        assert response.status_code == 200
        assert response.body == {"message": "Notificação enviada com sucesso."}

    def test_enviar_notificacao_faltando_campos(self):
        data = {
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }

        response = NotificacoesController.enviar_notificacao(data)

        assert response.status_code == 400
        assert "Os seguintes campos são obrigatórios" in response.body["error"]

    @patch('src.controller.NotificacoesController.messaging')
    def test_enviar_notificacao_erro_envio(self, mock_messaging):
        data = {
            'token': 'exemplo_de_token',
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }
        mock_messaging.send.side_effect = Exception("Erro ao enviar notificação")

        response = NotificacoesController.enviar_notificacao(data)

        assert response.status_code == 500
        assert "Erro ao enviar notificação" in response.body["error"]

