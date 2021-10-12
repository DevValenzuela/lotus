import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableHighlight,
  Platform,
  Modal,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components/sharedComponent';

import {useMutation} from '@apollo/client';
import {LOGIN_USER_APP} from './apolllo/grahpql';
import {UserContext} from '../context/userContext';

const initialValue = {
  user: 'vlzdavid12@outlook.com',
  password: '123456',
};

const SignupSchema = Yup.object().shape({
  user: Yup.string().required('Ingresa el nombre del usuario'),
  password: Yup.string().required('Ingresa la contraseña'),
});

const Login = ({navigation}) => {
  const {dispatchUserEvent} = useContext(UserContext);
  const [login, {data: dataA, error: errorA, loading: loadingA}] =
    useMutation(LOGIN_USER_APP);

  const [modalVisible, setModalVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    validateLogin(dataA, timer);
    return () => {
      clearTimeout(timer);
    };
  }, [dataA]);

  const validateLogin = async (dataA, timer) => {
    if (dataA) {
      const {jwt, user} = dataA.login;
      await AsyncStorage.setItem('token_lotus', JSON.stringify({jwt, user}));
      dispatchUserEvent('ADD_USER', {user: {jwt, user}});
      timer = setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 2000);
    } else {
      let validate = await AsyncStorage.getItem('token_lotus');
      validate = JSON.parse(validate);
      if (validate) {
        if (validate.jwt) {
          return navigation.navigate('Dashboard');
        }
      }
    }
  };

  const handleLogin = async values => {
    try {
      await login({
        variables: {
          slug: values.user,
          password: values.password,
        },
      });
    } catch (e) {
      await AsyncStorage.removeItem('token_lotus');
      setModalVisible(true);
    }
  };

  if (loadingA) return <Loading />;
  if (errorA) console.log(errorA);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Hide modal...');
              setModalVisible(!modalVisible);
            }}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={{color: '#fff', fontSize: 14}}>
                  El usuario y la contraseña son incorrectos.
                </Text>
                <Text style={{color: '#fff', fontSize: 12, marginTop: 10}}>
                  Intentalo de nuevo.
                </Text>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => setModalVisible(false)}>
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
                  source={require('../assets/images/lotus_logo.png')}
                />
                <Text style={{color: '#00FFFF', fontSize: 18}}>
                  pet-care app
                </Text>
              </View>
              <Formik
                initialValues={initialValue}
                validationSchema={SignupSchema}
                onSubmit={values => handleLogin(values)}>
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
                      {errors.user && touched.user ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.user}</Text>
                        </View>
                      ) : null}
                      <TextInput
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        style={style.inputText}
                        placeholder="Usuario"
                      />
                      {errors.password && touched.password ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.password}</Text>
                        </View>
                      ) : null}
                      <TextInput
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={style.inputText}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                      />
                    </View>
                    <View style={style.buttonContainer}>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => handleSubmit()}>
                        <View style={style.btnSubmit}>
                          <Text style={style.txtSubmit}>Entrar</Text>
                        </View>
                      </TouchableHighlight>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          margin: 20,
                        }}>
                        ¿Aún no tienes cuenta?
                      </Text>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigation.navigate('Register')}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00FFFF',
                            borderRadius: 10,
                          }}>
                          <Text style={style.btnRegister}>Registrarse</Text>
                        </View>
                      </TouchableHighlight>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          margin: 20,
                        }}>
                        ¿Perdiste la cuenta?
                      </Text>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigation.navigate('Recovery')}>
                        <View style={style.btnSubmit}>
                          <Text style={style.txtSubmit}>Recuperar Cuenta</Text>
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
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 50,
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
    color: '#330066',
    fontSize: 16,
    textTransform: 'uppercase',
    padding: Platform.OS == 'ios' ? 15 : 10,
  },
  btnSubmit: {
    backgroundColor: '#660066',
    padding: Platform.OS == 'ios' ? 15 : 10,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  txtSubmit: {
    color: '#fff',
    padding: 2,
    textAlign: 'center',
    fontSize: 18,
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

export default Login;
