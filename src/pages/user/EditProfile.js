import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight, Platform,
} from "react-native";

import {Formik} from 'formik';

const EditProfile = () => {
  const initialValue = {};

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <Formik
            initialValues={initialValue}
            onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={style.editContainer}>
                    <TextInput
                      placeholderTextColor="#ffffff"
                      style={style.inputText}
                      placeholder="Usuario"
                    />
                    <TextInput
                      placeholderTextColor="#ffffff"
                      style={style.inputText}
                      placeholder="E-mail"
                    />
                    <TextInput
                      placeholderTextColor="#ffffff"
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
            underlayColor="transparent">
            <View style={style.btnDeleteAccount}>
              <Text style={style.btnTxtDelete}>Eliminar Cuenta</Text>
            </View>
          </TouchableHighlight>
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
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 10,
    padding: Platform.OS == 'ios' ? 15 : 10,
    margin: 10,
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
    textAlign: 'center'
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
});

export default EditProfile;
