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
  blueSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '27%',
    backgroundColor: '#0F62AC',
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    justifyContent: 'center',
    alignContent: 'center'
  },
  caronaTexto: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
  },
  logo: {
    width: 170,
    height: 175,
    top: (((windowHeight/2)-135)-175)/2
  },
  endereco: {
    width: 325,
    height: 50,
    backgroundColor: '#575960',
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    top: 25, 
    left: (390 - 325) / 2
  },
});