import json
from firebase_admin import db
from src.drivers.firebase_config import initialize_firebase_app
from src.views.http_types.http_response import HttpResponse
from flask import request

class HistoricoDeCaronasController:
    
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def listar_historico_user():
        try:
            user_id = request.args.get('user_id')
            if not user_id:
                return HttpResponse(status_code=400, body={"error": "ID do usuário não foi fornecido."})

            # Obtém o histórico de caronas do usuário
            viagens_ref = db.reference('viagens')
            viagens_data = viagens_ref.get()

            if not viagens_data:
                return HttpResponse(status_code=404, body={"error": "Histórico de caronas não encontrado."})

            viagens_user = {key: viagem for key, viagem in viagens_data.items() if (viagem.get('motorista_id') == user_id or user_id in viagem.get('passageiros', []))}

            if not viagens_user:
                return HttpResponse(status_code=404, body={"error": "Nenhuma viagem encontrada para o passageiro especificado."})

            return HttpResponse(status_code=200, body={"historico_de_caronas": viagens_user})
        
        except Exception as e:
            print(f"Erro ao listar histórico: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

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
    def listar_viagens_motorista():
        try:
            motorista_id = request.args.get('motorista_id')
            if not motorista_id:
                return HttpResponse(status_code=404, body={"error": "O motorista_id é obrigatório."})

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
    def listar_viagens_passageiro():
        try:
            passageiro_id = request.args.get('passageiro_id')
            if not passageiro_id:
                return HttpResponse(status_code=404, body={"error": "O passageiro_id é obrigatório."})

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
    def obter_detalhes_viagem():
        try:
            viagem_id = request.args.get('viagem_id')
            if not viagem_id:
                return HttpResponse(status_code=404, body={"error": "O viagem_id é obrigatório."})

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
