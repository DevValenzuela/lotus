import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

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
      source={require('./../../assets/images/tabs/DOCTORICON.png')}
      resizeMode="contain"
      style={style.image}
    />
    <Text style={style.dateTitle}>
      {date}
    </Text>
  </View>
);

const MedicHistory = () => {
  const renderItem = ({item}) => <Item date={item.date} />;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <View style={{flex: 1, maxWidth: 500}}>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  dateTitle: {
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#660066',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
export default MedicHistory;
