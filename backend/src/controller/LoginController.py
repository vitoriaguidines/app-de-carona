import requests
from firebase_admin import auth
from src.drivers.firebase_config import initialize_firebase_app, get_api_key
from src.views.http_types.http_response import HttpResponse
import logging
import json

# Inicialize o app Firebase
initialize_firebase_app()

class LoginController:
    @staticmethod
    def validar_dados(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return False, {"error": f"Os seguintes campos são obrigatórios: {', '.join(missing_fields)}"}
        
        return True, {}

    @staticmethod
    def authenticate_login(data):
        try:
            required_fields = ['email', 'senha']
            is_valid, validation_response = LoginController.validar_dados(data, required_fields)
            if not is_valid:
                return HttpResponse(status_code=400, body=validation_response)

            email = data['email']
            password = data['senha']

            try:
                # Firebase Authentication REST API endpoint
                firebase_api_key = get_api_key()
                url = f'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={firebase_api_key}'
                
                payload = {
                    "email": email,
                    "password": password,
                    "returnSecureToken": True
                }
                
                response = requests.post(url, data=json.dumps(payload))
                
                if response.status_code == 200:
                    response_data = response.json()
                    id_token = response_data['idToken']
                    uid = response_data['localId']

                    logging.info(f"Login successful for user: {uid}")
                    return HttpResponse(status_code=200, body={"uid": uid, "token": id_token, "message": "Login successful."})
                else:
                    response_data = response.json()
                    logging.warning(f"Login failed: {response_data['error']['message']}")
                    return HttpResponse(status_code=400, body={"error": response_data['error']['message']})

            except Exception as e:
                logging.warning(f"Error: {str(e)}")
                return HttpResponse(status_code=400, body={"error": "Invalid credentials"})

        except Exception as e:
            logging.error(f"Error during login: {str(e)}")
            return HttpResponse(status_code=500, body={"error": str(e)})