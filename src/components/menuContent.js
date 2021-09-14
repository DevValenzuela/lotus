import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const LinkMenu = ({data}) => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={() => alert('Click Here')}>
      <ImageBackground
        source={data.img}
        imageStyle={{borderRadius: 4, opacity: 0.8}}
        style={{width: 300, height: 120}}
        resizeMode="contain">
        <Text
          style={{
            width: '100%',
            position: 'relative',
            bottom: -75,
            fontSize: 18,
            textAlign: 'right',
            textTransform: 'uppercase',
            color: '#00FFFF',
            paddingRight: 10,
          }}>
          {data.title}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const MenuContent = () => {
  return (
    <ScrollView>
      <View
        style={{
          position: 'relative',
          backgroundColor: '#31055d',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={style.menuContainer}>
          <LinkMenu
            data={{
              title: 'Amar y Cuidar',
              img: require('../assets/images/menu/love_look_after.jpg'),
            }}
          />
          <LinkMenu
            data={{
              title: 'Agenda Calendario',
              img: require('../assets/images/menu/CALENDAR.jpg'),
            }}
          />
          <LinkMenu
            data={{
              title: 'Noticias',
              img: require('../assets/images/menu/NEWS2.jpg'),
            }}
          />
          <LinkMenu
            data={{
              title: 'Gatopedia',
              img: require('../assets/images/menu/GATOPEDIA.jpg'),
            }}
          />
          <LinkMenu
            data={{
              title: 'Para Amigos Caninos',
              img: require('../assets/images/menu/DOGS.jpg'),
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  menuContainer: {
    marginTop: 5,
    flex: 1,
    maxWidth: 500,
    height: Dimensions.get('window').height,
  },
});
export default MenuContent;
