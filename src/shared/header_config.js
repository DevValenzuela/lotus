import React, {useContext, useEffect, useState} from 'react';
import {API_URL} from '@env';
import {
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../context/userContext';
import {useQuery} from '@apollo/client';
import {CONSULT_APP} from '../pages/apolllo/query';

function LogoTitle() {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        left: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
      }}>
      <Image
        style={{width: 35, height: 35}}
        source={require('../assets/images/logo_lotus_menu.png')}
      />
    </View>
  );
}

function NotifyProfileView() {
  const navigation = useNavigation();
  const  [getAvatar, setAvatar] = useState({});
  const {
    user: {user},
  } = useContext(UserContext);

  const {
    loading: loadingB,
    error: errorB,
    data: dataB,
  } = useQuery(CONSULT_APP, {
    variables: {
      id: user.id,
    },
  });

  useEffect(() => {
    if (dataB){
      const {avatar} = dataB.user;
      setAvatar(avatar);
    }
  }, [dataB]);

  if (loadingB) return null;
  if (errorB) console.log(errorB);

  return (
    <>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('Notify')}>
        <>
          <Image
            style={style.notify}
            source={require('../assets/images/notify_icon.png')}
          />
          <View style={style.number}>
            <Text style={style.txtNumber}>3</Text>
          </View>
        </>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('Profile')}>
        {getAvatar ? (
          <Image style={style.avatar} source={{uri: API_URL + getAvatar.url}} />
        ) : (
          <Image
            style={style.avatar}
            source={require('../assets/images/user_avatar_notfound.png')}
          />
        )}
      </TouchableHighlight>
    </>
  );
}

function Headerleft() {
  const navigation = useNavigation();
  return (
    <>
      <TouchableHighlight
        style={{zIndex: 999}}
        underlayColor="transparent"
        onPress={() => navigation.navigate('MenuDropDown')}>
        <Image
          style={style.menu}
          source={require('../assets/images/menu.png')}
        />
      </TouchableHighlight>
      <LogoTitle />
    </>
  );
}

export const options = () => ({
  title: '',
  headerStyle: {
    backgroundColor: '#330066',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => <Headerleft />,

  headerRight: () => (
    <View style={{flexDirection: 'row'}}>
      <NotifyProfileView />
    </View>
  ),
});

export const options2 = () => ({
  headerStyle: {
    backgroundColor: '#330066',
  },
  headerTintColor: '#00FFFF',
  headerTitleStyle: {
    fontWeight: '400',
  },

  headerRight: () => (
    <View style={{flexDirection: 'row'}}>
      <NotifyProfileView />
    </View>
  ),
});

const style = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 20,
    marginLeft: 8,
    marginTop: 5,
  },
  menu: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
    zIndex: 999999,
    position: 'relative',
  },
  notify: {
    width: 39,
    height: 39,
    marginTop: 8,
  },
  number: {
    position: 'absolute',
    backgroundColor: '#C28800',
    borderRadius: 100 / 2,
    width: 15,
    height: 15,
    top: 22,
    left: 20,
  },
  txtNumber: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 14,
    fontSize: 10,
  },
  menuDropDown: {
    backgroundColor: '#3c106c',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 54,
    padding: 10,
    position: 'absolute',
    zIndex: 999,
  },
});
