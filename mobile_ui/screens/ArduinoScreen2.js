import testVariables from '../appium_automation_testing/test_variables';
import React, {useEffect} from 'react';
import { View, StyleSheet, Text,  Alert, BackHandler, } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import {
  resetSurveyForm,
  updateSelectionHandlers,
  updateQIndex,
  updateAnswers,
} from '../components/reduxStore';
import {useDispatch} from 'react-redux';

const ArduinoScreen2 = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  // const {arduino_id, temp, ph, longitude, latitude, date_captured} = route.params;

  // const [data, setData] = React.useState({
  //   arduinoId: JSON.stringify(arduino_id),
  //   temp: JSON.stringify(temp),
  //   ph: JSON.stringify(ph),
  //   longitude: JSON.stringify(longitude),
  //   latitude: JSON.stringify(latitude),
  //   date: JSON.stringify(date_captured),
  // });

  const [data, setData] = React.useState({
    arduinoId: '',
    temp: '',
    ph: '',
    longitude: '',
    latitude: '',
    date: '',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
    },
    listContainer: {
      backgroundColor: colors.background,
    },
  });

  const getData = async () => {
    try {
      let response = await axios.get(
        'https://cccmi-aquality.tk/aquality_server/data',
        {
          params: {
            arduino_id: data.arduinoId,
          },
        },
      );
      setData({
        ...data,
        arduinoId: response.data[0].arduino_id,
        temp: response.data[0].temp,
        ph: response.data[0].ph,
        longitude: response.data[0].longitude,
        latitude: response.data[0].latitude,
        date: response.data[0].date_captured,
      });
      console.log('Data Updated');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData()
    console.log(route.params);
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Go back to Home will not save your proccess of taking sample.", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "BACK", onPress: () => {
        dispatch(resetSurveyForm());
        navigation.navigate('SurveyPage');
        navigation.navigate('HomeScreen');
      }, }
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => getData(), 30000);
      return () => clearInterval(interval);
    }, []),
  );

  return (
    <View
      style={styles.listContainer}
      accessibilityLabel={testVariables.arduinoConnectScreenContainer}
      testID={testVariables.arduinoConnectScreenContainer}>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Device ID</ListItem.Subtitle>
          <Text style={styles.title}>{data.arduinoId}</Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Water Temperature
          </ListItem.Subtitle>
          <Text
            accessibilityLabel={
              testVariables.arduinoConnectScreenTemperatureValue
            }
            testID={testVariables.arduinoConnectScreenTemperatureValue}
            style={styles.title}>
            {data.temp}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>pH Value</ListItem.Subtitle>
          <Text
            accessibilityLabel={testVariables.arduinoConnectScreenPHValue}
            testID={testVariables.arduinoConnectScreenPHValue}
            style={styles.title}>
            {data.ph}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
          <Text
            style={styles.title}>
            {data.latitude}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Longitude</ListItem.Subtitle>
          <Text
            style={styles.title}>
            {data.longitude}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Date Captured</ListItem.Subtitle>
          <Text
            style={styles.title}>
            Date{' '}
            {data.date.substring(
              0,
              data.date.indexOf('T'),
            )}{' '}
              | Time{' '}
            {data.date.substring(
              data.date.indexOf('T') + 1,
              16,
            )}
          </Text>
        </ListItem.Content>
      </ListItem>


      <Button
        title="Connect to this device"
        onPress={() => {
          // sampleData.push({"river": JSON.stringify(route.params.data)}) //here
          navigation.navigate('InsectScreen', {sensorData: data, riverData: route.params.riverData, surveyData: route.params.surveyData});
          // storeData(route.params.data);
        }}
        buttonStyle={{ width: 360, height: 50, backgroundColor: "#02ab9e", borderRadius: 5, }}
          containerStyle={{ margin: 5, alignItems: "center", marginTop: 35 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F"
          }}
          disabledTitleStyle={{ color: "#00F" }}
          linearGradientProps={null}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          titleProps={{}}
          titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
      />
    </View>
  );
};

export default ArduinoScreen2;
