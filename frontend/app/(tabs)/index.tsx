import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ImageBackground, Image, Text } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';
import { Link } from 'expo-router';

const Stack = createNativeStackNavigator();

export  function BuscarScreen() {
  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
      <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
        <Image source={uffLogo} style={defaultStyles.logo} />
      </ImageBackground>
        <View style={defaultStyles.rectangle}>
          <View style={defaultStyles.endereco}/>
            <View style={defaultStyles.blueSection}>
              <Text style={[{fontSize: 24,color: '#fff', fontWeight: 'bold',textAlign: 'center'}]}>Procurar</Text>
              <Link href={'/(models)/mapa'}/>
            </View>
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