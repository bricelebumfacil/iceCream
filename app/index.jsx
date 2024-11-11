import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
    const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation
    const [buttonAnim] = useState(new Animated.Value(1)); // For button press animation
    const [iconSpin] = useState(new Animated.Value(0)); // For icon spinning animation

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500, // Duration for fade-in
            useNativeDriver: true,
        }).start();

        // Continuous spinning animation for the icon
        Animated.loop(
            Animated.timing(iconSpin, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    // Button press animation
    const handlePressIn = () => {
        Animated.spring(buttonAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    // Icon spin interpolation
    const spin = iconSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
                <Animated.Text style={[styles.title, { transform: [{ translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                }) }] }]}>
                    Sweet Ice Cream
                </Animated.Text>
                <Text style={styles.subtitle}>A Delightful Experience</Text>
            </Animated.View>

            {/* Animated Icon */}
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <AntDesign name="staro" size={50} color="#FF6F61" />
            </Animated.View>

            {/* Animated Button */}
            <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
                <TouchableOpacity
                    style={styles.button}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Link href="/login" style={styles.buttonText}>Login</Link>
                </TouchableOpacity>
            </Animated.View>

            <StatusBar style="light" />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF3E0', // Light cream background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20, // Space between title and button
    },
    title: {
        color: '#FF6F61', // Playful pink for title
        fontSize: 36, // Title size
        fontFamily: 'Poppins-Bold', // Font for title
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: '#FFB3BA', // Soft shadow for a dreamy effect
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
    },
    subtitle: {
        color: '#6A0572', // Dark purple for subtitle
        fontSize: 22, // Subtitle size
        fontFamily: 'Poppins-Medium', // Font for subtitle
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#F76D6D', // Button color (soft red)
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 30,
        shadowColor: '#FFB3BA', // Light pink shadow
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonText: {
        color: '#FAF3E0', // Button text color (light cream)
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
