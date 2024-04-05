import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { defaultStyles } from '@/constants/Style'; 
import uffBackground from '@/assets/images/uff.png';
import uffLogo from '@/assets/images/logouff.png';

export default function BuscarScreen() {
  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.imageContainer}>
        <ImageBackground source={uffBackground} style={defaultStyles.imageBackground}>
          <View style={defaultStyles.blurOverlay} />
          <Image source={uffLogo} style={defaultStyles.logo} />
        </ImageBackground>
      </View>
    </View>
  );
}