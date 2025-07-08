import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function Logout() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                onPress={()=>{
                    if (email && password) {
                        navigation.navigate('Welcome');
                    } else {
                        alert('Please enter valid email and password');
                    }
                }}
                >Login In</Text>
               
            </TouchableOpacity>
        </View>
    );
}
export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818', // black background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#FFA500', // orange title
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#222', // dark input background
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#FFA500', // orange border
        fontSize: 16,
        color: '#fff', // white text
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#FFA500', // orange button
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#181818', // black text
        fontSize: 18,
        fontWeight: 'bold',
    },
});
