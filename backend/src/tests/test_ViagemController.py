import pytest
from unittest.mock import patch, MagicMock
from src.controller.ViagemController import ViagemController

class TestViagemController:

    @patch('src.controller.ViagemController.db')
    def test_listar_viagens_sucesso(self, mock_db):
        # Simulando dados de viagens existentes
        mock_viagens_data = {'viagem1': {'origem': 'A', 'destino': 'B'}, 'viagem2': {'origem': 'C', 'destino': 'D'}}
        mock_db.reference().get.return_value = mock_viagens_data

        response = ViagemController.listar_viagens()

        assert response.status_code == 200
        assert response.body == {"viagens": mock_viagens_data}

    @patch('src.controller.ViagemController.db')
    def test_listar_viagens_nenhuma_viagem_encontrada(self, mock_db):
        # Simulando dados de viagens vazios
        mock_db.reference().get.return_value = None

        response = ViagemController.listar_viagens()

        assert response.status_code == 404
        assert "Nenhuma viagem encontrada" in response.body["error"]

    @patch('src.controller.ViagemController.db')
    def test_obter_detalhes_viagem_sucesso(self, mock_db):
        # Simulando dados de uma viagem existente
        mock_viagem_data = {'origem': 'A', 'destino': 'B'}
        mock_db.reference().get.return_value = mock_viagem_data

        response = ViagemController.obter_detalhes_viagem('viagem1')

        assert response.status_code == 200
        assert response.body == {"viagem": mock_viagem_data}

    @patch('src.controller.ViagemController.db')
    def test_obter_detalhes_viagem_nao_encontrada(self, mock_db):
        # Simulando viagem não encontrada
        mock_db.reference().get.return_value = None

        response = ViagemController.obter_detalhes_viagem('viagem1')

        assert response.status_code == 404
        assert "Viagem não encontrada" in response.body["error"]
