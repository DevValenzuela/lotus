import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {style} from './style';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';
import {useMutation} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {ModalCalendarError} from '../../components/sharedComponent';
import {
  CREATE_DESPARACITACION_APP,
  UPDATE_DEWORMING_MEDIC,
} from '../../pages/apolllo/grahpql';
import {Loading} from '../../components/sharedComponent';
import {database} from '../../conexion/crudSqlite';
import {database3} from '../../conexion/crudNotify';
import {useIsConnected} from 'react-native-offline';
import NotifService from './../../hooks/notifyService';
import {verifyDB} from '../../conexion/crudVerify';

const Deworming = ({route, navigation}) => {
  const isConnected = useIsConnected();
  const notify = new NotifService();
  const {idMascot, edit, desparacitacions, id_mascot} = route.params;
  const [createDesparacitacion, {data, error, loading}] = useMutation(
    CREATE_DESPARACITACION_APP,
  );
  const [
    updateDesparacitacion,
    {data: UpdateData, error: UpdateError, loading: Updateloading},
  ] = useMutation(UPDATE_DEWORMING_MEDIC);

  const {
    user: {user},
  } = useContext(UserContext);

  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [setDate, getDate] = useState('');
  const [setNotify, getDateNotify] = useState('');
  const [erroDate, setErrorDate] = useState(false);
  const [success, setSuccess] = useState(false);
  const initialState = new Object();

  if (edit) {
    initialState.last_deworming = '';
    initialState.medicament = desparacitacions[0].medicament;
    initialState.note = desparacitacions[0].note;
  } else {
    initialState.last_deworming = '';
    initialState.medicament = '';
    initialState.note = '';
  }

  const SignupSchema = Yup.object().shape({
    last_deworming: Yup.string().required(
      'Ingrese el campo de la ultima desparacitación.',
    ),
    medicament: Yup.string().required('Ingrese el campo del medicamento.'),
  });

  useEffect(() => {
    if (edit && desparacitacions) {
      getDate(desparacitacions[0].last_deworming);
    }
    if (success) {
      navigation.navigate('Gratulations', {
        txtMsg: 'Que bien has ingresado nueva desapracitación.',
      });
    }
  }, [edit, desparacitacions, success]);

  notify.popInitialNotification();

  const handlerSubmitDeworming = async values => {
    if (!values) return null;
    let id = uuidv4();

    const {last_deworming, medicament, note, type = 'Desparacitación'} = values;

    let new_value = {
      id_deworming: id,
      last_deworming,
      medicament,
      note,
      type,
      mascot: idMascot,
      user: Number(user.id),
    };

    let paramsNotify = {
      date: setNotify,
      type,
      title: '¡Lotus Te Recomienda!',
      msg: `${type} esta para:`,
    };

    if (isConnected) {
      try {
        await createDesparacitacion({
          variables: new_value,
        });
        notify.scheduleNotif(paramsNotify);
        await database3.InsertNotify({
          ...new_value,
          last_date: last_deworming,
          mascot: id_mascot,
        });
        await database.InsertDesparacitacion(
          {...new_value, mascot: id_mascot},
          setSuccess,
        );
        getDate('');
      } catch (error) {
        console.log(error);
      }
    } else {
      notify.scheduleNotif(paramsNotify);
      await database3.InsertNotify({
        ...new_value,
        last_date: last_deworming,
        mascot: id_mascot,
      });
      await database.InsertDesparacitacion(new_value, setSuccess);
      await verifyDB.InsertCreateVerify(new_value.id_deworming, 'deworming');
    }
  };

  const handleUpdateDeworming = async values => {
    if (!values) return null;
    const {id, id_deworming} = desparacitacions[0];
    const {last_deworming, medicament, note} = values;
    if (isConnected) {
      try {
        await updateDesparacitacion({
          variables: {
            id,
            last_deworming,
            medicament,
            note,
          },
        });
        await database.UpdateDeworming(id_deworming, values, setSuccess);
      } catch (e) {
        console.log(e);
      }
    } else {
      await verifyDB.InsertUpdateVerify(id_deworming, 'deworming');
      await database.UpdateDeworming(id_deworming, values, setSuccess);
    }
  };

  const onDateChange = date => {
    getselectedStartDate(date);
  };

  const enableCalendar = strValue => {
    strValue ? getCalendar(true) : getCalendar(false);
  };

  const insertDateCalendar = date => {
    if (!date) {
      setErrorDate(true);
      return null;
    }
    let dateFormat = moment(new Date(date)).format('DD-MM-YYYY');
    //let dateNotify = moment().add(1, 'month').subtract(5, 'days').format();
    let dateNotify = moment().add(11, 'minutes').format();
    getDateNotify(dateNotify);
    getDate(dateFormat);
    getCalendar(false);
  };

  if (loading || Updateloading) return <Loading />;
  if (error || UpdateError) console.log(error);

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <Formik
            initialValues={initialState}
            validationSchema={SignupSchema}
            onSubmit={values =>
              edit
                ? handleUpdateDeworming(values)
                : handlerSubmitDeworming(values)
            }>
            {({
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
            }) => (
              <View style={style.containerForm}>
                <View>
                  <Text style={style.label}>Última Desparacitación</Text>
                  <TextInput
                    placeholderTextColor="#5742A2"
                    style={[
                      style.inputText,
                      {
                        backgroundColor: '#ffffff',
                        borderColor: '#330066',
                        color: '#330066',
                      },
                    ]}
                    onFocus={enableCalendar}
                    showSoftInputOnFocus={false}
                    placeholder="Ingresa la fecha"
                    value={(values.last_deworming = setDate)}
                    onChangeText={handleChange('last_deworming')}
                    onBlur={handleBlur('last_deworming')}
                  />

                  {errors.last_deworming && touched.last_deworming ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.last_deworming}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Medicamentos</Text>

                  <View style={{marginHorizontal: 5, marginVertical: 2}}>
                    <Textarea
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      maxLength={120}
                      placeholder={
                        'Ingresa los cuidados especiales de tu mascota o cualquier sugerencia.'
                      }
                      placeholderTextColor={'#5742A2'}
                      underlineColorAndroid={'transparent'}
                      onChangeText={handleChange('medicament')}
                      onBlur={handleBlur('medicament')}
                      value={values.medicament}
                    />
                  </View>
                  {errors.medicament && touched.medicament ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.medicament}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Anotaciones o reacciones:</Text>

                  <View style={{marginHorizontal: 5, marginVertical: 2}}>
                    <Textarea
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      maxLength={120}
                      placeholder={
                        'Ingresa los cuidados especiales de tu mascota o cualquier sugerencia.'
                      }
                      placeholderTextColor={'#5742A2'}
                      underlineColorAndroid={'transparent'}
                      onChangeText={handleChange('note')}
                      onBlur={handleBlur('note')}
                      value={values.note}
                    />
                  </View>

                  <View style={{marginVertical: 10}}>
                    <TouchableHighlight onPress={() => handleSubmit()}>
                      <View style={style.btnSubmit}>
                        {edit ? (
                          <Text style={style.btnSubmitxt}>Modificar</Text>
                        ) : (
                          <Text style={style.btnSubmitxt}>Insertar</Text>
                        )}
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </ImageBackground>
      {/*===Calendar===*/}
      {setCalendar && (
        <View style={style.containerCalendar}>
          <ModalCalendarError
            modalVisible={erroDate}
            send={prop => setErrorDate(prop)}
          />
          <CalendarPicker
            todayBackgroundColor="#330066"
            selectedDayColor="#330066"
            selectedDayTextColor="#ffffff"
            onDateChange={onDateChange}
            weekdays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
            months={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
            nextTitle="Siguiente"
            previousTitle="Anterior"
            width={Dimensions.get('window').width / 1}
          />
          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center'}}>Fecha Seleccionada:</Text>
            <Text style={{textAlign: 'center'}}>{startDate}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, flex: 1}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => enableCalendar(false)}>
                <Text style={style.btnActions}>Cancelar</Text>
              </TouchableHighlight>
            </View>
            <View style={{padding: 10, flex: 1}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => insertDateCalendar(startDate)}>
                <Text style={style.btnActions}>Seleccionar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Deworming;
