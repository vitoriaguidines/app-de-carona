import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';

import Colors from '@/constants/Colors';
import { UserContextProvider } from '@/contexts/UserContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    int: require('../assets/fonts/Inter-Regular.ttf'),
    'int-l': require('../assets/fonts/Inter-Light.ttf'),
    'int-m': require('../assets/fonts/Inter-Medium.ttf'),
    'int-sb': require('../assets/fonts/Inter-SemiBold.ttf'),
    'int-b': require('../assets/fonts/Inter-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <UserContextProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal'}} />
        <Stack.Screen 
          name="(models)/mapa" 
          options={{
            title: 'Pedir Carona',
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} color={'#fff'}/>
              </TouchableOpacity>
            ),
          }} />
          <Stack.Screen 
          name="(models)/reserva" 
          options={{
            title: 'Reservar',
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} color={'#fff'}/>
              </TouchableOpacity>
            ),
          }} />
      </Stack>
    </ThemeProvider>
    </UserContextProvider>
  );
}
