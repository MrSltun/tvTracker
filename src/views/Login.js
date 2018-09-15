import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class Login extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../images/loginBackground.jpg')}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={Actions.webview}
            style={{ backgroundColor: '#C01', paddingHorizontal: 48, paddingVertical: 8, marginVertical: 48 }}>
            <View>
              <Text style={{ fontSize: 15, color: '#FFF' }}>Login</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: '#888', fontSize: 11 }}>
            This application uses Trakt.tv, you must have an account to use it.
          </Text>
        </ImageBackground>
      </View>
    )
  }
}
