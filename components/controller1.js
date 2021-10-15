import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Controller1 = () => {
    const [button1State, setButton1State] = useState(true);

    const button1 = () => {
        setButton1State(!button1State)
        console.log('button pressed');
    }

  return(
    <View >
      <TouchableOpacity style = {styles.button} onPress={button1}>
          <Text>Press ME</Text>
      </TouchableOpacity>

      <Text style = {styles.text}>Press Status: {button1State ? "on" : "off"}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "yellow",
        padding: 10
      },
      text: {
          paddingTop: 20
      } 
})

export default Controller1;