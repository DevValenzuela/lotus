import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Carousel = ({urlImage}) => {
  return (
    <Swiper
      showsButtons={true}
      dotColor="#ffffff"
      activeDotColor="#451D6E"
      nextButton={<Text style={styles.buttonSlide}>›</Text>}
      prevButton={<Text style={styles.buttonSlide}>‹</Text>}
    >
      <View style={styles.slide1}>
        <Image
          style={styles.banner}
          source={{uri: urlImage}}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.slide1}>
        <Image
          style={styles.banner}
          source={{uri: urlImage}}
          resizeMode="stretch"
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  buttonSlide: {
    fontSize: 50,
    color: '#451D6E',
    fontWeight: '600'
  },
  banner: {
    width: wp('100%'),
    height: hp('26%'),
  },
});
export default Carousel;
