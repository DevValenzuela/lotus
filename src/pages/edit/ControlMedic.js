import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Button,
  Dimensions,
} from 'react-native';
import Textarea from 'react-native-textarea';
import CalendarPicker from 'react-native-calendar-picker';

import {style} from './style';

const ControlMedic = () => {
  const [selectedStartDate, getselectedStartDate] = useState(null);
  const [setCalendar, getCalendar] = useState(false);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  const onDateChange = date => {
    getselectedStartDate(date);
  };

  const enableCalendar = strValue => {
    strValue ? getCalendar(true) : getCalendar(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('./../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <View style={style.containerForm}>
            <View>
              <Text style={style.label}>Último Control</Text>
              <TextInput
                style={[
                  style.inputText,
                  {
                    backgroundColor: '#ffffff',
                    borderColor: '#330066',
                    color: '#330066',
                  },
                ]}
                onFocus={enableCalendar}
                showSoftInputOnFocus={false}
                placeholder="Ingresa la fecha"
              />

              <Text style={style.label}>Valoración</Text>

              <View style={{marginHorizontal: 5, marginVertical: 2}}>
                <Textarea
                  containerStyle={style.textareaContainer}
                  style={style.textarea}
                  maxLength={120}
                  placeholder={
                    'Ingresa los cuidados especiales de tu mascota o cualquier sugerencia.'
                  }
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>

              <Text style={style.label}>Presentación y anotaciones:</Text>

              <View style={{marginHorizontal: 5, marginVertical: 2}}>
                <Textarea
                  containerStyle={style.textareaContainer}
                  style={style.textarea}
                  maxLength={120}
                  placeholder={
                    'Ingresa los cuidados especiales de tu mascota o cualquier sugerencia.'
                  }
                  placeholderTextColor={'#c7c7c7'}
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
      {/*===Calendar===*/}
      {setCalendar && (
        <View style={style.containerCalendar}>
          <CalendarPicker
            todayBackgroundColor="#330066"
            selectedDayColor="#330066"
            selectedDayTextColor="#ffffff"
            onDateChange={onDateChange}
            weekdays={['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']}
            months={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
            nextTitle="Siguiente"
            previousTitle="Anterior"
            width={Dimensions.get('window').width / 1}
          />
          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center'}}>Fecha Seleccionada:</Text>
            <Text style={{textAlign: 'center'}}>{startDate}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, flex: 1}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => enableCalendar(false)}>
                <Text style={style.btnActions}>Cancelar</Text>
              </TouchableHighlight>
            </View>
            <View style={{padding: 10, flex: 1}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => console.log('Seleccionado')}>
                <Text style={style.btnActions}>Seleccionar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ControlMedic;
