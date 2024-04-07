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
    fontSize: 17
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
  }
});