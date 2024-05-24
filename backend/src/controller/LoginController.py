from firebase_admin import auth
from src.views.http_types.http_response import HttpResponse
import logging

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
                # Tente buscar o usuário pelo email
                user = auth.get_user_by_email(email)
                
                # Verificação de senha deve ser feita no cliente ou em um serviço separado
                # Simulação de verificação de senha
                if password != "senhaSegura123":  # Apenas um exemplo, não deve ser usado em produção
                    raise auth.AuthError("INVALID_PASSWORD", "Senha inválida")

                logging.info(f"Login successful for user: {user.uid}")
                return HttpResponse(status_code=200, body={"uid": user.uid, "message": "Login successful."})

            except auth.UserNotFoundError:
                logging.warning("User not found")
                return HttpResponse(status_code=400, body={"error": "User not found"})
            except auth.AuthError as e:
                logging.warning(str(e))
                return HttpResponse(status_code=400, body={"error": "Invalid credentials"})

        except Exception as e:
            logging.error(f"Error during login: {str(e)}")
            return HttpResponse(status_code=500, body={"error": str(e)})
