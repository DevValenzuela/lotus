import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {API_URL} from '@env';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Carousel = ({offers}) => {
  return (
    <Swiper
      dotColor="#ffffff"
      activeDotColor="#451D6E">
      {offers?.map(({ofert}, key) => {
        return (
          <View key={key} style={styles.slide}>
            <Image
              style={styles.banner}
              source={{uri: `${API_URL}${ofert[0]?.url}`}}
              resizeMode="stretch"
            />
          </View>
        );
      })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  banner: {
    width: wp('100%'),
    height: hp('26%'),
  },
});
export default Carousel;
