import pytest
from unittest.mock import patch, MagicMock
from src.controller.GerenciamentoViagensController import GerenciamentoViagensController
from src.views.http_types.http_response import HttpResponse

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

def test_adicionar_viagem_sucesso(valid_data_adicionar):
    with patch('firebase_admin.db.reference') as mock_db_ref:
        mock_viagens_ref = MagicMock()
        mock_nova_viagem_ref = MagicMock()
        mock_nova_viagem_ref.key = 'nova_viagem123'

        mock_viagens_ref.push.return_value = mock_nova_viagem_ref
        mock_db_ref.return_value = mock_viagens_ref

        response = GerenciamentoViagensController.adicionar_viagem(valid_data_adicionar)

        assert response.status_code == 200
        assert response.body['message'] == "Viagem adicionada com sucesso."

def test_adicionar_viagem_campos_obrigatorios_faltando():
    response = GerenciamentoViagensController.adicionar_viagem({})

    assert response.status_code == 400
    missing_fields = ['motorista_id', 'origem', 'destino', 'horario', 'vagas', 'preco']
    for field in missing_fields:
        assert field in response.body['error']


def test_adicionar_viagem_excecao(valid_data_adicionar):
    with patch('firebase_admin.db.reference', side_effect=Exception("Erro no banco de dados")) as mock_db_ref:
        response = GerenciamentoViagensController.adicionar_viagem(valid_data_adicionar)

        assert response.status_code == 500
        assert "Erro no banco de dados" in response.body['error']

# Testes para editar_viagem e cancelar_viagem
# (Semelhante aos testes para adicionar_viagem)
