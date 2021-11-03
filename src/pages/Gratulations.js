import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {Loading2} from '../components/sharedComponent';
import {CONSULT_APP} from '../pages/apolllo/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DELETE_PHOTO_MASCOT,
  UPDATE_USER_BLOCK_APP,
} from '../pages/apolllo/grahpql';
const Gratulations = ({route}) => {
  const navigation = useNavigation();
  const {txtMsg, action = 'Dashboard', id, type} = route.params;

  if (type === 'DELETE') {
    const {loading, error, data} = useQuery(CONSULT_APP, {
      variables: {
        id,
      },
    });
    const [updateUserBlock] = useMutation(UPDATE_USER_BLOCK_APP);
    const [deleteFile] = useMutation(DELETE_PHOTO_MASCOT);
    if (loading) return <Loading2 />;
    const {user} = data;
    if (user) {
      if (user.avatar !== null) {
        const {id: idAvatar} = user.avatar;
        deleteFile({
          variables: {
            inputId: {
              id: idAvatar,
            },
          },
        })
          .then(() => {
            console.log('Photo Delete Avatar');
            return true;
          })
          .catch(error => {
            console.log(error);
          });
      }

      updateUserBlock({
        variables: {
          id: user.id,
          block: true,
        },
      })
        .then(async () => {
          await AsyncStorage.removeItem('token_lotus');
          console.log('User delete sucess fully');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <View style={style.containerLogo}>
            <Image
              style={style.tinyLogo}
              source={require('../assets/images/lotus_logo.png')}
            />
            <Text style={{color: '#00FFFF', fontSize: 18}}>pet-care app</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={style.txtAdvert}>{txtMsg}</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.navigate(action)}>
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
                  Ok, ¡Deacuerdo!
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default Gratulations;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 50,
  },
  txtAdvert: {
    color: '#fff',
    paddingVertical: 30,
    textAlign: 'center',
    width: 230,
  },
  tinyLogo: {
    width: 118,
    height: 153,
  },
});
