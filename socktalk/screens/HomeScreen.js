
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import {Text,View, StyleSheet, TextInput,} from 'react-native';

export default function HomeScreen() {

    const [message, setMessage] = useState("hello");

    useEffect(() => {
      socket= io("http://192.168.29.192:3001");
      console.log("trying to connect");
      try {
        console.log("connecting");
        socket.on("connect", () => {
          console.log("connecting2");
          console.log("Connected to the server");
        });
    
        socket.on("message", (message) => {
          console.log("connecting3");
          console.log(message);
        });
      } catch (err) {
        console.error("Error connecting to the server:", err);
      }
      
    }, []);

     
    function sendMessage() {
        socket.emit("message", message);
        setMessage("");
        console.log("message sent",message);
    }

    return (
      <View style = {styles.container} >
        <Text>hello</Text>
        <TextInput
          onChangeText={text => setMessage(text)}
          placeholder='Type your message here'
          value={message}
            onSubmitEditing={sendMessage}
        />
        </View>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
    },
  });




  