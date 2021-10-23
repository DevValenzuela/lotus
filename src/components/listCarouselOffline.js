import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {Loading2} from './sharedComponent';
import {UserContext} from '../context/userContext';

const ListOffItem = ({item}) => {
    const img_mascot = item.avatar_mascot ? item.avatar_mascot.url : '';
    return (
        <View style={styles.item}>
            {img_mascot ? (
                <Image
                    source={{
                        uri: `${API_URL}${img_mascot}`,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={require('../assets/images/not_image_small.jpg')}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.itemText}>{item.name_mascot}</Text>
        </View>
    );
};

const ListCarouselOffline = ({navigation, refresh}) => {
    const {
        dispatchUserEvent,
        user: {user},
        consult: {mascots},
    } = useContext(UserContext);

    const [getMascots, setMascots] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
        if (mascots) {
            dataMascots(mascots);
        }
    }, [fadeAnim, mascots, refresh]);


    const dataMascots = data => {
        const data_mascot = [];
        data.map(item => {
            const {id, name_mascot, id_mascot} = item;
            const url_image = '';
            data_mascot.push({
                id,
                id_mascot,
                name_mascot,
                avatar_mascot: {
                    url: url_image,
                },
            });
        });
        setMascots(data_mascot);
    };

    const SECTIONS = [
        {
            horizontal: true,
            data: getMascots,
        },
    ];

    return (
        <SafeAreaView style={{flex: 1, marginTop: 20}}>
            <Animated.View style={{opacity: fadeAnim}}>
                {getMascots.length > 0 ? (
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
                                                onPress={() =>
                                                    navigation.navigate('DetailsMascotOffline', {
                                                        mascotId: item.id_mascot,
                                                    })
                                                }>
                                                <ListOffItem  item={item} parentNavigate={navigation} />
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
                            return <ListOffItem  item={item} />;
                        }}
                    />
                ) : (
                    <Text style={styles.txtNotFound}>No hay resultados.</Text>
                )}
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
        textTransform: 'capitalize',
    },
    txtNotFound: {
        color: '#FFFF',
    },
});

export default ListCarouselOffline;
