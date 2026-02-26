import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/AppNavigator';
import { store } from './src/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <AppNavigator />
    </Provider>
  );
}

export default App;