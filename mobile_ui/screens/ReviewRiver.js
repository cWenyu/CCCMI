import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import testVariables from '../appium_automation_testing/test_variables';
import {Button, ListItem} from 'react-native-elements';

const ReviewRiver = ({navigation, route}) => {
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

  const getWeather = async () => {
    let weather = await AsyncStorage.getItem('weatherData');
    setWeather(JSON.parse(weather));
  }

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
        {/* <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Sample score (Insect)
            </ListItem.Subtitle>
            <Text style={styles.title}>{route.params.sample_score}</Text>
          </ListItem.Content>
        </ListItem> */}
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
{/* 
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
        </ListItem> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>review river screen</Text>
      {/* {renderRiver()} */}
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
});
