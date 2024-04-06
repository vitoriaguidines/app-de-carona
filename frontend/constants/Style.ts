import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uff: {
    height: windowHeight * 0.5, // 72% da altura da tela
    width: windowWidth, // largura total da tela
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowHeight * 0.07
  },
  rectangle: {
    width: windowWidth * 0.8, // 80% da largura da tela
    height: windowHeight * 0.35, // 35% da altura da tela
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: windowHeight * 0.17 // 25% da altura da tela
  },
  logo: {
    width: windowWidth * 0.4, // 40% da largura da tela
    height: windowHeight * 0.23, // 35% da altura da tela
  },
});