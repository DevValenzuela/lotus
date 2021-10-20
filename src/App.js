/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {API_URL} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {RouterNavigation} from './router.navigation';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import {setContext} from '@apollo/client/link/context';
import UserProvider from './context/userContext';
import SQLite from 'react-native-sqlite-storage';
import sqliteNotification from './hooks/sqliteNotification';


const db = SQLite.openDatabase(
    {
      name: 'MainDB',
      location: 'default',
    },
    () => {
      console.log('Open success fully database sqlite.');
    },
    error => {
      console.log('Error open database sqlite.');
    },
);


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          + "Notify "
          + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, last_date TEXT, title TEXT, type TEXT);"
      )
    })
  }

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
            "SELECT last_date, title, type FROM Notify",
            [],
            (tx, results) => {
              let len = results.rows.length;
              console.log(results.rows.item(0))
            }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }

  const setData = async () => {
    let last_date = "12-08-2020"
    let title = "nuevo notification"
    if (last_date.length == 0 || title.length == 0) {
      alert('Please write your data.');
    } else {
      try {
        await db.transaction(async (tx) => {
          await tx.executeSql(
              "INSERT INTO Notify (last_date, title) VALUES (?,?)",
              [last_date, title]
          );
        })
      } catch (error) {
        console.log(error);
      }
    }
  }


  const httpLink = new createUploadLink({
    uri: `${API_URL}/graphql`,
    onError: e => {
      console.log('Error Server: ' + e);
    },
  });

  const authLink = setContext(async (_, {headers}) => {
    // return the headers to the context so httpLink can read them
    const jsonValue = await AsyncStorage.getItem('token_lotus');
    const json = jsonValue != null ? JSON.parse(jsonValue) : null;
    return {
      headers: {
        ...headers,
        authorization: json ? `Bearer ${json.jwt}` : '',
      },
    };
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            mascots: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            medicaments: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            desparacitacions:{
              merge(existing, incoming) {
                return incoming;
              },
            },
            vacunacions:{
              merge(existing, incoming) {
                return incoming;
              },
            },
            controllerMedics:{
              merge(existing, incoming) {
                return incoming;
              },
            }
          },
        },
      },
    }),
    //defaultOptions: defaultOptions,
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
