import React, {useState, useEffect, useContext} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';
import {style} from './style';
import {CONSULT_NOTIFYCS_LIST} from '../apolllo/query';
import {useIsConnected} from 'react-native-offline';
import ListBoxFilters from '../../components/listBoxFilters';
import {useQuery} from '@apollo/client';
import {Loading} from '../../components/sharedComponent';
import {UserContext} from '../../context/userContext';

const DewormingFilters = () => {
  const {
    user: {
      user: {id},
    },
  } = useContext(UserContext);

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
        const {
          id,
          date_notify,
          id_mascot,
          id_notify,
          type,
          id_user,
          date,
          id_type,
        } = item;
        result.push({
          id,
          date_notify,
          date,
          id_user,
          id_type,
          id_mascot,
          id_notify,
          type,
        });
      });
      setSearchResult(result);
    }
  }, [isConnected, generalNotify]);

  if (loadingNotify) return <Loading />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        {getSearchResult.length <= 0 || !isConnected ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/not-result.png')}
              style={{width: 65, height: 65}}
            />
            <Text style={{color: '#ffffff', textAlign: 'center'}}>
              No hay resultados.
            </Text>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
              data={getSearchResult}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DewormingFilters;
