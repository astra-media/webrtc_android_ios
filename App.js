import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import WebConnection from './components/WebConnection';

const App = () => {
  return(
    <View style={styles.container}>
      {/* <Text style = {styles.title}>Controller Prototype</Text> */}
      <Text style={styles.text}>Please copy your offer below to generate answer.{"\n"}
      Once connected you should be able to send & receive data through "datachannel".
      </Text>
      {/* <Control/> */}
      <WebConnection/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  },

  text:{
    fontSize: 12,
    textAlign: "center",

  }
})

export default App;