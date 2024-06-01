# backend/tests/test_AdicionarVeiculoController.py
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
        'placa': 'XYZ-1234',
        'cor': 'Preto',
        'ano': 2020
    }

@pytest.fixture
def invalid_data():
    return {
        'user_id': 'user123',
        'driver_id': '',
        'marca': 'Toyota',
        'modelo': 'Corolla',
        'placa': 'XYZ-1234',
        'cor': 'Preto',
        'ano': 2020
    }

@patch('src.controller.AdicionarVeiculoController.db.reference')
def test_adicionar_veiculo_sucesso(mock_db_ref, valid_data):
    # Configura o mock do Firebase
    user_ref_mock = MagicMock()
    veiculos_ref_mock = MagicMock()
    new_veiculo_ref_mock = MagicMock()
    user_ref_mock.get.return_value = True
    mock_db_ref.return_value = user_ref_mock
    user_ref_mock.child.return_value = veiculos_ref_mock
    veiculos_ref_mock.push.return_value = new_veiculo_ref_mock
    new_veiculo_ref_mock.key = 'veiculo123'

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)

    assert response.status_code == 200
    assert response.body['veiculo_id'] == 'veiculo123'
    assert response.body['message'] == 'Veículo adicionado com sucesso.'

@patch('src.controller.AdicionarVeiculoController.db.reference')
def test_adicionar_veiculo_usuario_nao_encontrado(mock_db_ref, valid_data):
    # Configura o mock do Firebase
    user_ref_mock = MagicMock()
    user_ref_mock.get.return_value = None
    mock_db_ref.return_value = user_ref_mock

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)

    assert response.status_code == 404
    assert response.body['error'] == 'Usuário não encontrado.'

def test_adicionar_veiculo_dados_invalidos(invalid_data):
    response = AdicionarVeiculoController.adicionar_veiculo(invalid_data)

    assert response.status_code == 400
    assert 'error' in response.body

@patch('src.controller.AdicionarVeiculoController.db.reference')
def test_adicionar_veiculo_erro_interno(mock_db_ref, valid_data):
    # Configura o mock do Firebase para lançar uma exceção
    user_ref_mock = MagicMock()
    mock_db_ref.return_value = user_ref_mock
    user_ref_mock.get.side_effect = Exception('Erro de conexão')

    response = AdicionarVeiculoController.adicionar_veiculo(valid_data)

    assert response.status_code == 500
    assert 'error' in response.body
    assert response.body['error'] == 'Erro de conexão'