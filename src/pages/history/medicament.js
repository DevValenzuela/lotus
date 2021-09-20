import React from 'react';
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
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    date: 'Julio 15/2021',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    date: 'Febrero 15/2021',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Diciembre 12/2020',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Noviembre 8/2020',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Octubre 10/2020',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Septiembre 10/2019',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Marzo 10/2019',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Febrero 21/2019',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Enero 21/2018',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Optubre 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Agosto 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Julio 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Junio 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Mayo 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Abril 21/2017',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: 'Marzo 21/2017',
  },
];

const Item = ({date}) => (
  <View style={style.item}>
    <Image
      source={require('./../../assets/images/tabs/MEDICAMENT.png')}
      resizeMode="contain"
      style={style.image}
    />
    <Text style={style.dateTitle}>{date}</Text>
  </View>
);

const MedicamentHistory = () => {
  const renderItem = ({item}) => <Item date={item.date} />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <TouchableHighlight
          style={{alignItems: 'center', marginVertical: 20}}
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

export default MedicamentHistory;
