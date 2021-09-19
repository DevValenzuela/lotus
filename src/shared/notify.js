import React from 'react';
import {
  Animated,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import BoxNotifyCation from '../components/boxNotification';
const Notify = () => {
  return (
    <Animated.View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{flex: 1}}>
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
        </View>
      </ImageBackground>
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
