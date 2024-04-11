import { View, Text } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Style'

const mapa = () => {
  return (
    <View>
       <MapView style={defaultStyles.map}
       provider={PROVIDER_GOOGLE}
       />
    </View>
  )
}

export default mapa