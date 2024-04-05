import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 200, 
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
});