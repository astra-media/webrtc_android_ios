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

    const setRemoteDescription = async () => {
        const remoteDesc = new RTCSessionDescription(JSON.parse(description));
        pc.setRemoteDescription(remoteDesc).then(() => {
            // console.log(JSON.stringify(pc.remoteDescription));
            pc.createAnswer().then(desc => {
                pc.setLocalDescription(desc).then(()=> {
                    //generate answer
                    console.log(JSON.stringify(pc.localDescription));
                    console.log("other");
                    console.log(desc);
                })
            });
            });
    }

    const submitButton = async () =>{
        setRemoteDescription();
    }

    pc.addEventListener('connectionstatechange', event => {
        if (pc.connectionState === 'connected') {
            console.log("connected")
        }
    });

    return(
    <View>
    <Text>WebRTC</Text>
    <TextInput style={styles.input}
    placeholder = "Enter your offer"
    onChangeText = {setDescription}
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