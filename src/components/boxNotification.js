import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, Image, SafeAreaView} from 'react-native';
import {database} from '../conexion/crudSqlite';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import moment from 'moment';

import {CONSULT_MASCOT_APP_SQLITE} from './../pages/apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {useQuery} from '@apollo/client';

import {API_URL} from '@env';
import {ModalAlertDeleteNotify} from './sharedComponent';
import {database3} from '../conexion/crudNotify';

const BoxNotifyCation = ({data_notify}) => {
  const {fetchMore} = useQuery(CONSULT_MASCOT_APP_SQLITE);
  const [getMascot, setMascot] = useState([]);
  const [getImageResult, setImageResult] = useState([]);
  const [getModal, setModal] = useState(false);
  const [getVisible, setVisible] = useState(true);
  const isConnect = useIsConnected();

  let date = moment(new Date()).format();

  let nowDay = moment(date);
  let lastDay = moment(data_notify.last_date);

  useEffect(() => {
    if (data_notify) {
      const {id_mascot} = data_notify;
      consultImageId(id_mascot);
      database.consultMascotID(id_mascot, setMascot);
    }
  }, [data_notify]);

  const consultImageId = async id => {
    let resp = await fetchMore({
      fetchPolicy: 'no-cache',
      pollInterval: 1000,
      variables: {
        id,
      },
    });
    const {data} = resp;
    setImageResult(data.mascots[0]);
  };

  const sendModal = () => setModal(true);
  const actionModalCancel = () => setModal(!getModal);
  const actionModalYes = id => {
    database3.DeleteNotify(id);
    setVisible(false);
    setModal(!getModal);
  };
  console.log("Result: " + getMascot)

  return (
    <SafeAreaView>
      <ModalAlertDeleteNotify
        modalVisible={getModal}
        send={() => actionModalCancel()}
        action={() => actionModalYes(data_notify?.id)}
      />
      {getVisible && (
        <LongPressGestureHandler
          onHandlerStateChange={() => sendModal()}
          minDurationMs={800}>
          <View style={style.container}>
            <View style={{flex: 1, padding: 10}}>
              {(() => {
                if (isConnect && getImageResult?.avatar_mascot) {
                  const {
                    avatar_mascot: {url},
                  } = getImageResult;
                  return (
                    <Image
                      style={style.cardImage}
                      source={{uri: `${API_URL}${url}`}}
                    />
                  );
                } else {
                  return (
                    <Image
                      style={style.cardImage}
                      source={require('../assets/images/not_image_small.jpg')}
                    />
                  );
                }
              })()}
            </View>
            <View style={{flex: 2, padding: 10, paddingLeft: 20}}>
              <Text style={{color: '#00FFFF', fontWeight: 'bold'}}>
                {getMascot?.name_mascot}
              </Text>
              <Text style={{color: '#fff', fontWeight: '200', fontSize: 12}}>
                {data_notify?.title}
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
                <Text
                  style={{color: '#00FFFF', fontWeight: '300', fontSize: 12}}>
                  Días Restantes
                </Text>
                <Text
                  style={{color: '#ffffff', fontWeight: '300', fontSize: 12}}>
                  {moment(new Date(data_notify.last_date)).format('YYYY-MM-DD')}
                </Text>
              </View>
            </View>
          </View>
        </LongPressGestureHandler>
      )}
    </SafeAreaView>
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
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#28b5b5',
    marginTop: 22,
    marginBottom: 22,
  },
});

export default BoxNotifyCation;
