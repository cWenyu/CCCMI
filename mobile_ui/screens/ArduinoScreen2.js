import testVariables from '../appium_automation_testing/test_variables';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';

const ArduinoScreen2 = ({route}) => {
  const {colors} = useTheme();
  const {arduino_id, temp, ph} = route.params;

  const [data, setData] = React.useState({
    arduinoId: JSON.stringify(arduino_id),
    temp: JSON.stringify(temp),
    ph: JSON.stringify(ph),
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

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => getData(), 5000);
      return () => clearInterval(interval);
    }, []),
  );

  const getData = async () => {
    try {
      let response = await axios.get(
        'http://cccmi-aquality.tk/aquality_server/data',
        {
          params: {
            arduino_id: data.arduinoId,
          },
        },
      );
      setData({
        ...data,
        temp: response.data[0].temp,
        ph: response.data[0].ph,
      });
      console.log('print things');
    } catch (e) {
      console.error(e);
    }
  };

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
    </View>
  );
};

export default ArduinoScreen2;
