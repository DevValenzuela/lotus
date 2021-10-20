import React, {useState, useContext} from 'react';
import {View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {useMutation} from '@apollo/client';
import {UserContext} from '../context/userContext';
import { useNavigation } from '@react-navigation/native';
import {Loading, ModalAlertAccountUser} from '../components/sharedComponent';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const {
    user: {user},
  } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = async id => {
    navigation.navigate('Gratulations', {
      txtMsg: 'Se ha eliminado esta cuenta.',
      action: 'Login',
      id: id,
      type: 'DELETE'
    });
  };

  return (
    <View>
      <ModalAlertAccountUser
        modalVisible={modalVisible}
        send={() => setModalVisible(false)}
        action={() => handleDeleteAccount(user.id)}
      />
      <TouchableHighlight
        style={{alignItems: 'center', marginVertical: 20}}
        onPress={() => setModalVisible(true)}
        underlayColor="transparent">
        <View style={style.btnDeleteAccount}>
          <Text style={style.btnTxtDelete}>Eliminar Cuenta</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const style = StyleSheet.create({
  btnDeleteAccount: {
    backgroundColor: '#660066',
    borderRadius: 10,
    width: '90%',
    padding: Platform.OS == 'ios' ? 8 : 5,
  },
  btnTxtDelete: {
    padding: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  btnEdit: {
    backgroundColor: '#330066',
    borderRadius: 10,
    marginVertical: 10,
    padding: Platform.OS == 'ios' ? 8 : 5,
  },
  txtBtnEdit: {
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default DeleteAccount;
