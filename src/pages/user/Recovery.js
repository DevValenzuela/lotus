import React from 'react';
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
} from 'react-native';
import {Formik} from 'formik';

const initialValue = {
  email: '',
};

const Recovery = ({navigation}) => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
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
                  source={require('./../../assets/images/lotus_logo.png')}
                />
                <Text style={{color: '#00FFFF', fontSize: 18}}>
                  pet-care app
                </Text>
              </View>
              <Formik
                initialValues={initialValue}
                onSubmit={values => console.log(values)}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <>
                    <View style={style.group}>
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
    color: '#330066',
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
});
export default Recovery;
