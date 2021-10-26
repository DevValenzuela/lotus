/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {NetworkProvider} from 'react-native-offline';

const AppComponent = (props) => (
  <NetworkProvider>
    <App />
  </NetworkProvider>
);

AppRegistry.registerComponent(appName, () => AppComponent);
