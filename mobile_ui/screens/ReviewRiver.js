import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import {ListItem, Card, Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import axios from 'axios';

const ReviewRiver = ({navigation, route}) => {
  const [insectList, setInsectList] = useState([]);
  const [username, setUsername] = useState('');
  const [weather, setWeather] = useState({});
  const sampleData = useSelector(state => state.surveyForm.sampleData);
  
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

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const {colors} = useTheme();

  const renderRiver = () => {
    return (
      <View
        accessibilityLabel={testVariables.resultPageContainer}
        testID={testVariables.resultPageContainer}>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <Text style={styles.title}>{sampleData.riverData.river_name}</Text>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <Text style={styles.title}>{sampleData.riverData.latitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <Text style={styles.title}>{sampleData.riverData.longitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {sampleData.riverData.river_catchments}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <Text style={styles.title}>{sampleData.riverData.river_code}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {sampleData.riverData.local_authority}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {sampleData.riverData.transboundary}
            </Text>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  const renderSurveyPhotos = () => {
    if (sampleData.surrounding) {
      let comp = [];
      let base64Icon = 'data:image/png;base64,';
      for (i = 0; i < sampleData.surrounding.surveyPhotos.length; i++) {
        comp.push(
          <Image
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: 'red',
            }}
            source={{uri: base64Icon + sampleData.surrounding.surveyPhotos[i]}}
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
    }

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
            weather: ob.weather
          },
        );
        let obb = {
          data_get: ob.sampleObj,
          insect_list: ob.insectObj,
          insectsImage: ob.insectsImage,
          surrounding: ob.surrounding,
          currentLocation: ob.currentLocation,
          weather: ob.weatherData
        };
        console.log(obb)
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
      let array3 = sampleData.selectedInsect.concat(
        sampleData.analyzedInsect,
      );
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
          <Card.Title>RIVER DATA</Card.Title>
          {renderRiver()}
          <Card.Divider />
        </Card>
        <Card>
          <Card.Title>SURROUNDING IMAGES</Card.Title>
          <Card.Divider />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {renderSurveyPhotos()}
          </View>
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

export default ReviewRiver;

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
