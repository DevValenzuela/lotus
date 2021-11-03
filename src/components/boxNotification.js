import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {database} from '../conexion/crudSqlite';
import moment from 'moment';
const BoxNotifyCation = ({data_notify}) => {
  const [getMascot, setMascot] = useState([]);

  let date = moment(new Date()).format('YYYY-MM-DD');

  let nowDay = moment(date);
  let lastDay = moment(data_notify.last_date.split('-').reverse().join('-'));

  useEffect(() => {
    database.consultMascotID(data_notify.id_mascot, setMascot);
  }, [data_notify.id_mascot]);

  return (
    <View style={style.container}>
      <View style={{flex: 1, padding: 10}}>
        <Image
          style={style.cardImage}
          source={require('../assets/images/not_image_small.jpg')}
        />
      </View>
      <View style={{flex: 2, padding: 10, paddingLeft: 20}}>
        <Text style={{color: '#00FFFF', fontWeight: 'bold'}}>
          {getMascot.name_mascot}
        </Text>
        <Text style={{color: '#fff', fontWeight: '200', fontSize: 12}}>
          {data_notify.title}
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
            {lastDay.diff(nowDay, 'days') <= -1
              ? 0
              : lastDay.diff(nowDay, 'days')}
          </Text>
        </View>
        <View>
          <Text style={{color: '#00FFFF', fontWeight: '300', fontSize: 12}}>
            Días Restantes
          </Text>
          <Text style={{color: '#ffffff', fontWeight: '300', fontSize: 12}}>
            {data_notify.last_date}
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
