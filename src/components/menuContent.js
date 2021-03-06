import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
const LinkMenu = ({data}) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => alert('Click Here')}>
      <ImageBackground
        source={data.img}
        imageStyle={{borderRadius: 10}}
        style={{
          width: wp('90%'),
          height: wp('30%'),
          justifyContent: 'flex-end',
          marginVertical: 5,
        }}
        resizeMode="cover">
        <Text
          style={{
            width: wp('90%'),
            fontSize: 20,
            textAlign: 'right',
            textTransform: 'uppercase',
            color: '#00FFFF',
            paddingRight: 20,
            paddingVertical: 10,
            backgroundColor: 'rgba(51,8,102,0.63)',
          }}>
          {data.title}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const MenuContent = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#31055d',
        padding: 10,
      }}>
      <View style={style.menuContainer}>
        <FlatList
          data={[
            {
              title: 'Amar y Cuidar',
              img: require('../assets/images/menu/love_look_after.jpg'),
            },
            {
              title: 'Agenda Calendario',
              img: require('../assets/images/menu/CALENDAR.jpg'),
            },
            {
              title: 'Noticias',
              img: require('../assets/images/menu/NEWS2.jpg'),
            },
            {
              title: 'Gatopedia',
              img: require('../assets/images/menu/GATOPEDIA.jpg'),
            },
            {
              title: 'Para Amigos Caninos',
              img: require('../assets/images/menu/DOGS.jpg'),
            },
          ]}
          renderItem={({item}) => (
            <LinkMenu
              data={{
                title: item.title,
                img: item.img,
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default MenuContent;
