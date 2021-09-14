import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
} from "react-native";


function LogoTitle() {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        left: -12,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 113, height: 32}}
        source={require('../assets/images/logo_lotus_menu.png')}
      />
    </View>
  );
}

function NotifyProfileView({navigation}) {
  return (
    <>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('Notify')}>
        <>
          <Image
            style={style.notify}
            source={require('../assets/images/notify_icon.png')}
          />
          <View style={style.number}>
            <Text style={style.txtNumber}>3</Text>
          </View>

        </>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('Profile')}>
        <Image
          style={style.avatar}
          source={require('../assets/images/user.jpg')}
        />
      </TouchableHighlight>
    </>
  );
}

export const options = navigation => ({
  title: '',
  headerStyle: {
    backgroundColor: '#330066',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: () => (
    <>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('MenuDropDown')}>
          <Image
              style={style.menu}
              source={require('../assets/images/menu.png')}
          />
      </TouchableHighlight>
      <LogoTitle/>
    </>
  ),

  headerRight: () => (
    <View style={{flexDirection: 'row'}}>
      <NotifyProfileView navigation={navigation} />
    </View>
  ),
});

export const options2 = navigation => ({
  headerStyle: {
    backgroundColor: '#330066',
  },
  headerTintColor: '#00FFFF',
  headerTitleStyle: {
    fontWeight: '400',
  },

  headerRight: () => (
    <View style={{flexDirection: 'row'}}>
      <NotifyProfileView navigation={navigation} />
    </View>
  ),
});

const style = StyleSheet.create({
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 20,
    marginLeft: 8,
    marginTop: 5,
  },
  menu: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  notify: {
    width: 39,
    height: 39,
    marginTop: 8,
  },
  number: {
    position: 'absolute',
    backgroundColor: '#C28800',
    borderRadius: 100 / 2,
    width: 15,
    height: 15,
    top: 22,
    left: 20,
  },
  txtNumber:{
    color: '#fff',
    textAlign: 'center',
    lineHeight: 14,
    fontSize: 10,
  },
  menuDropDown: {
    backgroundColor: '#3c106c',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 54,
    padding: 10,
    position: 'absolute',
    zIndex: 999,
  },
});
