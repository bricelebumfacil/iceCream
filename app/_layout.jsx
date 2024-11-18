import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'




SplashScreen.preventAutoHideAsync();

const MainLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Light": require("../assets/fonts/Urbanist-Light.ttf"), 
    "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  useEffect(() => {
    if (error) {
      
      throw error;
    }

    if (fontsLoaded) {
     
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
      }}
      />

      <Stack.Screen name='(auth)' options={{
        headerShown: false,
      }}
      />

      <Stack.Screen name='(tabs)' options={{
        headerShown: false,
      }}
      />
    </Stack>
  )
}

export default MainLayout