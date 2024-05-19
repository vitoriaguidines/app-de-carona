import googlemaps
from datetime import datetime
from src.drivers.apiGoogle_config import ApiGoogleConfig  # Importar a configuração da API
from src.views.http_types.http_response import HttpResponse

class MapsController:
    def __init__(self):
        # Obter a chave da API
        api_key = ApiGoogleConfig.get_api_key()
        self.gmaps = googlemaps.Client(key=api_key)

    def calcular_percurso(self, data):
        origem = data.get('origem')
        destino = data.get('destino')

        if not origem or not destino:
            return HttpResponse(status_code=400, body={"error": "Campos 'origem' e 'destino' são obrigatórios."})

        print("Origem:", origem)
        print("Destino:", destino)

        try:
            # Calcula a rota entre origem e destino
            now = datetime.now()
            print("Data e Hora Atuais:", now)
            directions_result = self.gmaps.directions(origem,
                                                      destino,
                                                      mode="driving",
                                                      departure_time=now)
            print("Resultado da API Google Maps:", directions_result)

            # Retorna uma resposta HTTP com o resultado
            return HttpResponse(status_code=200, body={"route": directions_result})
        except Exception as e:
            # Retorna uma resposta HTTP com o erro
            print("Erro ao calcular o percurso:", e)
            return HttpResponse(status_code=500, body={"error": str(e)})

    def ponto_em_raio(self, data):
        origem = data.get('origem')
        destino = data.get('destino')
        raio = data.get('raio')

        if not origem or not destino or not raio:
            return HttpResponse(status_code=400, body={"error": "Campos 'origem', 'destino' e 'raio' são obrigatórios."})

        print("Origem:", origem)
        print("Destino:", destino)
        print("Raio:", raio)

        try:
            # Calcula a distância entre origem e destino
            distance_result = self.gmaps.distance_matrix(origem, destino, mode="driving")
            distance_in_meters = distance_result['rows'][0]['elements'][0]['distance']['value']

            print("Resultado da API Distance Matrix:", distance_result)
            print("Distância em metros:", distance_in_meters)

            # Verifica se a distância está dentro do raio especificado
            if distance_in_meters <= raio:
                return HttpResponse(status_code=200, body={"within_radius": True})
            else:
                return HttpResponse(status_code=200, body={"within_radius": False})
        except Exception as e:
            # Retorna uma resposta HTTP com o erro
            print("Erro ao calcular ponto em raio:", e)
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == '__main__':
    # Cria uma instância do MapsController
    maps_controller = MapsController()

    # Define os dados de origem, destino e raio
    data_percurso = {
        "origem": "Avenida Paulista, 1578, São Paulo, SP",
        "destino": "Rua Haddock Lobo, 595, São Paulo, SP"
    }

    data_raio = {
        "origem": "Avenida Paulista, 1578, São Paulo, SP",
        "destino": "Rua Haddock Lobo, 595, São Paulo, SP",
        "raio": 10000  # 10 km
    }

    # Chama o método calcular_percurso
    response_percurso = maps_controller.calcular_percurso(data_percurso)
    print("Resposta do método calcular_percurso:", response_percurso.body)

    # Chama o método ponto_em_raio
    response_raio = maps_controller.ponto_em_raio(data_raio)
    print("Resposta do método ponto_em_raio:", response_raio.body)
