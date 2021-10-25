import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const BoxNotifyCation = () => {
  return (
    <View style={style.container}>
      <View style={{flex: 1, padding: 10}}>
        <Image
          style={style.cardImage}
          source={require('../assets/images/not_image_small.jpg')}
        />
      </View>
      <View style={{flex: 2, padding: 10, paddingLeft: 20}}>
        <Text style={{color: '#00FFFF', fontWeight: 'bold'}}>MICHI 1</Text>
        <Text style={{color: '#fff', fontWeight: '200', fontSize: 12}}>
          Desparasitación
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          padding: 10,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              color: '#00FFFF',
              fontWeight: 'bold',
              fontSize: 25,
              paddingHorizontal: 10,
            }}>
            01
          </Text>
        </View>
        <View>
          <Text style={{color: '#00FFFF', fontWeight: '300', fontSize: 12}}>
            Días Restantes
          </Text>
          <Text style={{color: '#ffffff', fontWeight: '300', fontSize: 12}}>
            09/11/2021
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#562A8C',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default BoxNotifyCation;
