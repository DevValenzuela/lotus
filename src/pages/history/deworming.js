import React, {useState, useContext, useEffect} from 'react';
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
  CONSULT_DEWORMING_APP,
  CONSULT_HISTORY_DEWORMING_APP,
} from '../../pages/apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {database2} from '../../conexion/crudSqlite2';
import {useNavigation} from '@react-navigation/native';
import {DELETE_DEWORMING_MEDIC} from '../apolllo/grahpql';
import {verifyDB} from '../../conexion/crudVerify';

const Item = ({date}) => {
  const {
    user: {user},
  } = useContext(UserContext);

  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const [getModal, setModal] = useState(false);

  const [deleteDesparacitacion, {loading: loading_2}] = useMutation(
    DELETE_DEWORMING_MEDIC,
    {
      update(cache, {data: {deleteDesparacitacion}}) {
        const {
          desparacitacion: {id},
        } = deleteDesparacitacion;
        const {desparacitacions} = cache.readQuery({
          query: CONSULT_DEWORMING_APP,
          variables: {
            user: user.id,
            mascot: date[2],
          },
        });
        cache.writeQuery({
          query: CONSULT_DEWORMING_APP,
          data: {
            desparacitacions: desparacitacions.filter(
              desparacitacion => desparacitacion.id !== id,
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
    if (isConnected) {
      try {
        await deleteDesparacitacion({
          variables: {
            id: date[4],
          },
        });
      } catch (error) {
        console.log(error);
      }
      database2.DeleteDewormingOffline(date[3]);
    } else {
      database2.DeleteDewormingOffline(date[1]);
      verifyDB.InsertDeteleteVerify(date[1], 'deworming');
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
                    type: 'desparacitacion',
                  })
                : navigation.navigate('DetailsOfflineGeneral', {
                    idDetails: date[1],
                    type: 'desparacitacion',
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

const DewormingHistory = ({navigation, route}) => {
  const {
    user: {user},
  } = useContext(UserContext);

  const {idMascot, id_mascot} = route.params;
  const [result, setResult] = useState([]);
  const isConnected = useIsConnected();

  const {data, error, loading} = useQuery(CONSULT_HISTORY_DEWORMING_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      mascot: idMascot,
    },
  });

  useEffect(() => {
    if (data && isConnected) {
      const DATA = [];
      data.desparacitacions.map(item => {
        DATA.push(item);
      });
      setResult(DATA);
    } else {
      database2.ConsultDewormingHistory(idMascot, setResult);
    }
  }, [data, idMascot, isConnected]);

  if (loading) return <Loading />;
  if (error) console.log(error);

  const renderItem = ({item}) => {
    return (
      <Item
        date={
          isConnected
            ? [
                item.last_deworming,
                id_mascot,
                idMascot,
                item.id_deworming,
                item.id,
              ]
            : [item.last_deworming, item.id_deworming]
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
            navigation.navigate('EditDeworming', {
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
            data={result}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DewormingHistory;
