import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useIsConnected} from 'react-native-offline';
const ListBoxFilters = () => {
  const id_deworming = '';
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  return (
    <View
      style={[
        style.itemContent,
        {
          flexDirection: 'row',
        },
      ]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./../assets/images/cat-list.png')}
          style={{width: 52, height: 52, borderRadius: 100}}
        />
        <View style={style.circle}>
          <Image
            source={require('./../assets/images/tabs/PARASITEICON.png')}
            resizeMode="contain"
            style={style.iconImage}
          />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          paddingLeft: 15,
        }}>
        <Text style={{fontSize: 20, color: '#ffffff'}}>Michi!</Text>
        <Text style={{fontSize: 10, color: '#ffffff'}}>Fecha: 09/11/2021</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          paddingHorizontal: 3,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 28, color: '#00FFFF', fontWeight: '700'}}>
            10
          </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 12, color: '#00FFFF'}}>Días restantes</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={{alignItems: 'center'}}
          onPress={() =>
            isConnected
              ? navigation.navigate('DetailsGeneral', {
                  idDetails: id_deworming,
                  type: 'desparacitacion',
                })
              : navigation.navigate('DetailsOfflineGeneral', {
                  idDetails: id_deworming,
                  type: 'desparacitacion',
                })
          }
          underlayColor="transparent">
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 6,
              backgroundColor: 'rgba(51,0,102,0.56)',
              margin: 4,
              borderRadius: 4,
            }}>
            <Image
              source={require('./../assets/images/detailsicon.png')}
              resizeMode="contain"
              style={style.iconActions}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  iconActions: {
    width: 30,
    height: 30,
  },
  iconImage: {
    width: 15,
    height: 15,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#660066',
    marginVertical: 3,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  circle: {
    backgroundColor: '#452070',
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    right: -12,
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#270351',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

export default ListBoxFilters;
