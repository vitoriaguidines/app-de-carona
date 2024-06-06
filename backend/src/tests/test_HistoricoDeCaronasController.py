import unittest
from unittest.mock import patch, MagicMock
from src.controller.HistoricoDeCaronasController import HistoricoDeCaronasController

# Classe de teste para o controller de histórico de caronas
class TestHistoricoDeCaronasController(unittest.TestCase):
    # Teste para listar histórico de caronas com sucesso
    @patch('src.controller.HistoricoDeCaronasController.db')
    def test_listar_historico_sucesso(self, mock_db):
        # Configuração do mock
        user_id = 'user123'
        mock_historico_data = {'carona1': {'origem': 'A', 'destino': 'B'}, 'carona2': {'origem': 'B', 'destino': 'C'}}
        mock_ref = MagicMock()
        mock_ref.get.return_value = mock_historico_data
        mock_db.reference.return_value = mock_ref

        # Chamada do método listar_historico
        response = HistoricoDeCaronasController.listar_historico(user_id)

        # Verificações de chamadas de métodos e resposta
        mock_db.reference.assert_called_once_with(f'users/{user_id}/historico_de_caronas')
        mock_ref.get.assert_called_once()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.body, {"historico_de_caronas": mock_historico_data})

    # Teste para listar histórico de caronas quando o usuário não é encontrado
    @patch('src.controller.HistoricoDeCaronasController.db')
    def test_listar_historico_usuario_nao_encontrado(self, mock_db):
        # Configuração do mock
        user_id = 'user123'
        mock_ref = MagicMock()
        mock_ref.get.return_value = None
        mock_db.reference.return_value = mock_ref

        # Chamada do método listar_historico
        response = HistoricoDeCaronasController.listar_historico(user_id)

        # Verificações de chamadas de métodos e resposta
        mock_db.reference.assert_called_once_with(f'users/{user_id}/historico_de_caronas')
        mock_ref.get.assert_called_once()
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.body, {"error": "Histórico de caronas não encontrado."})

    # Teste para listar histórico de caronas quando o ID do usuário não é fornecido
    def test_listar_historico_id_usuario_nao_fornecido(self):
        # Chamada do método listar_historico sem fornecer o ID do usuário
        response = HistoricoDeCaronasController.listar_historico(None)

        # Verificações da resposta
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.body, {"error": "ID do usuário não fornecido."})