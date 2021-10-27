import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  SafeAreaView,
} from 'react-native';
import {Loading2, ModalAlertDeleteVerify} from '../components/sharedComponent';
import {database} from '../conexion/crudSqlite';
import {database2} from '../conexion/crudSqlite2';
const DeleteMascot = ({data}) => {
  const navigation = useNavigation();
  const {
    user: {user},
  } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [successDelete, getDelete] = useState(false);
  const [deworming, setDeworming] = useState([]);
  const [vaccination, setVaccination] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [controllerMedic, setControllerMedic] = useState([]);


  useEffect(() => {
    if(successDelete) {
      Promise.all([
        deleteDeworming(deworming),
        deleteVaccination(vaccination),
        deleteMedicament(medicaments),
        deleteControllerMedic(controllerMedic),
      ]).then(() => {
        navigation.navigate('Gratulations', {
          txtMsg: 'Se ha eliminado correctamente esta mascota.',
        });
      });
    }
  }, [successDelete, deworming, vaccination, medicaments, controllerMedic]);

  const deleteDeworming = deworming => {
    //DELETE DEWORMING
    if (deworming) {
      deworming.forEach(item => {
        let data = {
          idTable: item.ID,
          idMascot: item.mascot,
        };
        database2.DeleteDewormingOffline(data);
      });
    }
  };

  const deleteVaccination = vaccination => {
    //DELETE VACCINATION
    if (vaccination) {
      vaccination.forEach(item => {
        let data = {
          idTable: item.ID,
          idMascot: item.mascot,
        };
        database2.DeleteVaccinationOffline(data);
      });
    }
  };

  const deleteMedicament = medicament => {
    //DELETE MEDICAMENT
    if (medicament) {
      medicaments.forEach(item => {
        let data = {
          idTable: item.ID,
          idMascot: item.mascot,
        };
        database2.DeleteMedicamentOffline(data);
      });
    }
  };

  const deleteControllerMedic = controllerMedic => {
    //DELETE CONTROLLER MEDIC
    if (controllerMedic) {
      controllerMedic.forEach(item => {
        let data = {
          idTable: item.ID,
          idMascot: item.mascot,
        };
        database2.DeleteControllerMedicOffline(data);
      });
    }
  };

  const deleteMascotOffline = async idMascot => {
    await database.consultDesparacitacion(idMascot, setDeworming);
    await database.consultControllerMedic(idMascot, setControllerMedic);
    await database.consultVaccination(idMascot, setVaccination);
    await database.consultMedicamnets(idMascot, setMedicaments);
    //DELETE GENERAL MASCOT
    database2.DeleteMascotGeneralOffline(idMascot);
    getDelete(true);
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <ModalAlertDeleteVerify
        modalVisible={modalVisible}
        send={() => setModalVisible(false)}
        action={() => deleteMascotOffline(data.id)}
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
