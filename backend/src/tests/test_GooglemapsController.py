import pytest
from unittest.mock import patch, MagicMock
from src.controller.GooglemapsController import MapsController
from src.views.http_types.http_response import HttpResponse

@pytest.fixture
def mock_gmaps():
    return MagicMock()

def test_calcular_percurso_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    origem = "Avenida Paulista, 1578, São Paulo, SP"
    destino = "Rua Haddock Lobo, 595, São Paulo, SP"

    mock_gmaps.directions.return_value = [{'legs': [{'steps': [{'start_location': {'lat': 1, 'lng': 1}, 'end_location': {'lat': 2, 'lng': 2}}]}]}]

    response = controller.calcular_percurso({"origem": origem, "destino": destino})

    assert response.status_code == 200
    assert "route" in response.body

def test_calcular_percurso_campos_obrigatorios_faltando(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    response = controller.calcular_percurso({})

    assert response.status_code == 400
    assert "Campos" in response.body["error"]

def test_calcular_percurso_excecao(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    mock_gmaps.directions.side_effect = Exception("Erro na API Google Maps")

    response = controller.calcular_percurso({"origem": "A", "destino": "B"})

    assert response.status_code == 500
    assert "Erro" in response.body["error"]

def test_ponto_em_raio_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    origem = "Avenida Paulista, 1578, São Paulo, SP"
    destino = "Rua Haddock Lobo, 595, São Paulo, SP"
    raio = 10000

    mock_gmaps.distance_matrix.return_value = {'rows': [{'elements': [{'distance': {'value': 8000}}]}]}

    response = controller.ponto_em_raio({"origem": origem, "destino": destino, "raio": raio})

    assert response.status_code == 200
    assert "within_radius" in response.body
    assert response.body["within_radius"] == True

def test_ponto_em_raio_campos_obrigatorios_faltando(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    response = controller.ponto_em_raio({})

    assert response.status_code == 400
    assert "Campos" in response.body["error"]

def test_ponto_em_raio_excecao(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    mock_gmaps.distance_matrix.side_effect = Exception("Erro na API Google Maps")

    response = controller.ponto_em_raio({"origem": "A", "destino": "B", "raio": 10000})

    assert response.status_code == 500
    assert "Erro" in response.body["error"]

def test_menor_distancia_entre_rota_e_ponto_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    mock_resultado_direcoes = [{'legs': [{'steps': [{'start_location': {'lat': 1, 'lng': 1}, 'end_location': {'lat': 1, 'lng': 1}}]}]}]
    mock_gmaps.directions.return_value = mock_resultado_direcoes

    data = {
        "origem": [1, 1],
        "destino": [1, 1],
        "destino_carona": [1, 1]
    }

    response = controller.menor_distancia_entre_rota_e_ponto(data)

    assert response.status_code == 200
    assert "distance" in response.body
    assert response.body["distance"] == 0.0

def test_menor_distancia_entre_rota_e_ponto_falha_obter_direcoes(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    mock_gmaps.directions.return_value = None

    data = {
        "origem": [1, 1],
        "destino": [2, 2],
        "destino_carona": [1.5, 1.5]
    }

    response = controller.menor_distancia_entre_rota_e_ponto(data)

    assert response.status_code == 400
    assert "Falha ao obter direções" in response.body["error"]

def test_menor_distancia_entre_rota_e_ponto_excecao(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps
