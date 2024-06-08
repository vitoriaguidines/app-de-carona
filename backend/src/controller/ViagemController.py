from firebase_admin import db
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse

class ViagemController:
        
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def buscar_viagens(data):
        try:
            required_fields = ['destino', 'horario', 'vagas']
            is_valid, validation_response = ViagemController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)
            
            destino = data['destino']
            horario = data['horario']
            vagas = data['vagas']

            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            '''
            viagens_filtradas = [
                viagem for viagem in viagens_data.values()
                if viagem.get('destino') == destino and viagem.get('vagas', 0) >= vagas and viagem.get('horario') >= horario and viagem.get('status') == 'ativa'
            ] '''

            data_formatada = datetime.strptime(horario, "%Y-%m-%dT%H:%M:%SZ").date()

            viagens_filtradas = [
                viagem for viagem in viagens_data.values()
                if viagem.get('destino') == destino and viagem.get('vagas', 0) >= vagas
                and datetime.strptime(viagem.get('horario'), "%Y-%m-%dT%H:%M:%SZ").date() == data_formatada
                and viagem.get('status') == 'ativa'
            ]

            # Ordenar por horário de forma crescente
            viagens_filtradas.sort(key=lambda x: datetime.strptime(x['horario'], "%Y-%m-%d %H:%M:%S"))

            return HttpResponse(status_code=200, body={"viagens": viagens_filtradas})

        except Exception as e:
            print(f"Erro ao buscar viagens: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
