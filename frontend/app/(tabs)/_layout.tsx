import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Perfil from './perfil';
import Viagens from './viagens';
import Motorista from './motorista';
import Index from '.';
import LoginScreen from '../(models)/login';
import Avaliacoes from './avaliacoes'; // Certifique-se de que o caminho está correto
import { useUserContext } from '@/contexts/UserContext';
import * as Location from "expo-location";
import { useLocationContext } from "@/contexts/LocationContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PerfilStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
    <Stack.Screen name="Avaliacoes" component={Avaliacoes} options={{ title: 'Avaliações' }} />
  </Stack.Navigator>
);

const Layout = () => {
  const userContext = useUserContext();
  const { setUserLocation } = useLocationContext();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  return (
    userContext.isLoggedIn ? (
      <>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#131514',
            },
            tabBarInactiveTintColor: '#858786',
            tabBarActiveTintColor: '#0F62AC',
          }}
        >
          <Tab.Screen
            name="buscar"
            component={Index}
            options={{
              tabBarLabel: 'Buscar',
              tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />,
              tabBarLabelStyle: { fontSize: 12 },
              tabBarIconStyle: { marginBottom: -5 },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="motorista"
            component={Motorista}
            options={{
              tabBarLabel: 'Motorista',
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="steering" size={size} color={color} />,
              tabBarLabelStyle: { fontSize: 12 },
              tabBarIconStyle: { marginBottom: -5 },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="viagens"
            component={Viagens}
            options={{
              tabBarLabel: 'Viagens',
              tabBarIcon: ({ color, size }) => <Feather name="map" size={size} color={color} />,
              tabBarLabelStyle: { fontSize: 12 },
              tabBarIconStyle: { marginBottom: -5 },
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="perfil"
            component={PerfilStack}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color, size }) => <Octicons name="person" size={size} color={color} />,
              tabBarLabelStyle: { fontSize: 12 },
              tabBarIconStyle: { marginBottom: -5 },
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </>
    ) : (
      <>
        <LoginScreen />
      </>
    )
  );
};

export default Layout;
