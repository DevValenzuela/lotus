import React, {useState} from 'react';
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
import {style} from './style';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';

import {Formik} from 'formik';
import * as Yup from 'yup';

const General = () => {
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const [setMicrochip, getMicrochip] = useState('No');
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  const initialValue = {
    type_mascot: '',
    race: '',
    date_sterilized: '',
    microchip: '',
    note: '',
  };

  const SignupSchema = Yup.object().shape({
    type_mascot: Yup.string().required('Ingresa el campo ultima dosis.'),
    race: Yup.string().required('Ingresa el campo de raza.'),
    date_sterilized: Yup.string().required('Ingresa la fecha de esterización.'),
  });

  const handleSubmitGeneral = values => {
    console.log(values);
  };

  const onDateChange = date => {
    getselectedStartDate(date);
  };

  const enableCalendar = strValue => {
    strValue ? getCalendar(true) : getCalendar(false);
  };

  const stMicrochip = strValue => {
    getMicrochip(strValue);
  };

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
            onSubmit={handleSubmitGeneral}>
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
                  <Text style={style.label}>Tipo mascota:</Text>
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
                    onChangeText={handleChange('type_mascot')}
                    onBlur={handleBlur('type_mascot')}
                    value={values.type_mascot}
                    placeholder="Ingresa el tipo mascota"
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

                  <Text style={style.label}>Raza:</Text>
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
                    placeholder="Ingresa el tipo raza"
                    onChangeText={handleChange('race')}
                    onBlur={handleBlur('race')}
                    value={values.race}
                  />
                  {errors.race && touched.race ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.race}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Fecha de esterilización</Text>
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
                    onChangeText={handleChange('date_sterilized')}
                    onBlur={handleBlur('date_sterilized')}
                    value={values.date_sterilized}
                  />
                  {errors.date_sterilized && touched.date_sterilized ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.date_sterilized}</Text>
                    </View>
                  ) : null}

                  <Text style={style.label}>Microchip</Text>
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
                      <Text style={style.label}>Número Microchip</Text>
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
                      />
                    </View>
                  )}

                  <Text style={style.label}>
                    Enfermedades o cuidados especiales:
                  </Text>

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
                        <Text style={style.btnSubmitxt}>Modificar</Text>
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
                onPress={() => console.log('Seleccionado')}>
                <Text style={style.btnActions}>Seleccionar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default General;
