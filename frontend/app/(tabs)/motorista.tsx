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
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
      <View style={defaultStyles.container}> 
        <TouchableOpacity style={defaultStyles.endereco} onPress={handleNavigateToMap}>
          <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Origem</Text>
        </TouchableOpacity>
      </View>
      <View style={[defaultStyles.container, {flexDirection:'row'}]}> 
        <TouchableOpacity style={defaultStyles.endereco} onPress={handleNavigateToReserva}>
          <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Destino</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Motorista;
