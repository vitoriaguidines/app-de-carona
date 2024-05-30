import firebase_admin
from firebase_admin import credentials

def initialize_firebase_app():
    try:
        cred = credentials.Certificate("src/keys/app-de-carona-firebase-adminsdk-p4bg0-564964cb1b.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://app-de-carona-default-rtdb.firebaseio.com/'
        })
        print("Firebase app initialized successfully")
    except Exception as e:
        print(f"Error initializing Firebase app: {e}")

def get_api_key():
    # Esta função deve retornar sua API key do Firebase
    return "AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c"  # Substitua pelo valor real da API key