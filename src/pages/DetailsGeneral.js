import React, {useContext, useState} from 'react';
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

import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {
  CONSULT_DEWORMING_DETAILS_APP,
  CONSULT_MEDICAMENT_DETAILS_APP,
  CONSULT_VACCINATIONS_DETAILS_APP,
  CONSULT_CONTROLLER_MEDICS_DETAILS_APP,
} from './apolllo/query';
import {DELETE_NOTIFY_APP} from './apolllo/grahpql';
import {UserContext} from '../context/userContext';
import {Loading, ModalAlertDeleteNotify} from '../components/sharedComponent';
import {database3} from '../conexion/crudNotify';

const DetailsGeneral = ({route}) => {
  const {
    user: {user},
  } = useContext(UserContext);

  const navigation = useNavigation();
  const {idMascot, id_mascot, type, idDetails, id_notify} = route.params;
  const [getModal, setModal] = useState(false);
  /** Delete medicament **/
  const [deleteNotify, {loading: loadingNotify}] =
    useMutation(DELETE_NOTIFY_APP);

  const actionModalCancel = () => setModal(!getModal);
  const actionModalYes = async () => {
    try {
      await deleteNotify({
        variables: {
          id: idMascot,
        },
      });

      database3.DeleteNotify(id_notify);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
    }

    setModal(!getModal);
  };

  const deleteItem = async () => {
    setModal(true);
  };

  const buttomGroup = result => {
    return (
      <SafeAreaView>
        <ModalAlertDeleteNotify
          modalVisible={getModal}
          send={() => actionModalCancel()}
          action={() => actionModalYes()}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.goBack()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: '#80006A',
                  margin: 2,
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
          <View style={{flex: 1}}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => deleteItem(result)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  backgroundColor: '#920716',
                  margin: 2,
                }}>
                <Text
                  style={{
                    padding: Platform.OS == 'ios' ? 20 : 10,
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}>
                  Eliminar
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const {
    data: medicament,
    error: errorMedicaments,
    loading: loadingMedicaments,
  } = useQuery(CONSULT_MEDICAMENT_DETAILS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      id_details: idDetails,
    },
  });

  const {
    data: deworming,
    error: errorDeworming,
    loading: loadingDeworming,
  } = useQuery(CONSULT_DEWORMING_DETAILS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      id_details: idDetails,
    },
  });

  const {
    data: vaccination,
    error: errorVaccination,
    loading: loadingVaccination,
  } = useQuery(CONSULT_VACCINATIONS_DETAILS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      id_details: idDetails,
    },
  });

  const {
    data: medic_controller,
    error: errorMedicController,
    loading: loadingMedicController,
  } = useQuery(CONSULT_CONTROLLER_MEDICS_DETAILS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      id_details: idDetails,
    },
  });

  if (
    loadingMedicaments ||
    loadingDeworming ||
    loadingVaccination ||
    loadingMedicController
  )
    return <Loading />;
  if (
    errorMedicaments ||
    errorDeworming ||
    errorVaccination ||
    errorMedicController
  )
    console.log('Error in data base apollo.');

  const {medicaments} = type === 'medicamento' ? medicament : [];
  const {desparacitacions} = type === 'desparacitacion' ? deworming : [];
  const {vacunacions} = type === 'vacunacion' ? vaccination : [];
  const {controllerMedics} = type === 'control medico' ? medic_controller : [];

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
                      idMascot,
                      id_mascot,
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
            {buttomGroup(desparacitacions)}
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
                      idMascot,
                      id_mascot,
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
            {buttomGroup(medicaments)}
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
                      idMascot,
                      id_mascot,
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
                      {vacunacions[0].medicaments}
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
            {buttomGroup(vacunacions)}
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
                      idMascot,
                      id_mascot,
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
                  <Text style={style.subTxt}>Prescripción y anotaciones:</Text>
                  <Text style={style.parrTxt}>{controllerMedics[0].note}</Text>
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Text style={style.txtNotfound}>No hay resultados.</Text>
                </View>
              )}
            </View>
            {buttomGroup(controllerMedics)}
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
    backgroundColor: 'rgba(86,42,140,0.51)',
    marginVertical: 5,
    marginHorizontal: 10,
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

export default DetailsGeneral;
