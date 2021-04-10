import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {ListItem, Card, Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import testVariables from '../appium_automation_testing/test_variables';

const ReviewSensor = ({navigation, route}) => {
  const {colors} = useTheme();
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

  const renderArduino = () => {
    if (sampleData.sensorData) {
      return (
        <View>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Device ID
              </ListItem.Subtitle>
              <Text style={styles.title}>{sampleData.sensorData.deviceId}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water pH
              </ListItem.Subtitle>
              <Text style={styles.title}>{sampleData.sensorData.ph}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water Temperature
              </ListItem.Subtitle>
              <Text style={styles.title}>{sampleData.sensorData.temp}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Date Captured
              </ListItem.Subtitle>
              <Text style={styles.title}>
                Date{' '}
                {sampleData.sensorData.date.substring(
                  0,
                  sampleData.sensorData.date.indexOf('T'),
                )}{' '}
                | Time{' '}
                {sampleData.sensorData.date.substring(
                  sampleData.sensorData.date.indexOf('T') + 1,
                  16,
                )}
              </Text>
            </ListItem.Content>
          </ListItem>
        </View>
      );
    } else return <Text>No sensor device connected.</Text>;
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <Card>
          <Card.Title>SENSOR DEVICE</Card.Title>
          {renderArduino()}
          <Card.Divider />
        </Card>
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

export default ReviewSensor;

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
});
