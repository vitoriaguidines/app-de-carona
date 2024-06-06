import pytest
from unittest.mock import patch
from src.controller.NotificacoesController import NotificacoesController

class TestNotificacoesController:

    # Teste para verificar o envio bem-sucedido de uma notificação
    @patch('src.controller.NotificacoesController.messaging')
    def test_enviar_notificacao_sucesso(self, mock_messaging):
        # Dados simulados para a notificação
        data = {
            'token': 'exemplo_de_token',
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }
        # Configuração do retorno simulado da função send do mock
        mock_messaging.send.return_value = 'resposta_do_envio'

        # Chama o método enviar_notificacao da classe NotificacoesController com os dados simulados
        response = NotificacoesController.enviar_notificacao(data)

        # Verifica se a resposta foi bem-sucedida
        assert response.status_code == 200
        assert response.body == {"message": "Notificação enviada com sucesso."}

    # Teste para verificar se ocorre um erro ao enviar uma notificação com campos faltando
    def test_enviar_notificacao_faltando_campos(self):
        # Dados simulados para a notificação com campos faltando
        data = {
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }

        # Chama o método enviar_notificacao da classe NotificacoesController com os dados simulados
        response = NotificacoesController.enviar_notificacao(data)

        # Verifica se o servidor retorna o código de status 400 e uma mensagem de erro apropriada
        assert response.status_code == 400
        assert "Os seguintes campos são obrigatórios" in response.body["error"]

    # Teste para verificar se ocorre um erro ao enviar uma notificação
    @patch('src.controller.NotificacoesController.messaging')
    def test_enviar_notificacao_erro_envio(self, mock_messaging):
        # Dados simulados para a notificação
        data = {
            'token': 'exemplo_de_token',
            'titulo': 'Teste de Notificação',
            'corpo': 'Este é um teste de notificação.'
        }
        # Configuração do mock para simular um erro ao enviar a notificação
        mock_messaging.send.side_effect = Exception("Erro ao enviar notificação")

        # Chama o método enviar_notificacao da classe NotificacoesController com os dados simulados
        response = NotificacoesController.enviar_notificacao(data)

        # Verifica se o servidor retorna o código de status 500 e uma mensagem de erro apropriada
        assert response.status_code == 500
        assert "Erro ao enviar notificação" in response.body["error"]
