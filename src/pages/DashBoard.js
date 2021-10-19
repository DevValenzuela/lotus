import React, {useEffect, useState, useContext} from 'react';
import {API_URL} from '@env';
import {useQuery} from '@apollo/client';
import {BANNER_APP} from '../pages/apolllo/query';

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
  RefreshControl,
} from 'react-native';

import {BtnAction, Loading} from '../components/sharedComponent';
import ListCarousel from '../components/listCarousel';
import {UserContext} from '../context/userContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const DashBoard = ({navigation}) => {
  const {
    dispatchUserEvent,
    user: {user},
  } = useContext(UserContext);
  const {loading, error, data} = useQuery(BANNER_APP, {
    pollInterval: 2000,
  });
  const [getOfert, setOfert] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
    if (data) {
      const {banners} = data;
      setOfert(banners[0]?.ofert);
    }
  }, [data, loading, user]);

  if (loading) return <Loading />;
  if (error) console.log(error);

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
          <ScrollView
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                {getOfert ? (
                  <Image
                    style={style.banner}
                    source={{uri: `${API_URL}${getOfert.url}`}}
                    resizeMode="stretch"
                  />
                ) : (
                  <Image
                    style={style.banner}
                    source={require('./../assets/images/not_image_banner.jpg')}
                    resizeMode="stretch"
                  />
                )}
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
                <ListCarousel navigation={navigation} refresh={refreshing} />
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
          </ScrollView>
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
