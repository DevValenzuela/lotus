import React, {useContext, useEffect} from 'react';
import {API_URL} from '@env';
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
import {Loading} from '../components/sharedComponent';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useQuery} from '@apollo/client';
import {
  CONSULT_DEWORMING_APP,
  CONSULT_MASCOT_APP_ID,
  CONSULT_VACCINATIONS_APP,
  CONSULT_CONTROLLER_MEDICS_APP,
  CONSULT_MEDICAMENT_APP,
} from './apolllo/query';
import {UserContext} from '../context/userContext';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DetailsMascot = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const idMascot = route.params.mascotId;
  console.log(id_mascot);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const {
    data: general,
    loading: loadingGeneral,
    error: errorGeneral,
  } = useQuery(CONSULT_MASCOT_APP_ID, {
    pollInterval: 2000,
    variables: {
      id: idMascot,
    },
  });

  const {
    data: deworming,
    loading: loadingDeworming,
    error: errorDeworming,
  } = useQuery(CONSULT_DEWORMING_APP, {
    pollInterval: 2000,
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  const {
    data: vaccinations,
    loading: loadingVaccinations,
    error: errorVaccinations,
  } = useQuery(CONSULT_VACCINATIONS_APP, {
    pollInterval: 2000,
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  const {
    data: medicament,
    loading: loadingMedicament,
    error: errorMedicament,
  } = useQuery(CONSULT_MEDICAMENT_APP, {
    pollInterval: 2000,
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  const {
    data: medics,
    loading: loadingMedics,
    error: errorMedics,
  } = useQuery(CONSULT_CONTROLLER_MEDICS_APP, {
    pollInterval: 2000,
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  if (
    loadingGeneral ||
    loadingDeworming ||
    loadingVaccinations ||
    loadingMedics ||
    loadingMedicament
  )
    return <Loading />;

  if (!general || !deworming || !vaccinations || !medics || !medicament)
    return null;

  const {
    id_mascot,
    name_mascot,
    age_mascot,
    race_mascot,
    date_sterilized,
    type_mascot,
    avatar_mascot,
    microchip,
    description,
    number_microchip,
  } = general?.mascot;

  const {desparacitacions} = deworming;
  const {vacunacions} = vaccinations;
  const {controllerMedics} = medics;
  const {medicaments} = medicament;

  const url_image = avatar_mascot != null ? avatar_mascot.url : '';

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
                        data: general.mascot,
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
                    <Text style={style.subTxt}>Microchip:</Text>
                    <Text style={style.parrTxt}>{microchip}</Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>No Microship:</Text>
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
                  {desparacitacions.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditDeworming', {
                          idMascot,
                          edit: true,
                          desparacitacions,
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
                  {desparacitacions.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Última desparacitación:
                        </Text>
                        <Text style={style.parrTxt}>
                          {desparacitacions[0].last_deworming}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Medicamento:</Text>
                        <Text style={style.parrTxt}>
                          {desparacitacions[0].medicament}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Anotaciones o reacciones:
                        </Text>
                        <Text style={style.parrTxt}>
                          {desparacitacions[0].note}
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
                      navigation.navigate('HistoryDeworming', {
                        idMascot,
                        id_mascot,
                      })
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
                  {vacunacions.length > 0 && (
                    <TouchableHighlight
                      style={style.edit}
                      underlayColor="transparent"
                      onPress={() =>
                        navigation.navigate('EditVaccinations', {
                          idMascot,
                          edit: true,
                          vacunacions,
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
                  {vacunacions.length > 0 ? (
                    <View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Última Vacunación:</Text>
                        <Text style={style.parrTxt}>
                          {vacunacions[0].last_vaccination}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>Medicamentos:</Text>
                        <Text style={style.parrTxt}>
                          {vacunacions[0].medicaments}
                        </Text>
                      </View>
                      <View style={style.containerGroup}>
                        <Text style={style.subTxt}>
                          Anotaciones o reacciones:
                        </Text>
                        <Text style={style.parrTxt}>{vacunacions[0].note}</Text>
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
                      navigation.navigate('HistoryVaccinations', {
                        idMascot,
                        id_mascot,
                      })
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
                      navigation.navigate('HistoryMedicament', {
                        idMascot,
                        id_mascot,
                      })
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
                      navigation.navigate('HistoryMedic', {
                        idMascot,
                        id_mascot,
                      })
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
export default DetailsMascot;
