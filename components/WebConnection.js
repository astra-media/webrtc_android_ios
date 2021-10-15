import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const WebConnection = () => {
    const [text, setText] = useState('');

    const submitButton = () =>{
        console.log(text)
    }

    return(
    <View>
    <Text>WebRTC</Text>
    <TextInput style={styles.input}
    placeholder = "Enter your offer"
    onChangeText = {setText}
    />
    <TouchableOpacity onPress={submitButton}>
        <Text>Generate Answer</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
})

export default WebConnection; 