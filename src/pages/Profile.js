import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {BtnAction} from '../components/sharedComponent';

const ProfileUser = ({navigation}) => {
  return (
    <View style={style.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/bg_lotus.png')}
          resizeMode="cover"
          style={[
            style.bgImage,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <View style={style.contentProfile}>
            <Image
              source={require('../assets/images/image_photo.png')}
              style={style.imgProfile}
            />
            <Text style={style.name}>Andres Cooper</Text>
            <Text style={style.text}>andres.cooper@interstellar.com</Text>
            <TouchableHighlight
              style={style.edit}
              underlayColor="transparent"
              onPress={() => navigation.navigate('EditProfile')}>
              <Image source={require('./../assets/images/edit_btn.png')} />
            </TouchableHighlight>
          </View>
          <BtnAction title="Cerrar Sesión" />
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  contentProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'rgba(102,0,102,0.71)',
    padding: 20,
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
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  edit: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(51,0,102,0.56)',
    padding: 10,
    borderRadius: 50,
  },
});
export default ProfileUser;
