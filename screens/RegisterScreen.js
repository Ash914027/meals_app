import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleRegister = async () => {
        try {
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPassword', password);
            if (email && password) {
                navigation.navigate('Welcome');

            }
        } catch (error) {
            console.log('Error saving user data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons name="fast-food" size={64} color="#ff9800" style={{ marginBottom: 16 }} />
            <Text style={styles.title2}>Welcome to Food Recipe App</Text>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister }>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818', // deep black background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#ff9800', // orange title
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#ff9800', // orange subtitle
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#222', // dark input background
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ff9800', // orange border
        color: '#fff', // white text
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#ff9800', // orange button
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#ff9800',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#181818', // black text on orange button
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default RegisterScreen;
