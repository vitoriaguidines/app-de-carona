# app-de-carona/backend/src/controller/NotificacoesController.py
from src.views.http_types.http_response import HttpResponse

class PagamentoController:
    @staticmethod
    def processar_pagamento(data):
        try:
            # Lógica

            return HttpResponse(status_code=200, body={"message": "Notificação enviada com sucesso."})

        except Exception as e:
            return HttpResponse(status_code=400, body={"error": str(e)})