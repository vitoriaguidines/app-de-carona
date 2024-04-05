import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  uff: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  rectangle: {
    flex: 1,
    width: 325,  
    height: 250, 
    backgroundColor: '#262A2B', 
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: 23,
    marginLeft: -160, 
    marginTop: -70,
  },
  logo: {
    flex: 1,
    width: 200, 
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
});