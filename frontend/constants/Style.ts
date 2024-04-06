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
    height: windowHeight * 0.5,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: windowHeight * 0.07
  },
  rectangle: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.35,
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: windowHeight * 0.17
  },
  logo: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.23, 
  },
});