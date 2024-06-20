import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useUserContext } from '@/contexts/UserContext';
import { addVehicle } from '@/services/UserServices';
import { useNavigation } from '@react-navigation/native';

const AddCarro = () => {
  const { userId } = useUserContext();
  const navigation = useNavigation();

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddVehicle = async () => {
    if (!marca || !modelo || !placa || !cor || !ano) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    const anoInt = parseInt(ano, 10);
    if (isNaN(anoInt)) {
      Alert.alert('Erro', 'O ano deve ser um número válido');
      return;
    }

    setLoading(true);
    try {
      await addVehicle(userId, { driver_id: userId, marca, modelo, placa, cor, ano: anoInt });
      Alert.alert('Sucesso', 'Veículo adicionado com sucesso');
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o veículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>Marca</Text>
        <TextInput
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
          placeholder="Marca"
        />
        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
          placeholder="Modelo"
        />
        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
          placeholder="Placa"
        />
        <Text style={styles.label}>Cor</Text>
        <TextInput
          style={styles.input}
          value={cor}
          onChangeText={setCor}
          placeholder="Cor"
        />
        <Text style={styles.label}>Ano</Text>
        <TextInput
          style={styles.input}
          value={ano}
          onChangeText={setAno}
          placeholder="Ano"
          keyboardType="numeric"
        />
        <Button
          title={loading ? 'Adicionando...' : 'Adicionar Veículo'}
          onPress={handleAddVehicle}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#131514',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddCarro;
