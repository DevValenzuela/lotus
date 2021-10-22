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

const db_result = {
  mascots: []
}

const UserProvider = props => {
  const [user, setUser] = useState(initialize);
  const [consult, setConsult] = useState(db_result);
  const [getRefresh, setRefresh] = useState(true);
  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_URI':
        setUser({...user, idPhoto: payload.idPhoto});
        return;
      case 'ADD_USER':
        setUser({...user, ...payload.user});
        return;
      case 'ADD_SQLITE_MASCOT':
        setConsult({...consult, mascots: payload.resp});
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
    <UserContext.Provider value={{user, consult, dispatchUserEvent}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
