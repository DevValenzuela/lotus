import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Button,
  TouchableHighlight,
} from 'react-native';

import {Formik} from 'formik';

const EditProfile = () => {
  const initialValue = {};

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
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
                <View style={{flex: 1, maxWidth: 500, alignItems: 'center'}}>
                  <View style={style.editContainer}>
                    <TextInput style={style.inputText} placeholder="Usuario" />
                    <TextInput style={style.inputText} placeholder="E-mail" />
                    <TextInput
                      style={style.inputText}
                      placeholder="Contraseña"
                    />

                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => handleSubmit()}>
                      <View
                          style={style.btnEdit}>
                        <Text style={style.txtBtnEdit}>
                         Editar
                        </Text>
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
    backgroundColor: '#330066',
  },
  editContainer: {
    backgroundColor: '#660066',
    padding: 5,
    width: 280,
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
    padding: 10,
    margin: 10,
  },
  btnDeleteAccount: {
    backgroundColor: '#660066',
    borderRadius: 10,
  },
  btnTxtDelete:{
    textAlign: 'center',
    padding: 10,
    width: 200,
    color: '#66FFCC',
    textTransform: 'uppercase',
  },
  btnEdit:{
    backgroundColor: '#330066',
    borderRadius: 50
  },
  txtBtnEdit:{
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  }
});

export default EditProfile;
