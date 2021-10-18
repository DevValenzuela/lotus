import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {useMutation} from '@apollo/client';
import {RECOVERY_USER_APP} from '../apolllo/grahpql';

const initialValue = {
  email: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico es invalido.')
    .required('El correo electrónico es requerido.'),
});

const Recovery = ({navigation}) => {
  const [forgotPassword, {data, loading, error}] =
    useMutation(RECOVERY_USER_APP);

  const [getModal, setModal] = useState({visible: false, txt: null});

  if (loading) return null;

  const handleRecovery = async values => {
    try {
      await forgotPassword({
        variables: {
          email: values.email,
        },
      });
      setModal({
        visible: true,
        txt: '!Gracias!, te hemos enviado un correo electrónico con link de restablecer contraseña.',
      });
      return false;
    } catch (e) {
      setModal({visible: true, txt: 'El correo electrónico es incorrecto.'});
    }
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={getModal.visible}
            onRequestClose={() => {
              setModal(!getModal.visible);
            }}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={{color: '#fff', fontSize: 14}}>
                  {getModal.txt}
                </Text>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => setModal({visible: false})}>
                  <View style={style.btnModal}>
                    <Text style={style.txtModal}>Ok</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, maxWidth: 500}}>
              <View style={style.containerLogo}>
                <Image
                  style={style.tinyLogo}
                  source={require('./../../assets/images/lotus_logo.png')}
                />
                <Text style={{color: '#00FFFF', fontSize: 18}}>
                  pet-care app
                </Text>
              </View>
              <Formik
                initialValues={initialValue}
                validationSchema={SignupSchema}
                onSubmit={values => handleRecovery(values)}>
                {({
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    <View style={style.group}>
                      {errors.email && touched.email ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.email}</Text>
                        </View>
                      ) : null}
                      <TextInput
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={style.inputText}
                        placeholder="E-mail"
                      />
                    </View>
                    <View style={style.buttonContainer}>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => handleSubmit()}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#80006A',
                          }}>
                          <Text style={style.btnRegister}>
                            Recuperar Cuenta
                          </Text>
                        </View>
                      </TouchableHighlight>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          margin: 20,
                        }}>
                        ¿Ya recuperaste la cuenta?
                      </Text>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigation.navigate('Login')}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#00FFFF',
                          }}>
                          <Text style={style.btnLogin}>Ingresar</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  tinyLogo: {
    width: 128,
    height: 163,
  },
  label: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 10,
  },
  group: {
    padding: 10,
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderColor: '#330066',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 10,
    padding: Platform.OS == 'ios' ? 15 : 10,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  btnRegister: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    padding: Platform.OS == 'ios' ? 15 : 10,
  },
  btnLogin: {
    color: '#330866',
    fontSize: 16,
    textTransform: 'uppercase',
    padding: Platform.OS == 'ios' ? 15 : 10,
  },
  error: {
    color: '#fff',
    backgroundColor: '#562A8C',
    fontSize: 14,
    padding: 10,
    width: '90%',
    textAlign: 'center',
    borderRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#562A8C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#562A8C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModal: {
    backgroundColor: '#660066',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  txtModal: {
    color: '#fff',
  },
});
export default Recovery;
