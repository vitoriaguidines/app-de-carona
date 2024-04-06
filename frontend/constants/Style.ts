import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  containerRec: {
    flex: 1,
  },
  rectangle: {
    width: 325,  
    height: 250, 
    backgroundColor: '#262A2B', 
    borderRadius: 23,
  },
  logo: {
   width: '32%',
   height: '20%'
  },
});