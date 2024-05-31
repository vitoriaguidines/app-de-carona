import pytest
from unittest.mock import patch, MagicMock
from src.controller.AdicionarVeiculoController import AdicionarVeiculoController
from src.views.http_types.http_response import HttpResponse

@pytest.fixture
def valid_data():
    return {
        'user_id': 'user123',
        'driver_id': 'driver123',
        'marca': 'Toyota',
        'modelo': 'Corolla',
        'placa': 'ABC-1234',
        'cor': 'Azul',
        'ano': '2020'
    }

@pytest.fixture
def invalid_data():
    return {
        'user_id': '',
        'driver_id': '',
        'marca': '',
        'modelo': '',
        'placa': '',
        'cor': '',
        'ano': ''
    }

@pytest.fixture
def partially_invalid_data():
    return {
        'user_id': 'user123',
        'driver_id': '',
        'marca': 'Toyota',
        'modelo': '',
        'placa': 'ABC-1234',
        'cor': 'Azul',
        'ano': '2020'
    }

@pytest.fixture
def valid_data_with_extra_fields():
    return {
        'user_id': 'user123',
        'driver_id': 'driver123',
        'marca': 'Toyota',
        'modelo': 'Corolla',
        'placa': 'ABC-1234',
        'cor': 'Azul',
        'ano': '2020',
        'extra_field': 'extra_value'
    }

# Testa se a validação dos dados passa com todos os campos obrigatórios presentes e válidos.
def test_validar_dados_sucesso(valid_data):
    is_valid, response = AdicionarVeiculoController.validar_dados(valid_data)
    assert is_valid
    assert response == {}

# Testa se a validação dos dados falha corretamente quando todos os campos obrigatórios estão ausentes ou vazios.
def test_validar_dados_falha(invalid_data):
    is_valid, response = AdicionarVeiculoController.validar_dados(invalid_data)
    assert not is_valid
    assert "Os seguintes campos são obrigatórios" in response['error']

# Testa se a validação dos dados falha corretamente quando apenas alguns campos obrigatórios estão ausentes ou vazios.
def test_validar_dados_parcialmente_falha(partially_invalid_data):
    is_valid, response = AdicionarVeiculoController.validar_dados(partially_invalid_data)
    assert not is_valid
    assert "Os seguintes campos são obrigatórios" in response['error']

# Testa se o método adicionar_veiculo adiciona um veículo com sucesso quando todos os dados são válidos e o usuário existe.
@patch('firebase_admin.db.reference')
def test_adicionar_veiculo_sucesso(mock_db_ref, valid_data):
    mock_user_ref = MagicMock()
    mock_user_ref.get.return_value = True  # Simula que o usuário existe
    mock_db_ref.return_value = mock_user_ref

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)
    assert response.status_code == 200
    assert "Veículo adicionado com sucesso" in response.body['message']

# Testa se o método adicionar_veiculo retorna um erro 404 quando o usuário não é encontrado no banco de dados.
@patch('firebase_admin.db.reference')
def test_adicionar_veiculo_usuario_nao_encontrado(mock_db_ref, valid_data):
    mock_user_ref = MagicMock()
    mock_user_ref.get.return_value = None  # Simula que o usuário não existe
    mock_db_ref.return_value = mock_user_ref

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)
    assert response.status_code == 404
    assert "Usuário não encontrado" in response.body['error']

# Testa se o método adicionar_veiculo retorna um erro 500 quando ocorre uma exceção ao tentar adicionar um veículo no banco de dados.
@patch('firebase_admin.db.reference')
def test_adicionar_veiculo_erro(mock_db_ref, valid_data):
    mock_db_ref.side_effect = Exception("Erro no banco de dados")  # Simula uma exceção no banco de dados

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)
    assert response.status_code == 500
    assert "Erro no banco de dados" in response.body['error']

# Testa se o método adicionar_veiculo ignora campos adicionais não esperados e adiciona o veículo com sucesso.
@patch('firebase_admin.db.reference')
def test_adicionar_veiculo_com_dados_adicionais(mock_db_ref, valid_data_with_extra_fields):
    mock_user_ref = MagicMock()
    mock_user_ref.get.return_value = True  # Simula que o usuário existe
    mock_db_ref.return_value = mock_user_ref

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data_with_extra_fields)
    assert response.status_code == 200
    assert "Veículo adicionado com sucesso" in response.body['message']
    assert 'extra_field' not in response.body  # Verifica se o campo extra não é retornado

# Testa se o método adicionar_veiculo lida corretamente com uma resposta inesperada ou erro do Firebase.
@patch('firebase_admin.db.reference')
def test_adicionar_veiculo_firebase_resposta_inesperada(mock_db_ref, valid_data):
    mock_user_ref = MagicMock()
    mock_user_ref.get.return_value = True  # Simula que o usuário existe
    mock_db_ref.return_value = mock_user_ref

    # Simula uma resposta inesperada do Firebase
    mock_db_ref.return_value.child.return_value.push.side_effect = Exception("Unexpected error")

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)
    assert response.status_code == 500
    assert "Unexpected error" in response.body['error']