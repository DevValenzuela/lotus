import React, {useState, useEffect, useContext} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TextInput,
} from 'react-native';
import {style} from './style';
import {useDebounceValue} from '../../hooks/debounceTime';
import {
  CONSULT_NOTIFYCS_LIST,
  CONSULT_SEARCH_FILTER_DEWORMING,
} from '../apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';
import ListBoxFilters from '../../components/listBoxFilters';
import {useQuery} from '@apollo/client';
import {Loading} from '../../components/sharedComponent';
import {UserContext} from '../../context/userContext';

const DewormingFilters = () => {
  const {
    dispatchUserEvent,
    user: {
      user: {id},
    },
  } = useContext(UserContext);

  const [txtValue, setTxtValue] = useState('');
  const [getSearchResult, setSearchResult] = useState([]);

  const isConnected = useIsConnected();

  const {
    data: generalNotify,
    loading: loadingNotify,
    error: errorNotify,
  } = useQuery(CONSULT_NOTIFYCS_LIST, {
    pollInterval: 2000,
    variables: {
      type: 'Desparacitación',
      id: id,
    },
  });

  const renderItem = ({item}) => <ListBoxFilters data={item} />;

  useEffect(() => {
    if (generalNotify && isConnected) {
      const result = [];
      generalNotify.notifycs.map(item => {
        const {id, date_notify, id_mascot, id_notify, type} = item;
        result.push({
          id,
          date_notify,
          id_mascot,
          id_notify,
          type,
        });
      });
      setSearchResult(result);
    } else {
      database2.ConsultDewormingGeneral(setSearchResult);
    }
  }, [isConnected, generalNotify]);

  if (loadingNotify) return <Loading />;

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
