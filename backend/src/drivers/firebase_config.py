import firebase_admin
from firebase_admin import credentials

# Inicialize o app Firebase com as credenciais do arquivo JSON e a URL do Realtime Database
def initialize_firebase_app():
    cred = credentials.Certificate("src/keys/app-de-carona-firebase-adminsdk-p4bg0-784866d24b.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://app-de-carona-default-rtdb.firebaseio.com/'
    })