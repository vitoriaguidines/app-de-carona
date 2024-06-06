import pytest
from unittest.mock import patch, MagicMock
from src.controller.ViagemController import ViagemController

class TestViagemController:

    # Teste para verificar a listagem bem-sucedida de viagens
    @patch('src.controller.ViagemController.db')
    def test_listar_viagens_sucesso(self, mock_db):
        # Simulando dados de viagens existentes
        mock_viagens_data = {'viagem1': {'origem': 'A', 'destino': 'B'}, 'viagem2': {'origem': 'C', 'destino': 'D'}}
        mock_db.reference().get.return_value = mock_viagens_data

        # Chamando o método que lista as viagens
        response = ViagemController.listar_viagens()

        # Verificando se a resposta é bem-sucedida e contém os dados das viagens
        assert response.status_code == 200
        assert response.body == {"viagens": mock_viagens_data}

    # Teste para verificar o tratamento quando nenhuma viagem é encontrada
    @patch('src.controller.ViagemController.db')
    def test_listar_viagens_nenhuma_viagem_encontrada(self, mock_db):
        # Simulando dados de viagens vazios
        mock_db.reference().get.return_value = None

        # Chamando o método que lista as viagens
        response = ViagemController.listar_viagens()

        # Verificando se a resposta indica que nenhuma viagem foi encontrada
        assert response.status_code == 404
        assert "Nenhuma viagem encontrada" in response.body["error"]

    # Teste para verificar a obtenção bem-sucedida dos detalhes de uma viagem
    @patch('src.controller.ViagemController.db')
    def test_obter_detalhes_viagem_sucesso(self, mock_db):
        # Simulando dados de uma viagem existente
        mock_viagem_data = {'origem': 'A', 'destino': 'B'}
        mock_db.reference().get.return_value = mock_viagem_data

        # Chamando o método que obtém os detalhes da viagem
        response = ViagemController.obter_detalhes_viagem('viagem1')

        # Verificando se a resposta é bem-sucedida e contém os detalhes da viagem
        assert response.status_code == 200
        assert response.body == {"viagem": mock_viagem_data}

    # Teste para verificar o tratamento quando a viagem não é encontrada
    @patch('src.controller.ViagemController.db')
    def test_obter_detalhes_viagem_nao_encontrada(self, mock_db):
        # Simulando viagem não encontrada
        mock_db.reference().get.return_value = None

        # Chamando o método que obtém os detalhes da viagem
        response = ViagemController.obter_detalhes_viagem('viagem1')

        # Verificando se a resposta indica que a viagem não foi encontrada
        assert response.status_code == 404
        assert "Viagem não encontrada" in response.body["error"]
