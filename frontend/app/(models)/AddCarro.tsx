import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe Ionicons
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation do '@react-navigation/native'

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.spacer}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Adicionar Carro</Text>
      </View>

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
        <Text style={styles.label}>Cor do carro</Text>
        <TextInput
          style={styles.input}
          value={corCarro}
          onChangeText={setCorCarro}
          placeholder="Ex.: Preto, Branco, Prata"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Placa do carro</Text>
        <TextInput
          style={styles.input}
          value={placaCarro}
          onChangeText={setPlacaCarro}
          placeholder="Ex.: ABC-1234"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de passageiros</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131514', // Fundo preto
    padding: 15,
  },
  goBackButton: {
    position: 'absolute',
    top: 40, // Ajuste esse valor para descer o botão de retorno
    left: 20,
    zIndex: 1,
  },
  spacer: {
    flex: 1, // Espaço flexível para empurrar os elementos para a direita
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Ajuste esse valor para descer o título "Adicionar Carro" do topo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Texto branco
    paddingHorizontal: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centraliza os elementos horizontalmente
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#ffffff', // Texto branco
  },
  input: {
    backgroundColor: '#e0e0e0', // Cinza claro
    borderWidth: 1,
    borderColor: '#cccccc', // Bordas mais claras
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#000000', // Texto preto
    fontSize: 16,
  },
  adicionarCarroButton: {
    backgroundColor: '#007bff', // Azul
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  adicionarCarroButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Texto branco
    textAlign: 'center',
  },
});

export default AddCarro;
