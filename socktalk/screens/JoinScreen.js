import React , {useState} from "react";
import { View, Text, TextInput, Button } from 'react-native';

export default function JoinScreen({joinChat}) {
     const [username, setUsername] = useState("");
      return (
     <View style={{ flex: 1, alignItems : "center", justifyContent: "center" }}>
         <TextInput value = {username}
         onChangeText={(text) => setUsername(text)}
         style = {{ 
                fontSize : 20,padding : 5, margin : 10, borderWidth : 1, borderColor : "black", width : 300, textAlign : "center"  
         }} placeholder="Enter username"  />
         <Button onPress={ () => joinChat(username)}  style ={{fontSize: 5}} title= "Join Chat" />
         
     </View>
      );
}

