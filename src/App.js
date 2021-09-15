/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RouterNavigation} from './router.navigation';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <>
      <NavigationContainer>
        <RouterNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
