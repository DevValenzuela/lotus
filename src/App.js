/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {RouterNavigation} from './router.navigation';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import {setContext} from '@apollo/client/link/context';
import UserProvider from './context/userContext';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const httpLink = new createUploadLink({
    uri: `${API_URL}/graphql`,
    onError: e => {
      console.log('Error Server: ' + e);
    },
  });

  const authLink = setContext(async (_, {headers}) => {
    // return the headers to the context so httpLink can read them
    const userStorage = await AsyncStorage.getItem('token_lotus');
    const token = JSON.parse(userStorage);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token.jwt.toString()}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
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
