import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const Loading = () => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/images/bg_lotus.png')}
        resizeMode="cover"
        style={style.bgImage}>
        <ActivityIndicator size="large" color="#17E6E6" />
      </ImageBackground>
    </View>
  );
};

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
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,0,102,0.95)',
  },
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
