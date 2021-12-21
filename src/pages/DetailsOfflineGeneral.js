import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  View,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {database} from '../conexion/crudSqlite';

const DetailsOfflineGeneral = ({route}) => {
  const navigation = useNavigation();
  const {type, idDetails} = route.params;
  const [getDeworming, setDeworming] = useState([]);
  const [getMedicament, setMedicament] = useState([]);
  const [getVaccination, setVaccination] = useState([]);
  const [getControllerMedic, setControllerMedic] = useState([]);

  useEffect(() => {
    try {
      database.consultDesparacitacionDetails(idDetails, setDeworming);
      database.consultMedicamentDetails(idDetails, setMedicament);
      database.consultVaccinationDetails(idDetails, setVaccination);
      database.consultControllerMedicDetails(idDetails, setControllerMedic);
    } catch (error) {
      console.log(error);
    }
  }, [idDetails]);

  const medicaments = getMedicament;
  const desparacitacions = getDeworming;
  const vacunacions = getVaccination;
  const controllerMedics = getControllerMedic;

  console.log(vacunacions);

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        {type === 'desparacitacion' && (
          <View style={style.column}>
            <View style={style.containerCard}>
              {desparacitacions.length > 0 && (
                <TouchableHighlight
                  style={style.edit}
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('EditDeworming', {
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
                <Text style={style.subtitleTxt}>{`${type} :`}</Text>
              </View>
              {desparacitacions.length > 0 ? (
                <View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Última desparacitación:</Text>
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
                    <Text style={style.subTxt}>Anotaciones o reacciones:</Text>
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
                onPress={() => navigation.navigate('HistoryDeworming', {})}>
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
        )}
        {type === 'medicamento' && (
          <View style={style.column}>
            <View style={style.containerCard}>
              {medicaments.length > 0 && (
                <TouchableHighlight
                  style={style.edit}
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('EditMedicament', {
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
                  source={require('../assets/images/detailsicon.png')}
                  style={{width: 25, height: 25, marginHorizontal: 6}}
                  resizeMode="contain"
                />
                <Text style={style.subtitleTxt}>{`${type} :`}</Text>
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
                    <Text style={style.parrTxt}>{medicaments[0].notation}</Text>
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
                onPress={() => navigation.goBack()}>
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
                    Volver
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
        {type === 'vacunacion' && (
          <View style={style.column}>
            <View style={style.containerCard}>
              {vacunacions.length > 0 && (
                <TouchableHighlight
                  style={style.edit}
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('EditVaccinations', {
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
                <Text style={style.subtitleTxt}>{`${type} :`}</Text>
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
                      {vacunacions[0].medicament}
                    </Text>
                  </View>
                  <View style={style.containerGroup}>
                    <Text style={style.subTxt}>Anotaciones o reacciones:</Text>
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
                onPress={() => navigation.goBack()}>
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
                    Volver
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
        {type === 'control medico' && (
          <View style={style.column}>
            <View style={style.containerCard}>
              {controllerMedics.length > 0 && (
                <TouchableHighlight
                  style={style.edit}
                  underlayColor="transparent"
                  onPress={() =>
                    navigation.navigate('EditControlMedic', {
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
                    {controllerMedics[0].assestment}
                  </Text>
                  <Text style={style.subTxt}>Prescripción y anotaciones:</Text>
                  <Text style={style.parrTxt}>{controllerMedics[0].note}</Text>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Image
                    source={require('./../assets/images/not-result.png')}
                    style={{width: 80, height: 80}}
                  />
                  <Text style={style.txtNotfound}>No hay resultados.</Text>
                </View>
              )}
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.goBack()}>
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
                    Volver
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
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
    marginVertical: 16,
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

export default DetailsOfflineGeneral;
