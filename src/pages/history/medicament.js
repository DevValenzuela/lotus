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
import {useQuery} from '@apollo/client';
import {UserContext} from '../../context/userContext';
import {
  Loading,
  ModalAlertDeleteVerify,
} from '../../components/sharedComponent';
import {CONSULT_HYSTORY_MEDICAMENTS_APP} from '../../pages/apolllo/query';
import {useIsConnected} from 'react-native-offline';
import {useNavigation} from '@react-navigation/native';
import {database2} from '../../conexion/crudSqlite2';

const Item = ({date}) => {
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const [getModal, setModal] = useState(false);

  const actionHideModal = () => {
    setModal(false);
  };

  const actionModalYes = () => {
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
        <View style={{flex: 2, alignSelf: 'center', flexDirection: 'row'}}>
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
          <TouchableHighlight
            style={{alignItems: 'center', marginVertical: 20}}
            onPress={() => {
              isConnected
                ? navigation.navigate('DetailsGeneral', {
                    id_mascot: date[1],
                    idMascot: date[2],
                    idDetails: date[3],
                    type: 'medicamento',
                  })
                : navigation.navigate('DetailsOfflineGeneral', {
                    idDetails: date[1],
                    type: 'medicamento',
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

const MedicamentHistory = ({route}) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const navigation = useNavigation();
  const {idMascot, id_mascot} = route.params;
  const isConnected = useIsConnected();
  const [results, setResult] = useState([]);
  const {data, error, loading} = useQuery(CONSULT_HYSTORY_MEDICAMENTS_APP, {
    pollInterval: 2000,
    variables: {
      user: user.id,
      mascot: idMascot,
    },
  });

  useEffect(() => {
    if (data && isConnected) {
      const DATA = [];
      data.medicaments.map(item => {
        DATA.push(item);
      });
      setResult(DATA);
    } else {
      database2.ConsultMedicamentHistory(idMascot, setResult);
    }
  }, [data, idMascot, isConnected]);

  if (loading) return <Loading />;
  if (error) console.log(error);

  const renderItem = ({item}) => {
    return (
      <Item
        date={
          isConnected
            ? [item.last_dose, id_mascot, idMascot, item.id_medicament]
            : [item.last_dose, item.id_medicament]
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
            navigation.navigate('EditMedicament', {
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

export default MedicamentHistory;
