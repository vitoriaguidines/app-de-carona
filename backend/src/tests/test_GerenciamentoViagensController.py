import pytest
from unittest.mock import patch, MagicMock
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController
from src.views.http_types.http_response import HttpResponse

# Fixtures para dados válidos de teste
@pytest.fixture
def valid_data_adicionar():
    return {
        'motorista_id': 'motorista123',
        'origem': 'Origem',
        'destino': 'Destino',
        'horario': '2024-06-01 09:00',
        'vagas': 3,
        'preco': 50
    }

@pytest.fixture
def valid_data_editar():
    return {
        'viagem_id': 'viagem123',
        'motorista_id': 'novo_motorista123',
        'origem': 'Nova Origem',
        'destino': 'Novo Destino',
        'horario': '2024-06-01 10:00',
        'vagas': 4,
        'preco': 60
    }

@pytest.fixture
def valid_data_cancelar():
    return {
        'viagem_id': 'viagem123'
    }

# Teste para adicionar uma viagem com sucesso
def test_adicionar_viagem_sucesso(valid_data_adicionar):
    # Mock para a referência do banco de dados do Firebase
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_viagens_ref = MagicMock()
        mock_nova_viagem_ref = MagicMock()
        mock_nova_viagem_ref.key = 'nova_viagem123'

        # Configura o mock para retornar a nova referência da viagem
        mock_viagens_ref.push.return_value = mock_nova_viagem_ref
        mock_db_ref.return_value = mock_viagens_ref

        # Chama o método de adicionar viagem
        response = GerenciamentoViagensController.adicionar_viagem(valid_data_adicionar)

        # Verifica se a resposta tem status 200 e a mensagem de sucesso correta
        assert response.status_code == 200
        assert response.body['message'] == "Viagem adicionada com sucesso."

# Teste para verificar campos obrigatórios faltando ao adicionar uma viagem
def test_adicionar_viagem_campos_obrigatorios_faltando():
    # Chama o método de adicionar viagem com dados vazios
    response = GerenciamentoViagensController.adicionar_viagem({})

    # Verifica se a resposta tem status 400
    assert response.status_code == 400
    missing_fields = ['motorista_id', 'origem', 'destino', 'horario', 'vagas', 'preco']
    # Verifica se cada campo obrigatório está mencionado na mensagem de erro
    for field in missing_fields:
        assert field in response.body['error']

# Teste para lidar com exceção ao adicionar uma viagem
def test_adicionar_viagem_excecao(valid_data_adicionar):
    # Mock para simular uma exceção no banco de dados
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        # Chama o método de adicionar viagem
        response = GerenciamentoViagensController.adicionar_viagem(valid_data_adicionar)

        # Verifica se a resposta tem status 500 e a mensagem de erro correta
        assert response.status_code == 500
        assert "Erro no banco de dados" in response.body['error']

# Teste para editar uma viagem com sucesso
def test_editar_viagem_sucesso(valid_data_editar):
    # Mock para a referência do banco de dados do Firebase
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_viagens_ref = MagicMock()
        mock_viagem_ref = MagicMock()

        # Configura o mock para retornar a referência da viagem a ser editada
        mock_db_ref.return_value = mock_viagens_ref
        mock_viagens_ref.child.return_value = mock_viagem_ref

        # Chama o método de editar viagem
        response = GerenciamentoViagensController.editar_viagem(valid_data_editar)

        # Verifica se a resposta tem status 200 e a mensagem de sucesso correta
        assert response.status_code == 200
        assert response.body['message'] == "Viagem editada com sucesso."

# Teste para verificar campos obrigatórios faltando ao editar uma viagem
def test_editar_viagem_campos_obrigatorios_faltando():
    # Chama o método de editar viagem com dados vazios
    response = GerenciamentoViagensController.editar_viagem({})

    # Verifica se a resposta tem status 400
    assert response.status_code == 400
    
    # Verifica se a mensagem de erro corresponde a qualquer campo obrigatório ausente
    expected_errors = [
        'O ID da viagem é obrigatório.',
        'O motorista id é obrigatório.',
        'A origem é obrigatória.',
        'O destino é obrigatório.',
        'O horário é obrigatório.',
        'O número de vagas é obrigatório.',
        'O preço é obrigatório.'
    ]
    
    assert response.body['error'] in expected_errors

# Teste para lidar com exceção ao editar uma viagem
def test_editar_viagem_excecao(valid_data_editar):
    # Mock para simular uma exceção no banco de dados
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        # Chama o método de editar viagem
        response = GerenciamentoViagensController.editar_viagem(valid_data_editar)

        # Verifica se a resposta tem status 500 e a mensagem de erro correta
        assert response.status_code == 500
        assert "Erro no banco de dados" in response.body['error']

# Teste para cancelar uma viagem com sucesso
def test_cancelar_viagem_sucesso(valid_data_cancelar):
    # Mock para a referência do banco de dados do Firebase
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_viagens_ref = MagicMock()
        mock_viagem_ref = MagicMock()

        # Configura o mock para retornar a referência da viagem a ser cancelada
        mock_db_ref.return_value = mock_viagens_ref
        mock_viagens_ref.child.return_value = mock_viagem_ref

        # Chama o método de cancelar viagem
        response = GerenciamentoViagensController.cancelar_viagem(valid_data_cancelar)

        # Verifica se a resposta tem status 200 e a mensagem de sucesso correta
        assert response.status_code == 200
        assert response.body['message'] == "Viagem cancelada com sucesso."

# Teste para verificar campos obrigatórios faltando ao cancelar uma viagem
def test_cancelar_viagem_campos_obrigatorios_faltando():
    # Chama o método de cancelar viagem com dados vazios
    response = GerenciamentoViagensController.cancelar_viagem({})

    # Verifica se a resposta tem status 400 e a mensagem de erro correta
    assert 'O ID da viagem é obrigatório.' in response.body['error']

# Teste para lidar com exceção ao cancelar uma viagem
def test_cancelar_viagem_excecao(valid_data_cancelar):
    # Mock para simular uma exceção no banco de dados
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        # Chama o método de cancelar viagem
        response = GerenciamentoViagensController.cancelar_viagem(valid_data_cancelar)

        # Verifica se a resposta tem status 500 e a mensagem de erro correta
        assert response.status_code == 500
        assert "Erro no banco de dados" in response.body['error']