import React from 'react';
import ScreenNotification from '../components/screenNotification';
import {View, StyleSheet, ImageBackground} from 'react-native';

const Notification = () => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ScreenNotification />
        </View>
      </ImageBackground>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Notification;
