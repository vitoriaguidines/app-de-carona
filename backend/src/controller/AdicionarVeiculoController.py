from firebase_admin import db
from src.views.http_types.http_response import HttpResponse
import logging

class AdicionarVeiculoController:
    @staticmethod
    def validar_dados(data):
        required_fields = ['user_id', 'driver_id', 'marca', 'modelo', 'placa', 'cor', 'ano']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def adicionar_veiculo(data):
        try:
            is_valid, validation_response = AdicionarVeiculoController.validar_dados(data)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            user_id = data['user_id']
            driver_id = data['driver_id']
            marca = data['marca']
            modelo = data['modelo']
            placa = data['placa']
            cor = data['cor']
            ano = data['ano']

            user_ref = db.reference(f'users/{user_id}')
            if not user_ref.get():
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            veiculos_ref = user_ref.child('veiculos')
            new_veiculo_ref = veiculos_ref.push()
            new_veiculo_ref.set({
                'driver_id': driver_id,
                'marca': marca,
                'modelo': modelo,
                'placa': placa,
                'cor': cor,
                'ano': ano,
                'veiculo_id': new_veiculo_ref.key
            })

            logging.info(f"Veículo adicionado com sucesso: {new_veiculo_ref.key}")
            return HttpResponse(status_code=200, body={"veiculo_id": new_veiculo_ref.key, "message": "Veículo adicionado com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao adicionar veículo: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})

    @staticmethod
    def excluir_veiculo(data):
        print("oi")
        try:
            user_id = data.get('user_id')
            veiculo_id = data.get('veiculo_id')

            if not user_id or not veiculo_id:
                return HttpResponse(status_code=400, body={"error": "Os campos user_id e veiculo_id são obrigatórios."})

            user_ref = db.reference(f'users/{user_id}')
            if not user_ref.get():
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            veiculo_ref = user_ref.child('veiculos').child(veiculo_id)
            if not veiculo_ref.get():
                return HttpResponse(status_code=404, body={"error": "Veículo não encontrado."})

            veiculo_ref.delete()

            logging.info(f"Veículo excluído com sucesso: {veiculo_id}")
            return HttpResponse(status_code=200, body={"message": "Veículo excluído com sucesso."})

        except Exception as e:
            logging.error(f"Erro ao excluir veículo: {e}")
            return HttpResponse(status_code=500, body={"error": str(e)})
