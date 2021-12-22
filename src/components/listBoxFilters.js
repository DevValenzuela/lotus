import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {CONSULT_MASCOT_APP_SQLITE} from '../pages/apolllo/query';
import moment from 'moment';
const ListBoxFilters = ({data}) => {
  const {id, id_mascot, date, date_notify, id_type, type, id_notify} = data;
  const navigation = useNavigation();
  const [getMascot, setMascot] = useState(null);
  const {fetchMore} = useQuery(CONSULT_MASCOT_APP_SQLITE);

  let nowDay = moment(date);
  let lastDay = moment(date_notify);

  useEffect(() => {
    consultMascot().then(resp => {
      const {mascots} = resp.data;
      setMascot(mascots);
    });
  }, []);

  async function consultMascot() {
    return await fetchMore({
      fetchPolicy: 'no-cache',
      pollInterval: 1000,
      variables: {
        id: id_mascot,
      },
    });
  }
  if (!getMascot) return null;

  let image = getMascot[0]?.avatar_mascot.url;

  const imageCategory = () => {
    switch (type) {
      case 'Desparacitación':
        return [
          <Image
            source={require('./../assets/images/tabs/PARASITEICON.png')}
            resizeMode="contain"
            style={style.iconImage}
          />,
          'desparacitacion',
        ];

      case 'Control Medico':
        return [
          <Image
            source={require('./../assets/images/tabs/DOCTORICON.png')}
            resizeMode="contain"
            style={style.iconImage}
          />,
          'control medico',
        ];

      case 'Medicamento':
        return [
          <Image
            source={require('./../assets/images/tabs/MEDICAMENT.png')}
            resizeMode="contain"
            style={style.iconImage}
          />,
          'medicamento',
        ];

      case 'Vacunación':
        return [
          <Image
            source={require('./../assets/images/tabs/VACCINEICON.png')}
            resizeMode="contain"
            style={style.iconImage}
          />,
          'vacunacion',
        ];

      default:
        return [
          <Image
            source={require('./../assets/images/not_image.jpg')}
            resizeMode="contain"
            style={style.iconImage}
          />,
          '',
        ];
    }
  };

  const number = () => {
    if (lastDay.diff(nowDay, 'days') <= -1) {
      return 0;
    } else {
      return lastDay.diff(nowDay, 'days');
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
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
          {image ? (
            <Image
              source={{uri: `${API_URL}${image}`}}
              style={style.avatarMascot}
            />
          ) : (
            <Image
              source={require('./../assets/images/not_image.jpg')}
              style={style.avatarMascot}
            />
          )}

          <View style={style.circle}>{imageCategory()[0]}</View>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            paddingLeft: 15,
          }}>
          <Text style={{fontSize: 16, color: '#ffffff'}}>
            {getMascot[0]?.name_mascot.toUpperCase()}
          </Text>
          <Text style={{fontSize: 10, color: '#ffffff'}}>
            {'Fecha: ' + moment(lastDay).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            paddingHorizontal: 3,
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, color: '#00FFFF', fontWeight: '700'}}>
              {number() > 9 ? number() : 0 + number().toString().slice(-2)}
            </Text>
          </View>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
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
              navigation.navigate('DetailsGeneral', {
                idDetails: id_type,
                idMascot: id,
                type: imageCategory()[1],
                id_mascot,
                id_notify,
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
    </View>
  );
};

const style = StyleSheet.create({
  iconActions: {
    width: 30,
    height: 30,
  },
  avatarMascot: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  iconImage: {
    width: 15,
    height: 15,
  },
  itemContent: {
    flexDirection: 'row',
    backgroundColor: '#660066',
    marginVertical: 3,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: 450
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
