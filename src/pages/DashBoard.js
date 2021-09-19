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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
          <View style={{alignItems: 'center'}}>
            <Image
              style={style.banner}
              source={require('./../assets/images/banner_canino.jpg')}
              resizeMode="stretch"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              height: hp('33%'),
            }}>
            <View style={{width: wp('60%')}}>
              <BtnAction
                navigation={navigation}
                title="Desparacitación"
                action="DewormingFilter"
                url={require('../assets/images/tabs/PARASITEICON.png')}
              />
              <BtnAction
                navigation={navigation}
                title="Vacunación"
                action="VaccinateFilter"
                url={require('../assets/images/tabs/VACCINEICON.png')}
              />
              <BtnAction
                navigation={navigation}
                title="Control Veterinario"
                action="CtrVet"
                url={require('../assets/images/tabs/DOCTORICON.png')}
              />
            </View>
          </View>
          <View
            style={{
              width: wp('100%'),
              height: hp('20%'),
              justifyContent: 'flex-start',
              alignItems: 'center',
              maxWidth: 790,
            }}>
            <ListCarousel navigation={navigation} />
          </View>
          <View style={{alignItems: 'center'}}>
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
    width: wp('100%'),
    height: hp('26%'),
    maxWidth: 560,
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
