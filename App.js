import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image, Button } from 'react-native';
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import {useEffect} from 'react';
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator();

const App = () => {

const connectionStatus = useNetInfo();
useEffect(() => { 
  if (connectionStatus.isConnected === false){
    Alert.alert('Connection lost!');
    disableNetwork(db);
  
} else if (connectionStatus.isConnected === true) {
  enableNetwork(db);
  }
}, [connectionStatus.isConnected]);
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP0RysX2niPzG89n71NIrJ_V9g6VmE1ow",
  authDomain: "messages-2d87d.firebaseapp.com",
  projectId: "messages-2d87d",
  storageBucket: "messages-2d87d.appspot.com",
  messagingSenderId: "333304510740",
  appId: "1:333304510740:web:fdbe92646659abbd7a6a01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initizlize Cloud Firestore and get a reference to the service.  
const db = getFirestore(app);
const storage = getStorage(app);

return (
    <NavigationContainer>
     <Stack.Navigator
        initialRouteName="StartScreen"
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
        />
        <Stack.Screen
          name="ChatScreen"
          >
          {props => <ChatScreen 
          isConnected={connectionStatus.isConnected} 
          db={db}
          storage={storage}
          {...props} 
          />}
          </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
