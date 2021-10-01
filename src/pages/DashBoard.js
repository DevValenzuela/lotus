import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {BtnAction} from '../components/sharedComponent';
import ListCarousel from '../components/listCarousel';
import {UserContext} from '../context/userContext';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DashBoard = ({navigation}) => {
    const {user} = useContext(UserContext);
    console.log(user);
    return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              {
                flex: 1,
                flexDirection: 'column',
              },
            ]}>
            <View
              style={{
                height: hp('29%'),
                alignItems: 'center',
              }}>
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
                height: hp('32%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('69%'),
                  flexWrap: 'wrap',
                  marginLeft: 10,
                }}>
                <BtnAction
                  navigation={navigation}
                  title="Medicación"
                  action="MedicamentFilter"
                  url={require('../assets/images/tabs/MEDICAMENT.png')}
                />
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
                  title="Veterinario"
                  action="CtrVet"
                  url={require('../assets/images/tabs/DOCTORICON.png')}
                />
              </View>
            </View>
            <View
              style={{
                width: wp('100%'),
                height: hp('24%'),
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxWidth: 790,
              }}>
              <ListCarousel navigation={navigation} />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('AddMascot')}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: '#80006A',
                    width: wp('70%'),
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      padding: Platform.OS == 'ios' ? 20 : 10,
                      color: '#fff',
                      textTransform: 'uppercase',
                    }}>
                    Añadir Mascota
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
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
