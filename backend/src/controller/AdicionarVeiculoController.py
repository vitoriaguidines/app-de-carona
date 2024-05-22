from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class AdicionarVeiculoController:
    @staticmethod
    def adicionar_veiculo(data):
        try:
            # Obtenha e valide os dados de entrada
            user_id = data.get('user_id')
            driver_id = data.get('driver_id')
            marca = data.get('marca')
            modelo = data.get('modelo')
            placa = data.get('placa')
            cor = data.get('cor')
            ano = data.get('ano')

            if not all([user_id, driver_id, marca, modelo, placa, cor, ano]):
                return HttpResponse(status_code=400, body={"error": "Todos os campos são obrigatórios."})

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

            return HttpResponse(status_code=200, body={"veiculo_id": new_veiculo_ref.key, "message": "Veículo adicionado com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=500, body={"error": str(e)})
