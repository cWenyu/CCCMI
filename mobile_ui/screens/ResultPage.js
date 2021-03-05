import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View, Image, StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, colors, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import testVariables from '../appium_automation_testing/test_variables';
import axios from 'axios';

const resultPage = ({navigation, route}) => {
  const {colors} = useTheme();
  const [river, setRiver] = useState();
  const [arduino, setArduino] = useState();
  const [selectedInsect, setSelectedInsect] = useState([]);
  const [analysedInsect, setAnalysedInsect] = useState([]);
  const [data, setData] = useState({
    sample_score: '',
    sample_user: '',
    sample_ph: '',
    sample_tmp: '',
    sample_river_id: '',
  });
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

  const postData = async () => {
    try {
      let response = await axios.post(
        'https://cccmi-aquality.tk/aquality_server/samplesave',
        {
          data_get: data,
          insect_list: insectList,
        },
      );
      console.log(response);
      console.log('data posted');
    } catch (e) {
      console.error(e);
    }
  };

  const clearData = async () => {
    try {
      console.log('clearing data...');
      const clear1 = await AsyncStorage.removeItem('river');
      const clear2 = await AsyncStorage.removeItem('arduino');
      const clear3 = await AsyncStorage.removeItem('selected_insect');
      const clear4 = await AsyncStorage.removeItem('analysed_insect');
      const clear5 = await AsyncStorage.removeItem('insect_score');
      console.log('data cleared');
    } catch (e) {
      // error reading value
    }
  };

  const setDataForPost = () => {
    console.log('setting up data for upload');
    setData({
      sample_score: insectScore,
      sample_user: username,
      sample_ph: arduino.ph,
      sample_tmp: arduino.temp,
      sample_river_id: river.river_id,
    });
    // set insect (selected + analysed)
    let array3 = selectedInsect.concat(analysedInsect);
    setInsectList(array3);
    console.log('insects: ' + JSON.stringify(insectList));
    console.log('finish setting data');
    console.log('data' + JSON.stringify(data));
  };

  const handleFinish = () => {
    setDataForPost();
    postData();
    navigation.navigate('Home');
    // clearData();
  };

  const getRiverData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('river');
      return jsonValue != null ? setRiver(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getArduinoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('arduino');
      return jsonValue != null ? setArduino(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getSelectedInsectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selected_insect');
      return jsonValue != null
        ? setSelectedInsect(JSON.parse(jsonValue))
        : null;
    } catch (e) {
      // error reading value
    }
  };

  const getAnalysedInsectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('analysed_insect');
      return jsonValue != null
        ? setAnalysedInsect(JSON.parse(jsonValue))
        : null;
    } catch (e) {
      // error reading value
    }
  };

  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setUsername(username);
    } catch (e) {
      console.error(e);
    }
  };

  const getScore = async () => {
    try {
      const score = await AsyncStorage.getItem('insect_score');
      setInsectScore(score);
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
        <Text style={styles.sectionHeader}>River</Text>
        {/* <Text>score: {insectScore}</Text>
        <Text>username: {username}</Text> */}
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
    return (
      <View>
        <Text style={styles.sectionHeader}>Sensor Device</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Device ID
            </ListItem.Subtitle>
            {/* <Text style={styles.title}>{arduino.arduino_id}</Text> */}
            <Text style={styles.title}>{route.params.sensorData.deviceId}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Water pH</ListItem.Subtitle>
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
        {/* <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Coordinates (Long, Lat)
            </ListItem.Subtitle>
            <Text style={styles.title}>{route.params.sensorData.longitude}, {route.params.sensorData.latitude}</Text>
          </ListItem.Content>
        </ListItem> */}
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
  };

  const renderSelectedInsect = () => {
    if (route.params?.selectedInsect) {
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
    } else return <Text>No insects.</Text>;
  };

  // const renderAnalysedInsect = () => {
  //   if (route.params.analysedInsect.length > 0) {
  //     let comp = [];
  //     comp.push(<Text style={styles.sectionHeader}>Analysed Insect</Text>);
  //     route.params.analysedInsect.map(item => {
  //       comp.push(
  //         <View
  //           style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
  //           <Image
  //             style={styles.tinyLogo}
  //             source={{
  //               uri: item.insect_image,
  //             }}
  //           />
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               width: 150,
  //               textAlign: 'center',
  //               color: colors.text,
  //             }}>
  //             {item.insect_name}
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               width: 150,
  //               textAlign: 'center',
  //               color: colors.text,
  //             }}>
  //             {item.amount}
  //           </Text>

  //         </View>,
  //       );
  //     });
  //     return comp;
  //   }
  // };

  useEffect(() => {
    getRiverData();
    getArduinoData();
    getSelectedInsectData();
    getAnalysedInsectData();
    getUsername();
    getScore();

    if (route.params) {
      console.log(JSON.stringify(route.params));
    }
    // setDataForPost();
  }, []);

  return (
    <View>
      <ScrollView>
        {/* <Button title="postData" onPress={() => postData()} /> */}
        <Button title="setDataForPost" onPress={() => setDataForPost()} />

        {renderRiver()}
        {renderArduino()}
        {renderSelectedInsect()}
        {/* {renderAnalysedInsect()}
         */}
        {/* {river && renderRiver()} */}
        {/* {arduino && renderArduino()} */}
        {/* {selectedInsect && renderSelectedInsect()}
        {analysedInsect && renderAnalysedInsect()} */}

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
