import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {style} from './style';
import {useDebounceValue} from '../../hooks/debounceTime';
import {CONSULT_SEARCH_FILTER_DEWORMING} from '../apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';
import {useNavigation} from '@react-navigation/native';

const Item = ({data}) => {
  const {date, id, id_deworming} = data;
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  return (
    <View
      style={[
        style.item,
        {
          flexDirection: 'row',
        },
      ]}>
      <View style={{flex: 1}}>
        <Image
          source={require('./../../assets/images/tabs/PARASITEICON.png')}
          resizeMode="contain"
          style={style.image}
        />
      </View>
      <View style={{flex: 3}}>
        <Text style={style.dateTitle}>{date}</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableHighlight
          style={{alignItems: 'center'}}
          onPress={() =>
            isConnected
              ? navigation.navigate('DetailsGeneral', {
                  idDetails: id_deworming,
                  type: 'desparacitacion',
                })
              : navigation.navigate('DetailsOfflineGeneral', {
                  idDetails: id_deworming,
                  type: 'desparacitacion',
                })
          }
          underlayColor="transparent">
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 0,
              backgroundColor: 'rgba(51,0,102,0.56)',
              margin: 4,
              borderRadius: 4,
            }}>
            <Image
              source={require('../../assets/images/detailsicon.png')}
              resizeMode="contain"
              style={style.iconActions}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const DewormingFilters = () => {
  const [txtValue, setTxtValue] = useState('');
  const [getSearchResult, setSearchResult] = useState([]);

  const isConnected = useIsConnected();
  const value = useDebounceValue(
    txtValue,
    1000,
    CONSULT_SEARCH_FILTER_DEWORMING,
  );

  const renderItem = ({item}) => <Item data={item} />;

  useEffect(() => {
    if (value && isConnected) {
      const result = [];
      value.desparacitacions.map(item => {
        result.push({
          id: item.id,
          id_deworming: item.id_deworming,
          date: item.last_deworming,
        });
      });
      setSearchResult(result);
    } else {
      database2.ConsultDewormingGeneral(setSearchResult);
    }
  }, [isConnected, value]);

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

export default DewormingFilters;
