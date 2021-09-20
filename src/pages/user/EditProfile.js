import React,{useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  Platform,
  Image,
  Animated,
} from 'react-native';

import {Formik} from 'formik';

const EditProfile = () => {
  const initialValue = {};
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
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
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={style.editContainer}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={require('./../../assets/images/image_photo.png')}
                          style={style.imgProfile}
                        />
                        <TouchableHighlight
                          underlayColor="transparent"
                          onPress={() => console.log('Edit mage')}>
                          <View style={style.editImage}>
                            <Image
                              source={require('./../../assets/images/edit_btn.png')}
                            />
                          </View>
                        </TouchableHighlight>
                      </View>
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
    backgroundColor: 'rgba(255,255,255,0.35)',
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
    width: 100,
    height: 100,
    marginVertical: 40,
  },
  editImage: {
    backgroundColor: '#330066',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    top: -70,
    left: 15,
  },
});

export default EditProfile;
