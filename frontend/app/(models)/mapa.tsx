import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { defaultStyles } from '@/constants/Style'

const mapa = () => {
  return (
    <View>
       <MapView style={defaultStyles.map}/>
    </View>
  )
}

export default mapa