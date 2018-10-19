import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class App extends React.Component {
  render() {
    return <View style={styles.container}>
      <Text>OPEN up App.js to start working on your app!</Text>
      <Text>wat wat WAT</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
