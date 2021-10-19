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
import { useNavigation } from '@react-navigation/native';
const Gratulations = ({route}) => {
  const { txtMsg, action = 'Dashboard' } = route.params;
  const navigation = useNavigation();
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
