import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Holding from './src/views/Holding';

const App = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <Holding />
    </SafeAreaView>
  )
}

export default App

// Style sheet for layout and styling
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
