/* global API_URL ENV */
import React, { Component } from 'react'
import { WebView } from 'react-native'
import * as apiData from '../../APIkeys.json'

export default class TraktWebView extends Component {
  constructor(props) {
    super(props)
    this.url = `${API_URL}/oauth/authorize?response_type=code&client_id=${apiData[ENV].client}&redirect_uri=${
      apiData[ENV].redirect_uri
    }`
  }

  render() {
    return <WebView source={{ uri: this.url }} style={{ flex: 1 }} />
  }
}
