import React from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BoxNotifyCation from '../components/boxNotification';
const Notify = () => {
  return (
    <Animated.View style={style.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/bg_lotus.png')}
          resizeMode="cover"
          style={style.bgImage}>
          <View style={{flex: 1, maxWidth: 500}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <BoxNotifyCation />
              <BoxNotifyCation />
              <BoxNotifyCation />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
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
