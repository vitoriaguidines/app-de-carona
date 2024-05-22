from firebase_admin import db, credentials, initialize_app
import os

def initialize_firebase_app():
    try:
        cred_path = "app-de-carona-firebase-adminsdk-p4bg0-a4e2496521.json"
        if not os.path.exists(cred_path):
            raise FileNotFoundError(f"Credenciais do Firebase não encontradas em: {cred_path}")
        
        cred = credentials.Certificate(cred_path)
        initialize_app(cred, {
            'databaseURL': 'https://app-de-carona-default-rtdb.firebaseio.com/'
        })
        print("Firebase app initialized successfully")
    except Exception as e:
        print(f"Error initializing Firebase app: {e}")
        raise

def adicionar_pontos_de_referencia():
    pontos_de_referencia = [
        {"nome": "Gragoatá", "latitude": -22.898698587260142, "longitude": -43.13165812467787},
        {"nome": "Valonguinho", "latitude": -22.897882904985664, "longitude": -43.12579655412598},
        {"nome": "Praia Vermelha", "latitude": -22.904906334585597, "longitude": -43.13118323580061},
        {"nome": "Direito - Tiradentes", "latitude": -22.90152397925232, "longitude": -43.12695170356242},
        {"nome": "Direito - Presidente Pedreira", "latitude": -22.903506933498658, "longitude": -43.125881995840295},
        {"nome": "Escola de Enfermagem", "latitude": -22.89513444883724, "longitude": -43.11667342602883},
        {"nome": "Faculdade de Farmácia", "latitude": -22.904403432305337, "longitude": -43.09201460332637},
        {"nome": "Faculdade de Veterinária", "latitude": -22.905593449449086, "longitude": -43.09826869289252},
        {"nome": "Instituto de Educação Física", "latitude": -22.896352009645046, "longitude": -43.129042422983154},
        {"nome": "Instituto de Arte e Comunicação Social", "latitude": -22.901249196956183, "longitude": -43.12783280332647},
        {"nome": "Plaza Shopping", "latitude": -22.896461479262367, "longitude": -43.12392978553574},
        {"nome": "Barcas", "latitude": -22.893723103072162, "longitude": -43.12425969725104},
        {"nome": "Terminal", "latitude": -22.890698655845945, "longitude": -43.125956194486164},
    ]

    ref = db.reference('pontos_de_referencia')

    for ponto in pontos_de_referencia:
        nova_ref = ref.push()
        nova_ref.set({
            "nome": ponto["nome"],
            "latitude": ponto["latitude"],
            "longitude": ponto["longitude"]
        })
        print(f"Ponto de referência '{ponto['nome']}' adicionado com sucesso.")

if __name__ == "__main__":
    try:
        # Inicialize o app Firebase
        initialize_firebase_app()
        
        # Adicione os pontos de referência
        adicionar_pontos_de_referencia()
    except Exception as e:
        print(f"Erro durante a execução do script: {e}")
