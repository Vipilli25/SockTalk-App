import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from './JoinScreen';

export default function HomeScreen() {
  
  const [recvMessages, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.on("message", (message) => {
      setRecvMessages((prevMessages) => GiftedChat.append(prevMessages, message));
    });
  }, []);

  const sendMessage =(messages) => {
    socket.current.emit("message", messages[0].text);
    setRecvMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
  }

  const joinChat = (username) => {
    socket.current.emit("join", username);
    setHasJoined(true);
  }

  return (
    <View style={{ flex: 1 }}>
      {hasJoined ? 
        (<GiftedChat
        renderUsernameOnMessage
        messages={recvMessages}
        onSend={messages => sendMessage(messages)}
        user={{
          _id: 1,
        }}
        placeholder='Type your message here'
      />) : <JoinScreen  joinChat = {joinChat} /> 
       }
      
    </View>
  );
      }

