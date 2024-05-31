import pytest
from unittest.mock import patch, MagicMock
from src.controller.FavoritosController import FavoritosController

@pytest.fixture
def valid_data():
    return {
        'user_id': 'user123',
        'favorito_id': 'favorito123',
        'tipo': 'tipo123'
    }

@pytest.fixture
def invalid_data():
    return {
        'user_id': '',
        'favorito_id': '',
        'tipo': ''
    }

# Testa se o favorito é adicionado com sucesso quando os dados são válidos.
def test_adicionar_favorito_sucesso(valid_data):
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_favoritos_ref = MagicMock()
        mock_novo_favorito_ref = MagicMock()

        mock_favoritos_ref.push.return_value = mock_novo_favorito_ref
        mock_db_ref.return_value = mock_favoritos_ref

        response = FavoritosController.adicionar_favorito(
            valid_data['user_id'],
            valid_data['favorito_id'],
            valid_data['tipo']
        )

        assert response.status_code == 200
        assert response.body['message'] == "Favorito adicionado com sucesso."

# Testa se uma resposta adequada é retornada quando campos obrigatórios estão faltando.
def test_adicionar_favorito_campos_obrigatorios(invalid_data):
    response = FavoritosController.adicionar_favorito(
        invalid_data['user_id'],
        invalid_data['favorito_id'],
        invalid_data['tipo']
    )

    assert response.status_code == 400
    assert response.body['error'] == "Campos 'user_id', 'favorito_id' e 'tipo' são obrigatórios."

# Testa se uma resposta adequada é retornada quando uma exceção é levantada durante a adição de favorito.
def test_adicionar_favorito_excecao(valid_data):
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        response = FavoritosController.adicionar_favorito(
            valid_data['user_id'],
            valid_data['favorito_id'],
            valid_data['tipo']
        )

        assert response.status_code == 500
        assert "Erro no banco de dados" in response.body['error']
