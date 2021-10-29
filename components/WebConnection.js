import React, {useState, useRef} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
  } from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const pc = new RTCPeerConnection(configuration);

const WebConnection = () => {

    const [description, setDescription] = useState();
    const [message, setMessage] = useState('');
    const [sMessage, setSMessage] = useState('no Message');

    const setRemoteDescription = async () => {
        const remoteDesc = new RTCSessionDescription(JSON.parse(description));
        pc.setRemoteDescription(remoteDesc).then(() => {
            // console.log(JSON.stringify(pc.remoteDescription));
            pc.createAnswer().then(desc => {
                pc.setLocalDescription(desc).then(()=> {
                    //generate answer
                    console.log(JSON.stringify(desc))
                })
            });
            });
    }

    const submitButton = async () =>{
        setRemoteDescription();
    }

    pc.addEventListener('connectionstatechange', e => {
        if (pc.connectionState === 'connected') {
            console.log("connected");
            console.log(e);
        }
    });

    const dataChannel = pc.createDataChannel('channel');

    pc.addEventListener('datachannel', e => {
        pc.dataChannel = e.channel;

        pc.dataChannel.addEventListener('message', e => {
            console.log(e.data);
            setMessage(e.data);
        })
    })

    const sendMessage = () =>{
        console.log('sending');
        dataChannel.send(sMessage);
    }



    return(
    <View style={styles.container}>
    <Text style={styles.text}>WebRTC Connection</Text>
    
    {/* offer from remote */}
    <TextInput style={styles.input}
    placeholder = "Enter your offer"
    onChangeText = {setDescription}
    />
    <TouchableOpacity style={styles.button} onPress={submitButton}>
        <Text>Generate Answer to Console</Text>
    </TouchableOpacity>
    
    {/* messages from remote */}
    <Text style={styles.remoteMessage}>Remote Messages:{"\n"}{message}</Text>

    {/* Send New Message  */}
    <Text style={styles.text}>Send Messages to Remote</Text>
    <TextInput style={styles.input}
    placeholder = "new message"
    onChangeText = {setSMessage}
    />
    <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text>Send</Text>
    </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    text: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold'
    },

    button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    },

    remoteMessage: {
        fontSize: 20,
        color: 'red',
        padding: 10,
    }
})

export default WebConnection; 