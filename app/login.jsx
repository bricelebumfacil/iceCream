import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Animation values
  const buttonScale = useState(new Animated.Value(1))[0];

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    console.log("User logged in:", { email, password });
    router.push('/home');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sweet Ice Cream</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email address" 
          placeholderTextColor="#B7CEDE"
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          placeholderTextColor="#B7CEDE"
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
      </View>

      <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
        <TouchableOpacity onPress={() => { handleLogin(); animateButton(); }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.signUpLink}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFCFB', // Main background color
  },
  title: {
    fontSize: 40,
    color: '#DFB9B6', // Title color
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'cursive',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: '#D0E1E8',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light background for title
    padding: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#DFB9B6', // Label color
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#B7CEDE', // Border color
    borderRadius: 20,
    backgroundColor: '#EBDFE1', // Input background color
    color: '#6A0572', // Text color
    shadowColor: '#D0E1E8',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    fontFamily: 'monospace',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#DFB9B6', // Button color
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#B7CEDE',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FAFCFB', // Button text color
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#DFB9B6', // Sign up text color
    fontSize: 16,
  },
  signUpLink: {
    color: '#D0E1E8', // Sign up link color
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});
