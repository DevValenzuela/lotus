import React, {useContext} from 'react';
import {
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import {style} from './style';
import {useQuery} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {Loading} from '../../components/sharedComponent';
import {CONSULT_HISTORY_VACCINATIONS_APP} from '../../pages/apolllo/query';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    date: 'Julio 15/2021',
  },
];

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

const VaccinationsHistory = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const idMascot = route.params.idMascot;
  const {data, error, loading} = useQuery(CONSULT_HISTORY_VACCINATIONS_APP, {
    variables: {
      user: user.id,
      mascot: idMascot,
    },
  });

  if (loading) return <Loading />;
  if (error) console.log(error);

  const DATA = [];
  if (data) {
    data.vacunacions.map(item => {
      DATA.push(item);
    });
  }

  const renderItem = ({item}) => <Item date={item.last_vaccination} />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <TouchableHighlight
          style={{alignItems: 'center', marginVertical: 20}}
          onPress={() =>
            navigation.navigate('EditVaccinations', {idMascot, edit: false})
          }
          underlayColor="transparent">
          <View style={style.btnAdd}>
            <Text style={style.btnTxtAdd}>Nueva Entrada</Text>
          </View>
        </TouchableHighlight>
        <View style={{flex: 1}}>
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

export default VaccinationsHistory;
