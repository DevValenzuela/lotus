import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import {BtnAction} from '../components/sharedComponent';
import ListCarousel from '../components/listCarousel';

const DashBoard = ({navigation}) => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
        }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'column',
            },
          ]}>
          <View style={{flex: 3}}>
            <Image
              style={style.banner}
              source={require('./../assets/images/banner_canino.jpg')}
              resizeMode="cover"
            />
          </View>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <View style={{width: 250}}>
              <BtnAction navigation={navigation} title="Desparacitación" url={require('../assets/images/tabs/PARASITEICON.png')} />
              <BtnAction navigation={navigation} title="Vacunación" url={require('../assets/images/tabs/VACCINEICON.png')} />
              <BtnAction
                navigation={navigation}
                title="Control Veterinario"
                action="ControlMedic"
                url={require('../assets/images/tabs/DOCTORICON.png')}
              />
            </View>
          </View>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <ListCarousel navigation={navigation} />
          </View>
          <View style={{flex: 2, alignItems: 'center', marginTop:10}}>
            <BtnAction
              navigation={navigation}
              title="Añadir Mascota"
              action="AddMascot"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  banner: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  imageGoogle: {
    width: '100%',
    height: 90,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});

export default DashBoard;
