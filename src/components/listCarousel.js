import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  SafeAreaView,
  SectionList,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ListItem = ({item}) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

const ListCarousel = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <Animated.View style={{opacity: fadeAnim}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({section}) => (
            <>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DetailsMascot')}>
                      <ListItem item={item} parentNavigate={navigation} />
                    </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({item, section}) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const SECTIONS = [
  {
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://cdn.mos.cms.futurecdn.net/ZvueiLL2vdwoHWHjCRuQCW-1200-80.jpg',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://estaticos.muyinteresante.es/media/cache/1000x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-naranja-dormido.jpg',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://estaticos.muyinteresante.es/media/cache/1000x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-caja_0.jpg',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-marron_0.jpg',
      },
    ],
  },
];

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 5,
  },
  itemPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemText: {
    color: '#00FFFF',
    backgroundColor: 'rgba(51,0,102,0.69)',
    bottom: 30,
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 4,
    textAlign: 'right',
    position: 'relative',
  },
});

export default ListCarousel;
