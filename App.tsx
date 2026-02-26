import React from 'react'
import { store } from './src/store'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { AppNavigator } from './src/navigation/AppNavigator'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <AppNavigator />
    </Provider>
  )
}

export default App