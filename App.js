import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PermissionsAndroid } from 'react-native';

// https://facebook.github.io/react-native/docs/permissionsandroid
async function requestGeolocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      { title:   'Weather :shrug:',
        message: 'We need your geolocation to show you your weather'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the geolocation")
      return 'success'
    } else {
      granted = 'denied'
      console.log("No dice!!!!!!!!!")
    }
  } catch (err) {
    granted = 'error'
    console.warn(err)
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { granted: 'unattempted' }
  }

  render() {
    if(this.state.granted === 'unattempted') {
      console.log('ABOUT TO ASK PERMISSION')
      requestGeolocationPermission()
        .then(granted => this.setState({granted}))
    }

    let message = this.state.granted
    // switch (this.state.granted) {
    //   case 'unattempted':
    //   case 'success':
    //   case 'error':
    //   case 'denied':
    //   default:
    // }

    return <View style={styles.container}>
      <Text>OPEN up App.js to start working on your app!</Text>
      <Text>{message}</Text>
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
