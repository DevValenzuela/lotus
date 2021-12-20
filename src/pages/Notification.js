import React, { useContext, useEffect, useState } from "react";
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ScreenNotification from '../components/screenNotification';

import NotifyService from '../hooks/notifyService';
import {database3} from '../conexion/crudNotify';
import moment from 'moment-timezone';

import {useMutation} from '@apollo/client';
import {CREATE_NOTIFY_APP} from './apolllo/grahpql';
import { UserContext } from "../context/userContext";

const Notification = () => {
  const {
    dispatchUserEvent,
    user: {
      user: {id},
    },
  } = useContext(UserContext);

  const [createNotify, {data, error, loading}] = useMutation(CREATE_NOTIFY_APP);

  const navigation = useNavigation();
  const route = useRoute();
  const {typeAction, id_mascot} = route.params;

  const [setNotify, getDateNotify] = useState('');

  const notify = new NotifyService();
  notify.popInitialNotification();

  const time_zone = 'America/Bogota';

  const actionNotifyCation = dateNotify => {
    getDateNotify(moment(dateNotify).tz(time_zone).format());
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

    notify.scheduleNotif(paramsNotify);
    notify.localNotif({
      ...paramsNotify,
      title: '!Lotus Nueva Alerta¡',
    });

    try {
      createNotify({
        variables: {
          id_notify: new Date().toISOString().replace(/[-T:.Z]/g, ''),
          id_user: id,
          id_mascot: id_mascot,
          date: moment().tz(time_zone).format(),
          date_notify: setNotify,
          type: type,
        },
      }).then(() => {
        database3.InsertNotify({
          type: type,
          last_date: setNotify,
          mascot: id_mascot,
        });
        return navigation.navigate('Gratulations', {
          txtMsg: 'Se ha guardado correctamente.',
        });
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const actionCancel = () => {
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
          <ScreenNotification
            onAction={actionNotifyCation}
            onCancel={actionCancel}
            typeAction={typeAction}
          />
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
