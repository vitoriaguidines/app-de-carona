import pytest
from unittest.mock import patch, MagicMock
from src.controller.GooglemapsController import MapsController
from src.views.http_types.http_response import HttpResponse

# Fixture para mock do Google Maps
@pytest.fixture
def mock_gmaps():
    return MagicMock()

# Teste para calcular percurso com sucesso
def test_calcular_percurso_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    origem = "Avenida Paulista, 1578, São Paulo, SP"
    destino = "Rua Haddock Lobo, 595, São Paulo, SP"

    # Mock da resposta da API Google Maps
    mock_gmaps.directions.return_value = [{'legs': [{'steps': [{'start_location': {'lat': 1, 'lng': 1}, 'end_location': {'lat': 2, 'lng': 2}}]}]}]

    # Chama o método calcular_percurso
    response = controller.calcular_percurso({"origem": origem, "destino": destino})

    # Verifica se a resposta tem status 200 e contém a rota
    assert response.status_code == 200
    assert "route" in response.body

# Teste para calcular percurso com campos obrigatórios faltando
def test_calcular_percurso_campos_obrigatorios_faltando(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Chama o método calcular_percurso com dados vazios
    response = controller.calcular_percurso({})

    # Verifica se a resposta tem status 400 e mensagem de erro correta
    assert response.status_code == 400
    assert "Campos" in response.body["error"]

# Teste para lidar com exceção ao calcular percurso
def test_calcular_percurso_excecao(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Mock para simular uma exceção na API Google Maps
    mock_gmaps.directions.side_effect = Exception("Erro na API Google Maps")

    # Chama o método calcular_percurso
    response = controller.calcular_percurso({"origem": "A", "destino": "B"})

    # Verifica se a resposta tem status 500 e mensagem de erro correta
    assert response.status_code == 500
    assert "Erro" in response.body["error"]

# Teste para verificar se ponto está dentro do raio com sucesso
def test_ponto_em_raio_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    origem = "Avenida Paulista, 1578, São Paulo, SP"
    destino = "Rua Haddock Lobo, 595, São Paulo, SP"
    raio = 10000

    # Mock da resposta da API Google Maps
    mock_gmaps.distance_matrix.return_value = {'rows': [{'elements': [{'distance': {'value': 8000}}]}]}

    # Chama o método ponto_em_raio
    response = controller.ponto_em_raio({"origem": origem, "destino": destino, "raio": raio})

    # Verifica se a resposta tem status 200 e se o ponto está dentro do raio
    assert response.status_code == 200
    assert "within_radius" in response.body
    assert response.body["within_radius"] == True

# Teste para verificar se ponto está dentro do raio com campos obrigatórios faltando
def test_ponto_em_raio_campos_obrigatorios_faltando(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Chama o método ponto_em_raio com dados vazios
    response = controller.ponto_em_raio({})

    # Verifica se a resposta tem status 400 e mensagem de erro correta
    assert response.status_code == 400
    assert "Campos" in response.body["error"]

# Teste para lidar com exceção ao verificar se ponto está dentro do raio
def test_ponto_em_raio_excecao(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Mock para simular uma exceção na API Google Maps
    mock_gmaps.distance_matrix.side_effect = Exception("Erro na API Google Maps")

    # Chama o método ponto_em_raio
    response = controller.ponto_em_raio({"origem": "A", "destino": "B", "raio": 10000})

    # Verifica se a resposta tem status 500 e mensagem de erro correta
    assert response.status_code == 500
    assert "Erro" in response.body["error"]

# Teste para calcular a menor distância entre a rota e um ponto com sucesso
def test_menor_distancia_entre_rota_e_ponto_sucesso(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Mock da resposta da API Google Maps
    mock_resultado_direcoes = [{'legs': [{'steps': [{'start_location': {'lat': 1, 'lng': 1}, 'end_location': {'lat': 1, 'lng': 1}}]}]}]
    mock_gmaps.directions.return_value = mock_resultado_direcoes

    data = {
        "origem": [1, 1],
        "destino": [1, 1],
        "destino_carona": [1, 1]
    }

    # Chama o método menor_distancia_entre_rota_e_ponto
    response = controller.menor_distancia_entre_rota_e_ponto(data)

    # Verifica se a resposta tem status 200 e a distância calculada é correta
    assert response.status_code == 200
    assert "distance" in response.body
    assert response.body["distance"] == 0.0

# Teste para falha ao obter direções no cálculo da menor distância entre a rota e um ponto
def test_menor_distancia_entre_rota_e_ponto_falha_obter_direcoes(mock_gmaps):
    controller = MapsController()
    controller.gmaps = mock_gmaps

    # Mock para simular ausência de direções retornadas pela API Google Maps
    mock_gmaps.directions.return_value = None

    data = {
        "origem": [1, 1],
        "destino": [2, 2],
        "destino_carona": [1.5, 1.5]
    }

    # Chama o método menor_distancia_entre_rota_e_ponto
    response = controller.menor_distancia_entre_rota_e_ponto(data)

    # Verifica se a resposta tem status 400 e mensagem de erro correta
    assert response.status_code == 400
    assert "Falha ao obter direções" in response.body["error"]