import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import Perfil from './perfil';
import Viagens from './viagens';
import Motorista from './motorista';
import Index from '.';
import Colors from '@/constants/Colors';
import LoginScreen from '../(models)/login';
import { useUserContext } from '@/contexts/UserContext';

const Tab = createBottomTabNavigator();

const Layout = () => {
  const userContext = useUserContext();

  return (
    userContext.isLoggedIn ? (
      <>
      <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#131514',
      },
      tabBarInactiveTintColor: '#858786',
      tabBarActiveTintColor: '#0F62AC',
    }}>
      <Tab.Screen name='buscar' component={Index} options={{
        tabBarLabel: 'Buscar',
        tabBarIcon: ({color,size}) => <MaterialIcons name="search" size={size} color={color}></MaterialIcons>,
        tabBarLabelStyle: ({fontSize:12}),
        tabBarIconStyle: { marginBottom: -5 },
        headerShown: false,
      }}
      />

      <Tab.Screen name='motorista' component={Motorista} options={{
        tabBarLabel: 'Motorista',
        tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="steering" size={size} color={color}></MaterialCommunityIcons>,
        tabBarLabelStyle: ({fontSize:12}),
        tabBarIconStyle: { marginBottom: -5 },
        headerShown: false
      }}
      />

      <Tab.Screen name='viagens' component={Viagens} options={{
        tabBarLabel: 'Viagens',
        tabBarIcon: ({color,size}) => <Feather name="map" size={size} color={color}></Feather>,
        tabBarLabelStyle: ({fontSize:12}),
        tabBarIconStyle: { marginBottom: -5 },
        headerShown: false
      }}
      />

      <Tab.Screen name='perfil' component={Perfil} options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({color,size}) => <Octicons name="person" size={size} color={color}></Octicons>,
        tabBarLabelStyle: ({fontSize:12}),
        tabBarIconStyle: { marginBottom: -5 },
        headerShown: false
      }}
      />
    </Tab.Navigator>
      </>
    ) : (
      <>
        <LoginScreen/>
      </>
    )
    
  )
}

export default Layout
