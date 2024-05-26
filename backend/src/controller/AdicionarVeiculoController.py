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
        
        # Aqui você pode adicionar mais validações, como verificar formatos específicos (por exemplo, formato da placa)
        
        return True, {}

    @staticmethod
    def adicionar_veiculo(data):
        try:
            # Valida os dados de entrada
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

            # Referência para o usuário específico no banco de dados
            user_ref = db.reference(f'users/{user_id}')

            # Verifique se o usuário existe
            if not user_ref.get():
                return HttpResponse(status_code=404, body={"error": "Usuário não encontrado."})

            # Cria uma nova referência para o veículo dentro do nó do usuário
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
