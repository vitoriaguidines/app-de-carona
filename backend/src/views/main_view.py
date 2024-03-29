from src.views.endpoints_views.get_view import GetView
from src.views.endpoints_views.post_view import PostView

get_view = GetView()
post_view = PostView()

endpoint_handlers = {
        # GET calls
        "get_view": get_view.call_controller,

        # POST calls
        "post_view": post_view.call_controller,     
    }

class MainView():

    def __init__(self) -> None:
        self.endpoints = endpoint_handlers