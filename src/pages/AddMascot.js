import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Platform,
  Animated,
} from 'react-native';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Formik} from 'formik';
import * as Yup from 'yup';

import moment from 'moment';

import {useMutation} from '@apollo/client';
import {ADD_MASCOT_APP} from './apolllo/grahpql';

import {UserContext} from '../context/userContext';
import {
  Loading,
  ModalGalleryOptions,
  ModalCalendarError,
} from '../components/sharedComponent';

const AddMascot = ({navigation}) => {
  const {
    dispatchUserEvent,
    user: {user, idPhoto},
  } = useContext(UserContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setSterilized, getSterilized] = useState('Si');
  const [setMicrochip, getMicrochip] = useState('No');
  const [setCalendar, getCalendar] = useState(false);
  const [setDate, getDate] = useState('');
  const [erroDate, setErrorDate] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [createMascot, {loading: loadingA}] = useMutation(ADD_MASCOT_APP);

  const initialValue = {
    name_mascot: '',
    age_mascot: '',
    type_mascot: '',
    race_mascot: '',
    sterilized: '',
    date_sterilized: '',
    microchip: '',
    number_microchip: '',
    description: '',
    avatar_mascot: '',
    user: '',
  };

  const SignupSchema = Yup.object().shape({
    name_mascot: Yup.string().required('Ingresa el nombre de la mascota.'),
    age_mascot: Yup.number()
      .integer('No se aceptan puntos(.) ni comas(,)')
      .required('Ingresa la edad mascota.'),
    type_mascot: Yup.string().required('Ingresa el tipo de mascota.'),
    race_mascot: Yup.string().required('Ingresa la raza de la mascota.'),
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const onDateChange = date => {
    getselectedStartDate(date);
  };

  const enableCalendar = strValue => {
    strValue ? getCalendar(true) : getCalendar(false);
  };

  const insertDateCalendar = startDate => {
    if (!startDate) {
      setErrorDate(true);
      return null;
    }
    let date = moment(new Date(startDate)).format('DD-MM-YYYY');
    getDate(date);
    getCalendar(false);
  };

  const sterilized = strValue => {
    getSterilized(strValue);
  };

  const stMicrochip = strValue => {
    getMicrochip(strValue);
  };

  const handleInsert = async values => {
    try {
      await createMascot({
        variables: {
          ...values,
          age_mascot: Number(values.age_mascot),
          sterilized: setSterilized,
          date_sterilized: setDate,
          microchip: setMicrochip,
          avatar_mascot: idPhoto ? idPhoto : null,
          user: user ? Number(user.id) : null,
        },
      });
      getDate('');
      dispatchUserEvent('ADD_URI', {idPhoto: ''});
      navigation.navigate('Gratulations', {
        txtMsg: 'Que bien has ingresado una nueva mascota.'
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  if (loadingA) return <Loading />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <Animated.View style={{opacity: fadeAnim}}>
          <ScrollView>
            <Formik
              initialValues={initialValue}
              validationSchema={SignupSchema}
              onSubmit={values => handleInsert(values)}>
              {({
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
              }) => (
                <View style={style.containerForm}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 1,
                        padding: 5,
                        justifyContent: 'flex-end',
                      }}>
                      <ModalGalleryOptions />
                    </View>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                      <Text style={style.label}>Nombre mascota</Text>
                      <TextInput
                        placeholderTextColor="#5742A2"
                        style={[style.inputText, {backgroundColor: '#ffffff'}]}
                        placeholder="Ej: Bruno..."
                        onChangeText={handleChange('name_mascot')}
                        onBlur={handleBlur('name_mascot')}
                        value={values.name_mascot}
                      />
                      {errors.name_mascot && touched.name_mascot ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.name_mascot}</Text>
                        </View>
                      ) : null}

                      <Text style={style.label}>Edad mascota</Text>
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
                        placeholder="Ej: 2 años"
                        onChangeText={handleChange('age_mascot')}
                        onBlur={handleBlur('age_mascot')}
                        keyboardType="numeric"
                        value={values.age_mascot}
                      />
                      {errors.age_mascot && touched.age_mascot ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.age_mascot}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View>
                    <Text style={style.label}>Tipo de mascota</Text>
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
                      placeholder="Ej: Pitbull"
                      onChangeText={handleChange('type_mascot')}
                      onBlur={handleBlur('type_mascot')}
                      value={values.type_mascot}
                    />
                    {errors.type_mascot && touched.type_mascot ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={style.error}>{errors.type_mascot}</Text>
                      </View>
                    ) : null}
                    <Text style={style.label}>Raza</Text>
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
                      placeholder="Ej: Pitbull"
                      onChangeText={handleChange('race_mascot')}
                      onBlur={handleBlur('race_mascot')}
                      value={values.race_mascot}
                    />
                    {errors.race_mascot && touched.race_mascot ? (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={style.error}>{errors.race_mascot}</Text>
                      </View>
                    ) : null}
                    <Text style={style.label}>Esterilizado</Text>
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <View>
                        <TouchableHighlight
                          underlayColor="transparent"
                          onPress={() => sterilized('Si')}>
                          <Text
                            style={
                              setSterilized === 'Si'
                                ? style.checkBoxActive
                                : style.checkBox
                            }>
                            Sí
                          </Text>
                        </TouchableHighlight>
                      </View>
                      <View>
                        <TouchableHighlight
                          underlayColor="transparent"
                          onPress={() => sterilized('No')}>
                          <Text
                            style={
                              setSterilized === 'No'
                                ? style.checkBoxActive
                                : style.checkBox
                            }>
                            No
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                    <Text style={style.label}>Fecha de especialización</Text>
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
                      value={setDate}
                      onChangeText={handleChange('date_sterilized')}
                      onBlur={handleBlur('date_sterilized')}
                    />
                    <Text style={style.label}>Microship</Text>
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <View>
                        <TouchableHighlight
                          underlayColor="transparent"
                          onPress={() => stMicrochip('Si')}>
                          <Text
                            style={
                              setMicrochip === 'Si'
                                ? style.checkBoxActive
                                : style.checkBox
                            }>
                            Sí
                          </Text>
                        </TouchableHighlight>
                      </View>
                      <View>
                        <TouchableHighlight
                          underlayColor="transparent"
                          onPress={() => stMicrochip('No')}>
                          <Text
                            style={
                              setMicrochip === 'No'
                                ? style.checkBoxActive
                                : style.checkBox
                            }>
                            No
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                    {setMicrochip == 'Si' && (
                      <View>
                        <Text style={style.label}>Número Microship</Text>
                        <TextInput
                          placeholderTextColor="#5742A2"
                          style={[
                            style.inputText,
                            {
                              backgroundColor: '#ffffff',
                              borderColor: '#3C0065',
                              color: '#3C0065',
                            },
                          ]}
                          placeholder="Ingresa el identificador..."
                          value={values.number_microchip}
                          onChangeText={handleChange('number_microchip')}
                          onBlur={handleBlur('number_microchip')}
                        />
                      </View>
                    )}

                    <Text style={style.label}>
                      Enfermedades o cuidados Especiales
                    </Text>

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
                        value={values.description}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                      />
                    </View>
                    <View style={{marginVertical: 10}}>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => handleSubmit()}>
                        <View style={style.btnSubmit}>
                          <Text style={style.txtAction}>Guardar</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </Animated.View>
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
                <View style={style.btnActions}>
                  <Text style={style.txtAction}>Cancelar</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{padding: 10, flex: 1}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => insertDateCalendar(startDate)}>
                <View style={style.btnActions}>
                  <Text style={style.txtAction}>Seleccionar</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.93)',
  },
  bgImage: {
    flex: 1,
  },
  containerForm: {
    backgroundColor: '#562A8C',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    minWidth: wp('80%'),
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    color: '#00FFFF',
    paddingLeft: 3,
    marginVertical: 4,
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 3,
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#330066',
    color: '#330066',
    borderRadius: 5,
    marginVertical: 5,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  containerCalendar: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  checkBoxActive: {
    backgroundColor: '#3C0065',
    color: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 4,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  checkBox: {
    backgroundColor: '#D5D5D5',
    color: '#3C0065',
    borderRadius: 5,
    marginHorizontal: 4,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  btnActions: {
    opacity: 0.8,
    backgroundColor: '#660066',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  txtAction: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  btnSubmit: {
    opacity: 0.8,
    backgroundColor: '#80006A',
    padding: Platform.OS == 'ios' ? 15 : 10,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  error: {
    color: '#fff',
    backgroundColor: '#3C0065',
    fontSize: 12,
    padding: 10,
    width: '98%',
    textAlign: 'center',
    borderRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default AddMascot;
