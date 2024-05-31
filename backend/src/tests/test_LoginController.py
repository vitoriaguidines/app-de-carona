import pytest
from unittest.mock import patch, MagicMock
from src.controller.LoginController import LoginController
from src.views.http_types.http_response import HttpResponse

@pytest.fixture
def valid_data():
    return {
        'email': 'user@example.com',
        'senha': 'validpassword'
    }

@pytest.fixture
def invalid_data():
    return {
        'email': '',
        'senha': ''
    }

def test_validar_dados_sucesso(valid_data):
    is_valid, response = LoginController.validar_dados(valid_data, ['email', 'senha'])
    assert is_valid
    assert response == {}

def test_validar_dados_falha(invalid_data):
    is_valid, response = LoginController.validar_dados(invalid_data, ['email', 'senha'])
    assert not is_valid
    assert "Os seguintes campos são obrigatórios" in response['error']

@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_sucesso(mock_get_api_key, mock_post, valid_data):
    mock_get_api_key.return_value = 'fake-api-key'

    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        'idToken': 'fake-id-token',
        'localId': 'fake-uid'
    }
    mock_post.return_value = mock_response

    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 200
    assert response.body['uid'] == 'fake-uid'
    assert response.body['token'] == 'fake-id-token'
    assert "Login successful" in response.body['message']

@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_falha(mock_get_api_key, mock_post, valid_data):
    mock_get_api_key.return_value = 'fake-api-key'

    mock_response = MagicMock()
    mock_response.status_code = 400
    mock_response.json.return_value = {
        'error': {
            'message': 'INVALID_PASSWORD'
        }
    }
    mock_post.return_value = mock_response

    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 400
    assert "INVALID_PASSWORD" in response.body['error']

@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_erro(mock_get_api_key, mock_post, valid_data):
    mock_get_api_key.return_value = 'fake-api-key'

    mock_post.side_effect = Exception("Network error")

    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 400
    assert "Invalid credentials" in response.body['error']

def test_authenticate_login_dados_invalidos(invalid_data):
    response = LoginController.authenticate_login(invalid_data)
    assert response.status_code == 400
    assert "Os seguintes campos são obrigatórios" in response.body['error']
