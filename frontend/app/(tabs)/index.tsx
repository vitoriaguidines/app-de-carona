import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuscarScreen from '../(models)/buscar';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Buscar"
        component={BuscarScreen}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
