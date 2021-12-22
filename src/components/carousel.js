import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {API_URL} from '@env';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Carousel = ({offers}) => {
  if (!offers) return null;

  let images = new Array();

  offers?.forEach(({ofert}) => {
    ofert.forEach((item, key) => {
      images.push(item.url);
    });
  });

  return (
    <Swiper dotColor="#ffffff" activeDotColor="#451D6E">
      {images?.map((item, key) => (
        <View key={key} style={styles.slide}>
          <Image
            style={styles.banner}
            source={{uri: `${API_URL}${item}`}}
            resizeMode="stretch"
          />
        </View>
      ))}
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
    maxWidth: 500,
  },
});
export default Carousel;
