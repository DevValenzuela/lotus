import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import moment from 'moment';

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const ScreenNotification = () => {

  let YEAR = moment().format('YY');

  const DAY = moment().format('DD');
  const MONTH = moment().add(1, 'month').format('MM');

  const [getYear, setYear] = useState(YEAR);
  const [getDay, setDay] = useState(DAY);
  const [getMonth, setMonth] = useState(MONTH);
  
  const YEARS = [];
  const DAYS = [];
  const MONTHDAY = [
    {
      id: 1,
      title: 'Enero',
    },
    {
      id: 2,
      title: 'Febrero',
    },
    {
      id: 3,
      title: 'Marzo',
    },
    {
      id: 4,
      title: 'Abril',
    },
    {
      id: 5,
      title: 'Mayo',
    },
    {
      id: 6,
      title: 'Junio',
    },
    {
      id: 7,
      title: 'Julio',
    },
    {
      id: 8,
      title: 'Agosto',
    },
    {
      id: 9,
      title: 'Septiembre',
    },
    {
      id: 10,
      title: 'Octubre',
    },
    {
      id: 11,
      title: 'Noviembre',
    },
    {
      id: 12,
      title: 'Diciembre',
    },
  ];

  // Count Days
  for (let i = 1; i <= daysInMonth(month, year); i++) {
    DAYS.push({
      id: i,
      value: i,
    });
  }

  // Count Years
  let yearNumber = parseInt(YEAR);
  for (let y = 0; y < 6; y++) {
    YEARS.push({
      id: y,
      year: year + y,
      value: yearNumber + y,
    });
  }

  const ItemMonth = ({month, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[style.itemList, backgroundColor]}>
      <Text style={[style.txtList, textColor]}>{month.title}</Text>
    </TouchableOpacity>
  );

  const ItemDays = ({day, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[style.itemList, backgroundColor]}>
      <Text style={[style.txtList, textColor]}>{day.id}</Text>
    </TouchableOpacity>
  );

  const ItemYears = ({year, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[style.itemList, backgroundColor]}>
      <Text style={[style.txtList, textColor]}>{year.year}</Text>
    </TouchableOpacity>
  );


  const [getMonthVisible, setMonthVisible] = useState(false);
  const [getDayVisible, setDayVisible] = useState(false);
  const [getYearVisible, setYearVisible] = useState(false);

  const renderMonth = ({item}) => {
    const backgroundColor =
      item.id === Number(getMonth) ? '#6e3b6e' : '#ffffff';
    const color = item.id === Number(getMonth) ? 'white' : 'black';
    return (
      <ItemMonth
        onPress={() => {
          setMonthVisible(false);
          setMonth(item.id.toString());
        }}
        month={item}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const renderDays = ({item}) => {
    const backgroundColor = item.id === Number(getDay) ? '#6e3b6e' : '#ffffff';
    const color = item.id === Number(getDay) ? 'white' : 'black';
    return (
      <ItemDays
        onPress={() => {
          setDayVisible(false);
          setDay(item.value.toString());
        }}
        day={item}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const renderYears = ({item}) => {
    const backgroundColor =
      item.value === Number(getYear) ? '#6e3b6e' : '#ffffff';
    const color = item.value === Number(getYear) ? 'white' : 'black';
    return (
      <ItemYears
        onPress={() => {
          setYearVisible(false);
          setYear(item.value.toString());
        }}
        year={item}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={style.containerNotify}>
      <Modal
        animationType="slide"
        visible={getYearVisible}
        onRequestClose={() => setYearVisible(false)}>
        <View style={style.centeredView}>
          <Text style={{marginVertical: 5}}>¿Seleccione el año?</Text>
          <FlatList
            data={YEARS}
            renderItem={renderYears}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={getMonthVisible}
        onRequestClose={() => setMonthVisible(false)}>
        <View style={style.centeredView}>
          <Text style={{marginVertical: 5}}>¿Seleccione el mes?</Text>
          <FlatList
            data={MONTHDAY}
            renderItem={renderMonth}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={getDayVisible}
        onRequestClose={() => setDayVisible(false)}>
        <View style={style.centeredView}>
          <Text style={{marginVertical: 5}}>¿Seleccione el día?</Text>
          <FlatList
            data={DAYS}
            renderItem={renderDays}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>

      <View style={style.containerLogo}>
        <Image
          style={style.tinyLogo}
          source={require('../assets/images/lotus_logo.png')}
        />
        <Text style={{color: '#00FFFF', fontSize: 18}}>pet-care app</Text>
        <Text style={{color: '#fff', fontSize: 12, marginTop: 10}}>
          ¿Cuando deseas que te confirmemos?
        </Text>
        <Text style={{color: '#00FFFF', fontSize: 12, marginTop: 10}}>
          Ingresa la fecha.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: 300,
            marginVertical: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={style.txtLabel}>DIA</Text>
            <TextInput
              placeholderTextColor="#5742A2"
              placeholder="00"
              value={getDay}
              style={style.inputText}
              showSoftInputOnFocus={false}
              onChangeText={() => alert('Change Text')}
              onFocus={() => setDayVisible(true)}
              keyboardType="numeric"
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={style.txtLabel}>MES</Text>
            <TextInput
              placeholderTextColor="#5742A2"
              placeholder="00"
              value={getMonth}
              style={style.inputText}
              showSoftInputOnFocus={false}
              onChangeText={() => alert('Change Text')}
              onFocus={() => setMonthVisible(true)}
              keyboardType="numeric"
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={style.txtLabel}>AÑO</Text>
            <TextInput
              placeholderTextColor="#5742A2"
              placeholder="00"
              value={getYear}
              style={style.inputText}
              showSoftInputOnFocus={false}
              onChangeText={() => alert('Change Text')}
              onFocus={() => setYearVisible(true)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <TouchableHighlight onPress={() => null}>
            <View style={style.btnSubmit}>
              <Text style={style.txtSubmit}>Notificarme</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerNotify: {
    width: '80%',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    maxHeight: 300,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 50,
  },
  tinyLogo: {
    width: 128,
    height: 163,
  },
  inputText: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderColor: '#330066',
    color: '#330066',
    fontSize: 36,
    textAlign: 'center',
    marginHorizontal: 4,
    fontWeight: '800',
  },
  btnSubmit: {
    backgroundColor: '#660066',
    padding: Platform.OS == 'ios' ? 15 : 10,
    borderRadius: 10,
    width: '100%',
  },
  txtSubmit: {
    color: '#fff',
    padding: 2,
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  txtLabel: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 3,
  },
  itemList: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomColor: '#565656',
    borderBottomWidth: 1,
  },
  txtList: {
    fontSize: 18,
    textAlign: 'center',
    width: 250,
  },
});
export default ScreenNotification;
