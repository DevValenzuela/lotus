import React, {useContext, useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import {style} from './style';
import {useMutation, useQuery} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {
  Loading,
  ModalAlertDeleteVerify,
} from '../../components/sharedComponent';
import {
  CONSULT_CONTROLLER_MEDICS_APP,
  CONSULT_HISTORY_DOCTOR_APP,
} from '../../pages/apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';
import {useNavigation} from '@react-navigation/native';
import {DELETE_CONTROLLER_MEDIC} from '../apolllo/grahpql';
import {verifyDB} from '../../conexion/crudVerify';

const Item = ({date}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const [getModal, setModal] = useState(false);

  const [deleteControllerMedic, {loading: loading_4}] = useMutation(
    DELETE_CONTROLLER_MEDIC,
    {
      update(cache, {data: {deleteControllerMedic}}) {
        const {
          controllerMedic: {id},
        } = deleteControllerMedic;
        const {controllerMedics} = cache.readQuery({
          query: CONSULT_CONTROLLER_MEDICS_APP,
          variables: {
            user: user.id,
            mascot: date[2],
          },
        });
        cache.writeQuery({
          query: CONSULT_CONTROLLER_MEDICS_APP,
          data: {
            controllerMedics: controllerMedics.filter(
              controllerMedic => controllerMedic.id !== id,
            ),
          },
        });
      },
    },
  );

  const actionHideModal = () => {
    setModal(false);
  };

  const actionModalYes = async () => {
    //console.log('id mascot: ' + date[2]);
    //console.log('data apollo: ' + date[4]);
    //console.log('data sqlite: ' + date[3]);

    if (isConnected) {
      try {
        await deleteControllerMedic({
          variables: {
            id: date[4],
          },
        });
      } catch (error) {
        console.log(error);
      }
      database2.DeleteControllerMedicOffline(date[3]);
    } else {
      database2.DeleteControllerMedicOffline(date[1]);
      verifyDB.InsertDeteleteVerify(date[1], 'controller_medic');
    }
    setModal(false);
    navigation.navigate('Gratulations', {
      txtMsg: 'Se ha eliminado el item correctamente.',
    });
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
            flex: isConnected ? 2 : 1,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {isConnected && (
            <TouchableHighlight
              style={{alignItems: 'center', marginVertical: 20}}
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
          )}
          <TouchableHighlight
            style={{alignItems: 'center', marginVertical: 20}}
            onPress={() => {
              isConnected
                ? navigation.navigate('DetailsGeneral', {
                    id_mascot: date[1],
                    idMascot: date[2],
                    idDetails: date[3],
                    type: 'control medico',
                  })
                : navigation.navigate('DetailsOfflineGeneral', {
                    idDetails: date[1],
                    type: 'control medico',
                  });
            }}
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

const MedicHistory = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const {idMascot, id_mascot} = route.params;
  const isConnected = useIsConnected();
  const [results, setResult] = useState([]);

  const {data, error, loading} = useQuery(CONSULT_HISTORY_DOCTOR_APP, {
    pollInterval: 2000,
    variables: {
      user: Number(user.id),
      mascot: idMascot,
    },
  });

  useEffect(() => {
    if (data && isConnected) {
      const DATA = [];
      data.controllerMedics.map(item => {
        DATA.push(item);
      });
      setResult(DATA);
    } else {
      database2.ConsultControllerMedic(idMascot, setResult);
    }
  }, [data, idMascot, isConnected]);

  if (loading) return <Loading />;
  if (error) console.log(error);

  const renderItem = ({item}) => (
    <Item
      date={
        isConnected
          ? [item.last_control, id_mascot, idMascot, item.id_medic, item.id]
          : [item.last_control, item.id_medic]
      }
    />
  );

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <TouchableHighlight
          style={{alignItems: 'center', marginVertical: 20}}
          onPress={() =>
            navigation.navigate('EditControlMedic', {
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

export default MedicHistory;
