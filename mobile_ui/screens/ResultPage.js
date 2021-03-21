import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import {Button, colors, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import testVariables from '../appium_automation_testing/test_variables';
import axios from 'axios';

const resultPage = ({navigation, route}) => {
  const {colors} = useTheme();
  const [insectList, setInsectList] = useState([]);
  const [username, setUsername] = useState('');
  const [insectScore, setInsectScore] = useState();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
    },
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius: 3,
    },
    sectionHeader: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      backgroundColor: '#625D52',
      color: 'white',
      height: 40,
      width: '100%',
    },
    listContainer: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
    },
    submitButton: {
      padding: 10,
      borderWidth: 2,
      borderColor: '#44ad55',
      backgroundColor: '#3fa24f',
      // marginTop: 15,
    },
  });

  const postData = async ob => {
    console.log('\n\n');
    console.log(
      JSON.stringify({
        data_get: ob.sampleObj,
        insect_list: ob.insectObj,
        insectsImage: ob.insectsImage,
        surrounding: ob.surrounding,
      }),
    );

    try {
      let response = await axios.post(
        'https://cccmi-aquality.tk/aquality_server/samplesave',
        {
          data_get: ob.sampleObj,
          insect_list: ob.insectObj,
          insectsImage: ob.insectsImage,
          surrounding: ob.surrounding,
        },
      );
      console.log(response);
      console.log('data posted');
    } catch (e) {
      console.error(e);
    }
  };

  const setDataForPost = async () => {
    console.log('setting up data for upload');

    let pph, ptmp;
    let sampleObj;
    if (typeof route.params.sensorData === 'undefined') {
      sampleObj = {
        sample_user: username,
        sample_river_id: route.params.riverData.river_id,
        sample_survey: route.params.surveyData,
        sample_score: route.params.sample_score,
      };
    } else {
      sampleObj = {
        sample_user: username,
        sample_ph: pph,
        sample_tmp: ptmp,
        sample_river_id: route.params.riverData.river_id,
        sample_survey: route.params.surveyData,
        sample_score: route.params.sample_score,
      };
    }

    console.log(JSON.stringify('sampleobj sending ', sampleObj));
    // set insect (selected + analysed)
    let array3 = route.params.selectedInsect.concat(
      route.params.analyzedInsect,
    );
    setInsectList(array3);

    let dataObj = {
      sampleObj: sampleObj,
      insectObj: array3,
      insectsImage: route.params.insectsImage,
      surrounding: route.params.surrounding,
    };

    return dataObj;
  };

  const handleFinish = () => {
    setDataForPost().then(ob => {
      console.log('look here' + JSON.stringify(ob));
      postData(ob);
    });

    navigation.navigate('Home');
  };

  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setUsername(username);
    } catch (e) {
      console.error(e);
    }
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

  const renderRiver = () => {
    return (
      <View
        accessibilityLabel={testVariables.resultPageContainer}
        testID={testVariables.resultPageContainer}>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Sample score (Insect)</ListItem.Subtitle>
            <Text style={styles.title}>{route.params.sample_score}</Text>
          </ListItem.Content>
        </ListItem>
        <Text style={styles.sectionHeader}>River</Text>
        {/* <Text>username: {username}</Text> */}
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {route.params.riverData.river_name}
            </Text>
          </ListItem.Content>
        </ListItem>
        
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <Text style={styles.title}>{route.params.riverData.latitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <Text style={styles.title}>{route.params.riverData.longitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {route.params.riverData.river_catchments}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {route.params.riverData.river_code}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {route.params.riverData.local_authority}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {route.params.riverData.transboundary}
            </Text>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  const renderArduino = () => {
    if (route.params.sensorData) {
      return (
        <View>
          <Text style={styles.sectionHeader}>Sensor Device</Text>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Device ID
              </ListItem.Subtitle>
              <Text style={styles.title}>
                {route.params.sensorData.deviceId}
              </Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water pH
              </ListItem.Subtitle>
              <Text style={styles.title}>{route.params.sensorData.ph}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water Temperature
              </ListItem.Subtitle>
              <Text style={styles.title}>{route.params.sensorData.temp}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Date Captured
              </ListItem.Subtitle>
              <Text style={styles.title}>
                Date{' '}
                {route.params.sensorData.date.substring(
                  0,
                  route.params.sensorData.date.indexOf('T'),
                )}{' '}
                | Time{' '}
                {route.params.sensorData.date.substring(
                  route.params.sensorData.date.indexOf('T') + 1,
                  16,
                )}
              </Text>
            </ListItem.Content>
          </ListItem>
        </View>
      );
    } else return <Text>No sensor device connected.</Text>;
  };

  const renderSelectedInsect = () => {
    if (route.params.selectedInsect.length > 0) {
      let comp = [];
      comp.push(<Text style={styles.sectionHeader}>Selected Insects</Text>);
      route.params.selectedInsect.map(item => {
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
      return <Text>No selected insects.</Text>;
    }
  };

  const renderAnalysedInsect = () => {
    if (route.params.analyzedInsect.length > 0) {
      let comp = [];
      comp.push(<Text style={styles.sectionHeader}>Analysed Insect</Text>);
      route.params.analyzedInsect.map(item => {
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
    } else return <Text>No analyzed insect.</Text>;
  };

  useEffect(() => {
    getUsername();
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

  return (
    <View>
      <ScrollView>
        {renderRiver()}
        {renderArduino()}
        {renderSelectedInsect()}
        {renderAnalysedInsect()}

        <Button
          accessibilityLabel={testVariables.resultPageDoneButton}
          testID={testVariables.resultPageDoneButton}
          title="Finish Sampling"
          titleProps={{}}
          titleStyle={{marginHorizontal: 22, fontSize: 16}}
          buttonStyle={styles.submitButton}
          onPress={() => createTwoButtonAlert()}
        />
      </ScrollView>
    </View>
  );
};

export default resultPage;
