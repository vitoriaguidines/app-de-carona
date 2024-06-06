import pytest
from unittest.mock import patch, MagicMock
from src.controller.LoginController import LoginController
from src.views.http_types.http_response import HttpResponse

# Fixture para dados válidos de login
@pytest.fixture
def valid_data():
    return {
        'email': 'user@example.com',
        'senha': 'validpassword'
    }

# Fixture para dados inválidos de login
@pytest.fixture
def invalid_data():
    return {
        'email': '',
        'senha': ''
    }

# Teste para validar dados de login com sucesso
def test_validar_dados_sucesso(valid_data):
    # Chama o método para validar dados de login com dados válidos
    is_valid, response = LoginController.validar_dados(valid_data, ['email', 'senha'])
    assert is_valid
    assert response == {}

# Teste para validar dados de login com falha
def test_validar_dados_falha(invalid_data):
    # Chama o método para validar dados de login com dados inválidos
    is_valid, response = LoginController.validar_dados(invalid_data, ['email', 'senha'])
    assert not is_valid
    assert "Os seguintes campos são obrigatórios" in response['error']

# Teste para autenticar login com sucesso
@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_sucesso(mock_get_api_key, mock_post, valid_data):
    # Configura o mock para retornar uma chave de API falsa
    mock_get_api_key.return_value = 'fake-api-key'

    # Configura o mock para simular uma resposta bem-sucedida da API Firebase Authentication
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        'idToken': 'fake-id-token',
        'localId': 'fake-uid'
    }
    mock_post.return_value = mock_response

    # Chama o método para autenticar login com dados válidos
    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 200
    assert response.body['uid'] == 'fake-uid'
    assert response.body['token'] == 'fake-id-token'
    assert "Login successful" in response.body['message']

# Teste para autenticar login com falha
@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_falha(mock_get_api_key, mock_post, valid_data):
    # Configura o mock para retornar uma chave de API falsa
    mock_get_api_key.return_value = 'fake-api-key'

    # Configura o mock para simular uma resposta de erro da API Firebase Authentication
    mock_response = MagicMock()
    mock_response.status_code = 400
    mock_response.json.return_value = {
        'error': {
            'message': 'INVALID_PASSWORD'
        }
    }
    mock_post.return_value = mock_response

    # Chama o método para autenticar login com dados válidos
    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 400
    assert "INVALID_PASSWORD" in response.body['error']

# Teste para autenticar login com erro de rede
@patch('requests.post')
@patch('src.drivers.firebase_config.get_api_key')
def test_authenticate_login_erro(mock_get_api_key, mock_post, valid_data):
    # Configura o mock para retornar uma chave de API falsa
    mock_get_api_key.return_value = 'fake-api-key'

    # Configura o mock para simular um erro de rede ao chamar a API Firebase Authentication
    mock_post.side_effect = Exception("Network error")

    # Chama o método para autenticar login com dados válidos
    response = LoginController.authenticate_login(valid_data)
    assert response.status_code == 400
    assert "Invalid credentials" in response.body['error']

# Teste para autenticar login com dados inválidos
def test_authenticate_login_dados_invalidos(invalid_data):
    # Chama o método para autenticar login com dados inválidos
    response = LoginController.authenticate_login(invalid_data)
    assert response.status_code == 400
    assert "Os seguintes campos são obrigatórios" in response.body['error']
