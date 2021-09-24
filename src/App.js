/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RouterNavigation} from './router.navigation';
import SplashScreen from 'react-native-splash-screen';

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
  });

  const client = new ApolloClient({
    uri: 'http://192.168.0.11:1337/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <>
      <NavigationContainer>
        <ApolloProvider client={client}>
          <RouterNavigation />
        </ApolloProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
