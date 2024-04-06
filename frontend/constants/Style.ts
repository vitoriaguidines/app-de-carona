import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  uff: {
    height: windowHeight * 0.5,
    width: windowWidth,
    alignItems: 'center',
  },
  rectangle: {
    width: 390,
    height: 270,
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: 135
  },
  logo: {
    width: 170,
    height: 175,
    top: (((windowHeight/2)-135)-175)/2
  },
});