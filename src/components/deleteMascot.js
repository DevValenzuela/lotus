import React, {useContext, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {
  DELETE_MASCOT_APP,
  DELETE_MEDICAMENT_MEDIC,
  DELETE_DEWORMING_MEDIC,
  DELETE_VACCINATION,
  DELETE_CONTROLLER_MEDIC,
  DELETE_PHOTO_MASCOT,
} from '../pages/apolllo/grahpql';
import {
  CONSULT_CONTROLLER_MEDICS_APP,
  CONSULT_DEWORMING_APP,
  CONSULT_MASCOTS_APP,
  CONSULT_VACCINATIONS_APP,
  CONSULT_MEDICAMENT_APP,
  CONSULT_MASCOT_APP_ID,
} from '../pages/apolllo/query';
import {UserContext} from '../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {Loading2} from '../components/sharedComponent';

import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {ModalAlertDeleteVerify} from '../components/sharedComponent';

const DeleteMascot = ({data}) => {
  const navigation = useNavigation();
  const {
    user: {user},
  } = useContext(UserContext);
  const {
    data: generalMascot,
    loading: loadingGeneralMascot,
    error: errorGeneralMascot,
  } = useQuery(CONSULT_MASCOT_APP_ID, {
    pollInterval: 2000,
    variables: {
      id: data.id,
    },
  });

  const [modalVisible, setModalVisible] = useState(false);

  const variables = {
    pollInterval: 2000,
    variables: {
      user: user.id,
      mascot: data.id,
    },
  };

  /** Consult UseQuery Consult **/
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

  /** Consult UseMutation Delete**/
  const [deleteMedicament, {loading: loading_1}] = useMutation(
    DELETE_MEDICAMENT_MEDIC,
    {
      update(cache, {data: {deleteMedicament}}) {
        const {
          medicament: {id},
        } = deleteMedicament;
        const {medicaments} = cache.readQuery({
          query: CONSULT_MEDICAMENT_APP,
          variables: {
            user: user.id,
            mascot: data.id,
          },
        });
        cache.writeQuery({
          query: CONSULT_MEDICAMENT_APP,
          data: {
            medicaments: medicaments.filter(medicament => medicament.id !== id),
          },
        });
      },
    },
  );

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
            mascot: data.id,
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
            mascot: data.id,
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
            mascot: data.id,
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

  const [deleteUpload, {loading: loadingDelete, data: dataDelete}] =
    useMutation(DELETE_PHOTO_MASCOT);

  /** Remove Mascot General **/
  const [removeMascot, {loading: loading_5}] = useMutation(DELETE_MASCOT_APP, {
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

  /** Action Data Mascot **/
  const deleteMascot = async id => {
    if (!loading1 && !loading2 && !loading3 && !loading4) {
      //**Remove Deworming**/
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
      //**Remove Vaccinations**/
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

      /** Remove Controller Medic **/
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

      /* Remove Medics */
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

    if (generalMascot) {
      try {
        /** Remove Upload Image **/
        await deleteUpload({
          variables: {
            inputId: {
              id: Number(generalMascot.mascot.avatar_mascot.id),
            },
          },
        });
        console.log('!Delete success fully upload!');
        setModalVisible(false);
      } catch (e) {
        console.log(e);
      }
    }

    /** Remove Mascot General **/
    try {
      await removeMascot({
        variables: {
          id: id,
        },
      });
      navigation.navigate('Gratulations', {
        txtMsg: 'Se ha eliminado esta mascota.',
      });
      console.log('¡Delete mascot!');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading_1 || loading_2 || loading_3 || loading_4 || loading_5)
    return <Loading2 />;

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
