import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Login = ({ navigation }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [focused, setFocused] = useState(false);

    const updateInputval = (val, key) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: val
        }));
    };

    const loginSubmit = () => {
        console.log(values);
        if (!values.email || !values.password) {
            Alert.alert("All fields are required");
            return false;
        }
        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                setValues({ email: '', password: '' });
                navigation.navigate('Home'); 
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
                <View style={styles.logoContainer}>
                    <Image
                        resizeMode='contain'
                        source={require('../img/firebase.jpg')}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.title}>LOGIN</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        value={values.email}
                        onChangeText={val => updateInputval(val, 'email')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        value={values.password}
                        onChangeText={val => updateInputval(val, 'password')}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress={loginSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.signupText, { color: '#0C4A6E', marginLeft: 5 }]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inner: {
        width: '80%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 30,
        color: '#0C4A6E',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderColor: '#0C4A6E',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: '#000',
    },
});

export default Login;
