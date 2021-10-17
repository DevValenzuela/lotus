import React, {useContext, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {DELETE_MASCOT_APP} from '../pages/apolllo/grahpql';
import {
  CONSULT_CONTROLLER_MEDICS_APP,
  CONSULT_DEWORMING_APP,
  CONSULT_MASCOTS_APP,
  CONSULT_VACCINATIONS_APP,
  CONSULT_MEDICAMENT_APP,
} from '../pages/apolllo/query';
import {UserContext} from '../context/userContext';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';

const DeleteMascot = ({data}) => {
  const {
    user: {user},
  } = useContext(UserContext);

  const variables = {
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
    if (!loading1 || !loading2 || !loading3 || !loading4) {
      console.log(data4);
    }

    /*await removeMascot({
      variables: {
        id: id,
      },
    });
    console.log('¡Delete mascot!');*/
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="transparent"
      onPress={() => deleteMascot(data.id)}>
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
  );
};

const style = StyleSheet.create({
  iconActions: {
    width: 20,
    height: 20,
  },
});

export default DeleteMascot;
