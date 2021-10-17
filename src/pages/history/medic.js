import React, {useContext} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import {style} from './style';
import {useQuery} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {Loading} from '../../components/sharedComponent';
import { CONSULT_HISTORY_DOCTOR_APP } from "../../pages/apolllo/query";

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

const MedicHistory = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const idMascot = route.params.idMascot;

  const {data, error, loading} = useQuery(CONSULT_HISTORY_DOCTOR_APP, {
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  if (loading) return <Loading />;
  if (error) console.log(error);

  const DATA = [];
  if (data) {
    data.controllerMedicts.map(item => {
      DATA.push(item);
    });
  }
  const renderItem = ({item}) => <Item date={item.last_control} />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <TouchableHighlight
          style={{alignItems: 'center', marginVertical: 20}}
          onPress={() =>
            navigation.navigate('EditControlMedic', {idMascot, edit: false})
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

export default MedicHistory;
