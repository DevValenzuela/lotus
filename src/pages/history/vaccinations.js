import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import {style} from './style';
import {useMutation, useQuery} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {
  Loading,
  ModalAlertDeleteVerify,
} from '../../components/sharedComponent';
import {
  CONSULT_HISTORY_VACCINATIONS_APP,
  CONSULT_VACCINATIONS_APP,
} from '../../pages/apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';
import {useNavigation} from '@react-navigation/native';
import {DELETE_VACCINATION} from '../apolllo/grahpql';
import {verifyDB} from '../../conexion/crudVerify';

const Item = ({date}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const [getModal, setModal] = useState(false);

  const actionHideModal = () => {
    setModal(false);
  };

  const [deleteVacunacion, {loading: loading_3}] = useMutation(
    DELETE_VACCINATION,
    {
      update(cache, {data: {deleteVacunacions}}) {
        const {
          vacunacion: {id},
        } = deleteVacunacions;
        const {vacunacions} = cache.readQuery({
          query: CONSULT_VACCINATIONS_APP,
          variables: {
            user: user.id,
            mascot: date[2],
          },
        });
        cache.writeQuery({
          query: CONSULT_VACCINATIONS_APP,
          data: {
            vacunacions: vacunacions.filter(vacunacion => vacunacion.id !== id),
          },
        });
      },
    },
  );

  const actionModalYes = async () => {
    //console.log('id mascot: ' + date[2]);
    //console.log('data apollo: ' + date[4]);
    //console.log('data sqlite: ' + date[3]);
    if (isConnected) {
      try {
        await deleteVacunacion({
          variables: {
            id: date[4],
          },
        });
      } catch (error) {
        console.log(error);
      }
      database2.DeleteVaccinationOffline(date[3]);
    } else {
      database2.DeleteVaccinationOffline(date[1]);
      verifyDB.InsertDeteleteVerify(date[1], 'vaccination');
    }
    setModal(false);
  };

  return (
    <View>
      <ModalAlertDeleteVerify
        modalVisible={getModal}
        send={actionHideModal}
        action={actionModalYes}
      />
      <View
        style={[
          style.item,
          {
            flexDirection: 'row',
            padding: 0,
          },
        ]}>
        <View style={{flex: 1}}>
          <Image
            source={require('./../../assets/images/tabs/MEDICAMENT.png')}
            resizeMode="contain"
            style={style.image}
          />
        </View>
        <View style={{flex: 3}}>
          <Text style={style.dateTitle}>{date[0]}</Text>
        </View>
        <View
          style={{
            flex: 2,
            alignSelf: 'center',
            flexDirection: 'row',
            padding: 0,
          }}>
          <TouchableHighlight
            style={{alignItems: 'center', marginVertical: 20, padding: 0}}
            onPress={() => setModal(true)}
            underlayColor="transparent">
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 1,
                backgroundColor: 'rgba(51,0,102,0.56)',
                marginHorizontal: 4,
                borderRadius: 4,
              }}>
              <Image
                source={require('../../assets/images/deleteicon.png')}
                resizeMode="contain"
                style={style.iconActions}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{alignItems: 'center', marginVertical: 20}}
            onPress={() =>
              isConnected
                ? navigation.navigate('DetailsGeneral', {
                    id_mascot: date[1],
                    idMascot: date[2],
                    idDetails: date[3],
                    type: 'vacunacion',
                  })
                : navigation.navigate('DetailsOfflineGeneral', {
                    idDetails: date[1],
                    type: 'vacunacion',
                  })
            }
            underlayColor="transparent">
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 1,
                backgroundColor: 'rgba(51,0,102,0.56)',
                marginHorizontal: 4,
                borderRadius: 4,
              }}>
              <Image
                source={require('../../assets/images/detailsicon.png')}
                resizeMode="contain"
                style={style.iconActions}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const VaccinationsHistory = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const {idMascot, id_mascot} = route.params;
  const isConnected = useIsConnected();
  const [results, setResult] = useState([]);
  const {data, error, loading} = useQuery(CONSULT_HISTORY_VACCINATIONS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      mascot: idMascot,
    },
  });

  useEffect(() => {
    if (data && isConnected) {
      const DATA = [];
      data.vacunacions.map(item => {
        DATA.push(item);
      });
      setResult(DATA);
    } else {
      database2.ConsultVaccinationHistory(idMascot, setResult);
    }
  }, [data, idMascot, isConnected]);

  if (loading) return <Loading />;
  if (error) console.log(error);
  console.log(results);
  const renderItem = ({item}) => {
    return (
      <Item
        date={
          isConnected
            ? [
                item.last_vaccination,
                id_mascot,
                idMascot,
                item.id_vaccination,
                item.id,
              ]
            : [item.last_vaccination, item.id_vaccination]
        }
      />
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <TouchableHighlight
          style={{alignItems: 'center', marginVertical: 20}}
          onPress={() =>
            navigation.navigate('EditVaccinations', {
              idMascot,
              id_mascot,
              edit: false,
            })
          }
          underlayColor="transparent">
          <View style={style.btnAdd}>
            <Text style={style.btnTxtAdd}>Nueva Entrada</Text>
          </View>
        </TouchableHighlight>
        <View style={{flex: 1}}>
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VaccinationsHistory;
