import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';

import {style} from './style';

const Medicament = () => {
    return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <View style={style.containerForm}>
            <View>
              <Text style={style.label}>Último Dosis</Text>
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
                />
                <Text style={style.symbol}>Hrs</Text>
              </View>

              <Text style={style.label}>Medicamento:</Text>
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
                placeholder="Ej: Amoxicilina"
              />
              <Text style={style.label}>Posologia:</Text>
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
              />
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
                  placeholder="Ej: 0,5"
                />
                <Text style={style.symbol}>gr/ml</Text>
              </View>

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
                />
                <Text style={style.symbol}>Hrs</Text>
              </View>

              <Text style={style.label}>Anotaciones:</Text>

              <View style={{marginHorizontal: 5, marginVertical: 2}}>
                <Textarea
                  placeholderTextColor={'#5742A2'}
                  containerStyle={style.textareaContainer}
                  style={style.textarea}
                  maxLength={120}
                  placeholder={'Ingresa algún comentario o anotación.'}
                  underlineColorAndroid={'transparent'}
                />
              </View>

              <View style={{marginVertical: 10}}>
                <TouchableHighlight>
                  <View style={style.btnSubmit}>
                    <Text style={style.btnSubmitxt}>Modificar</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Medicament;
