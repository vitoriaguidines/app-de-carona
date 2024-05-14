from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class AdicionarVeiculoController:
    @staticmethod
    def adicionar_veiculo(data):
        try:
            user_id = data.get('user_id')  # Obter o user_id do usuário que está adicionando o veículo
            driver_id = data.get('driver_id')
            marca = data.get('marca')
            modelo = data.get('modelo')
            placa = data.get('placa')
            cor = data.get('cor')
            ano = data.get('ano')

            # Referência para o usuário específico no banco de dados
            user_ref = db.reference(f'users/{user_id}')

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

            return HttpResponse(status_code=200, body={"veiculo_id": new_veiculo_ref.key, "message": "Veículo adicionado com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=400, body={"error": str(e)})