import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();


const UserProvider = (props) => {
    const [user, setUser] = useState({});

    useEffect(()=>{
        const getUser = async () =>{
            const storageUser =  await AsyncStorage.getItem('token_lotus');
            const valueJson = JSON.parse(storageUser);
            setUser(valueJson);
        }
        getUser();
    },[])


    return (
        <UserContext.Provider value={{user}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider