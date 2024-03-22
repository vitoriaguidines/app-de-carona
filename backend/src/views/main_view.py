from src.views.http_types.http_request import HttpRequest
from src.views.http_types.http_response import HttpResponse

class TagCreatorView:
    #essa classe será responsável para interagir com o http"
    def validate_and_create(self,http_request: HttpRequest) ->HttpResponse:
        
        print('estou na minha view')
        print(http_request)

        return HttpResponse(status_code=200,body={"hello":"world"})
