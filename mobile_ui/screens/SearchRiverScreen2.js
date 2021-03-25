import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Button, Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import {FlatList} from 'react-native-gesture-handler';
import {List} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const SearchRiverScreen2 = ({navigation, route}) => {
  const {colors} = useTheme();
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
    h3title: {
      color: colors.text,
      textAlign: 'center',
    },
  });

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('river', jsonValue);
      console.log('stored data: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.riverDetailContainer}
      testID={testVariables.riverDetailContainer}>
      <View>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.latitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.longitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_catchments}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_code}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.local_authority}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.transboundary}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <Button
        accessibilityLabel={testVariables.riverDetailChooseRiverButton}
        testID={testVariables.riverDetailChooseRiverButton}
        title="Choose this river"
        onPress={() => {
          navigation.navigate('MainTabScreen');
          storeData(route.params.data);
        }}
        buttonStyle={{ width: 360, height: 50, backgroundColor: "#02ab9e" }}
          containerStyle={{ margin: 5, alignItems: "center", marginTop: 20 }}
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

export default SearchRiverScreen2;
