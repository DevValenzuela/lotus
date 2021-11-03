import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ADD_MASCOT_APP,
  CREATE_CONTROLLER_MEDIC_APP,
  CREATE_DESPARACITACION_APP,
  CREATE_MEDICAMENT_APP,
  CREATE_VACCINATION_APP,
} from './apolllo/grahpql';
import {useMutation, useQuery} from '@apollo/client';
import InitDB from '../init/initDB';
import {database} from '../conexion/crudSqlite';
import {CONSULT_MASCOT_APP_SQLITE} from './apolllo/query';
import {verifyDB} from '../conexion/crudVerify';

const NewDate = ({navigation}) => {
  //Id Interval Current
  const intervalRef = useRef();

  const {getResultCreate} = InitDB()[0];
  const [getResultMascot, setResultMascot] = useState([]);
  const [getResultDeworming, setResultDeworming] = useState([]);
  const [getResultVaccination, setResultVaccination] = useState([]);
  const [getResultControllerMedic, setResultControllerMedic] = useState([]);
  const [getResultMedicament, setResultMedicament] = useState([]);

  //Consult Mascot ID
  const {fetchMore} = useQuery(CONSULT_MASCOT_APP_SQLITE);

  //Insert Create Online
  const [createMascot] = useMutation(ADD_MASCOT_APP);
  const [createDesparacitacion] = useMutation(CREATE_DESPARACITACION_APP);
  const [createVacunacion] = useMutation(CREATE_VACCINATION_APP);
  const [createControllerMedic] = useMutation(CREATE_CONTROLLER_MEDIC_APP);
  const [createMedicament] = useMutation(CREATE_MEDICAMENT_APP);

  const consultCreateTable = () => {
    getResultCreate.map(async item => {
      switch (item.type) {
        case 'Mascot':
          await database.consultMascotID(item.id_create, setResultMascot);
          if (getResultMascot.length <= 0) return null;
          const new_value = {
            id_mascot: getResultMascot.id_mascot,
            name_mascot: getResultMascot.name_mascot,
            age_mascot: getResultMascot.age_mascot,
            type_mascot: getResultMascot.type_mascot,
            race_mascot: getResultMascot.race_mascot,
            date_sterilized: getResultMascot.date_sterilized,
            number_microchip: getResultMascot.number_microchip,
            description: getResultMascot.description,
            avatar_mascot: null,
            user: getResultMascot.user,
            microchip: getResultMascot.microchip,
            sterilized: 'No',
          };
          try {
            await createMascot({
              variables: new_value,
            });
          } catch (error) {
            console.log(error);
          }
          break;
        case 'deworming':
          await database.consultDesparacitacionID(
            item.id_create,
            setResultDeworming,
          );
          if (getResultDeworming.length <= 0) return null;
          console.log(getResultDeworming);
          let data_mascot_1 = await fetchMore({
            fetchPolicy: 'no-cache',
            pollInterval: 1000,
            variables: {
              id: getResultDeworming.mascot,
            },
          });
          if (data_mascot_1) {
            const {id} = data_mascot_1.data.mascots[0];
            const new_value_deworming = {
              id_deworming: getResultDeworming.id_deworming,
              last_deworming: getResultDeworming.last_deworming,
              medicament: getResultDeworming.medicament,
              note: getResultDeworming.note,
              mascot: id,
              user: getResultDeworming.user,
            };
            try {
              await createDesparacitacion({
                variables: new_value_deworming,
              });
            } catch (error) {
              console.log('Error Insert db deworming');
            }
          }
          break;
        case 'vaccination':
          await database.consultVaccinationID(
            item.id_create,
            setResultVaccination,
          );
          if (getResultVaccination <= 0) return null;
          let data_mascot_2 = await fetchMore({
            fetchPolicy: 'no-cache',
            pollInterval: 1000,
            variables: {
              id: getResultVaccination.mascot,
            },
          });

          if (data_mascot_2) {
            const {id} = data_mascot_2.data.mascots[0];
            const new_value_vaccination = {
              id_vaccination: getResultVaccination.id_vaccination,
              last_vaccination: getResultVaccination.last_vaccination,
              medicament: getResultVaccination.medicament,
              note: getResultVaccination.note,
              mascot: id,
              user: getResultVaccination.user,
            };
            try {
              await createVacunacion({
                variables: new_value_vaccination,
              });
            } catch (error) {
              console.log('Error Insert db vaccination');
            }
          }
          break;
        case 'controller_medic':
          await database.consultControllerMedicID(
            item.id_create,
            setResultControllerMedic,
          );
          if (getResultControllerMedic <= 0) return null;
          let data_mascot_3 = await fetchMore({
            fetchPolicy: 'no-cache',
            pollInterval: 1000,
            variables: {
              id: getResultControllerMedic.mascot,
            },
          });

          if (data_mascot_3) {
            const {id} = data_mascot_3.data.mascots[0];
            const new_value_controller = {
              id_medic: getResultControllerMedic.id_medic,
              last_control: getResultControllerMedic.last_control,
              assesment: getResultControllerMedic.assestment,
              note: getResultControllerMedic.note,
              mascot: id,
              user: getResultControllerMedic.user,
            };

            try {
              await createControllerMedic({
                variables: new_value_controller,
              });
            } catch (error) {
              console.log('Error Insert db control medic');
            }
          }
          break;

        case 'Medicament':
          await database.consultMedicamentID(
            item.id_create,
            setResultMedicament,
          );
          if (getResultMedicament.length < 0) return null;
          let data_mascot_4 = await fetchMore({
            fetchPolicy: 'no-cache',
            pollInterval: 1000,
            variables: {
              id: getResultMedicament.mascot,
            },
          });
          if (data_mascot_4) {
            const {id} = data_mascot_4.data.mascots[0];
            const new_value_medicament = {
              id_medicament: getResultMedicament.id_medicament,
              last_dose: getResultMedicament.last_dose,
              medicament: getResultMedicament.medicament,
              posologia: getResultMedicament.posologia,
              dosis: getResultMedicament.dosis,
              period: getResultMedicament.period,
              notation: getResultMedicament.notation,
              mascot: id,
              user: getResultMedicament.user,
            };

            try {
              await createMedicament({
                variables: new_value_medicament,
              });
            } catch (error) {
              console.log(error);
            }
          }
          break;
        default:
          console.log('Not type exist...');
          break;
      }
    });
    deleteTables();
  };


  const deleteTables = () => {
    verifyDB.DeleteTableCreate();
    navigation.navigate('Login');
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={style.containerLogo}>
            <Image
              style={style.tinyLogo}
              source={require('../assets/images/lotus_logo.png')}
            />
            <Text style={{color: '#00FFFF', fontSize: 18}}>pet-care app</Text>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 40,
            }}>
            Hay nuevos datos por actualizar.
          </Text>
          <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center'}}>
            Deseas realizar esta acción.
          </Text>
          <Text
            style={{
              color: '#00FFFF',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 20,
            }}>
            Recuerda tener conección a internet.
          </Text>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => consultCreateTable()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: '#80006A',
                  width: wp('70%'),
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    padding: Platform.OS == 'ios' ? 20 : 10,
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}>
                  Ok, ¡Deacuerdo!
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => deleteTables()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: '#80006A',
                  width: wp('70%'),
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    padding: Platform.OS == 'ios' ? 20 : 10,
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}>
                  No, Deseo Actualizar
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
  banner: {
    width: wp('100%'),
    height: hp('26%'),
    maxWidth: 560,
  },
  imageGoogle: {
    width: '100%',
    height: 90,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 90 : 50,
  },
  tinyLogo: {
    width: 118,
    height: 153,
  },
});
export default NewDate;
