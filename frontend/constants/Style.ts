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
    width: 370,
    height: 270,
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: 135,
    paddingVertical: 20,
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
    justifyContent:'center',
    alignContent:'center'
  },
  logo: {
    width: 200,   
    height: 200, 
    top: (((windowHeight/2)-135)-200)/2 + 20
  },
  endereco: {
    width: 325,
    height: 50,
    backgroundColor: '#575960',
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 25,
    left: (370 - 325) / 2,
    marginBottom: 10,
  },
});