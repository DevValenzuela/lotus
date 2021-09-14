import React, {useState} from 'react';
import {
  StyleSheet,
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
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <View style={style.containerForm}>
            <View>
              <Text style={style.label}>Fecha de especialización</Text>
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

              <Text style={style.label}>
                Valoración
              </Text>

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

              <Text style={style.label}>
                Prescripción y anotaciones:
              </Text>

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
                <Button color="#3C0065" title="Añadir" />
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bgImage: {
    flex: 1,
  },
  containerForm: {
    backgroundColor: 'rgba(102,0,102,0.69)',
    padding: 4,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: '#00FFFF',
    paddingLeft: 3,
    marginVertical: 4,
  },
  inputText: {
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#330066',
    color: '#330066',
    borderRadius: 5,
    marginVertical: 5,
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  containerCalendar: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  btnActions: {
    opacity: 0.8,
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#660066',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
});

export default ControlMedic;
