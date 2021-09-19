import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import BoxNotifyCation from '../components/boxNotification';
const Notify = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  return (
    <ImageBackground
      source={require('../assets/images/bg_lotus.png')}
      resizeMode="cover"
      style={style.bgImage}>
      <View style={{flex: 1, backgroundColor: 'rgba(51,0,102,0.95)'}}>
        <Animated.View style={[style.container, {opacity: fadeAnim}]}>
          <FlatList
            data={[
              {
                tile: 'Notification',
                type: 'Desparacitación',
                date: '12/08/2010',
              },
              {
                tile: 'Notification',
                type: 'Desparacitación',
                date: '12/08/2010',
              },
              {
                tile: 'Notification',
                type: 'Desparacitación',
                date: '12/08/2010',
              },
            ]}
            renderItem={({item}) => <BoxNotifyCation />}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
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
