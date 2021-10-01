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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import UserProvider from './context/userContext';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    getToken();
  });

  const getToken = async () => {
    try {
      await AsyncStorage.setItem('token_lotus', 'key local');
      setToken(await AsyncStorage.getItem('token_lotus'));
    } catch (e) {
      setToken(null);
    }
  };

  const client = new ApolloClient({
    uri: 'http://192.168.0.11:1337/graphql',
    cache: new InMemoryCache(),
    request: operation => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      });
    },
  });

  return (
    <>
      <UserProvider>
      <NavigationContainer>
        <ApolloProvider client={client}>
          <RouterNavigation />
        </ApolloProvider>
      </NavigationContainer>
      </UserProvider>
    </>
  );
};

export default App;
