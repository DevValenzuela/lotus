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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import UserProvider from './context/userContext';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
    startUser();
  }, []);

  const startUser = async () => {
    const userStorage = await AsyncStorage.getItem('token_lotus');
    const JsonStorage = JSON.parse(userStorage);
    setToken(JsonStorage);
  };

  const httpLink = new HttpLink({uri: 'http://192.168.20.22:1337/graphql'});

  const authLink = setContext((_, {headers}) => {
    // return the headers to the context so httpLink can read them
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
