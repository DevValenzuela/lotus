import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const initialize = {
  jwt: '',
  user: {
    id: '',
    email: '',
    username: '',
  },
  idPhoto: '',
};

const UserProvider = props => {
  const [user, setUser] = useState(initialize);
  const [getRefresh, setRefresh] = useState(true);
  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_URI':
        setUser({...user, idPhoto: payload.idPhoto});
        return;
      case 'ADD_USER':
        setUser({...user, ...payload.user});
        return;
      case 'REFRESH':
        setRefresh(payload.refresh);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    if(getRefresh){
      getUser();
      setRefresh(false);
    }
  }, [getRefresh]);

  const getUser = async () => {
    const storageUser = await AsyncStorage.getItem('token_lotus');
    const valueJson = JSON.parse(storageUser);
    valueJson ? setUser({...user, ...valueJson}) : null;
  };

  return (
    <UserContext.Provider value={{user, dispatchUserEvent}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
