import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const ChatScreen = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState ([]);
    const { userID, name, color } = route.params 
    console.log('Route Params:', route.params);

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

    
    useEffect(() => {
      if(name) {
    navigation.setOptions({ title: name });
    } else{
      Alert.alert('Error', 'Name not provided');
    }
  }, 
      [navigation, name]);

    useEffect(() => {
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
    });
    return() => unsubscribe();
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