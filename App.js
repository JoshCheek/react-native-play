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

export default class App extends React.Component implements PermissionAwareActivity {
  constructor(props) {
    super(props)
    let latitude        = '37.8267'
    let longitude       = '-122.4233'
    let darkskyKey      = 'FIXME'
    let darkskyUrl      = `https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`
    let darkskyResponse = null
    this.state = { latitude, longitude, darkskyKey, darkskyUrl, darkskyResponse }

    fetch(darkskyUrl, { method: 'GET', headers: { Accept: 'application/json' } })
      .then(response => response.json())
      .then(data => {
        this.setState({darkskyResponse: data})
      })
      .then(data => console.log(data))
    // switch (this.state.granted) { 'unattempted': 'success': 'error': 'denied':
  }

  render() {
    const response = this.state.darkskyResponse
    let summary = 'no data'
    if (response)
      summary = response.currently.summary
    return <View style={styles.container}>
      <Text>Showing weather in LA</Text>
      <Text>{summary}</Text>
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
