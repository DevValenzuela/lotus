import React from 'react';
import {StyleSheet, Text, TouchableHighlight, Image, View} from 'react-native';

export const BtnAction = ({navigation, title, url, action}) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => navigation.navigate(action)}>
      <View style={style.btnActions}>
        {url ? (
          <>
            <Image
              source={url}
              style={{width: 24, height: 24, marginBottom: 5}}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                color: '#00FFFF',
                fontSize: 10,
              }}>
              {title}
            </Text>
          </>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#00FFFF',
              fontSize: 12,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  btnActions: {
    opacity: 0.8,
    backgroundColor: '#660066',
    padding: 10,
    borderRadius: 50,
    width: '100%',
    marginVertical: 4,
    alignItems: 'center',
  },
});
