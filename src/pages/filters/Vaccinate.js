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
  const DATA = [];
  const renderItem = ({item}) => <Item date={item.date} />;
  const [txtValue, setTxtValue] = useState('');

  const value = useDebounceValue(txtValue);

  useEffect(() => {
    if (value) {
      const result = [];
      value.vacunacions.map(item => {
        result.push({
          id: item.id,
          date: item.last_vaccination,
        });
      });
    }
  }, [value]);

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{flex: 1}}>
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
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VaccinateFilters;
