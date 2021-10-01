import React, {useEffect, useRef} from 'react';
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        <Image
          source={{
            uri: data.img,
          }}
          style={style.rounded}
        />
      </View>
      <View style={{flex: 2, alignSelf: 'center'}}>
        <Text style={{color: '#ffffff'}}>{data.title}</Text>
      </View>
      <View style={{flex: 2, alignSelf: 'center', flexDirection: 'row'}}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="transparent"
          onPress={() => console.log('Eliminate....')}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(51,0,102,0.56)',
              margin: 2,
            }}>
            <Image
              source={require('../../assets/images/deleteicon.png')}
              resizeMode="contain"
              style={style.iconActions}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="transparent"
          onPress={() => navigation.navigate('DetailsMascot')}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'rgba(51,0,102,0.56)',
              margin: 2,
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <Animated.View style={{opacity: fadeAnim}}>
          <View style={style.contentProfile}>
            <Image
              source={require('./../../assets/images/image_photo.png')}
              style={style.imgProfile}
            />
            <Text style={style.name}>Andres Cooper</Text>
            <Text style={style.text}>andres.cooper@interstellar.com</Text>
            <TouchableHighlight
              style={style.edit}
              underlayColor="transparent"
              onPress={() => navigation.navigate('EditProfile')}>
              <Image source={require('./../../assets/images/edit_btn.png')} />
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
                width: wp('70%'),
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
          <View style={{flex: 2}}>
            <Text style={style.titleSub}>Mis Mascotas</Text>
            <FlatList
              data={[
                {
                  id: 2139012390 - 129312 - 9393902,
                  title: 'Michi 1',
                  img: 'https://pbs.twimg.com/profile_images/1267361661482082304/mnwkOjgz.jpg',
                },
                {
                  id: 2139012390 - 129312 - 9393902,
                  title: 'Michi 2',
                  img: 'https://www.elgrafico.mx/sites/default/files/2021/01/13/cuida_a_tu_michi_de_enfermedades_serias.jpg',
                },
                {
                  id: 2139012390 - 129312 - 9393902,
                  title: 'Michi 3',
                  img: 'https://lh3.googleusercontent.com/proxy/rdAQ3ncNXg4SjOYnSRGmFWT0HiWhH1lMsSBQK5kht-TwbGps2_VJVAFoCeYdLur6jXaPIDjxD7n-I0sal_B7bh5M_Tiu3qTUxrxh3koX-Tf5J3XlPeJ0oBmBZDRitTtlqV5Vx0BWcDE6PUc3rnPKN8X969dmniI',
                },
                {
                  id: 2139012390 - 129312 - 9393902,
                  title: 'Dog 1',
                  img: 'https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0',
                },
              ]}
              renderItem={({item}) => <ListMascot data={item} />}
            />
              <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => navigation.navigate('AddMascot')}>
                  <View
                      style={{
                          borderRadius: 10,
                          backgroundColor: '#80006A',
                          marginBottom: 30
                      }}>
                      <Text
                          style={{
                              padding: Platform.OS == 'ios' ? 20 : 10,
                              color: '#fff',
                              textTransform: 'uppercase',
                              textAlign: 'center'
                          }}>
                          Cerrar Sessión
                      </Text>
                  </View>
              </TouchableHighlight>
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
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  contentProfile: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(86,42,140,0.84)',
    paddingHorizontal: 20,
    paddingVertical: 0,
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
});
export default ProfileUser;
