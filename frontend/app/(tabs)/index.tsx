import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { Link, useNavigation } from 'expo-router';

const Stack = createNativeStackNavigator();

export function BuscarScreen() {
  const navigation = useNavigation();

  const handleNavigateToMap = () => {
    navigation.navigate('(models)/mapa');
  };

  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
      <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
        <Image source={uffLogo} style={defaultStyles.logo} />
      </ImageBackground>
        <View style={defaultStyles.rectangle}>
          <View style={defaultStyles.endereco}>
            <Text>Endereço 1</Text>
          </View>
          <View style={defaultStyles.endereco}>
            <Text>Endereço 2</Text>
          </View>
          <TouchableOpacity style={defaultStyles.blueSection} onPress={(handleNavigateToMap)}>
            <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Procurar</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Buscar"
        component={BuscarScreen}
        options={{ 
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}