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

import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {style} from './style';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';
import {ModalCalendarError} from '../../components/sharedComponent';
const Deworming = () => {
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [setDate, getDate] = useState('');
  const [erroDate, setErrorDate] = useState(false);

  const initialState = {
    last_deworming: '',
    medicament: '',
    note: '',
  };

  const SignupSchema = Yup.object().shape({
    last_deworming: Yup.string().required(
      'Ingrese el campo de la ultima desparacitación.',
    ),
    medicament: Yup.string().required('Ingrese el campo del medicamento.'),
  });

  const handlerSubmitDeworming = values => {
    console.log(values);
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
    getDate(dateFormat);
    getCalendar(false);
  };

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
            onSubmit={values => handlerSubmitDeworming(values)}>
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
                    value={values.last_deworming = setDate}
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
