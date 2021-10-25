import React, {useEffect, useState} from 'react';
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
import {CONSULT_SEARCH_FILTER_VACCINATIONS} from '../apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';

const Item = ({date}) => (
  <View style={style.item}>
    <Image
      source={require('./../../assets/images/tabs/VACCINEICON.png')}
      resizeMode="contain"
      style={style.image}
    />
    <Text style={style.dateTitle}>{date}</Text>
  </View>
);

const VaccinateFilters = () => {
  const [txtValue, setTxtValue] = useState('');
  const [getSearchResult, setSearchResult] = useState([]);

  const isConnected = useIsConnected();
  const value = useDebounceValue(
    txtValue,
    1000,
    CONSULT_SEARCH_FILTER_VACCINATIONS,
  );

  const renderItem = ({item}) => <Item date={item.date} />;

  useEffect(() => {
    if (value && isConnected) {
      const result = [];
      value.vacunacions.map(item => {
        result.push({
          id: item.id,
          date: item.last_vaccination,
        });
      });
      setSearchResult(result);
    } else {
      database2.ConsultVaccinationGeneral(setSearchResult);
    }
  }, [value, isConnected]);

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
                value={txtValue}
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

export default VaccinateFilters;
