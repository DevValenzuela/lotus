import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import ScreenNotification from '../components/screenNotification';

import NotifyService from '../hooks/notifyService';
import {database3} from '../conexion/crudNotify';
import moment from 'moment-timezone';

import {useMutation} from '@apollo/client';
import {CREATE_NOTIFY_APP} from './apolllo/grahpql';
import {UserContext} from '../context/userContext';

const Notification = () => {
  const {
    user: {
      user: {id},
    },
  } = useContext(UserContext);

  const [createNotify, {data, error, loading}] = useMutation(CREATE_NOTIFY_APP);

  const navigation = useNavigation();
  const route = useRoute();
  const {typeAction, id_mascot, dataType} = route.params;

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
      msg: `Alerta ${type} para el día: `,
    };

    notify.scheduleNotif(paramsNotify);
    notify.localNotif({
      ...paramsNotify,
      title: '!Nueva Alerta Generada¡',
      msg: `${type}, generado para el: `,
    });

    let id_general;

    switch (type) {
      case 'Desparacitación':
        const {
          createDesparacitacion: {desparacitacion},
        } = dataType;
        id_general = desparacitacion.id_deworming;
        break;
      case 'Control Medico':
        const {
          createControllerMedic: {controllerMedic},
        } = dataType;
        id_general = controllerMedic.id_medic;
        break;
      case 'Medicamento':
        const {
          createMedicament: {medicament},
        } = dataType;
        id_general = medicament.id_medicament;
        break;
      case 'Vacunación':
        const {
          createVacunacion: {vacunacion},
        } = dataType;
        id_general = vacunacion.id_vaccination;
        break;
      default:
        id_general = '';
        break;
    }

    try {
      let idNotify = new Date().toISOString().replace(/[-T:.Z]/g, '');
      createNotify({
        variables: {
          id_notify: idNotify,
          id_user: id,
          id_mascot: id_mascot,
          date: moment().tz(time_zone).format(),
          date_notify: setNotify,
          type: type,
          id_type: id_general,
        },
      }).then(() => {
        database3.InsertNotify({
          type: type,
          last_date: setNotify,
          mascot: id_mascot,
          notify: idNotify,
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
