import React from 'react';
import {API_URL} from '@env';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Platform,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useQuery} from '@apollo/client';
import {CONSULT_MASCOT_APP_ID} from './apolllo/query';
const DetailsMascot = ({navigation, route}) => {
  console.log(route.params.mascotId);
  const {
    data: general,
    loading: loadingGeneral,
    error: errorGeneral,
  } = useQuery(CONSULT_MASCOT_APP_ID, {
    variables: {
      id: route.params.mascotId,
    },
  });
  if (loadingGeneral) return null;
  if (errorGeneral) console.log(errorGeneral);
  if (!general) return null;
  const {
    name_mascot,
    age_mascot,
    race_mascot,
    date_sterilized,
    type_mascot,
    avatar_mascot,
  } = general.mascot;

  const url_image = avatar_mascot != null ? avatar_mascot.url : '';

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
              marginVertical: 10,
              marginHorizontal: 15,
              borderRadius: 10,
              paddingVertical: 10,
              minWidth: wp('95%'),
              alignSelf: 'center',
            }}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={style.column}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('EditGeneral')}>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flex: 1, marginBottom: 10}}>
                    {url_image ? (
                      <Image
                        source={{uri: `${API_URL}${url_image}`}}
                        style={style.image}
                      />
                    ) : (
                      <Image
                        source={require('./../assets/images/not_image_small.jpg')}
                        style={style.image}
                      />
                    )}
                  </View>
                  <View style={{flex: 2, marginHorizontal: 10}}>
                    <Text style={style.titleTxt}>{name_mascot}</Text>
                    <Text style={style.yearsTxt}>{`${age_mascot} años`}</Text>
                  </View>
                </View>
                <View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Tipo Mascota:</Text>
                    <Text style={style.parrTxt}>{type_mascot}</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Raza:</Text>
                    <Text style={style.parrTxt}>{race_mascot}</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Fecha de Esterilización:</Text>
                    <Text style={style.parrTxt}>{date_sterilized}</Text>
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
              <View style={style.column}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('EditMedicament')}>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/MEDICAMENT.png')}
                      style={{width: 25, height: 25, marginHorizontal: 6}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Medicación:</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Última Dosis:</Text>
                    <Text style={style.parrTxt}>07 Diciembre 2020</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Medicamento:</Text>
                    <Text style={style.parrTxt}>Amoxicilina</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Posología:</Text>
                    <Text style={style.parrTxt}>Solución Oral</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Dosis:</Text>
                    <Text style={style.parrTxt}>0.5 gr/ml</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Periodo:</Text>
                    <Text style={style.parrTxt}>12 hrs</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Anotaciones</Text>
                    <Text style={style.parrTxt}>Ninguna.</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('HistoryMedicament')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#80006A',
                        width: wp('90%'),
                      }}>
                      <Text
                        style={{
                          padding: Platform.OS == 'ios' ? 20 : 10,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        Ver Historial
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={style.column}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('EditDeworming')}>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/PARASITEICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Desparacitación:</Text>
                  </View>

                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Última desparacitación:</Text>
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
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('HistoryDeworming')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#80006A',
                        width: wp('90%'),
                      }}>
                      <Text
                        style={{
                          padding: Platform.OS == 'ios' ? 20 : 10,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        Ver Historial
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={style.column}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('EditVaccinations')}>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/VACCINEICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Vacunación:</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Última Vacunación:</Text>
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
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('HistoryVaccinations')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#80006A',
                        width: wp('90%'),
                      }}>
                      <Text
                        style={{
                          padding: Platform.OS == 'ios' ? 20 : 10,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        Ver Historial
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={style.column}>
                <View style={style.containerCard}>
                  <TouchableHighlight
                    style={style.edit}
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('EditControlMedic')}>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/DOCTORICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Control Médico:</Text>
                  </View>
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
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => navigation.navigate('HistoryMedic')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#80006A',
                        width: wp('90%'),
                      }}>
                      <Text
                        style={{
                          padding: Platform.OS == 'ios' ? 20 : 10,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        Ver Historial
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330066',
  },
  column: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(86,42,140,0.85)',
    marginVertical: 5,
    borderRadius: 10,
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
    textTransform: 'capitalize',
  },
  subtitleTxt: {
    color: '#00FFFF',
    fontSize: 18,
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  yearsTxt: {
    color: '#00FFFF',
    fontSize: 18,
  },
  containerCard: {
    flex: 1,
  },
  containerGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
  },
  parrTxt: {
    color: '#ffffff',
    marginBottom: 10,
  },
  edit: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(51,0,102,0.56)',
    borderRadius: 50,
    zIndex: 9999,
  },
});
export default DetailsMascot;
