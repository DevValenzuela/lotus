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
      showsButtons={true}
      dotColor="#ffffff"
      activeDotColor="#451D6E"
      nextButton={<Text style={styles.buttonSlide}>›</Text>}
      prevButton={<Text style={styles.buttonSlide}>‹</Text>}>
      {offers.map(item => {
        const {ofert} = item;
        return (
          <View>
            <Image
              style={styles.banner}
              source={{uri: `${API_URL}${ofert[0].url}`}}
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
  buttonSlide: {
    fontSize: 50,
    color: '#451D6E',
    fontWeight: '600',
  },
  banner: {
    width: wp('100%'),
    height: hp('26%'),
  },
});
export default Carousel;
