import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, Modal, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import GuideContent from '../components/safetyGuide';
import {IconButton, Colors, Button as PaperBtn} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const safetyTermUrl =
    'https://cccmi-aquality.tk/aquality_server/useraccount/safetyterm';
  const {colors} = useTheme();

  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkUserSafetyState();
  }, []);

  const checkUserSafetyState = async () => {
    let userState = await AsyncStorage.getItem('userState');
    if (userState === 'false') {
      setModalVisible(true);
    }
  };

  const changeUserSafetyState = async () => {
    let userID = await AsyncStorage.getItem('userID');
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', userID);

    let response;
    if (userID) {
      response = await axios({
        method: 'post',
        url: safetyTermUrl,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
    }
    if (response && response.data.status_code === 202) {
      setModalVisible(!modalVisible);
      await AsyncStorage.setItem('userState', 'true');
    } else {
      throw new Error('Network response was not ok.');
    }
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.homeScreenContainer}
      testID={testVariables.homeScreenContainer}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Button
        accessibilityLabel={testVariables.homeScreenTakeNewSampleButton}
        testID={testVariables.homeScreenTakeNewSampleButton}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#02ab9e'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 200}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="water" size={19} color="#0FF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => navigation.navigate('SearchRiverScreen')}
        title="Take Sample"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />
      <Button
        accessibilityLabel={testVariables.homeScreenViewSampleButton}
        testID={testVariables.homeScreenViewSampleButton}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#02ab9e'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 20}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="flask-outline" size={19} color="#0FF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => navigation.navigate('SampleHistoryScreen')}
        title="View Sample"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View
          style={{
            flex: 15,
          }}>
          <GuideContent />
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
            // onPress={() => {
            //   setModalVisible(!modalVisible);
            // }}>
            onPress={() => changeUserSafetyState()}>
            Accept
          </PaperBtn>

          <PaperBtn
            icon="close-circle"
            color={Colors.red500}
            size={20}
            onPress={() => setModalVisible(!modalVisible)}>
            Cancel
          </PaperBtn>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
const width_proportion = '100%';
const height_proportion = '100%';
const height = '100%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
