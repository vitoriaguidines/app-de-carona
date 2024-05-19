import bcrypt
from firebase_admin import db
from src.views.http_types.http_response import HttpResponse

class LoginController:
    @staticmethod
    def authenticate_login(data):
        try:
            email = data.get('email')
            password = data.get('senha')

            # Busca o usuário pelo email no Realtime Database
            users_ref = db.reference('users')
            user_query = users_ref.order_by_child('email').equal_to(email).get()

            if user_query:
                # Verifica a senha do usuário
                for user_id, user_data in user_query.items():
                    stored_password = user_data.get('password')
                    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                        print("Login successful")
                        return HttpResponse(status_code=200, body={"uid": user_id, "message": "Login successful."})

            print("User not found or invalid credentials")
            return HttpResponse(status_code=400, body={"error": "User not found or invalid credentials"})

        except Exception as e:
            print("Error during login:", str(e))
            return HttpResponse(status_code=500, body={"error": str(e)})
