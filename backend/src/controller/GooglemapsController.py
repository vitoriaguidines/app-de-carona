import googlemaps
from datetime import datetime
from geopy.distance import geodesic
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
            directions_result = self.gmaps.directions(origem, destino, mode="driving", departure_time=now)
            print("Resultado da API Google Maps:", directions_result)

            # Retorna uma resposta HTTP com o resultado
            return HttpResponse(status_code=200, body={"route": directions_result})
        except Exception as e:
            print(f"Erro ao calcular o percurso: {e}")
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
            within_radius = distance_in_meters <= raio
            return HttpResponse(status_code=200, body={"within_radius": within_radius})
        except Exception as e:
            print(f"Erro ao calcular ponto em raio: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    def menor_distancia_entre_rota_e_ponto(self, data):
        # Obter direções da origem ao destino
        resultado_direcoes = self.gmaps.directions((data["origem"][0], data["origem"][1]), (data["destino"][0], data["destino"][1]), mode="driving")

        if not resultado_direcoes:
            return HttpResponse(status_code=400, body={"error": "Falha ao obter direções"})

        # Extrair os passos na rota
        passos = resultado_direcoes[0]['legs'][0]['steps']

        # Inicializar a distância mínima com um número grande
        menor_distancia = float('inf')

        # Iterar sobre cada passo na rota
        for passo in passos:
            # Obter a localização inicial e final do passo
            local_inicio = (passo['start_location']['lat'], passo['start_location']['lng'])
            local_fim = (passo['end_location']['lat'], passo['end_location']['lng'])

            # Calcular as distâncias do ponto_c para as localizações inicial e final
            distancia_para_inicio = geodesic(local_inicio, (data["destino_carona"][0], data["destino_carona"][1])).kilometers
            distancia_para_fim = geodesic(local_fim, (data["destino_carona"][0], data["destino_carona"][1])).kilometers

            # Atualizar a distância mínima se uma distância menor for encontrada
            menor_distancia = min(menor_distancia, distancia_para_inicio, distancia_para_fim)

        return HttpResponse(status_code=200, body={"distance": menor_distancia})

    def get_endereco(self, location):
        # Perform reverse geocoding to get the address details
        reverse_geocode_result = self.gmaps.reverse_geocode((location["lat"], location["lng"]))

        if reverse_geocode_result:
            # Extract the address components
            nearest_address = reverse_geocode_result[0]['formatted_address']
            return HttpResponse(status_code=200, body={"endereco": nearest_address})
        # Return None if no address found
        return HttpResponse(status_code=404, body={"error": "Endereço não encontrado"})

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

    percurso_teste = {
        "origem": (-22.8102774966302, -42.978291476532895),
        "destino": ( -22.84938559876162, -42.95142449866303),
        "destino_carona": (-22.82425217767599, -42.971290146228284)
    }

    # Testar os métodos
    response_percurso = maps_controller.calcular_percurso(data_percurso)
    print("Resposta do método calcular_percurso:", response_percurso.body)

    response_raio = maps_controller.ponto_em_raio(data_raio)
    print("Resposta do método ponto_em_raio:", response_raio.body)

    response_menor_distancia = maps_controller.menor_distancia_entre_rota_e_ponto(percurso_teste)
    print("Resposta do método menor_distancia_entre_rota_e_ponto:", response_menor_distancia.body)

    response_endereco = maps_controller.get_endereco({"lat": -22.8102774966302, "lng": -42.978291476532895})
    print("Resposta do método get_endereco:", response_endereco.body)
