import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';


export default function BuscarScreen() {
  return (
    <View style={[defaultStyles.container, { backgroundColor: '#131514' }]}>
      <ImageBackground source={uffBackground} style={defaultStyles.uff} blurRadius={8}>
        <Image source={uffLogo} style={defaultStyles.logo} />
      </ImageBackground>
        <View style={defaultStyles.rectangle}/>
    </View>
  );
}
