import React, {useEffect, useRef} from 'react';
import {API_URL} from '@env';
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
import {useQuery} from '@apollo/client';
import {CONSULT_MASCOTS_APP} from './../pages/apolllo/query';
import {Loading2} from './sharedComponent';

const ListItem = ({item}) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: `${API_URL}${item.avatar_mascot.url}`,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.name_mascot}</Text>
    </View>
  );
};

const ListCarousel = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {data, loading, error} = useQuery(CONSULT_MASCOTS_APP, {
    variables: {
      id: 1,
    },
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  if (loading) return <Loading2 />;
  if (error) console.log(error);

  const {mascots} = data;
  const data_mascot = [];
  mascots.map(item => {
    const {
      id,
      name_mascot,
      avatar_mascot: {url},
    } = item;
    data_mascot.push({
      id,
      name_mascot,
      avatar_mascot: {
        url,
      },
    });
  });

  const SECTIONS = [
    {
      horizontal: true,
      data: data_mascot,
    },
  ];

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
                      onPress={() => navigation.navigate('DetailsMascot', { mascotId: item.id })}>
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
