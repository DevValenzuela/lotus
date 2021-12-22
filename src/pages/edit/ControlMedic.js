import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';

import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {style} from './style';

import {useMutation} from '@apollo/client';
import {
  CREATE_CONTROLLER_MEDIC_APP,
  UPDATE_CONTROLLER_MEDIC,
} from '../../pages/apolllo/grahpql';
import {ModalCalendarError, Loading} from '../../components/sharedComponent';
import {UserContext} from '../../context/userContext';
import {useIsConnected} from 'react-native-offline';
import {database} from '../../conexion/crudSqlite';
import {verifyDB} from '../../conexion/crudVerify';

const ControlMedic = ({route, navigation}) => {
  const typeAction = 'Control Medico';
  const {
    user: {user},
  } = useContext(UserContext);
  const isConnected = useIsConnected();
  const {idMascot, controllerMedics, edit, id_mascot} = route.params;
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [setDate, getDate] = useState('');
  const [erroDate, setErrorDate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const initialValue = new Object();

  const [createControllerMedic, {data: dataType, error, loading}] = useMutation(
    CREATE_CONTROLLER_MEDIC_APP,
  );

  const [
    updateControllerMedic,
    {data: updateData, error: errorData, loading: loadingData},
  ] = useMutation(UPDATE_CONTROLLER_MEDIC);

  if (edit) {
    initialValue.last_control = '';
    initialValue.valoration = !isConnected
      ? controllerMedics[0].assestment
      : controllerMedics[0].assesment;
    initialValue.note = controllerMedics[0].note;
  } else {
    initialValue.last_control = '';
    initialValue.valoration = '';
    initialValue.note = '';
  }

  const SignupSchema = Yup.object().shape({
    last_control: Yup.string().required(
      'Ingresa el campo del ultimo de control.',
    ),
  });

  useEffect(() => {
    if (edit && controllerMedics) {
      getDate(controllerMedics[0].last_control);
    }
    if (success) {
      navigation.navigate('ScreenNotification', {
        typeAction,
        id_mascot,
        dataType,
      });
    }
    if (successUpdate) {
      navigation.navigate('Gratulations', {
        txtMsg: 'Se ha actualizado correctamente.',
      });
    }
  }, [controllerMedics, edit, success, successUpdate]);

  const handleSubmitMedicament = async values => {
    if (!values) return;
    const {last_control, valoration, note, type = typeAction} = values;
    let id = uuidv4();
    let new_value = {
      id_medic: id,
      last_control: last_control,
      assesment: valoration,
      note: note,
      mascot: idMascot,
      user: Number(user.id),
      type,
    };

    if (isConnected) {
      try {
        await createControllerMedic({
          variables: new_value,
        });
        await database.InsertControllerMedic(
          {...new_value, mascot: id_mascot},
          setSuccess,
        );
        getDate('');
      } catch (error) {
        console.log(error);
      }
    } else {
      await verifyDB.InsertCreateVerify(new_value.id_medic, 'controller_medic');
      await database.InsertControllerMedic(new_value, setSuccess);
    }
  };

  const handleUpdateMedicament = async values => {
    if (!values) return null;
    const {id, id_medic} = controllerMedics[0];
    const {last_control, valoration, note} = values;
    if (isConnected) {
      try {
        await updateControllerMedic({
          variables: {
            id,
            last_control,
            assessment: valoration,
            note,
          },
        });
        await database.UpdateControllerMedic(
          id_medic,
          values,
          setSuccessUpdate,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      await database.UpdateControllerMedic(id_medic, values, setSuccessUpdate);
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
    //let dateNotify = moment().add(1, 'month').subtract(7, 'days').format();
    getDate(dateFormat);
    getCalendar(false);
  };

  if (loading || loadingData) return <Loading />;
  if (error || errorData) console.log(error);

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <Formik
            initialValues={initialValue}
            validationSchema={SignupSchema}
            onSubmit={values =>
              edit
                ? handleUpdateMedicament(values)
                : handleSubmitMedicament(values)
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
                <View style={style.containerContent}>
                  <Text style={style.label}>Último Control</Text>
                  <TextInput
                    placeholderTextColor="#5742A2"
                    onChangeText={handleChange('last_control')}
                    onBlur={handleBlur('last_control')}
                    value={(values.last_control = setDate)}
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
                  />
                  {errors.last_control && touched.last_control ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.last_control}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Valoración</Text>

                  <View style={{marginHorizontal: 5, marginVertical: 2}}>
                    <Textarea
                      placeholderTextColor={'#5742A2'}
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      maxLength={120}
                      placeholder={
                        'Ingresa los cuidados especiales de tu mascota o cualquier sugerencia.'
                      }
                      underlineColorAndroid={'transparent'}
                      onChangeText={handleChange('valoration')}
                      onBlur={handleBlur('valoration')}
                      value={values.valoration}
                    />
                  </View>

                  <Text style={style.label}>Prescripción y anotaciones:</Text>

                  <View style={{marginHorizontal: 5, marginVertical: 2}}>
                    <Textarea
                      placeholderTextColor={'#5742A2'}
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      maxLength={120}
                      placeholder={
                        'Ingresa las presentacion o anotacion de tu mascota'
                      }
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

export default ControlMedic;
