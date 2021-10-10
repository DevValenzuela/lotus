import React, {useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {style} from './style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {CREATE_MEDICAMENT_APP} from '../../pages/apolllo/grahpql'
const Medicament = ({route}) => {
  const idMascot = route.params.idMascot;
  const [createMedicament, {data, error, loading}] = useMutation(CREATE_MEDICAMENT_APP);
  const {
    user: {user},
  } = useContext(UserContext);
  const initialValue = {
    last_dose: '',
    medicament: '',
    posologia: '',
    dosis: '',
    notation: '',
    period: '',
  };

  const SignupSchema = Yup.object().shape({
    last_dose: Yup.number('Solo se acepta números.')
      .required('Ingresa el campo ultima dosis.')
      .positive('Ingresa numeros positivos.')
      .integer('No se acepta ni puntos (.), ni comas (,).'),
    medicament: Yup.string().required('Ingresa el campo medicamento.'),
    posologia: Yup.string().required('Ingresa el campo posología.'),
    dosis: Yup.number('Solo se acepta números.')
        .required('Ingresa el campo ultima dosis.')
        .positive('Ingresa numeros positivos.'),
    period: Yup.string().required('Ingresa el campo de periodo.'),
  });

  const handleSubmitMedicament = async values => {
    const {last_dose, medicament, posologia, dosis, period, note } = values;
    if(!values) return;
    try{
      await createMedicament({
        variables:{
          last_dose,
          medicament,
          posologia,
          dosis,
          period,
          note,
          mascot: idMascot,
          user: Number(user.id),
        }
      })
    }catch (error){
      console.log(error)
    }
  };

  if(loading) return null;
  if(error) console.log(error);

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
            onSubmit={values => handleSubmitMedicament(values)}>
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
                      value={values.last_dose}
                      style={[
                        style.inputText,
                        {
                          backgroundColor: '#ffffff',
                          borderColor: '#330066',
                          color: '#330066',
                        },
                      ]}
                      placeholder="Ej: 12"
                    />
                    <Text style={style.symbol}>Hrs</Text>
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
                    value={values.poslogia}
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
                      placeholder="Ej: 0,5"
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
    </SafeAreaView>
  );
};

export default Medicament;
