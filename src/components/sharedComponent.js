import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  Animated,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const BtnAction = ({navigation, title, url, action}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate(action)}>
        <View
          style={[
            {
              paddingHorizontal: url ? 10 : 40,
              paddingVertical: url ? 10 : 20,
            },
            style.btnActions,
          ]}>
          <Image
            source={url}
            style={{width: 32, height: 32, marginBottom: 5}}
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
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  btnActions: {
    opacity: 0.8,
    backgroundColor: '#562A8C',
    borderRadius: 10,
    width: wp('33%'),
    marginVertical: 4,
    marginHorizontal: 2,
    paddingVertical: 20,
    alignItems: 'center',
  },
});
