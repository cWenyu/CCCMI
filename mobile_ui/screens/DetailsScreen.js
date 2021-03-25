import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';

const DetailsScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const [river, setRiver] = useState();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      const jsonValue = await AsyncStorage.getItem('river');
      return jsonValue != null ? setRiver(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderDetails = () => {
    return (
      <View
        style={styles.listContainer}
        accessibilityLabel={testVariables.riverDetailScreen}
        testID={testVariables.riverDetailScreen}>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.river_name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.latitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.longitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.river_catchments}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.river_code}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.local_authority}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {river.transboundary}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  }

  return (
    <View>{river && renderDetails()}</View>
  )
  
};

export default DetailsScreen;
