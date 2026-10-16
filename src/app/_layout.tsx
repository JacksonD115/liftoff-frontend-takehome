import '@/global.css';

import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            animation: 'none',
            headerStyle: { backgroundColor: '#242C3C' },
            headerTintColor: '#FFFFFF',
            contentStyle: { backgroundColor: '#242C3C' },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="product/[id]"
            options={{ title: 'Product details' }}
          />
          <Stack.Screen name="cart" options={{ title: "My Shopping Cart" }} />
        </Stack>

        <AnimatedSplashOverlay />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}