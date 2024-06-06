import pytest
from unittest.mock import patch, MagicMock
from src.controller.ReviewController import ReviewMotoristaController

class TestReviewMotoristaController:

    # Teste para verificar a adição bem-sucedida de uma avaliação de motorista
    @patch('src.controller.ReviewController.db')
    @patch('src.controller.ReviewController.logging')
    def test_adicionar_review_motorista_sucesso(self, mock_logging, mock_db):
        # Dados simulados para a avaliação do motorista
        data = {
            'motorista_id': 'motorista_123',
            'passageiro_id': 'passageiro_456',
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        }
        # Configuração dos mocks para simular a interação com o banco de dados e o registro de logs
        mock_ref = MagicMock()
        mock_db.reference.return_value = mock_ref
        mock_push = MagicMock()
        mock_ref.push.return_value = mock_push

        # Chama o método adicionar_review_motorista da classe ReviewMotoristaController com os dados simulados
        response = ReviewMotoristaController.adicionar_review_motorista(data)

        # Verifica se a resposta foi bem-sucedida e se as interações esperadas com o banco de dados e os logs ocorreram
        assert response.status_code == 200
        assert response.body == {"message": "Avaliação do motorista adicionada com sucesso."}
        mock_ref.push.assert_called_once()
        mock_push.set.assert_called_once_with({
            'passageiro_id': 'passageiro_456',
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        })
        mock_logging.info.assert_called_once()

    # Teste para verificar a falha ao adicionar uma avaliação de motorista devido a campos faltando
    @patch('src.controller.ReviewController.logging')
    def test_adicionar_review_motorista_falha(self, mock_logging):
        # Dados simulados para a avaliação do motorista com um campo faltando
        data = {
            'motorista_id': 'motorista_123',
            'passageiro_id': 'passageiro_456',  # Adicionando passageiro_id
            'avaliacao': 5,
            'comentario': 'Ótimo motorista!'
        }

        # Chama o método adicionar_review_motorista da classe ReviewMotoristaController com os dados simulados
        response = ReviewMotoristaController.adicionar_review_motorista(data)

        # Verifica se o servidor retorna o código de status 400 e uma mensagem de erro apropriada
        assert response.status_code == 400
        assert "Os seguintes campos são obrigatórios" in response.body["error"]
        mock_logging.error.assert_called_once()  # Verifica se o método error foi chamado
