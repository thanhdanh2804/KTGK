import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Register = ({ navigation }) => {
    const [values, setValues] = useState({ fullname: '', email: '', password: '', confirmPassword: '' });

    const updateInputval = (val, key) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: val
        }));
    };

    const registerSubmit = () => {
        if (!values.fullname || !values.email || !values.password || !values.confirmPassword) {
            Alert.alert("All fields are required");
            return;
        }
        if (values.password !== values.confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                Alert.alert("Success", "Account created successfully");
                setValues({ fullname: '', email: '', password: '', confirmPassword: '' });
                navigation.navigate('Login'); // Assuming 'Login' is the name of your login screen
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image
                        source={require('../img/firebase.jpg')}
                        style={styles.icon}
                    />
                    <Text style={styles.title}>Register</Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.form}>
                        <TextInput
                            placeholder='Full Name'
                            value={values.fullname}
                            onChangeText={val => updateInputval(val, 'fullname')}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Email'
                            value={values.email}
                            onChangeText={val => updateInputval(val, 'email')}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Password'
                            value={values.password}
                            onChangeText={val => updateInputval(val, 'password')}
                            secureTextEntry
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Confirm Password'
                            value={values.confirmPassword}
                            onChangeText={val => updateInputval(val, 'confirmPassword')}
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={registerSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.linkText, styles.link]}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Align items horizontally
        marginBottom: 20,
    },
    icon: {
        width: 60, // Adjust icon size as needed
        height: 60, // Adjust icon size as needed
        marginRight: 10,
    },
    title: {
        fontSize: 30,
        color: '#0C4A6E',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#0C4A6E',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: '#0C4A6E',
        fontSize: 16,
    },
    link: {
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
});

export default Register;