/* global API_URL, ENV */
import React, { Component } from 'react'
import { View, ActivityIndicator, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as apiData from '../../APIkeys.json'
import UserStore from '../UserStore'

export default class GetToken extends Component {
  componentDidMount() {
    const code = this.props.redirectUrl.match(/code=([^&]*)/)[1]

    fetch(`${API_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        client_id: apiData[ENV].client,
        client_secret: apiData[ENV].client_secret,
        redirect_uri: apiData[ENV].redirect_uri,
        grant_type: 'authorization_code'
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson)
        if (resJson.access_token) {
          UserStore.saveAccessToken(resJson).then(() => {
            global.AUTH_HEADERS = {
              Authorization: `Bearer ${UserStore.accessToken}`,
              'Content-type': 'application/json',
              'trakt-api-key': apiData[ENV].client,
              'trakt-api-version': 2
            }
            Actions.reset('home')
            BackHandler.exitApp()
          })
        }
      })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    )
  }
}
