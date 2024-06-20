import {device,element,by} from 'detox';

describe('Login Screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should allow user to input email/password and press login', async () => {
      // preenche os campos email e senha
      await element(by.placeholder('Email')).typeText('daniel@gmail.com');
      await element(by.placeholder('Senha')).typeText('daniel123');
  
      // esconde o teclado
      await device.pressBack();
  
      // clica no botao login
      await element(by.text('Login')).tap();
  
      // verifica se o login foi bem-sucedido esperando que apareça a tela de busca
      await expect(element(by.text('Reservar'))).toBeVisible();
    });
  });
  