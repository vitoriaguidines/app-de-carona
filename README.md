# MeLeva

Uma aplicação de carona para funcionários e estudantes vinculados à UFF para nosso trabalho de Engenharia de Software 2, com o professor Murta

## 🚀 Instalação do Projeto

Clone o repositório dentro do seu disco local (C:) e instale as dependências:   

- `git clone https://github.com/vitoriaguidines/app-de-carona.git`

- `cd app-de-carona`

Agora você pode instalar os requerimentos abaixo para o funcionamento do Back-End.

## 🔧 Configurações Back-End

- `cd backend`

- `pip install -r requirements.txt`

### 📋 Flask Quick Start

Este repositório contém um exemplo simples de como usar o Flask para criar uma aplicação web básica.

### Pré-requisitos

- Python 3 instalado ([python.org](https://www.python.org/downloads/))

### Instalação do Flask

Para instalar o Flask, você pode usar o pip, o gerenciador de pacotes do Python. Abra o terminal ou prompt de comando e execute o seguinte comando:

```bash
pip install flask
```
Isso instalará o Flask e suas dependências necessárias para o seu ambiente Python.


### Executando a Aplicação
Execute o servidor Flask:

```bash
python run.py
Acesse a aplicação em http://localhost:3000.
```

Essas instruções adicionam a seção "Instalação do Flask" ao tutorial, explicando como instalar o Flask usando o pip. Isso deve ajudar os usuários que não têm o Flask instalado em seu ambiente Python.

## 🔧 Configurações Front-End

- `cd frontend`

### 📋 Instalação do Node.js

Instale a versão mais atual do Node.js para seu Sistema Operacional (a versão utilizada do node nesse projeto é a 20.14.0, e a do npm é a 10.7.0), de preferência pelo **[Prebuilt-Installer](https://nodejs.org/en/download/prebuilt-installer)**.

Certifique-se de selecionar a instalação de plugins (o checkbox do Chocolatey) para realizar a instalação completa (após a instalação, se ocorrer corretamente, no caso de Windows o Powershell será aberto para realizar a instalação).

> _OBS: se essa parte falhar, apenas desinstale o node e refaça a instalação_.

### ⌨️ Configuração do ambiente

Dentro do diretório do frontend, verifique se o node e o npm estão instalados corretamente.

- `node -v`

- `npm -v`

> _OBS: caso o terminal não reconheça os comandos, coloque os binários do npm, que estão no Roaming do AppData nas variáveis de ambiente_.

Caso você já tenha o expo instalado, execute o comando para realizar a desinstalação:

```bash
npm uninstall expo
```

Em seguida, execute os comandos:

```bash
npm install expo@50
```
```bash
npx expo-doctor
```
```bash
npx expo install --check
```

Assim, será instalada a versão 50 do Expo SDK (esse projeto funciona apenas com a versão 50) e serão atualizados os plugins necessários para seu funcionamento.

### Executando a interface

No diretório do frontend, execute o comando:

- `npx expo`

### Expo Go

Para executar a interface em um aparelho mobile, é necessário o uso do aplicativo Expo Go. Como o projeto funciona em SDK 50, atualmente os aparelhos IOS não dão suporte para essa versão, então ele precisa ser executado em um Android.

Instale o _APK do Expo Go versão 50_ diretamente no **[site](https://expo.dev/go)** e o execute nos Files do seu aparelho (lembrando de desinstalar a versão mais atual, caso você já a tenha baixada).

> _Caso a instalação tenha sido feita em um aparelho móvel, apenas leia o QR Code exibido no terminal ao executar npx expo, no aplicativo do Expo Go que a aplicação irá ser iniciada_.

- Para iniciar em um emulador, digite o endereço do Metro no aplicativo Expo Go:

```bash
Metro waiting on exp://192.168.0.130:8081
```

## 🛠️ Construído com

As ferramentas utilizadas para a criação do projeto foram:

* [React Native](https://reactnative.dev/) - O framework web usado
* [Expo](https://expo.dev/) - Framework para acesso à API
