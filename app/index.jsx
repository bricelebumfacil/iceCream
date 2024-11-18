import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButtons from '../components/CustomButtons';

export default function App() {
  return (
    <SafeAreaView className="bg-gray-500 h-full pt-5">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4 pt-19">
          <Image
            source={images.logo}
            className="max-w-[290px] h-[260px]"
            resizeMode='contain'
          />
          <View className="relative">
            <Text className="text-2xl text-white font-bold text-center pt-28"
            >Discover The Best Flavors Of {''}
              <Text className="text-secondary-100">Sweet Ice Cream</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[150px] h-[30px] relative -bottom-1 -right-12"
              resizeMode='contain'
            />
            
            <Text className="text-sm font-pregular text-gray-100 mt-6 text-center">
              Where All You Can Have A Taste Of A High Quality Ice Creams 
            </Text>

            <CustomButtons
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-ful mt-7 "
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}