import React, {useState, useContext} from 'react';
import {View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {useMutation} from '@apollo/client';
import {UserContext} from '../context/userContext';
import {
  DELETE_PHOTO_MASCOT,
  DELETE_USER_ACCOUNT,
} from '../pages/apolllo/grahpql';

import {Loading, ModalAlertAccountUser} from '../components/sharedComponent';

const DeleteAccount = () => {
  const {
    user: {user},
  } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteUser, {loading: loadingUser, data: dataUser, error: errorUser}] =
    useMutation(DELETE_USER_ACCOUNT);

  const [
    deleteFile,
    {loading: loadingAvatar, data: dataAvatar, error: errorAvatar},
  ] = useMutation(DELETE_PHOTO_MASCOT);

  const handleDeleteAccount = async id => {
    try {
      await deleteUser({
        variables: {
          id,
        },
      });
      if (dataUser && !loadingUser) {
        console.log(dataUser);
        try {
          await AsyncStorage.removeItem('token_lotus');
          navigation.navigate('Gratulations', {
            txtMsg: 'Se ha eliminado esta cuenta.',
          });
        } catch (exception) {
          return false;
        }
      }
    } catch (e) {
      console.log(e);
    }
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
