import React, {useRef, useEffect, useContext} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Platform,
  Animated,
} from 'react-native';

import {Formik} from 'formik';
import {AvatarOption} from '../../components/sharedComponent';

const EditProfile = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  if (loadingA) return null;
  if (errorA) return null;

  const {url} = dataA.user;
  console.log(dataA.user);

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <Animated.View style={[style.container, {opacity: fadeAnim}]}>
          <ScrollView>
            <Formik
              initialValues={initialValue}
              onSubmit={values => console.log(values)}>
              {({
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
              }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={style.editContainer}>
                      <AvatarOption />
                      <TextInput
                        placeholderTextColor="#5742A2"
                        style={style.inputText}
                        placeholder="Usuario"
                      />
                      {errors.username && touched.username ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={style.error}>{errors.username}</Text>
                        </View>
                      ) : null}
                      <TextInput
                        placeholderTextColor="#5742A2"
                        style={style.inputText}
                        placeholder="E-mail"
                      />
                      <TextInput
                        placeholderTextColor="#5742A2"
                        style={style.inputText}
                        placeholder="Contraseña"
                      />
                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => handleSubmit()}>
                        <View style={style.btnEdit}>
                          <Text style={style.txtBtnEdit}>Editar</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
            <TouchableHighlight
              style={{alignItems: 'center', marginVertical: 20}}
              onPress={() => console.log('Delete account ...')}
              underlayColor="transparent">
              <View style={style.btnDeleteAccount}>
                <Text style={style.btnTxtDelete}>Eliminar Cuenta</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  editContainer: {
    backgroundColor: 'rgba(86,42,140,0.91)',
    padding: 5,
    width: '90%',
    marginTop: 50,
    borderRadius: 10,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderColor: '#330066',
    color: '#330066',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: Platform.OS == 'ios' ? 15 : 10,
    margin: 5,
  },
  btnDeleteAccount: {
    backgroundColor: '#660066',
    borderRadius: 10,
    width: '90%',
    padding: Platform.OS == 'ios' ? 8 : 5,
  },
  btnTxtDelete: {
    padding: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  btnEdit: {
    backgroundColor: '#330066',
    borderRadius: 10,
    marginVertical: 10,
    padding: Platform.OS == 'ios' ? 8 : 5,
  },
  txtBtnEdit: {
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  imgProfile: {
    width: 140,
    height: 140,
    marginVertical: 20,
  },
});

export default EditProfile;
