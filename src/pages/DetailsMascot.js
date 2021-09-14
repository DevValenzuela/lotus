import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import Tabs from '../components/Tabs';

const DetailsMascot = ({navigation}) => {
  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(102,0,102,0.39)',
              marginVertical: 5,
              marginHorizontal: 12,
              borderRadius: 10,
              marginBottom: 110,
              paddingVertical: 10,
            }}>
            <View style={{flex: 1, flexDirection: 'column', maxWidth: 500}}>
              <View
                style={{flex: 1, paddingHorizontal: 15, paddingVertical: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => console.log('Edit...')}>
                    <Image
                      source={require('./../assets/images/edit_btn.png')}
                    />
                  </TouchableHighlight>
                  <View style={{flex: 1, marginBottom: 10}}>
                    <Image
                      source={{uri: 'https://via.placeholder.com/150'}}
                      style={style.image}
                    />
                  </View>
                  <View style={{flex: 2, marginHorizontal: 10}}>
                    <Text style={style.titleTxt}>Michi</Text>
                    <Text style={style.yearsTxt}>3 años</Text>
                  </View>
                </View>
                <View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Tipo Mascota:</Text>
                    <Text style={style.parrTxt}>Felina</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Raza:</Text>
                    <Text style={style.parrTxt}>Criolla</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Fecha de Esterilización:</Text>
                    <Text style={style.parrTxt}>26 Marzo 2018</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Microship:</Text>
                    <Text style={style.parrTxt}>Si</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>No Microship:</Text>
                    <Text style={style.parrTxt}>000746376DUI</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>
                      Enfermedades o cuidados especiales:
                    </Text>
                    <Text style={style.parrTxt}>Gingivo-estomatitis.</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => console.log('Edit...')}>
                    <Image
                      source={require('./../assets/images/edit_btn.png')}
                    />
                  </TouchableHighlight>
                  <Text style={style.subtitleTxt}>Desparacitación:</Text>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Ultima desparacitación:</Text>
                    <Text style={style.parrTxt}>26 Marzo 2018</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Medicamento:</Text>
                    <Text style={style.parrTxt}>Canisan D.</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Anotaciones o reacciones:</Text>
                    <Text style={style.parrTxt}>Ninguna</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => console.log('Edit...')}>
                    <Image
                      source={require('./../assets/images/edit_btn.png')}
                    />
                  </TouchableHighlight>
                  <Text style={style.subtitleTxt}>Vacunación:</Text>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>última Vacunación:</Text>
                    <Text style={style.parrTxt}>07 Diciembre 2020</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Medicamentos:</Text>
                    <Text style={style.parrTxt}>Rabican y Nobivac</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Anotaciones o reacciones:</Text>
                    <Text style={style.parrTxt}>Ninguna</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => console.log('Edit...')}>
                    <Image
                      source={require('./../assets/images/edit_btn.png')}
                    />
                  </TouchableHighlight>
                  <Text style={style.subtitleTxt}>Control Médico:</Text>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Último control:</Text>
                    <Text style={style.parrTxt}>17 Agosto 2020</Text>
                  </View>
                  <Text style={style.subTxt}>Valoración:</Text>
                  <Text style={style.parrTxt}>
                    La gingivo-estomatitis no avanza, pero no remite. Los signos
                    vitales y peso del animal son buenos.
                  </Text>
                  <Text style={style.subTxt}>Prescripción y anotaciones:</Text>
                  <Text style={style.parrTxt}>
                    Se prescribe Amoxicilina 100 mgs, una vez al día por
                    tresdías. Variar la dieta del gato para estimular suapetito
                    y evitar la pérdida de peso.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Tabs navigation={navigation} />
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  subTxt: {
    color: '#00FFFF',
    marginRight: 10,
  },
  titleTxt: {
    color: '#00FFFF',
    fontSize: 29,
  },
  subtitleTxt: {
    color: '#00FFFF',
    fontSize: 22,
    marginVertical: 10,
  },
  yearsTxt: {
    color: '#00FFFF',
    fontSize: 18,
  },
  containerCard: {
    flex: 1,
    borderStyle: 'solid',
    borderTopColor: 'rgba(255,255,255,0.71)',
    borderTopWidth: 0.2,
  },
  containerGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
  },
  parrTxt: {
    color: '#ffffff',
  },
  edit: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: 'rgba(51,0,102,0.56)',
    padding: 10,
    borderRadius: 50,
  },
});
export default DetailsMascot;
