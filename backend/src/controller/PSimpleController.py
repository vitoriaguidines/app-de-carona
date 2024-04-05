class PostController:
    def example_method(self, data):
        # Aqui você pode adicionar a lógica para processar os dados recebidos
        # Por simplicidade, vamos apenas retornar uma mensagem com os dados recebidos
        response = {
            "message": "Dados recebidos com sucesso!",
            "received_data": data
        }
        return response