import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
    const {name, color} = route.params;
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [navigation, name]);
 return (
   <View style={[styles.container, {backgroundColor: color}]}>
     <Text>Hello {name}, Welcome to the chat!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default ChatScreen;