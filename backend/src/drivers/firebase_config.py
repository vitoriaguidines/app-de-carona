import firebase_admin
from firebase_admin import credentials, storage

def initialize_firebase_app():
    try:
        cred = credentials.Certificate("src/keys/app-de-carona-firebase-adminsdk-p4bg0-1e04ec18a7.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://app-de-carona-default-rtdb.firebaseio.com/',
            'storageBucket': 'app-de-carona.appspot.com'  # Substitua pelo nome do seu bucket
        })
        print("Firebase app initialized successfully")
    except Exception as e:
        print(f"Error initializing Firebase app: {e}")

def get_bucket():
    if not firebase_admin._apps:
        initialize_firebase_app()
    return storage.bucket()

def get_api_key():
    # Esta função deve retornar sua API key do Firebase
    return "AIzaSyCX2fMAC8vF73oKU9Vg3NVXizsqOaHUn1c"  # Substitua pelo valor real da API key
