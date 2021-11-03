import React, {useEffect, useState} from 'react';
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
import {ADD_MASCOT_APP, CREATE_DESPARACITACION_APP} from './apolllo/grahpql';
import {useMutation, useQuery} from '@apollo/client';
import InitDB from '../init/initDB';
import {database} from '../conexion/crudSqlite';
import {CONSULT_MASCOT_APP_SQLITE} from './apolllo/query';
import {verifyDB} from '../conexion/crudVerify';

const NewDate = ({ navigation }) => {
  const {getResultCreate, getResultDelete, getResultUpdate} = InitDB()[0];
  const [getResultMascot, setResultMascot] = useState([]);
  const [getResultDeworming, setResultDeworming] = useState([]);
  const [getResultVaccination, setResultVaccination] = useState([]);
  const [idSearch, setSearch] = useState(null);
  const {
    loading: loading_mascot,
    error: error_mascot,
    data: data_mascot,
  } = useQuery(CONSULT_MASCOT_APP_SQLITE, {
    variables: {
      id: idSearch,
    },
  });

  //Insert Create Online
  const [createMascot] = useMutation(ADD_MASCOT_APP);
  const [createDesparacitacion] = useMutation(CREATE_DESPARACITACION_APP);

  const consultTable = () => {
    getResultCreate.map(async item => {
      switch (item.type) {
        case 'Mascot':
          database.consultMascotID(item.id_create, setResultMascot);
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
          /* try {
            await createMascot({
              variables: new_value,
            });
          } catch (error) {
            console.log(error);
          }*/
          break;
        case 'deworming':
          database.consultDesparacitacionID(item.id_create, setResultDeworming);
          setSearch(getResultMascot.id_mascot);
          if (loading_mascot) return null;
          if (data_mascot) {
            const {id} = data_mascot.mascots[0];
            const new_value_deworming = {
              id_deworming: getResultDeworming.id_deworming,
              last_deworming: getResultDeworming.last_deworming,
              medicament: getResultDeworming.medicament,
              note: getResultDeworming.note,
              mascot: id,
              user: getResultMascot.user,
            };
            /*try {
              await createDesparacitacion({
                variables: new_value_deworming,
              });
            } catch (error) {
              console.log(error);
            }*/
          }
          break;
        case 'vaccination':
          database.consultVaccinationID(item.id_create, setResultVaccination);
          //console.log(getResultVaccination);
          break;
        default:
          break;
      }
    });
    verifyDB.DeleteTableCreate();
    navigation.navigate('Dashboard');
  };

  const updateData = () => {
    consultTable();
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
              onPress={() => updateData()}>
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
