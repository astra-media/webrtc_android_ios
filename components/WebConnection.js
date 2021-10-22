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
    const [message, setMessage] = useState('no message');
    const [sMessage, setSMessage] = useState('no Message');

    const setRemoteDescription = async () => {
        const remoteDesc = new RTCSessionDescription(JSON.parse(description));
        pc.setRemoteDescription(remoteDesc).then(() => {
            // console.log(JSON.stringify(pc.remoteDescription));
            pc.createAnswer().then(desc => {
                pc.setLocalDescription(desc).then(()=> {
                    //generate answer
                    console.log(JSON.stringify(pc.localDescription));
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
    <View>
    <Text>WebRTC</Text>
    
    {/* offer from remote */}
    <TextInput style={styles.input}
    placeholder = "Enter your offer"
    onChangeText = {setDescription}
    />
    <TouchableOpacity onPress={submitButton}>
        <Text style={styles.button} >Generate Answer</Text>
    </TouchableOpacity>
    
    {/* messages from remote */}
    <Text>Message from remote</Text>
    <Text>{message}</Text>

    {/* Send New Message  */}
    <Text>Send Message</Text>
    <TextInput style={styles.input}
    placeholder = "new message"
    onChangeText = {setSMessage}
    />
    <TouchableOpacity onPress={sendMessage}>
        <Text style={styles.button}>Send</Text>
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
    button: {
        fontSize: 20,
    },
})

export default WebConnection; 