import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import { addDoc, collection, query, onSnapshot, orderBy, storage } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const ChatScreen = ({ route, navigation, db, isConnected }) => {
    const [messages, setMessages] = useState ([]);
    const { userID, name, color } = route.params 
    console.log('Route Params:', route.params);
    
    const renderCustomActions = (props) => {
      return <CustomActions storage={storage}
      {...props} 
      />
    };

    const renderCustomView = (props) => {
      const { currentMessage} = props;
      if (currentMessage.location) {
        return (
            <MapView
              style={{width: 150,
                height: 100,
                borderRadius: 13,
                margin: 3}}
              region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        );
      }
      return null;
    }
  
    const onSend = (newMessages) => {
      addDoc(collection(db,'Messages'), newMessages[0])
      .then(() => {
        console.log('Message added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding message to Firestore', error)
      }); 
    }
    const renderBubble = (props) => {
      return <Bubble { ...props }
      wrapperStyle={{ 
        right: {
          backgroundColor:'#007AFF'
        },
        left: {
          backgroundColor: '#E5E5EA'
        }
      }}
      />
    }

    const renderInputToolbar = (props) => {
      if(!isConnected) {
        return null;
      }
      return <InputToolbar {...props} /> 
    };
    
    useEffect(() => {
      if(name) {
    navigation.setOptions({ title: name });
    } else{
      Alert.alert('Error', 'Name not provided');
    }
  }, 
      [navigation, name]);

    useEffect(() => {
      const loadMessages = async () => { 
        try {
          const Messages = await AsyncStorage.getItem('Messages');
          if(Messages !==null) {
            setMessages(JSON.parse(Messages));
          }
        } catch (error) {
          console.error('Error loading cached messages', error);
        }
      };
      const saveMessages = async (Messages) => {
        try {
          await AsyncStorage.setItem('Messages', JSON.stringify(Messages));
        } catch(error) {
          console.error('Error saving messages', error);
        }
      };
     const subscribeToFirestore = () => {
      const q = query(collection(db, 'Messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFirestore = snapshot.docs.map(doc => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text,
          createdAt: message.createdAt.toDate(),
          user: {
            _id: message.user._id,
            name: message.user.name,
            avatar: message.user.avatar
          }
        };
      });
      setMessages(messagesFirestore);
      saveMessages(messagesFirestore);
    });
    return unsubscribe;
  };
  const unsubscribe = useNetInfo.addEventListener(state => {
    if(state.isConnected){
      subscribeToFirestore();
    } else{ 
      loadMessages();
    }
  });
   return() => {
    if(unsubscribe) unsubscribe();
   };
    }, [db]);

 return (
   <View style={[styles.container, {backgroundColor: color}]}>
     <Text>Hello {name}, Welcome to the chat!</Text>
     <GiftedChat
      style={styles.messageBox}
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name:name
      }}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
    />
    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior ='height'/>
    :null}
   </View>
   
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 messageBox: {
  flex: 1
 }
});

export default ChatScreen;