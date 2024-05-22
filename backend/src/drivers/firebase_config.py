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
        {"nome": "Gragoatá", "latitude": -22.8986933, "longitude": -43.1342323},
        {"nome": "Valonguinho", "latitude": -22.90376, "longitude": -43.13389},
        {"nome": "Praia Vermelha", "latitude": -22.9048625, "longitude": -43.1342416},
        {"nome": "Direito - Tiradentes", "latitude": -22.901519, "longitude": -43.1295266},
        {"nome": "Direito - Presidente Pedreira", "latitude": -22.9036048, "longitude": -43.1284669},
        {"nome": "Escola de Enfermagem", "latitude": -22.8951375, "longitude": -43.1192329},
        {"nome": "Faculdade de Farmácia", "latitude": -22.9028302, "longitude": -43.1184612},
        {"nome": "Faculdade de Veterinária", "latitude": -22.9055965, "longitude": -43.1008684},
        {"nome": "Instituto de Arte e Comunicação Social", "latitude": -22.9012436, "longitude": -43.1304077},
        {"nome": "Plaza Shopping", "latitude": -22.90395, "longitude": -43.12484},
        {"nome": "Barcas", "latitude": -22.8923411, "longitude": -43.1231953},
        {"nome": "Terminal", "latitude": -22.9012436, "longitude": -43.1243969},
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
