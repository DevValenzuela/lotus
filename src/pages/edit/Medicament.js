import React, {useContext, useEffect, useState} from 'react';
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
import {style} from './style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {
  CREATE_MEDICAMENT_APP,
  UPDATE_MEDICAMENT_MEDIC,
} from '../../pages/apolllo/grahpql';
import {Loading, ModalCalendarError} from '../../components/sharedComponent';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import {useIsConnected} from 'react-native-offline';
import {database} from '../../conexion/crudSqlite';
import NotifService from '../../hooks/notifyService';
import {database3} from '../../conexion/crudNotify';

const Medicament = ({route, navigation}) => {
  const isConnected = useIsConnected();
  const notify = new NotifService();
  const {idMascot, edit, medicaments, id_mascot} = route.params;
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setNotify, getDateNotify] = useState('');
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [setDate, getDate] = useState('');
  const [erroDate, setErrorDate] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [createMedicament, {data, error, loading}] = useMutation(
    CREATE_MEDICAMENT_APP,
  );
  const [
    updateMedicament,
    {data: UpdateData, error: UpdateError, loading: UpdateLoading},
  ] = useMutation(UPDATE_MEDICAMENT_MEDIC);

  const {
    user: {user},
  } = useContext(UserContext);

  const initialValue = new Object();

  if (edit) {
    initialValue.last_dose = '';
    initialValue.medicament = medicaments[0].medicament;
    initialValue.posologia = medicaments[0].posologia;
    initialValue.dosis = medicaments[0].dosis;
    initialValue.period = medicaments[0].period;
    initialValue.notation = medicaments[0].notation;
  } else {
    initialValue.last_dose = '';
    initialValue.medicament = '';
    initialValue.posologia = '';
    initialValue.dosis = '';
    initialValue.notation = '';
    initialValue.period = '';
  }

  useEffect(() => {
    if (edit && medicaments) {
      getDate(medicaments[0].last_dose);
    }
    if (sucess) {
      navigation.navigate('Gratulations', {
        txtMsg: 'Se ha insertado un nuevo medicamento.',
      });
    }
  }, [edit, medicaments, sucess]);

  const SignupSchema = Yup.object().shape({
    last_dose: Yup.string().required('Ingresa el campo ultima dosis.'),
    medicament: Yup.string().required('Ingresa el campo medicamento.'),
    posologia: Yup.string().required('Ingresa el campo posología.'),
    dosis: Yup.number('Solo se acepta números.')
      .required('Ingresa el campo ultima dosis.')
      .positive('Ingresa numeros positivos.'),
    period: Yup.string().required('Ingresa el campo de periodo.'),
  });

  const handleSubmitMedicament = async values => {
    if (!values) return;

    let id = uuidv4();

    const {
      last_dose,
      medicament,
      posologia,
      dosis,
      period,
      notation,
      type = 'Medicamento',
    } = values;

    let new_value = {
      id_medicament: id,
      last_dose,
      medicament,
      posologia,
      dosis,
      period,
      notation,
      mascot: idMascot,
      user: Number(user.id),
      type,
    };

    let paramsNotify = {
      date: setNotify,
      type,
      title: '¡Lotus Te Recomienda!',
      msg: `${type} esta para:`,
    };

    if (isConnected) {
      try {
        await createMedicament({
          variables: new_value,
        });
        notify.scheduleNotif(paramsNotify);
        await database3.InsertNotify(new_value);
        await database.InsertMedicament(
          {...new_value, mascot: id_mascot},
          setSuccess,
        );
        getDate('');
      } catch (error) {
        console.log(error);
      }
    } else {
      notify.scheduleNotif(paramsNotify);
      await database3.InsertNotify({...new_value, mascot: id_mascot});
      await database.InsertMedicament(new_value, setSuccess);
    }
  };

  const handleUpdateMedicament = async values => {
    if (!values) return null;
    const {id, id_medicament} = medicaments[0];
    console.log(id_medicament);
    const {last_dose, medicament, posologia, dosis, period, notation} = values;
    if (isConnected) {
      try {
        await updateMedicament({
          variables: {
            id,
            last_dose,
            medicament,
            posologia,
            dosis,
            period,
            notation,
          },
        });
        database.UpdateMedicament(id_medicament, id_mascot, values, setSuccess);
      } catch (error) {
        console.log(error);
      }
    } else {
      database.UpdateMedicament(id_medicament, id_mascot, values, setSuccess);
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
    let dateNotify = moment().format();
    getDateNotify(dateNotify);
    getDate(dateFormat);
    getCalendar(false);
  };

  if (loading || UpdateLoading) return <Loading />;
  if (error || UpdateError) console.log(error);

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
                <View>
                  <Text style={style.label}>Último Dosis</Text>
                  <View>
                    <TextInput
                      keyboardType="number-pad"
                      placeholderTextColor="#5742A2"
                      onChangeText={handleChange('last_dose')}
                      onBlur={handleBlur('last_dose')}
                      value={(values.last_dose = setDate)}
                      showSoftInputOnFocus={false}
                      onFocus={enableCalendar}
                      style={[
                        style.inputText,
                        {
                          backgroundColor: '#ffffff',
                          borderColor: '#330066',
                          color: '#330066',
                        },
                      ]}
                      placeholder="Ej: 12-03-2021"
                    />
                  </View>
                  {errors.last_dose && touched.last_dose ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.last_dose}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Medicamento:</Text>
                  <TextInput
                    placeholderTextColor="#5742A2"
                    onChangeText={handleChange('medicament')}
                    onBlur={handleBlur('medicament')}
                    value={values.medicament}
                    style={[
                      style.inputText,
                      {
                        backgroundColor: '#ffffff',
                        borderColor: '#330066',
                        color: '#330066',
                      },
                    ]}
                    placeholder="Ej: Amoxicilina"
                  />
                  {errors.medicament && touched.medicament ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.medicament}</Text>
                    </View>
                  ) : null}
                  <Text style={style.label}>Posología:</Text>
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
                    placeholder="Ej: Solución oral."
                    onChangeText={handleChange('posologia')}
                    onBlur={handleBlur('posologia')}
                    value={values.posologia}
                  />
                  {errors.posologia && touched.posologia ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.posologia}</Text>
                    </View>
                  ) : null}
                  <Text style={style.label}>Dosis:</Text>
                  <View>
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
                      onChangeText={handleChange('dosis')}
                      onBlur={handleBlur('dosis')}
                      value={values.dosis}
                      placeholder="Ej: 0.5"
                    />
                    <Text style={style.symbol}>gr/ml</Text>
                  </View>
                  {errors.dosis && touched.dosis ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.dosis}</Text>
                    </View>
                  ) : null}
                  <Text style={style.label}>Periodo:</Text>
                  <View>
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
                      placeholder="Ej: 12"
                      onChangeText={handleChange('period')}
                      onBlur={handleBlur('period')}
                      value={values.period}
                    />
                    <Text style={style.symbol}>Hrs</Text>
                  </View>
                  {errors.period && touched.period ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.period}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Anotaciones:</Text>

                  <View style={{marginHorizontal: 5, marginVertical: 2}}>
                    <Textarea
                      placeholderTextColor={'#5742A2'}
                      containerStyle={style.textareaContainer}
                      style={style.textarea}
                      maxLength={120}
                      placeholder={'Ingresa algún comentario o anotación.'}
                      underlineColorAndroid={'transparent'}
                      onChangeText={handleChange('notation')}
                      onBlur={handleBlur('notation')}
                      value={values.notation}
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

export default Medicament;
