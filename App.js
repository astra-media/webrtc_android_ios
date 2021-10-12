import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Control from './components/controller1'

const App = () => {
  return(
    <View style = {styles.container}>
      <Text style = {styles.text}>Controller Prototype</Text>
      <Control/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center'
  },
  text:{
    paddingBottom: 20,
    fontSize: 24
  }
})

export default App;