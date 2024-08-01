import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const StartScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#fff');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const auth = getAuth();
    const handleUserLogin = () => {
        signInAnonymously(auth)
        .then(result => {
            const { uid } = result.user;
            navigation.navigate('ChatScreen', {
                userID: uid, name, color
            });
            Alert.alert('Sign in Successfully!');
        })
        .catch((error) => {
            Alert.alert('Unable to sign in, try later again.');
            console.error('SignIn Error:', error);
        });
    }

    return (
        <ImageBackground 
        source={require ('../assets/Background Image.png')}
        style={styles.background}>
        <View style={styles.container}>
            <Text>Hello Start Screen!</Text>
            <TextInput 
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
        />
            <View style={styles.colorContainer}>
                {colors.map(c => (
                    <TouchableOpacity 
                    key={c}
                    style={[styles.colorOption, { backgroundColor: c }]}
                    onPress={() => setColor(c)}
            />
              ))}
            </View>
            <TouchableOpacity
            style={styles.button}
            onPress={handleUserLogin}>
            <Text style={styles.buttonText}>Go To Chat Screen</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff', // Set background color to white
        color: '#000', // Set text color to black
        marginTop: 15,
        marginBottom: 15   
    },
    colorContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    button: {
        padding: 15,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    }
}); 
   export default StartScreen;