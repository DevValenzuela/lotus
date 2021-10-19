import React, {useContext, useEffect, useRef, useState} from 'react';
import {UserContext} from './../../context/userContext';
import {API_URL} from '@env';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  Animated,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';
import {CONSULT_APP, CONSULT_MASCOTS_APP} from '../apolllo/query';
import {Loading} from '../../components/sharedComponent';
import DeleteMascot from '../../components/deleteMascot';
function ListMascot({data}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'space-between',
        marginVertical: 2,
        flex: 1,
      }}>
      <View style={{flex: 1, padding: 10}}>
        {data.img ? (
          <Image
            source={{
              uri: data.img,
            }}
            style={style.rounded}
          />
        ) : (
          <Image
            source={require('../../assets/images/not_image_small.jpg')}
            style={style.rounded}
          />
        )}
      </View>
      <View style={{flex: 2, alignSelf: 'center'}}>
        <Text style={{color: '#ffffff', textTransform: 'capitalize'}}>
          {data.title}
        </Text>
      </View>
      <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
        <DeleteMascot data={data} />
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate('DetailsMascot', {mascotId: data.id})
          }>
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(51,0,102,0.56)',
              marginVertical: 2,
            }}>
            <Image
              source={require('../../assets/images/detailsicon.png')}
              resizeMode="contain"
              style={style.iconActions}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const ProfileUser = ({navigation}) => {
  const {
    user: {user},
  } = useContext(UserContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [getAvatar, setAvatar] = useState();

  const {data, loading, error} = useQuery(CONSULT_APP, {
    pollInterval: 2000,
    variables: {
      id: user.id,
    },
  });

  const {
    data: listData,
    loading: loadingData,
    error: errorData,
  } = useQuery(CONSULT_MASCOTS_APP, {
    pollInterval: 2000,
    variables: {
      id: user.id,
    },
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    if (data && !loading) {
      const {
        user: {avatar},
      } = data;
      setAvatar(avatar);
    }
  }, [fadeAnim, data]);

  const sessionClose = async () => {
    await AsyncStorage.removeItem('token_lotus');
    navigation.navigate('Login');
  };
  if (loading || loadingData) return <Loading />;
  if (error || errorData) console.log(error);
  if (!listData) return null;

  const consultProfileMascot = data => {
    if (data) {
      const dataMascot = [];
      data.mascots.map(item => {
        const url_image =
          item.avatar_mascot !== null && item.avatar_mascot !== undefined
            ? API_URL + item.avatar_mascot.url
            : '';
        dataMascot.push({
          id: item.id,
          title: item.name_mascot,
          img: url_image,
        });
      });
      return dataMascot;
    }
  };

  let resultList = consultProfileMascot(listData);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <Animated.View style={{flex: 1, opacity: fadeAnim}}>
          <View
            style={[
              style.container,
              {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: 'column',
              },
            ]}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={style.contentProfile}>
                {getAvatar ? (
                  <Image
                    source={{uri: `${API_URL}${getAvatar.url}`}}
                    style={style.imgProfile}
                  />
                ) : (
                  <Image
                    source={require('./../../assets/images/image_photo.png')}
                    style={style.imgProfile}
                  />
                )}
                <Text style={style.name}>{user.username}</Text>
                <Text style={style.text}>{user.email}</Text>
                <TouchableHighlight
                  style={style.edit}
                  underlayColor="transparent"
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Image
                    source={require('./../../assets/images/edit_btn.png')}
                  />
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('AddMascot')}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: '#80006A',
                    width: wp('80%'),
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
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex: 1, width: wp('90%')}}>
                <Text style={style.titleSub}>Mis Mascotas</Text>
                {resultList.length > 0 ? (
                  <FlatList
                    data={resultList}
                    renderItem={({item}) => <ListMascot data={item} />}
                  />
                ) : (
                  <Text style={style.txtNotFound}>
                    No hay resultados en la lista.
                  </Text>
                )}
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => sessionClose()}>
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#80006A',
                      marginBottom: 30,
                    }}>
                    <Text
                      style={{
                        padding: Platform.OS == 'ios' ? 20 : 10,
                        color: '#fff',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}>
                      Cerrar Sessión
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Animated.View>
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
    width: '100%',
    height: '100%',
  },
  contentProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(86,42,140,0.84)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  name: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  text: {
    color: '#00FFFF',
    textAlign: 'center',
  },
  imgProfile: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 50,
  },
  edit: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(51,0,102,0.56)',
    padding: 10,
    borderRadius: 50,
  },
  titleSub: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#00FFFF',
  },
  rounded: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  iconActions: {
    width: 20,
    height: 20,
  },
  txtNotFound: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
});
export default ProfileUser;
