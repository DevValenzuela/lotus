import React, {useEffect, useRef, useState, useContext} from 'react';
import {UserContext} from '../context/userContext';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
  Animated,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {
  DELETE_PHOTO_MASCOT,
  UPLOAD_PHOTO_MASCOT,
} from '../pages/apolllo/grahpql';
import ReactNativeFile from 'apollo-upload-client/public/ReactNativeFile';

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

export const ModalGalleryOptions = () => {
  const {dispatchUserEvent} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [setImageGallery, getImageGallery] = useState('');

  const [upload, {loading: loadingB, data: dataB}] =
    useMutation(UPLOAD_PHOTO_MASCOT);
  const [deleteUpload, {loading: loadingC, data: dataC}] =
    useMutation(DELETE_PHOTO_MASCOT);

  const uploadImage = response => {
    if (response.didCancel) return;
    const {uri, fileName, fileSize, type} = response.assets[0];

    const file = new ReactNativeFile({
      uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
      name: fileName,
      type: type,
    });

    if (uri) {
      getImageGallery(uri);
      upload({
        variables: {
          file,
        },
      })
        .then(resp => {
          const {upload} = resp.data;
          dispatchUserEvent('ADD_URI', {idPhoto: upload.id});
        })
        .catch(e => console.log(e.message));
    }
  };

  const deleteImage = async () => {
    if (!dataB) return;
    try {
      await deleteUpload({
        variables: {
          inputId: {
            id: Number(dataB.upload.id),
          },
        },
      });
      getImageGallery('');
      console.log('!Delete success fully upload!');
    } catch (e) {
      getImageGallery('');
      console.log(e);
    }
  };

  const takeCamera = () => {
    setModalVisible(false);
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 600,
        maxHeight: 750,
      },
      response => uploadImage(response),
    );
  };

  const takePhoto = () => {
    setModalVisible(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 600,
        maxHeight: 750,
      },
      response => uploadImage(response),
    );
  };

  return (
    <View>
      {setImageGallery ? (
        <View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => deleteImage()}>
            <Image
              source={{
                uri: setImageGallery,
              }}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </TouchableHighlight>
        </View>
      ) : (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            style={{width: '100%'}}
            source={require('./../assets/images/galery_mascot.png')}
          />
        </TouchableHighlight>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Hide modal...');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={{color: '#fff', fontSize: 14}}>Ingresar Foto.</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => takePhoto()}>
              <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
                <Text style={style.txtModal}>Galeria</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => takeCamera()}>
              <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
                <Text style={style.txtModal}>Fotografia</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => setModalVisible(false)}>
              <View style={[style.btnModal, {backgroundColor: '#3C0065'}]}>
                <Text style={style.txtModal}>Cancelar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export const AvatarOption = () => {
  const {dispatchUserEvent} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [setImageGallery, getImageGallery] = useState('');

  const [upload, {loading: loadingB, data: dataB}] =
    useMutation(UPLOAD_PHOTO_MASCOT);

  const [deleteUpload, {loading: loadingC, data: dataC}] =
    useMutation(DELETE_PHOTO_MASCOT);

  const uploadImage = response => {
    if (response.didCancel) return;
    const {uri, fileName, fileSize, type} = response.assets[0];

    const file = new ReactNativeFile({
      uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
      name: fileName,
      type: type,
    });

    if (uri) {
      getImageGallery(uri);
      upload({
        variables: {
          file,
        },
      })
        .then(resp => {
          const {upload} = resp.data;
          dispatchUserEvent('ADD_URI', {idPhoto: upload.id});
        })
        .catch(e => console.log(e.message));
    }
  };

  const deleteImage = async () => {
    if (!dataB) return;
    try {
      await deleteUpload({
        variables: {
          inputId: {
            id: Number(dataB.upload.id),
          },
        },
      });
      getImageGallery('');
      console.log('!Delete success fully upload!');
    } catch (e) {
      getImageGallery('');
      console.log(e);
    }
  };

  const takeCamera = () => {
    setModalVisible(false);
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 600,
        maxHeight: 750,
      },
      response => uploadImage(response),
    );
  };

  const takePhoto = () => {
    setModalVisible(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 600,
        maxHeight: 750,
      },
      response => uploadImage(response),
    );
  };

  return (
    <View>
      {setImageGallery ? (
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image
            source={{
              uri: setImageGallery,
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              shadowColor: '#660066',
            }}
          />
          <TouchableHighlight
            style={{alignItems: 'center'}}
            onPress={() => deleteImage()}
            underlayColor="transparent">
            <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
              <Text style={style.txtModal}> ELIMINAR FOTO </Text>
            </View>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image
            source={require('../assets/images/image_photo.png')}
            style={style.imgProfile}
          />
          <TouchableHighlight
            style={{alignItems: 'center'}}
            onPress={() => setModalVisible(!modalVisible)}
            underlayColor="transparent">
            <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
              <Text style={style.txtModal}>AGREGAR FOTO</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Hide modal...');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={{color: '#fff', fontSize: 14}}>Ingresar Foto.</Text>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => takePhoto()}>
              <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
                <Text style={style.txtModal}>Galeria</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => takeCamera()}>
              <View style={[style.btnModal, {backgroundColor: '#660066'}]}>
                <Text style={style.txtModal}>Fotografia</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => setModalVisible(false)}>
              <View style={[style.btnModal, {backgroundColor: '#3C0065'}]}>
                <Text style={style.txtModal}>Cancelar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
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
  modalView: {
    marginVertical: 190,
    marginHorizontal: 50,
    maxWidth: 350,
    backgroundColor: '#562A8C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#562A8C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 16,
    width: 200,
  },
  txtModal: {
    color: '#fff',
    textAlign: 'center',
  },
});
