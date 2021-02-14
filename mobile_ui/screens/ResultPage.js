import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
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
  const test = async () => {
    try {
      let response = await axios.post(
        'https://cccmi-aquality.tk/aquality_server/samplesave',
        {
          data_get: '',
          insect_list: '',
        },
      );
      // console.log(response)
    } catch (e) {
      console.error(e);
    }
  };

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
      marginTop: 15,
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
    } catch (e) {
      console.error(e);
    }
  };

  const setDataForPost = () => {
    setData({
      sample_score: '0',
      sample_user: username,
      sample_ph: arduino.ph,
      sample_tmp: arduino.temp,
      sample_river_id: river.river_id,
    });
    // set insect (selected + analysed)
    setInsectList(selectedInsect);
    setInsectList({...insectList}, analysedInsect);
  };

  const handleFinish = () => {
    navigation.navigate('Home');
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
      console.log(arduino);
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

  const getUserId = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setUsername(username);
    } catch (e) {
      console.error(e);
    }
  };

  // const getUserId = async () => {

  //   try {
  //     const username = await AsyncStorage.getItem('username');
  //     var bodyFormData = new FormData();
  //     bodyFormData.append('username', username);
  //     let response = await axios({
  //       method: 'post',
  //       url: 'https://cccmi-aquality.tk/aquality_server/useraccount/userdetail',
  //       data: bodyFormData,
  //       headers: {'Content-Type': 'multipart/form-data'},
  //     });

  //     if (response) {
  //       console.log(JSON.stringify(response));
  //       setUsername(response.data.user_id)
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const renderRiver = () => {
    return (
      <View
        accessibilityLabel={testVariables.resultPageContainer}
        testID={testVariables.resultPageContainer}>
        <Text style={styles.sectionHeader}>River</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_name}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <Text style={styles.title}>{river.latitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.longitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_catchments}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_code}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.local_authority}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <Text style={styles.title}>{river.transboundary}</Text>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  const renderArduino = () => {
    return (
      <View>
        <Text style={styles.sectionHeader}>Arduino</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Device ID
            </ListItem.Subtitle>
            <Text style={styles.title}>{arduino.arduino_id}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Water pH</ListItem.Subtitle>
            <Text style={styles.title}>{arduino.ph}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Water Temperature
            </ListItem.Subtitle>
            <Text style={styles.title}>{arduino.temp}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Date Captured
            </ListItem.Subtitle>
            <Text style={styles.title}>
              Date{' '}
              {arduino.date_captured.substring(
                0,
                arduino.date_captured.indexOf('T'),
              )}{' '}
              | Time{' '}
              {arduino.date_captured.substring(
                arduino.date_captured.indexOf('T') + 1,
                16,
              )}
            </Text>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  const renderSelectedInsect = () => {
    if (selectedInsect.length > 0) {
      let comp = [];
      comp.push(<Text style={styles.sectionHeader}>Selected Insects</Text>);
      selectedInsect.map(item => {
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
    }
  };

  const renderAnalysedInsect = () => {
    if (analysedInsect.length > 0) {
      let comp = [];
      comp.push(<Text style={styles.sectionHeader}>Analysed Insect</Text>);
      analysedInsect.map(item => {
        comp.push(
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
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
      return comp;
    }
  };

  useEffect(() => {
    getRiverData();
    getArduinoData();
    getSelectedInsectData();
    getAnalysedInsectData();
    getUserId();
    // setDataForPost();
  }, []);

  return (
    <View>
      <ScrollView>
        <Button title="postData" onPress={() => postData()} />
        <Button title="setDataForPost" onPress={() => setDataForPost()} />
        {/* <Button title="getUserId" onPress={() => getUserId()} /> */}

        {river && renderRiver()}
        {arduino && renderArduino()}
        {selectedInsect && renderSelectedInsect()}
        {analysedInsect && renderAnalysedInsect()}

        <Button
          accessibilityLabel={testVariables.resultPageDoneButton}
          testID={testVariables.resultPageDoneButton}
          title="Done"
          titleProps={{}}
          titleStyle={{marginHorizontal: 22, fontSize: 16}}
          buttonStyle={styles.submitButton}
          onPress={() => handleFinish()}
        />
      </ScrollView>
    </View>
  );
};

export default resultPage;
