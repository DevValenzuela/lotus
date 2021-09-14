import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableHighlight,
  Button,
} from 'react-native';
import {Formik} from 'formik';
const initialValue = {
  user: '',
  password: '',
};

const Login = ({navigation}) => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
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
                onSubmit={values => navigation.navigate('Dashboard')}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <>
                    <View style={style.group}>
                      <TextInput
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        style={style.inputText}
                        placeholder="Usuario"
                      />
                      <TextInput
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
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.btnRegister}>
                            Recuperar Cuenta
                          </Text>
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
    marginTop: 100,
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
    color: '#330066',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  btnRegister: {
    backgroundColor: 'transparent',
    color: '#66FFCC',
    fontSize: 16,
    textTransform: 'uppercase',
    padding: 10,
  },
  btnSubmit:{
    opacity: 0.8,
    backgroundColor: '#660066',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  txtSubmit:{
    color: '#fff',
    padding: 2,
    textAlign: 'center',
    fontSize: 18,
  }
});

export default Login;
