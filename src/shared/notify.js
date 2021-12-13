import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import BoxNotifyCation from '../components/boxNotification';
import {database3} from '../conexion/crudNotify';
import {Loading} from '../components/sharedComponent';

const Notify = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [getNotify, setNotify] = useState([]);
  const [status, getStatus] = useState(true);
  let timer = useRef(null);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    database3.ConsultNotify(setNotify);
    timer.current = setTimeout(() => {
      getStatus(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [fadeAnim, setNotify]);

  const resp = [];

  getNotify?.forEach(item => {
    if (item.id_mascot) {
      let object = {
        id: item.ID,
        title: item.title,
        last_date: item.last_date,
        id_mascot: item.id_mascot,
      };
      resp.push(object);
    }
  });

  if (status) return <Loading />;

  if (resp.length <= 0) {
    return (
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(51,0,102,0.95)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>No tienes notificaciones.</Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{flex: 1, backgroundColor: 'rgba(51,0,102,0.95)'}}>
          <Animated.View style={[style.container, {opacity: fadeAnim}]}>
            <FlatList
              data={resp}
              renderItem={({item}) => <BoxNotifyCation data_notify={item} />}
            />
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0,
  },
  bgImage: {
    flex: 1,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  tinyLogo: {
    width: 128,
    height: 163,
  },
  label: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 10,
  },
  group: {
    padding: 10,
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderColor: '#330066',
    color: '#330066',
    backgroundColor: '#66FFCC',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  btnRegister: {
    backgroundColor: 'transparent',
    color: '#66FFCC',
    fontSize: 16,
    textTransform: 'uppercase',
    padding: 10,
  },
});
export default Notify;
