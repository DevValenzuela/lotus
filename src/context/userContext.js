import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const initialize = {
  jwt: '',
  user: {
    email: '',
    id: '',
    username: '',
    confirmed: '',
    blocked: '',
    avatar: {url: ''},
  },
  idPhoto: '',
};

const UserProvider = props => {
  const [user, setUser] = useState(initialize);
  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_URI':
        setUser({...user, idPhoto: payload.idPhoto});
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const storageUser = await AsyncStorage.getItem('token_lotus');
      const valueJson = JSON.parse(storageUser);
      valueJson ? setUser({...user, ...valueJson}) : null;
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{user, dispatchUserEvent}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
