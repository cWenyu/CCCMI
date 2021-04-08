import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert, BackHandler} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const ReviewInsect = ({navigation, route}) => {
  const {colors} = useTheme();
  //redux hook
  const sampleData = useSelector(state => state.surveyForm.sampleData);
  const [insectList, setInsectList] = useState([]);
  const [username, setUsername] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getUsername();
    getWeather();
    if (route.params) {
      console.log(JSON.stringify(route.params));
    }

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };
  
  const getWeather = async () => {
    let weather = await AsyncStorage.getItem('weatherData');
    setWeather(JSON.parse(weather));
  };

  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setUsername(username);
    } catch (e) {
      console.error(e);
    }
  };

  const renderSelectedInsect = () => {
    if (sampleData.selectedInsect.length > 0) {
      let comp = [];
      sampleData.selectedInsect.map(item => {
        comp.push(
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
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
    } else {
      return <Text style={{color: colors.text}}>No selected insects.</Text>;
    }
  };

  const renderAnalysedInsect = () => {
    if (sampleData.analyzedInsect.length > 0) {
      let comp = [];
      sampleData.analyzedInsect.map(item => {
        comp.push(
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
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
    } else return <Text style={{color: colors.text}}>No analyzed insect.</Text>;
  };

  const renderInsectPhoto = () => {
    if (sampleData.insectsImage) {
      let comp = [];
      let base64Icon = 'data:image/png;base64,';
      for (i = 0; i < sampleData.insectsImage.insectPhoto.length; i++) {
        comp.push(
          <Image
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: 'red',
            }}
            source={{uri: base64Icon + sampleData.insectsImage.insectPhoto[i]}}
          />,
        );
      }
      return comp;
    } else return <Text>No images uploaded.</Text>;
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      '',
      'Are you sure to finish this sample?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleFinish()},
      ],
      {cancelable: true},
    );

  const handleFinish = () => {
    setDataForPost().then(ob => {
      console.log('look here' + JSON.stringify(ob));
      postData(ob);
    });
    navigation.navigate('Home');
  };

  const postData = async ob => {
    try {
      let response = await axios.post(
        'https://cccmi-aquality.tk/aquality_server/samplesave',
        {
          data_get: ob.sampleObj,
          insect_list: ob.insectObj,
          insectsImage: ob.insectsImage,
          surrounding: ob.surrounding,
          currentLocation: ob.currentLocation,
          weather: ob.weather,
        },
      );
      let obb = {
        data_get: ob.sampleObj,
        insect_list: ob.insectObj,
        insectsImage: ob.insectsImage,
        surrounding: ob.surrounding,
        currentLocation: ob.currentLocation,
        weather: ob.weatherData,
      };
      console.log(obb);
      console.log(response);
      console.log('\n\n');
      console.log(response.data);
      console.log('data posted');
    } catch (e) {
      console.error(e);
    }
  };

  const setDataForPost = async () => {
    console.log('setting up data for upload');

    let sampleObj;
    if (!sampleData.sensorData) {
      sampleObj = {
        sample_user: username,
        sample_river_id: sampleData.riverData.river_id,
        sample_survey: sampleData.surveyData,
        sample_score: sampleData.sample_score,
      };
    } else {
      sampleObj = {
        sample_user: username,
        sample_ph: sampleData.sensorData.ph,
        sample_tmp: sampleData.sensorData.temp,
        sample_river_id: sampleData.riverData.river_id,
        sample_survey: sampleData.surveyData,
        sample_score: sampleData.sample_score,
      };
    }

    // console.log(JSON.stringify('sampleobj sending ', sampleObj));
    // set insect (selected + analysed)
    let array3 = sampleData.selectedInsect.concat(sampleData.analyzedInsect);
    setInsectList(array3);

    if (!sampleData.surrounding) {
      console.log('undefined surrounding');
      sampleData.surrounding = {surveyPhotos: []};
    }

    if (!sampleData.insectsImage) {
      console.log('undefined insectsImage');
      sampleData.insectsImage = {insectPhoto: []};
    }

    let dataObj = {
      sampleObj: sampleObj,
      insectObj: array3,
      insectsImage: sampleData.insectsImage,
      surrounding: sampleData.surrounding,
      currentLocation: sampleData.currentLocation,
      weather: weather,
    };
    console.log(dataObj);
    return dataObj;
  };

  return (
    <View style={{flex:1}}>
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Card>
          <Card.Title>SELECTED INSECT</Card.Title>
          <Card.Divider />
          {renderSelectedInsect()}
        </Card>
        <Card>
          <Card.Title>ANALYZED INSECT</Card.Title>
          <Card.Divider />
          {renderAnalysedInsect()}
        </Card>
        <Card>
          <Card.Title>UPLOADED IMAGES</Card.Title>
          <Card.Divider />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{renderInsectPhoto()}</View>
        </Card>
      </View>
    </ScrollView>
    <Button
        accessibilityLabel={testVariables.submitInsectsAmountButton}
        testID={testVariables.submitInsectsAmountButton}
        title="Finish"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 16}}
        buttonStyle={styles.submitButton}
        onPress={() => createTwoButtonAlert()}
      />
    </View>
  );
};

export default ReviewInsect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#44ad55',
    backgroundColor: '#3fa24f',
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 3,
  },
  
});
