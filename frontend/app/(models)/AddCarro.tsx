import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router'; // Importe useNavigation do Expo Router

const AddCarro = () => {
  const navigation = useNavigation(); // Inicialize a navegação
  const [modeloCarro, setModeloCarro] = useState('');
  const [corCarro, setCorCarro] = useState('');
  const [placaCarro, setPlacaCarro] = useState('');
  const [passageirosCarro, setPassageirosCarro] = useState('');

  const handleGoBack = () => {
    navigation.goBack(); // Volte para a tela anterior ao pressionar o botão Voltar
  };

  const handleAdicionarCarro = () => {
    // Aqui você pode adicionar lógica para adicionar o carro à sua aplicação
    console.log('Carro adicionado:', {
      modelo: modeloCarro,
      cor: corCarro,
      placa: placaCarro,
      passageiros: passageirosCarro,
    });
    navigation.goBack(); // Voltar para a tela anterior após adicionar o carro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Veículo</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Modelo do carro</Text>
        <TextInput
          style={styles.input}
          value={modeloCarro}
          onChangeText={setModeloCarro}
          placeholder="Ex.: Toyota Corolla, Fiat Argo"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Qual a cor do seu carro?</Text>
        <TextInput
          style={styles.input}
          value={corCarro}
          onChangeText={setCorCarro}
          placeholder="Ex.: Preto, Branco, Prata"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Qual a placa do seu carro?</Text>
        <TextInput
          style={styles.input}
          value={placaCarro}
          onChangeText={setPlacaCarro}
          placeholder="Ex.: ABC-1234"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantos passageiros cabem em seu carro?</Text>
        <TextInput
          style={styles.input}
          value={passageirosCarro}
          onChangeText={setPassageirosCarro}
          placeholder="Ex.: 5"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.adicionarCarroButton} onPress={handleAdicionarCarro}>
        <Text style={styles.adicionarCarroButtonText}>Adicionar Carro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131514', // Fundo preto
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Texto branco
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff', // Texto branco
  },
  input: {
    backgroundColor: '#e0e0e0', // Cinza claro
    borderWidth: 1,
    borderColor: '#cccccc', // Bordas mais claras
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000000', // Texto preto
  },
  adicionarCarroButton: {
    backgroundColor: '#007bff', // Azul
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  adicionarCarroButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // Texto branco
    textAlign: 'center',
  },
  goBackButton: {
    marginTop: 10,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff', // Azul
  },
});

export default AddCarro;
