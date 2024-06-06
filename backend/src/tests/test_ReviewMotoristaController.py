import pytest
from unittest.mock import MagicMock
from src.views.http_types.http_response import HttpResponse
from src.controller.ReviewController import ReviewMotoristaController
from firebase_admin import db

class TestReviewMotoristaController:
    # Simula uma referência ao Firebase
    @staticmethod
    def mock_db_ref():
        return MagicMock()

    # Simula dados de teste
    @staticmethod
    def mock_data():
        return {
            'motorista_id': 'motorista_id_teste',
            'passageiro_id': 'passageiro_id_teste',
            'avaliacao': 5,
            'comentario': 'Bom serviço'
        }

    # Testa se o método de validação de dados funciona corretamente
    def test_validar_dados(self):
        data = {
            'motorista_id': 'motorista_id_teste',
            'passageiro_id': 'passageiro_id_teste',
            'avaliacao': 5
        }
        required_fields = ['motorista_id', 'passageiro_id', 'avaliacao']
        is_valid, response = ReviewMotoristaController.validar_dados(data, required_fields)
        assert is_valid is True
        assert response == {}

    # Testa se o método de validação de dados retorna corretamente quando campos estão faltando
    def test_validar_dados_faltando_campos(self):
        data = {
            'motorista_id': 'motorista_id_teste',
            'avaliacao': 5
        }
        required_fields = ['motorista_id', 'passageiro_id', 'avaliacao']
        is_valid, response = ReviewMotoristaController.validar_dados(data, required_fields)
        assert is_valid is False
        assert 'error' in response

    # Testa se a adição de uma avaliação de motorista funciona corretamente
    def test_adicionar_review_motorista(self, monkeypatch):
        mock_data = self.mock_data()
        controller = ReviewMotoristaController()

        def mock_db_reference(*args, **kwargs):
            # Simula uma referência ao Firebase
            return self.mock_db_ref()

        def mock_push(*args, **kwargs):
            pass  # Simula o método push do Firebase

        monkeypatch.setattr(controller, 'validar_dados', lambda x, y: (True, {}))
        monkeypatch.setattr(db, 'reference', mock_db_reference)  # Mock para db.reference
        monkeypatch.setattr(db.reference(), 'push', mock_push)   # Mock para db.reference().push

        response = controller.adicionar_review_motorista(mock_data)
        assert response.status_code == 200
        assert 'message' in response.body

    # Testa se a adição de uma avaliação de passageiro funciona corretamente
    def test_adicionar_review_passageiro(self, monkeypatch):
        mock_data = self.mock_data()
        controller = ReviewMotoristaController()

        def mock_db_reference(*args, **kwargs):
            # Simula uma referência ao Firebase
            return self.mock_db_ref()

        def mock_push(*args, **kwargs):
            pass  # Simula o método push do Firebase

        monkeypatch.setattr(controller, 'validar_dados', lambda x, y: (True, {}))
        monkeypatch.setattr(db, 'reference', mock_db_reference)  # Mock para db.reference
        monkeypatch.setattr(db.reference(), 'push', mock_push)   # Mock para db.reference().push

        response = controller.adicionar_review_passageiro(mock_data)
        assert response.status_code == 200
        assert 'message' in response.body