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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      date: 'Julio 15/2021',
    },
  ];
  const [search, setSearch] = useState('');
  const renderItem = ({item}) => <Item date={item.date} />;
  const [txtValue, setTxtValue] = useState('');

  const value = useDebounceValue(txtValue);

  useEffect(() => {
    if (value) {
      console.log(value)
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
