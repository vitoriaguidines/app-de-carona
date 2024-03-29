from src.views.http_types.http_response import HttpResponse
from src.controller.SimpleController import SimpleController

simple_controller = SimpleController()

class GetView:
    def __init__(self) -> None:
        self.endpoint_controllers = {"simple_endpoint": simple_controller.apply_simple}

    def call_controller(self, endpoint) -> HttpResponse:
        controller_handler = self.endpoint_controllers[endpoint]
        formatted_response = controller_handler()
        return HttpResponse(status_code=200, body=formatted_response)
