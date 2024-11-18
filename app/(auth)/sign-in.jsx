import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';

import FormField  from '../../components/FormField';
import CustomButton  from '../../components/CustomButtons';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () =>{

  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image source={images.logo}
          resizeMode='contain' className="w-[110px] h-[150px] " />
          <Text className="text-2xl text-white text-semibold mt-8 font-psemibold ">Log In To RJsIceCream</Text>
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) =>  setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) =>  setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handePress={submit}
            containerStyles="mt-7 w-full"
            isloading={isSubmitting}
          />
          <View className="flex-row pt-5 gap-2 justify-center">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an Account?
            </Text>
            <Link href="/home" className="text-lg font-psemibold text-secondary" >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn