import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ScreenNotification from '../components/screenNotification';

import NotifyService from '../hooks/notifyService';
import {database3} from '../conexion/crudNotify';
import moment from 'moment';

const Notification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {typeAction, id_mascot} = route.params;

  const [setNotify, getDateNotify] = useState('');

  const notify = new NotifyService();
  notify.popInitialNotification();

  const actionNotifyCation = dateNotify => {
    getDateNotify(moment(dateNotify).format());
    //actionConfirmNotifyCation();
  };

  useEffect(() => {
    if (setNotify) {
      actionConfirmNotifyCation();
    }
  }, [setNotify]);

  const actionConfirmNotifyCation = () => {
    let type = typeAction;

    let paramsNotify = {
      date: setNotify,
      type: type,
      title: '¡Lotus Te Recomienda!',
      msg: `${type} esta para:`,
    };

    console.log(paramsNotify);

    notify.scheduleNotif(paramsNotify);
    notify.localNotif({
      ...paramsNotify,
      title: '!Lotus Nueva Alerta¡',
    });

    database3.InsertNotify({
      type: type,
      last_date: setNotify,
      mascot: id_mascot,
    });

    return navigation.navigate('Gratulations', {
      txtMsg: 'Se ha guardado correctamente.',
    });
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ScreenNotification onAction={actionNotifyCation} typeAction={typeAction} />
        </View>
      </ImageBackground>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Notification;
