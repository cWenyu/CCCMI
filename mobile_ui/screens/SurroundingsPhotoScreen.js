import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
  Modal,
  useWindowDimensions,
  Alert,
  BackHandler,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {Colors, Button as PaperBtn} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  resetSurveyForm,
  saveSampleData,
} from '../components/reduxStore';
import {useDispatch, useSelector} from 'react-redux';

const SurroundingsPhotoScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const sampleData = useSelector(state => state.surveyForm.sampleData);

  useEffect(() => {
    if (route.params?.surveyData) {
      console.log(JSON.stringify(route.params));
    }
  }, [route.params?.surveyData]);
  const {colors} = useTheme();
  const [dataSource, setDataSource] = useState([]);
  const [image, setImage] = useState({url: '', index: 0});
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({
    flex: 1,
    margin: null,
    marginTop: null,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  });

  const windowWidth = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions() * 0.9;
  const FOOTER_PADDING = windowWidth * 0.1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    takePhotoButton: {
      flex: buttonStyle.flex,
      margin: buttonStyle.margin,
      marginTop: buttonStyle.marginTop,
      alignItems: buttonStyle.alignItems,
      justifyContent: buttonStyle.justifyContent,
    },
  });

  useEffect(() => {
    getPageIntroVisible().then(res => {
      // console.log('res useEffect' + res);
      if (!(res === 'false')) {
        alertPageInfo();
      }
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    Alert.alert(
      'Hold on!',
      'Go back to Home will not save your proccess of taking sample.',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'BACK',
          onPress: () => {
            dispatch(resetSurveyForm());
            navigation.navigate('SurveyPage');
            navigation.navigate('HomeScreen');
          },
        },
      ],
    );
    return true;
  };

  const updateButtonStyles = len => {
    if (len > 0) {
      setButtonStyle({
        flex: 0,
        margin: 5,
        marginTop: 20,
        height: null,
        alignItems: 'center',
        justifyContent: null,
      });
    } else {
      setButtonStyle({
        flex: 1,
        margin: null,
        marginTop: null,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      });
    }
  };

  const getPageIntroVisible = async () => {
    try {
      const pageIntroModalVisibleResp = await AsyncStorage.getItem(
        'pageIntroVisible',
      );
      return pageIntroModalVisibleResp;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const alertPageInfo = () => {
    Alert.alert(
      'Page Information',
      'Record surrounding environment by taking photos,' +
        'you can view the image by clicking it in image gallery then delete it or keep it.',
      [
        {
          text: 'Read it later',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Got it',
          onPress: () => setPageIntroVisible(),
        },
      ],
    );
  };

  const setPageIntroVisible = async () => {
    await AsyncStorage.setItem('pageIntroVisible', 'false');
  };

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
      updateButtonStyles(1);
    });
  };

  const deleteImage = (index, visible) => {
    dataSource.splice(index, 1);
    updateButtonStyles(dataSource.length);
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
    return type;
  };

  const renderDoneButton = () => {
    return (
      <Button
        title="Next"
        buttonStyle={{paddingHorizontal: FOOTER_PADDING}}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 16}}
        buttonStyle={styles.submitButton}
        onPress={() => {
          storePhotoGallery();
        }}
      />
    );
  };

  const toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve(reader.result.replace(/^data:.+;base64,/, ''));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          }),
      );

  const saveImage = (arr, str) => {
    arr.push(str);
    return arr;
  };
  const storePhotoGallery = async () => {
    let arr = [];
    dataSource.forEach(url => {
      toDataURL(url).then(res => {
        saveImage(arr, res);
        if (arr.length === dataSource.length) {
          let surveyPhotosObj = {
            surveyPhotos: arr,
          };
          dispatch(
            saveSampleData({...sampleData, surrounding: surveyPhotosObj}),
          );

          navigation.navigate('SearchRiverScreen', {
            surveyData: route.params.surveyData,
            surrounding: surveyPhotosObj,
          });
        }
      });
    }, arr);
  };

  const renderSkipButton = () => {
    return (
      <Button
        buttonStyle={{width: 100, height: 35, backgroundColor: colors.backdrop}}
        containerStyle={{
          margin: 5,
          alignItems: 'center',
          position: 'absolute',
          alignSelf: 'center',
          top: 400,
        }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() =>
          navigation.navigate('SearchRiverScreen', {
            surveyData: route.params.surveyData,
          })
        }
        title="Skip"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 17}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={{
          width: 270,
          height: 50,
          backgroundColor: '#02ab9e',
        }}
        containerStyle={styles.takePhotoButton}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="camera" size={19} color="#FFF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => requestCameraPermission()}
        title="Upload Image"
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />

      {dataSource.length > 0 && renderImageGallery()}
      {dataSource.length > 0 && renderDoneButton()}
      {dataSource.length == 0 && renderSkipButton()}
    </View>
  );
};

export default SurroundingsPhotoScreen;
