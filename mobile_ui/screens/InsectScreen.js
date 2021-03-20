import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FolderIcon from 'react-native-vector-icons/dist/AntDesign';
import axios from 'axios';
import {IconButton, Colors} from 'react-native-paper';
import {
  resetSurveyForm,
  updateSelectionHandlers,
  updateQIndex,
  updateAnswers,
} from '../components/reduxStore';
import {useDispatch} from 'react-redux';

const InsectScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useTheme();
  const [insectList, setInsectList] = useState([]);
  const [image, setImage] = useState('');
  const [analysedInsect, setAnalysedInsect] = useState([]);
  const [allInsect, setAllInsect] = useState([]);
  const [insect, setInsect] = useState({
    insect_name: '',
    amount: 0,
  });
  const [groupScore, setGroupScore] = useState({
    group_1: '0',
    group_2: '0',
    group_3: '0',
    group_4: '0',
    group_5: '0',
  });
  const [score, setScore] = useState('0');
  const [insectsImageList, setInsectsImageList] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    desc: {
      marginBottom: 20,
      color: colors.text,
    },
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius: 3,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: colors.border,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
      borderColor: colors.text,
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
      width: 300,
      height: 'auto',
    },
    title: {
      paddingTop: 20,
      color: colors.text,
    },
  });

  const setallinsect = () => {
    setAllInsect([]);
    if (insectList.length > 0) {
      insectList.map(item => {
        allInsect.push({
          insect_name: item.insect_name,
          amount: parseInt(item.amount),
        });
      });
    }
    if (analysedInsect.length > 0) {
      analysedInsect.map(item => {
        allInsect.push({
          insect_name: item.insect_name,
          amount: parseInt(item.amount),
        });
      });
    }
    console.log('insect list: ' + insectList);
    console.log('all insect:' + JSON.stringify(allInsect));
  };

  const renderSelectedInsect = () => {
    if (insectList.length > 0) {
      // console.log(insectList); //selected insect list

      let comp = [];
      comp.push(
        <Text
          accessibilityLabel={testVariables.insectScreenSelectedTitle}
          testID={testVariables.insectScreenSelectedTitle}
          style={{
            alignSelf: 'flex-start',
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text,
          }}>
          Insects Selected
        </Text>,
      );
      insectList.map(item => {
        comp.push(
          <View
            accessibilityLabel={testVariables.insectScreenSelectedInsects}
            testID={testVariables.insectScreenSelectedInsects}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 3,
            }}>
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

      storeData(insectList);

      return comp;
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('selected_insect', jsonValue);
      // console.log('stored insect_list: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeData2 = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('analysed_insect', jsonValue);
      // console.log('stored analysed_insect: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getScore = async () => {
    setallinsect();
    try {
      let response = await axios.post(
        'https://cccmi-aquality.tk/aquality_server/insect_score/score',
        {
          list: allInsect,
        },
      );
      console.log(response.data);
      if (response.data.object == 'N/A') {
        setScore('0');
      } else {
        let groupscore = {
          group_1: response.data.object.group_1_score,
          group_2: response.data.object.group_2_score,
          group_3: response.data.object.group_3_score,
          group_4: response.data.object.group_4_score,
          group_5: response.data.object.group_5_score,
        };

        setGroupScore(groupscore);
        setScore(response.data.object.total_score);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderGroupScore = () => {
    if (groupScore.length > 0) {
      return <Text>Group 1: {groupScore.group_1}</Text>;
    }
  };

  const renderAnalysedInsect = () => {
    if (analysedInsect.length > 0) {
      console.log('analysed insect list:' + analysedInsect);
      let comp = [];
      comp.push(
        <Text
          style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold'}}>
          Analysed Insects:
        </Text>,
      );
      analysedInsect.map(item => {
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

      storeData2(analysedInsect);
      return comp;
    }
  };

  const renderGetScoreButton = () => {
    if (analysedInsect.length > 0 || insectList.length > 0) {
      return (
        <View style={{alignSelf: 'center', paddingVertical: 10}}>
          {/* <Button
            title="Get Score"
            onPress={() => {
              getScore();
              setModalVisible(true);
            }}
            titleStyle={{marginHorizontal: 22, fontSize: 18}}
            buttonStyle={{width: 200, height: 50, backgroundColor: '#610D00'}}
          /> */}
        </View>
      );
    }
  };

  useEffect(() => {
    if (route.params?.selectedInsect) {
      setInsectList(route.params.selectedInsect);
    }
    if (route.params?.aiInsect) {
      setAnalysedInsect(route.params.aiInsect);
    }
    if (route.params) {
      console.log(JSON.stringify(route.params));
    }
    // setallinsect();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [route.params?.selectedInsect, route.params?.aiInsect]);

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

  const ccg = () => {
    if (insectsImageList.length === 0)
      if (route.params?.insectsImage) {
        console.log('insect images');
        console.log(route.params);
        setInsectsImageList(route.params.insectsImage.insectPhoto);
      }
  };
  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>
      <Text h4 h4Style={styles.title}>
        Insert insects found
      </Text>
      <Button
        title="Select Insect"
        onPress={() => navigation.navigate('selectInsect1')}
        accessibilityLabel={testVariables.insectScreenSelectInsectButton}
        testID={testVariables.insectScreenSelectInsectButton}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#009387'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 40}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="buffer" size={19} color="#FAF9F7" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
      />
      <Button
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="AI Analyse"
        onPress={() => {
          navigation.navigate('AnalyzeInsect');
        }}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#009387'}}
        containerStyle={{
          margin: 5,
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 33,
        }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="cube" size={19} color="#FAF9F7" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
      />
      <Button
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="Upload Insects Photos"
        onPress={() => {
          navigation.navigate('UploadInsectsPhoto');
        }}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#009387'}}
        containerStyle={{
          margin: 5,
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 33,
        }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="upload" size={19} color="#FAF9F7" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Group 1 - {groupScore.group_1} points</Text>
            <Text>Group 2 - {groupScore.group_2} points</Text>
            <Text>Group 3 - {groupScore.group_3} points</Text>
            <Text>Group 4 - {groupScore.group_4} points</Text>
            <Text>
              Group 5 - {groupScore.group_5} points{'\n'}
            </Text>
            <Text>Total sample score: </Text>
            <Text style={{fontWeight: 'bold'}}>{score} points</Text>

            <IconButton
              accessibilityLabel={testVariables.cancelAddAmountIcon}
              testID={testVariables.cancelAddAmountIcon}
              icon="close-circle"
              color={Colors.red500}
              size={20}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        {renderSelectedInsect()}
        {renderAnalysedInsect()}
        {renderGetScoreButton()}
      </ScrollView>
      <Button
        title="Finish"
        onPress={() => {
          getScore();
          setModalVisible(true);
          navigation.navigate('ResultPage', {
            analyzedInsect: analysedInsect,
            selectedInsect: insectList,
            riverData: route.params.riverData,
            surveyData: route.params.surveyData,
            currentLocation: route.params.currentLocation,
            sensorData: route.params.sensorData,
            surrounding: route.params.surrounding,
            sample_score: score,
          });
        }}
        accessibilityLabel={testVariables.insectScreenSelectInsectButton}
        testID={testVariables.insectScreenSelectInsectButton}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#009387'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 40}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="check-circle-outline" size={19} color="#FAF9F7" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
      />
      {ccg()}
    </View>
  );
};

export default InsectScreen;
