import React, {useState} from 'react';
import {View, StyleSheet, Alert, BackHandler,} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';
import {
  resetSurveyForm,
  updateSelectionHandlers,
  updateQIndex,
  updateAnswers,
} from '../components/reduxStore';
import {useDispatch} from 'react-redux';

const SearchRiverScreen2 = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [sampleData, setSampleData] = useState([]);

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

  React.useEffect(()=>{
    if(route.params?.surveyData) {
      console.log(JSON.stringify(route.params));
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [route.params?.surveyData])

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

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('river', jsonValue);
      // console.log('stored data: ' + jsonValue);
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
              {route.params.riverData.river_name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.latitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.longitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.river_catchments}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.river_code}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.local_authority}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.riverData.transboundary}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <Button
        accessibilityLabel={testVariables.riverDetailChooseRiverButton}
        testID={testVariables.riverDetailChooseRiverButton}
        title="Choose this river"
        onPress={() => {
          // sampleData.push({"river": JSON.stringify(route.params.data)}) //here
          navigation.navigate('ArduinoScreen', route.params);
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

export default SearchRiverScreen2;
