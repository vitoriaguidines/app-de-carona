import pytest
from unittest.mock import patch, MagicMock
from src.controller.ReviewController import ReviewMotoristaController

class TestReviewMotoristaController:

    @patch('src.controller.ReviewController.db')
    @patch('src.controller.ReviewController.logging')
    def test_adicionar_review_motorista_sucesso(self, mock_logging, mock_db):
        data = {
            'motorista_id': 'motorista_123',
            'passageiro_id': 'passageiro_456',
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        }
        mock_ref = MagicMock()
        mock_db.reference.return_value = mock_ref
        mock_push = MagicMock()
        mock_ref.push.return_value = mock_push

        response = ReviewMotoristaController.adicionar_review_motorista(data)

        assert response.status_code == 200
        assert response.body == {"message": "Avaliação do motorista adicionada com sucesso."}
        mock_ref.push.assert_called_once()
        mock_push.set.assert_called_once_with({
            'passageiro_id': 'passageiro_456',
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        })
        mock_logging.info.assert_called_once()

    @patch('src.controller.ReviewController.logging')
    def test_adicionar_review_motorista_falha(self, mock_logging):
        data = {
            'motorista_id': 'motorista_123',
            'passageiro_id': 'passageiro_456',  # Adicionando passageiro_id
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        }

        response = ReviewMotoristaController.adicionar_review_motorista(data)

        assert response.status_code == 400
        assert "Os seguintes campos são obrigatórios" in response.body["error"]
        mock_logging.error.assert_called_once()  # Verifica se o método error foi chamado
