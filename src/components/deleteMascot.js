import React, {useContext, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {
  DELETE_MASCOT_APP,
  DELETE_MEDICAMENT_MEDIC,
  DELETE_DEWORMING_MEDIC,
  DELETE_VACCINATION,
  DELETE_CONTROLLER_MEDIC,
} from '../pages/apolllo/grahpql';
import {
  CONSULT_CONTROLLER_MEDICS_APP,
  CONSULT_DEWORMING_APP,
  CONSULT_MASCOTS_APP,
  CONSULT_VACCINATIONS_APP,
  CONSULT_MEDICAMENT_APP,
} from '../pages/apolllo/query';
import {UserContext} from '../context/userContext';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {ModalAlertDeleteVerify} from '../components/sharedComponent';

const DeleteMascot = ({data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    user: {user},
  } = useContext(UserContext);

  const variables = {
    pollInterval: 2000,
    variables: {
      user: user.id,
      mascot: data.id,
    },
  };

  const queryMultiple = () => {
    const res1 = useQuery(CONSULT_DEWORMING_APP, variables);
    const res2 = useQuery(CONSULT_VACCINATIONS_APP, variables);
    const res3 = useQuery(CONSULT_CONTROLLER_MEDICS_APP, variables);
    const res4 = useQuery(CONSULT_MEDICAMENT_APP, variables);
    return [res1, res2, res3, res4];
  };

  const [
    {loading: loading1, data: data1},
    {loading: loading2, data: data2},
    {loading: loading3, data: data3},
    {loading: loading4, data: data4},
  ] = queryMultiple();

  const [deleteMedicament] = useMutation(DELETE_MEDICAMENT_MEDIC);

  const [deleteDesparacitacion] = useMutation(DELETE_DEWORMING_MEDIC);

  const [deleteVacunacion] = useMutation(DELETE_VACCINATION);

  const [deleteControllerMedic] = useMutation(DELETE_CONTROLLER_MEDIC);

  const [removeMascot] = useMutation(DELETE_MASCOT_APP, {
    update(cache, {data: {deleteMascot}}) {
      const {
        mascot: {id},
      } = deleteMascot;
      const {mascots} = cache.readQuery({
        query: CONSULT_MASCOTS_APP,
        variables: {
          id: user.id,
        },
      });
      cache.writeQuery({
        query: CONSULT_MASCOTS_APP,
        data: {
          mascots: mascots.filter(mascot => mascot.id !== id),
        },
      });
    },
  });

  const deleteMascot = async id => {
    if (!loading1 && !loading2 && !loading3 && !loading4) {
      data1.desparacitacions.map(async item => {
        try {
          await deleteDesparacitacion({
            variables: {
              id: item.id,
            },
          });
        } catch (error) {
          console.log(error);
        }
      });

      data2.vacunacions.map(async item => {
        try {
          await deleteVacunacion({
            variables: {
              id: item.id,
            },
          });
        } catch (error) {
          console.log(error);
        }
      });

      data3.controllerMedics.map(async item => {
        try {
          await deleteControllerMedic({
            variables: {
              id: item.id,
            },
          });
        } catch (error) {
          console.log(error);
        }
      });

      data4.medicaments.map(async item => {
        try {
          await deleteMedicament({
            variables: {
              id: item.id,
            },
          });
          console.log('Success fully delete items...');
        } catch (error) {
          console.log(error);
        }
      });
    }

    try {
      await removeMascot({
        variables: {
          id: id,
        },
      });
      console.log('¡Delete mascot!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ModalAlertDeleteVerify
        modalVisible={modalVisible}
        send={() => setModalVisible(false)}
        action={() => deleteMascot(data.id)}
      />
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="transparent"
        onPress={() => setModalVisible(true)}>
        <View
          style={{
            padding: 10,
            backgroundColor: 'rgba(51,0,102,0.56)',
            marginVertical: 2,
          }}>
          <Image
            source={require('../assets/images/deleteicon.png')}
            resizeMode="contain"
            style={style.iconActions}
          />
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  iconActions: {
    width: 20,
    height: 20,
  },
});

export default DeleteMascot;
