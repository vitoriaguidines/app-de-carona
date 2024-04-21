import googlemaps
from flask import jsonify

class GoogleMapsController:
    def __init__(self, api_key):
        self.gmaps = googlemaps.Client(key=api_key)

    def calcular_rota(self, origem, destino):
        try:
            rota = self.gmaps.directions(origem, destino)
            return jsonify(rota)
        except Exception as e:
            return {"error": str(e)}
