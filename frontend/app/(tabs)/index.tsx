import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuscarScreen from '../(models)/buscar';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Buscar"
        component={BuscarScreen}
      />
    </Stack.Navigator>
  );
}