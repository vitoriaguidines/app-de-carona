import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{
        tabBarLabel: 'Buscar',
        tabBarIcon: ({color,size}) => <MaterialIcons name="search" size={size} color={color}></MaterialIcons>,
        tabBarLabelStyle: ({fontSize:12}),
        tabBarIconStyle: { marginBottom: -5 }
      }
      }
      ></Tabs.Screen>
    </Tabs>
  )
}

export default Layout