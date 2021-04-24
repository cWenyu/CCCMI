import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  PermissionsAndroid,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useTheme} from 'react-native-paper';
import axios from 'axios';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import testVariables from '../appium_automation_testing/test_variables';
import {TextInput} from 'react-native-gesture-handler';

const AnalyzeScreen = ({navigation}) => {
  const [image, setImage] = useState(
    'https://cdn3.iconfinder.com/data/icons/ios-and-android-solid-icons-vol-1/64/014-512.png',
  );
  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [insectList, setInsectList] = useState([]);
  const [AIR, setAIR] = useState({
    class_label: 'response.data.object.class_label',
    confidence: 0,
    predicted_count: 0,
    smaller_tail: false,
    tail_present: 0,
    tail_count: 0,
  });

  useEffect(() => {
    requestCameraPermission();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Aquality Camera Permission',
          message:
            'Aquality needs access to your camera ' +
            'so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the camera');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      bs.current.snapTo(1);
      setImage(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      bs.current.snapTo(1);
      setImage(image.path);
    });
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      var photo = {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var form = new FormData();
      form.append('image', photo);

      let response = await axios({
        method: 'post',
        url: 'https://aqualityv2.ew.r.appspot.com/ai_model/detect_image/',
        data: form,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response) {
        console.log(response.data);
      }
      if (response.data.object.detected_image == false) {
        alert('No insect is detected.');
      } else {
        let res = {
          class_label: response.data.object.class_label,
          confidence: response.data.object.confidence,
          predicted_count: response.data.object.predicted_count,
          smaller_tail: response.data.object.smaller_tail,
          tail_present: response.data.object.tail_present,
          tail_count: response.data.object.tail_count,
        };
        setCount(response.data.object.predicted_count);
        setAIR(res);
        console.log('air:' + JSON.stringify(AIR));
        setModalVisible(true);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const renderInner = () => (
    <View
      style={styles.panel}
      accessibilityLabel={testVariables.analysisInsectInnerView}
      testID={testVariables.analysisInsectInnerView}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Insect Picture</Text>
      </View>
      <TouchableOpacity
        accessibilityLabel={testVariables.takePhotoButton}
        testID={testVariables.takePhotoButton}
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={testVariables.chooseFormLibraryButton}
        testID={testVariables.chooseFormLibraryButton}
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={testVariables.cancelButton}
        testID={testVariables.cancelButton}
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderModal = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
  };

  const handleConfirm = () => {
    const insect = {
      insect_name: AIR.class_label,
      amount: count,
      insect_image: image,
    };

    var found = false;
    for (var i = 0; i < insectList.length; i++) {
      if (insectList[i].insect_name == insect.insect_name) {
        found = true;
        break;
      }
    }

    if (found) {
      Alert.alert(
        'Duplicate insect found',
        'Do you want to add up the count?',
        [
          {
            text: 'Cancel',
            onPress: () => setModalVisible(!modalVisible),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              let objIndex = insectList.findIndex(
                obj => obj.insect_name == insect.insect_name,
              );
              insectList[objIndex].amount += parseInt(insect.amount);
              setModalVisible(!modalVisible);
            },
          },
        ],
      );
    } else {
      insectList.push(insect);
      setModalVisible(!modalVisible);
    }
  };

  const renderAnalysedInsect = () => {
    if (insectList.length > 0) {
      console.log('analysed insect list:' + insectList);
      let comp = [];
      comp.push(
        <Text
          style={{alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 20}}>
          Analysed Insects:
        </Text>,
      );
      insectList.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.amount}
            </Text>
          </View>,
        );
      });
      return comp;
    }
  };

  const handleSave = () => {
    navigation.navigate('InsectScreen', {
      aiInsect: insectList,
    });
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.analysisInsectScreenContainer}
      testID={testVariables.analysisInsectScreenContainer}>
      {console.log(insectList)}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Insect Name: </Text>
                {AIR.class_label}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Confidence: </Text>
                {AIR.confidence}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Smaller tail: </Text>
                {AIR.smaller_tail.toString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Tail present: </Text>
                {AIR.tail_present.toString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Tail count: </Text>
                {AIR.tail_count}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Count: </Text>
              <TextInput
                value={count.toString()}
                onChangeText={text => setCount(text)}
                keyboardType="numeric"
                borderBottomWidth={1}
              />
            </View>
            <Button
              title="Confirm"
              onPress={() => handleConfirm()}
              buttonStyle={{backgroundColor: 'green', margin: 5}}
            />

            <View style={{flexDirection: 'row'}}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
                buttonStyle={{backgroundColor: 'red', margin: 5}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('ReportProblem', {
                  insect_image: image,
                  data: AIR,
                });
              }}>
              <Text style={{textDecorationLine: 'underline'}}>
                Having problem?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity
            accessibilityLabel={testVariables.analysisInsectShowOptions}
            testID={testVariables.analysisInsectShowOptions}
            onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 250,
                width: 250,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                accessibilityLabel={testVariables.analysisInsectImageBackground}
                testID={testVariables.analysisInsectImageBackground}
                source={{
                  uri: image,
                }}
                style={{height: 200, width: 300}}
                imageStyle={{borderRadius: 40}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#423D33',
                    borderRadius: 40,
                  }}
                />
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <Button
          title="Analyse Insect"
          onPress={() => {
            uploadImage();
          }}
          titleProps={{}}
          titleStyle={{marginHorizontal: 22, fontSize: 18}}
          buttonStyle={{width: 270, height: 50, backgroundColor: '#625D52'}}
          containerStyle={{
            margin: 5,
            alignItems: 'center',
            marginTop: 95,
            marginBottom: 23,
          }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: '#00F',
          }}
          disabledTitleStyle={{color: '#00F'}}
          linearGradientProps={null}
          icon={<Icon name="cloud-upload" size={19} color="#FAF9F7" />}
          iconContainerStyle={{background: '#000'}}
          loadingProps={{animating: true}}
          loadingStyle={{}}
          accessibilityLabel={testVariables.analysisInsectUploadedPhotoButton}
          testID={testVariables.analysisInsectUploadedPhotoButton}
        />
      </Animated.View>
      <Button
        title="Done"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 16}}
        buttonStyle={{
          backgroundColor: '#3fa24f',
          height: 40,
          width: 200,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        onPress={() => handleSave()}
        containerStyle={{
          margin: 5,
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 23,
        }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        accessibilityLabel={testVariables.analysisInsectSaveButton}
        testID={testVariables.analysisInsectSaveButton}
      />

      <ScrollView>
        {renderModal()}
        {renderAnalysedInsect()}
      </ScrollView>
    </View>
  );
};

export default AnalyzeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 'auto',
    height: 'auto',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
