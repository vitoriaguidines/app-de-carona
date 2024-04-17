import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import { useNavigation } from 'expo-router';

const Stack = createNativeStackNavigator();

const Motorista = () => {
  const navigation = useNavigation();

  const handleNavigateToMap = () => {
    navigation.navigate('(models)/mapa');
  };

  const handleNavigateToReserva = () => {
    navigation.navigate('(models)/reserva');
  };

  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514', justifyContent:'center'}]}>
      <Text style={[{fontSize: 30,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>De onde você vai sair?</Text>
      <View style={[defaultStyles.container, {flex:0, flexDirection:'row'}]}> 
        <TouchableOpacity style={defaultStyles.endereco} onPress={handleNavigateToMap}>
          <Text style={[{fontSize: 15,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Insira o endereço completo</Text>
        </TouchableOpacity>
      </View>
      <Text style={[{fontSize: 30,color: '#fff', fontWeight: 'bold',textAlign: 'center', marginTop: 12.5}]}>Pra onde você vai?</Text>
      <View style={[defaultStyles.container, {flexDirection:'row', flex: 0}]}> 
        <TouchableOpacity style={defaultStyles.endereco} onPress={handleNavigateToMap}>
          <Text style={[{fontSize: 15,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Insira o endereço completo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Motorista;
