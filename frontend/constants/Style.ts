import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  uff: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  rectangle: {
    width: 370,
    height: 270,
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: 135,
  },
  centeredRectangle: {
    width: 370,
    height: 270,
    backgroundColor: '#262A2B', 
    borderRadius: 23,
    bottom: 135,
    top: (windowHeight * 0.5) - 270
  },
  blueSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#0F62AC',
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    justifyContent:'center',
    alignContent:'center'
  },
  logo: {
    width: 170,   
    height: 170, 
    top: (((windowHeight/2)-135)-170)/2+15
  },
  endereco: {
    width: 300,
    height: 50,
    backgroundColor: '#575960',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12.5
  },
  inputView:{
    backgroundColor: "rgba(0,0,0,0)",
    display: "flex",
    justifyContent: "flex-end",
  },
  inputField: {
    backgroundColor: '#272A35',
    margin: 20,
    padding: 22,
    marginBottom: 0,
    borderRadius: 20,
    fontSize: 17,
    width: windowWidth * 0.66,
    color: "grey"
  },
  inputFieldIcon: {
    backgroundColor: "#575960",
    borderRadius: 20,
    position: "absolute",
    padding: 13,
    left: 304,
  },

  button: {
    height: 60,
    backgroundColor: "#0F62AC",
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});