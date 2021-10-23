import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
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
import {database} from '../conexion/crudSqlite';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DetailsMascotOffline = ({navigation, route}) => {
  const idMascot = route.params.mascotId;
  const [mascot, setMascot] = useState([]);
  const [deworming, setDeworming] = useState([]);
  const [vaccination, setVaccination] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [controllerMedics, setControllerMedic] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    consultDataDB().then(r => console.log('¡Success Fully!'));
  }, [idMascot, refreshing]);

  async function consultDataDB() {
    try {
      database.consultDesparacitacion(idMascot, setDeworming);
      database.consultMascotID(idMascot, setMascot);
      database.consultVaccination(idMascot, setVaccination);
      database.consultMedicamnets(idMascot, setMedicaments);
      database.consultControllerMedic(idMascot, setControllerMedic);
    } catch (e) {
      console.warn(e);
    }
  }

  const {
    name_mascot,
    type_mascot,
    age_mascot,
    race_mascot,
    date_sterilized,
    number_microchip,
    microchip,
    description,
  } = mascot;

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
                    onPress={() =>
                      navigation.navigate('EditGeneral', {
                        data: '',
                        edit: true,
                      })
                    }>
                    <View style={{marginTop: 15}}>
                      <Image
                        source={require('./../assets/images/edit_btn.png')}
                      />
                    </View>
                  </TouchableHighlight>
                  <View style={{flex: 1, marginBottom: 10}}>
                    <Image
                      source={require('./../assets/images/not_image_small.jpg')}
                      style={style.image}
                    />
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
                    <Text style={style.subTxt}>Microchip:</Text>
                    <Text style={style.parrTxt}>{microchip}</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>No Microchip:</Text>
                    <Text style={style.parrTxt}>{number_microchip}</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>
                      Enfermedades o cuidados especiales:
                    </Text>
                    <Text style={style.parrTxt}>{description}</Text>
                  </View>
                </View>
              </View>
              <View style={style.column}>
                <View style={style.containerCard}>
                  {deworming.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditDeworming', {
                          idMascot,
                          edit: true,
                          desparacitacions: deworming,
                        })
                      }>
                      <View style={{marginTop: 15}}>
                        <Image
                          source={require('./../assets/images/edit_btn.png')}
                        />
                      </View>
                    </TouchableHighlight>
                  )}

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/PARASITEICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Desparacitación:</Text>
                  </View>
                  {deworming.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Última desparacitación:
                        </Text>
                        <Text style={style.parrTxt}>
                          {deworming[0].last_deworming}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Medicamento:</Text>
                        <Text style={style.parrTxt}>
                          {deworming[0].medicament}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Anotaciones o reacciones:
                        </Text>
                        <Text style={style.parrTxt}>{deworming[0].note}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <Text style={style.txtNotfound}>No hay resultados.</Text>
                    </View>
                  )}
                </View>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      navigation.navigate('HistoryDeworming', {idMascot})
                    }>
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
                  {vaccination.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditVaccinations', {
                          idMascot,
                          edit: true,
                          vacunacions: vaccination,
                        })
                      }>
                      <View style={{marginTop: 15}}>
                        <Image
                          source={require('./../assets/images/edit_btn.png')}
                        />
                      </View>
                    </TouchableHighlight>
                  )}

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/VACCINEICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Vacunación:</Text>
                  </View>
                  {vaccination.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Última Vacunación:</Text>
                        <Text style={style.parrTxt}>
                          {vaccination[0].last_vaccination}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Medicamentos:</Text>
                        <Text style={style.parrTxt}>
                          {vaccination[0].medicament}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Anotaciones o reacciones:
                        </Text>
                        <Text style={style.parrTxt}>{vaccination[0].note}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <Text style={style.txtNotfound}>No hay resultados.</Text>
                    </View>
                  )}
                </View>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  {}
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      navigation.navigate('HistoryVaccinations', {idMascot})
                    }>
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
                  {medicaments.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditMedicament', {
                          idMascot,
                          edit: true,
                          medicaments,
                        })
                      }>
                      <View style={{marginTop: 15}}>
                        <Image
                          source={require('./../assets/images/edit_btn.png')}
                        />
                      </View>
                    </TouchableHighlight>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/MEDICAMENT.png')}
                      style={{width: 25, height: 25, marginHorizontal: 6}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Medicación:</Text>
                  </View>
                  {medicaments.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Última Dosis:</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].last_dose}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Medicamento:</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].medicament}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Posología:</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].posologia}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Dosis:</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].dosis} gr/ml
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Periodo:</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].period} hrs
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Anotaciones</Text>
                        <Text style={style.parrTxt}>
                          {medicaments[0].notation}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <Text style={style.txtNotfound}>No hay resultados.</Text>
                    </View>
                  )}
                </View>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      navigation.navigate('HistoryMedicament', {idMascot})
                    }>
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
                  {controllerMedics.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditControlMedic', {
                          idMascot,
                          edit: true,
                          controllerMedics,
                        })
                      }>
                      <View style={{marginTop: 15}}>
                        <Image
                          source={require('./../assets/images/edit_btn.png')}
                        />
                      </View>
                    </TouchableHighlight>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/tabs/DOCTORICON.png')}
                      style={{width: 28, height: 28, marginHorizontal: 5}}
                      resizeMode="contain"
                    />
                    <Text style={style.subtitleTxt}>Control Médico:</Text>
                  </View>
                  {controllerMedics.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Último control:</Text>
                        <Text style={style.parrTxt}>
                          {controllerMedics[0].last_control}
                        </Text>
                      </View>
                      <Text style={style.subTxt}>Valoración:</Text>
                      <Text style={style.parrTxt}>
                        {controllerMedics[0].assesment}
                      </Text>
                      <Text style={style.subTxt}>
                        Prescripción y anotaciones:
                      </Text>
                      <Text style={style.parrTxt}>
                        {controllerMedics[0].note}
                      </Text>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      <Text style={style.txtNotfound}>No hay resultados.</Text>
                    </View>
                  )}
                </View>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      navigation.navigate('HistoryMedic', {idMascot})
                    }>
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
  txtNotfound: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default DetailsMascotOffline;
