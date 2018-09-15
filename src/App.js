/* global ENV */
import React, { Component } from 'react'
import { Linking, Platform } from 'react-native'
import { Stack, Scene, Router, Actions, ActionConst } from 'react-native-router-flux'

import Home from './views/Home'
import Login from './views/Login'
import GetToken from './views/GetToken'
import WebView from './views/WebView'
import ShowDetails from './views/ShowDetails'
import UserStore from './UserStore'
import * as apiData from '../APIkeys.json'

global.API_URL = 'https://api-staging.trakt.tv'
global.ENV = 'debug'
global.AUTH_HEADERS = {
  Authorization: `Bearer ${UserStore.accessToken}`,
  'Content-type': 'application/json',
  'trakt-api-key': apiData[ENV].client,
  'trakt-api-version': 2
}

class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            Actions.pop()
            console.log(url)
            Actions.getToken({ redirectUrl: url, type: ActionConst.REPLACE })
          }
        })
        .catch(err => console.log(err))
    } else {
      Linking.addEventListener('url', this.handleNavigation)
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL(event) {
    console.log(event.url)
    // const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  }

  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar>
          <Scene key="login" component={Login} title="Login" initial />
          <Scene key="home" component={Home} />
          <Scene key="webview" component={WebView} />
          <Scene key="getToken" component={GetToken} />
          <Scene key="showDetails" component={ShowDetails} />
        </Stack>
      </Router>
    )
  }
}
export default App
