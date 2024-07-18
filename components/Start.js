import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Screen1 = ({ navigation }) => {
    const [name, setName] = useState('');
    return (
        <ImageBackground 
        source={require ('../assets/Background Image.png')}
        style={styles.background}>
        <View style={styles.container}>
            <Text>Hello Screen1!</Text>
            <TextInput 
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'/>
            <TouchableOpacity
            title="Go to Screen 2"
            onPress={() => navigation.navigate('Screen2', { name: name})}>
            <Text style={styles.buttonText}>Go To Chat Screen</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15   
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        marginTop: 15,
        marginBottom: 15,
        color: '#000',
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }

   });
   
   export default Screen1;