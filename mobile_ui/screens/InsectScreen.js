import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import axios from 'axios';
import {IconButton, Colors} from 'react-native-paper';

const InsectScreen = ({navigation, route}) => {
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
  const [score, setScore] = useState('');

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
    },centeredView: {
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
      // console.log(response.data.object.score);
      setScore(response.data.object.score);
      saveScore(response.data.object.score);
    } catch (e) {
      console.error(e);
    }
  };

  const saveScore = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('insect_score', jsonValue);
      // console.log('stored insect_list: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  }

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
                uri: item.image,
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
              {item.count}
            </Text>
          </View>,
        );
      });

      storeData2(analysedInsect);
      return comp;
    }
  };

  useEffect(() => {
    if (route.params?.post) {
      setInsectList(route.params.post);
    }
    if (route.params?.insect) {
      setAnalysedInsect(route.params.insect);
    }
    // setallinsect();
  }, [route.params?.post, route.params?.insect]);

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>
      <Button
        title="Select Insect"
        onPress={() => navigation.navigate('selectInsect1')}
        accessibilityLabel={testVariables.insectScreenSelectInsectButton}
        testID={testVariables.insectScreenSelectInsectButton}
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#625D52'}}
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
        buttonStyle={{width: 270, height: 50, backgroundColor: '#625D52'}}
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

      <Button title="submit to get score" onPress={() => {getScore();setModalVisible(true);}} />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{score}</Text>

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
      </ScrollView>
    </View>
  );
};

export default InsectScreen;
