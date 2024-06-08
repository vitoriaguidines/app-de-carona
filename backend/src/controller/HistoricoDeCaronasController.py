from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class HistoricoDeCaronasController:
    
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    '''
    @staticmethod
    def listar_historico(user_id):
        try:
            if not user_id:
                return HttpResponse(status_code=400, body={"error": "ID do usuário não fornecido."})

            # Obtém o histórico de caronas do usuário
            historico_ref = db.reference(f'users/{user_id}/historico_de_caronas')
            historico_data = historico_ref.get()

            if not historico_data:
                return HttpResponse(status_code=404, body={"error": "Histórico de caronas não encontrado."})

            return HttpResponse(status_code=200, body={"historico_de_caronas": historico_data})
        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)}) '''

    @staticmethod
    def listar_viagens():
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            return HttpResponse(status_code=200, body={"viagens": viagens_data})

        except Exception as e:
            print(f"Erro ao listar viagens: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def listar_viagens_motorista(motorista_id):
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            viagens_motorista = {key: viagem for key, viagem in viagens_data.items() if viagem.get('motorista_id') == motorista_id}

            if not viagens_motorista:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o motorista especificado."})

            return HttpResponse(status_code=200, body={"viagens": viagens_motorista})

        except Exception as e:
            print(f"Erro ao listar viagens do motorista: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def listar_viagens_passageiro(passageiro_id):
        try:
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada."})

            viagens_passageiro = {key: viagem for key, viagem in viagens_data.items() if passageiro_id in viagem.get('passageiros', [])}

            if not viagens_passageiro:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o passageiro especificado."})

            return HttpResponse(status_code=200, body={"viagens": viagens_passageiro})

        except Exception as e:
            print(f"Erro ao listar viagens do passageiro: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def obter_detalhes_viagem(viagem_id):
        try:
            viagem_ref = db.reference(f'viagens/{viagem_id}')
            viagem_data = viagem_ref.get()

            if not viagem_data:
                return HttpResponse(status_code=404, body={"error": "Viagem não encontrada."})

            return HttpResponse(status_code=200, body={"viagem": viagem_data})

        except Exception as e:
            print(f"Erro ao obter detalhes da viagem: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
