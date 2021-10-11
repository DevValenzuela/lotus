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
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';
import {ModalCalendarError} from '../../components/sharedComponent';
import moment from 'moment';
import {style} from './style';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {useMutation} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {CREATE_VACCINATION_APP} from '../../pages/apolllo/grahpql';
import {Loading} from '../../components/sharedComponent';

const Vaccinations = ({route}) => {
  const {idMascot, edit, vacunacions} = route.params;

  const [createVacunacion, {data, error, loading}] = useMutation(
    CREATE_VACCINATION_APP,
  );
  const {
    user: {user},
  } = useContext(UserContext);

  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const [setDate, getDate] = useState('');
  const [erroDate, setErrorDate] = useState(false);

  const initialValue = new Object();

  if (edit) {
    initialValue.last_vaccination = '';
    initialValue.medicament = vacunacions[0].medicaments;
    initialValue.note_reaction = vacunacions[0].note;
  } else {
    initialValue.last_vaccination = '';
    initialValue.medicament = '';
    initialValue.note_reaction = '';
  }

  const SignupSchema = Yup.object().shape({
    last_vaccination: Yup.string().required(
      'Ingresa el campo de la ultima vacunación.',
    ),
    medicament: Yup.string().required('Ingresa el campo del medicamento.'),
  });

  useEffect(() => {
    if (edit && vacunacions) {
      getDate(vacunacions[0].last_vaccination);
    }
  }, [edit, vacunacions]);

  const onDateChange = date => {
    getselectedStartDate(date);
  };

  const handleSubmitVaccinations = async values => {
    if (!values) return null;
    const {last_vaccination, medicament, note_reaction} = values;
    try {
      await createVacunacion({
        variables: {
          last_vaccination,
          medicament,
          note: note_reaction,
          mascot: idMascot,
          user: Number(user.id),
        },
      });
      getDate('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateVaccinations = values => {
    console.log(values);
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

  if (loading) return <Loading />;
  if (error) console.log(error);

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
                ? handleUpdateVaccinations(values)
                : handleSubmitVaccinations(values)
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
                  <Text style={style.label}>Última Vacunación</Text>
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
                    onChangeText={handleChange('last_vaccination')}
                    onBlur={handleBlur('last_vaccination')}
                    value={(values.last_vaccination = setDate)}
                  />
                  {errors.last_vaccination && touched.last_vaccination ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={style.error}>{errors.last_vaccination}</Text>
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
                      onChangeText={handleChange('note_reaction')}
                      onBlur={handleBlur('note_reaction')}
                      value={values.note_reaction}
                    />
                  </View>

                  <View style={{marginVertical: 10}}>
                    <TouchableHighlight onPress={() => handleSubmit()}>
                      <View style={style.btnSubmit}>
                        {edit ? (
                          <Text style={style.btnSubmitxt}>Modificar</Text>
                        ) : (
                          <Text style={style.btnSubmitxt}>Editar</Text>
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

export default Vaccinations;
