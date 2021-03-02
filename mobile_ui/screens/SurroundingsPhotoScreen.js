import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {Colors, Button as PaperBtn} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function SurroundingsPhotoScreen() {
  const [dataSource, setDataSource] = useState([]);
  const [image, setImage] = useState({url: '', index: 0});
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    titleStyle: {
      padding: 16,
      fontSize: 20,
      color: 'white',
      backgroundColor: '#02ab9e',
    },
    imageContainerStyle: {
      flex: 1,
      flexDirection: 'column',
      margin: 1,
    },
    imageStyle: {
      height: 120,
      width: '100%',
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
      width: 25,
      height: 25,
      top: 50,
      right: 20,
      position: 'absolute',
    },
    submitButton: {
      padding: 10,
      borderWidth: 2,
      borderColor: '#44ad55',
      backgroundColor: '#3fa24f',
    },
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        takePhotoFromCamera();
      } else {
        // setLocationStatus('Permission Denied');
      }
    } catch (err) {
      console.warn('Error: ' + err);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(newImage => {
      setDataSource([...dataSource, newImage.path]);
    });
  };

  const deleteImage = (index, visible) => {
    dataSource.splice(index, 1);
    // if (dataSource.length === 0) {
    //   storeData(currentSurroundingObj.step, 'photo', dataSource);
    // }
    setModalVisibleStatus(visible);
  };

  const showModalFunction = (visible, imageURL, index) => {
    setImage({url: imageURL, index: index});
    setModalVisibleStatus(visible);
  };

  const renderImageGallery = () => {
    let type = [];
    modalVisibleStatus
      ? type.push(
          <Modal
            transparent={false}
            animationType={'fade'}
            visible={modalVisibleStatus}
            onRequestClose={() => {
              showModalFunction(!modalVisibleStatus, '', -1);
            }}>
            <View style={styles.modelStyle}>
              <FastImage
                style={styles.fullImageStyle}
                source={{uri: image.url}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PaperBtn
                icon="check-circle"
                color={Colors.green500}
                size={20}
                onPress={() => showModalFunction(!modalVisibleStatus, '', -1)}>
                Accept
              </PaperBtn>
              <PaperBtn
                icon="close-circle"
                color={Colors.red500}
                size={20}
                onPress={() => deleteImage(image.index, !modalVisibleStatus)}>
                Delete
              </PaperBtn>
            </View>
          </Modal>,
        )
      : type.push(
          <View style={styles.container}>
            <Text style={styles.titleStyle}>Image Gallery</Text>
            <FlatList
              data={dataSource}
              renderItem={({item, index}) => (
                <View style={styles.imageContainerStyle}>
                  <TouchableOpacity
                    key={index}
                    style={{flex: 1}}
                    onPress={() => {
                      showModalFunction(true, item, index);
                    }}>
                    <FastImage
                      style={styles.imageStyle}
                      source={{
                        uri: item,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>,
        );
    // storeData(currentSurroundingObj.step, 'photo', dataSource);
    return type;
  };

  const renderDoneButton = () => {
    return (
      <Button
        title="Done"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 16}}
        buttonStyle={styles.submitButton}
        onPress={() => storePhotoGallery()}
      />
    );
  };

  const storePhotoGallery = async () => {
    console.log(dataSource);
    // await AsyncStorage.setItem(stepInfor, storedDataObjStr);
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={{width: 270, height: 50, backgroundColor: '#02ab9e'}}
        containerStyle={{
          margin: 5,
          alignItems: 'center',
          marginTop: 20,
        }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="camera" size={19} color="#0FF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => requestCameraPermission()}
        title="Take Picture"
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />

      {dataSource.length > 0 && renderImageGallery()}
      {dataSource.length > 0 && renderDoneButton()}
    </View>
  );
}
