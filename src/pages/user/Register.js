import React,{useState} from 'react';
import {
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@apollo/client';
import {REGISTER_USER_APP} from '../apolllo/grahpql';
import {ModalAlertErrorRegister} from '../../components/sharedComponent';
const initialValue = {
  user: '',
  email: '',
  password: '',
  confirmPass: '',
};

const SignupSchema = Yup.object().shape({
  user: Yup.string().required('El nombre usuario es requerido.'),
  email: Yup.string()
    .email('El email no es valido.')
    .required('El campo email es requerido.'),
  password: Yup.string()
    .required('La contraseña es requerido.')
    .matches(/[a-zA-Z]/, 'La contraseña requiere mayusculas [A].')
    .min(6, 'La contraseña minimo de 6 caracteres'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('password')], 'La contraseña no coincide')
    .required('Confirma la contraseña.'),
});

const Register = ({navigation}) => {
  const [register, {data, loading, error}] = useMutation(REGISTER_USER_APP);
  const [modalVisible, setModalVisible] = useState(false);
  if (loading) {
    return (
      <View style={style.container}>
        <ImageBackground
          source={require('./../../assets/images/bg_lotus.png')}
          resizeMode="cover"
          style={style.bgImage}>
          <ActivityIndicator size="large" color="#17E6E6" />
        </ImageBackground>
      </View>
    );
  }


  const handleRegister = async values => {
    try {
      await register({
        variables: {
          username: values.user,
          email: values.email,
          password: values.password,
        },
      });
      navigation.navigate('Gratulations', {
        txtMsg: 'Gracias por su registro, ahora ingresa sessión.',
        action: 'Login',
      });
      return true;
    } catch (e) {
      setModalVisible(true);
    }
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <ModalAlertErrorRegister
            modalVisible={modalVisible}
            send={() => navigation.navigate('Login')}
          />
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
                onSubmit={values => handleRegister(values)}>
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
                        name="user"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        style={style.inputText}
                        placeholder="Usuario"
                      />
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
                        name="email"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={style.inputText}
                        placeholder="E-mail"
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
                        name="password"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={style.inputText}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                      />
                      {errors.confirmPass && touched.confirmPass ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.confirmPass}</Text>
                        </View>
                      ) : null}
                      <TextInput
                        name="confirmPass"
                        placeholderTextColor="#ffffff"
                        onChangeText={handleChange('confirmPass')}
                        onBlur={handleBlur('confirmPass')}
                        value={values.confirmPass}
                        style={style.inputText}
                        secureTextEntry={true}
                        placeholder="Confirmar Contraseña"
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
                          <Text style={style.btnRegister}>Registrar</Text>
                        </View>
                      </TouchableHighlight>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          margin: 20,
                        }}>
                        ¿Ya tienes cuenta?
                      </Text>
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigation.navigate('Login')}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#80006A',
                          }}>
                          <Text style={style.btnRegister}>Ingresar</Text>
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
    paddingVertical: Platform.OS == 'ios' ? 20 : 10,
    paddingHorizontal: Platform.OS == 'ios' ? 20 : 10,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  btnRegister: {
    color: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    fontSize: 16,
    textTransform: 'uppercase',
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
});
export default Register;
