import React from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
const Tabs = ({navigation}) => {
  return (
    <SafeAreaView style={style.containerTab}>
      <View
        style={{

          position: 'relative',
          width: 100,
          backgroundColor: '#00FFFF',
          borderRadius: 20,
          top: 25,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 10,
          zIndex: 999,
        }}>
        <Text style={{ textAlign: 'center',
          color: '#330066'}}>Historial</Text>
      </View>
      <View style={style.containerChildren}>
        <View style={style.containerBtn}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('HistoryDeworming')}>
            <View style={style.content}>
              <Image
                style={style.imageTab}
                source={require('./../assets/images/tabs/PARASITEICON.png')}
                resizeMode="contain"
              />
              <Text style={style.titleTab}>Desparacitación</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.containerBtn}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('HistoryVaccinations')}>
            <View style={style.content}>
              <Image
                style={style.imageTab}
                source={require('./../assets/images/tabs/VACCINEICON.png')}
                resizeMode="contain"
              />
              <Text style={style.titleTab}>Vacunación</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.containerBtn}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('HistoryMedic')}>
            <View style={style.content}>
              <Image
                style={style.imageTab}
                source={require('./../assets/images/tabs/DOCTORICON.png')}
                resizeMode="contain"
              />
              <Text style={style.titleTab}>Control Medico</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  containerTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChildren: {
    flexDirection: 'row',
    backgroundColor: '#1a0334',
    paddingTop: 25,
  },
  containerBtn: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  titleTab: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTab: {
    width: 30,
    height: 30,
    marginBottom:10,
  },
});
export default Tabs;
