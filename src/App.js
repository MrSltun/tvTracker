import React from 'react'
import { NativeRouter, Route } from 'react-router-native'

import Home from './views/Home'

const App = () => (
  <NativeRouter>
    <Route exact path="/" component={Home} />
  </NativeRouter>
)

export default App
