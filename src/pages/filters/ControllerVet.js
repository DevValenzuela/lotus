import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import {style} from './style';
import {useDebounceValue} from '../../hooks/debounceTime';
import {CONSULT_SEARCH_FILTER_DOCTOR} from '../apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';

const Item = ({date}) => (
  <View style={style.item}>
    <Image
      source={require('./../../assets/images/tabs/DOCTORICON.png')}
      resizeMode="contain"
      style={style.image}
    />
    <Text style={style.dateTitle}>{date}</Text>
  </View>
);

const ControllerVet = () => {
  const [txtValue, setTxtValue] = useState('');
  const [getSearchResult, setSearchResult] = useState([]);
  const isConnected = useIsConnected();
  const value = useDebounceValue(txtValue, 1000, CONSULT_SEARCH_FILTER_DOCTOR);
  const renderItem = ({item}) => <Item date={item.date} />;

  useEffect(() => {
    if (value && isConnected) {
      const result = [];
      value.controllerMedics.map(item => {
        result.push({
          id: item.id,
          date: item.last_control,
        });
      });
      setSearchResult(result);
    } else {
      database2.ConsultControllerVetGeneral(setSearchResult);
    }
  }, [value]);

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{flex: 1}}>
          {isConnected && (
            <View style={style.contentSearch}>
              <Image
                style={style.searchIcon}
                source={require('../../assets/images/search.png')}
              />

              <TextInput
                placeholderTextColor="#5742A2"
                style={style.txtSearch}
                placeholder="Buscar..."
                onChangeText={setTxtValue}
              />
            </View>
          )}
          <FlatList
            data={getSearchResult}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ControllerVet;
