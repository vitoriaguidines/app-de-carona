import pytest
from unittest.mock import patch, MagicMock
from src.controller.GamificacaoController import GamificacaoController
from src.views.http_types.http_response import HttpResponse

# Dados válidos para teste
@pytest.fixture
def valid_data():
    return {
        'user_id': 'user123',
        'pontos': 50
    }

# Dados inválidos para teste
@pytest.fixture
def invalid_data():
    return {
        'user_id': '',
        'pontos': None
    }

# Teste de adição de pontos com sucesso
def test_adicionar_pontos_sucesso(valid_data):
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_user_ref = MagicMock()
        mock_user_ref.get.return_value = {'pontos': 100}

        mock_db_ref.return_value = mock_user_ref

        response = GamificacaoController.adicionar_pontos(
            valid_data['user_id'],
            valid_data['pontos']
        )

        assert response.status_code == 200
        assert response.body == {"message": "Pontos adicionados com sucesso.", "pontos": 150}

# Teste de adição de pontos com campos obrigatórios ausentes
def test_adicionar_pontos_campos_obrigatorios(invalid_data):
    response = GamificacaoController.adicionar_pontos(
        invalid_data['user_id'],
        invalid_data['pontos']
    )

    assert response.status_code == 400
    assert response.body == {"error": "Campos 'user_id' e 'pontos' são obrigatórios."}

# Teste de adição de pontos com usuário não encontrado
def test_adicionar_pontos_usuario_nao_encontrado(valid_data):
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_user_ref = MagicMock()
        mock_user_ref.get.return_value = None

        mock_db_ref.return_value = mock_user_ref

        response = GamificacaoController.adicionar_pontos(
            valid_data['user_id'],
            valid_data['pontos']
        )

        assert response.status_code == 404
        assert response.body == {"error": "Usuário não encontrado."}

# Teste de adição de pontos com exceção
def test_adicionar_pontos_excecao(valid_data):
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        response = GamificacaoController.adicionar_pontos(
            valid_data['user_id'],
            valid_data['pontos']
        )

        assert response.status_code == 500
        assert response.body == {"error": "Erro no banco de dados"}
