from typing import Dict

class HttpRequest:
    def __init__(
            self,
            header: Dict = None,
            body: Dict = None,
            query_params: Dict = None,
            files: Dict = None  # Adicionando o parâmetro files
            ) -> None:
        self.header = header
        self.body = body
        self.query_params = query_params
        self.files = files  # Inicializando o parâmetro files
