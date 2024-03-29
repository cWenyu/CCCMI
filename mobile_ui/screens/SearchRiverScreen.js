import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import GetLocation from 'react-native-get-location';

import {FlatList} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {resetSurveyForm, saveSampleData} from '../components/reduxStore';
import {useDispatch, useSelector} from 'react-redux';

const riverURL = 'https://cccmi-aquality.tk/aquality_server/rivers/';

const SearchRiverScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const sampleData = useSelector(state => state.surveyForm.sampleData);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    !isEnabled && getOneTimeLocation();
    setIsEnabled(previousState => !previousState);
  };
  const [locationStatus, setLocationStatus] = useState(undefined);
  const [searchInput, setSearchInput] = useState(undefined);
  const [textInput, setTextInput] = useState('');
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    //get Location Permission, get location and set location
    if (isEnabled && locationStatus === undefined) {
      requestLocationPermission();
      setSearchInput(searchInput);
    }
    if (route.params?.surveyData) {
      console.log(JSON.stringify(route.params));
    }
    requestLocationPermission();

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [route.params?.surveyData]);

  const backAction = () => {
    Alert.alert(
      'Hold on!',
      'Go back to Home will not save your proccess of taking sample.',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'BACK',
          onPress: () => {
            dispatch(resetSurveyForm());
            navigation.navigate('SurveyPage');
            navigation.navigate('HomeScreen');
          },
        },
      ],
    );
    return true;
  };

  /**
   * @function requestLocationPermission
   * @description request location permission
   * (location should be on in android settings)
   */
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      setSearchInput(searchInput);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn('Error: ' + err);
      }
    }
  };

  /**
   * @function getOneTimeLocation
   * @description get current location once
   *
   */
  const getOneTimeLocation = () => {
    setLocationStatus('locationStatus');

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(position => {
        setLocationStatus('position');
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.latitude);

        //Setting Longitude state
        setLocation({latitude: currentLatitude, longitude: currentLongitude});
        setSearchInput(currentLatitude + ',' + currentLongitude);
      })
      .catch(error => {
        setLocationStatus({locationStatus: error.message});
      });
  };

  const renderResults = () => {
    let type = [];

    if (data.length > 0) {
      data.forEach(el => {
        type.push(
          <Button
            accessibilityLabel={testVariables.flatlistItem}
            testID={testVariables.flatlistItem}
            key={el.river_id}
            title={
              el.river_name.toString() + '\n' + el.distance.toFixed(2) + 'km'
            }
            onPress={() => {
              dispatch(
                saveSampleData({
                  ...sampleData,
                  riverData: el,
                  currentLocation: location,
                }),
              );
              navigation.navigate('SearchRiverScreen2', {
                riverData: el,
                surveyData: route.params.surveyData[0],
                currentLocation: location,
                surrounding: route.params.surrounding,
              });
            }}
            buttonStyle={{
              width: 310,
              height: 55,
              backgroundColor: '#02ab9e',
              borderRadius: 5,
            }}
            containerStyle={{margin: 5, alignItems: 'center', marginTop: 20}}
            disabledStyle={{
              borderWidth: 2,
              borderColor: '#00F',
            }}
            disabledTitleStyle={{color: '#00F'}}
            linearGradientProps={null}
            loadingProps={{animating: true}}
            loadingStyle={{}}
            titleProps={{}}
            titleStyle={{marginHorizontal: 22, fontSize: 18}}
          />,
        );
      });
    }
    return type;
  };

  const searchRiver = () => {
    let body = '';
    if (isEnabled) {
      body =
        '?latitude=' + location.latitude + '&longitude=' + location.longitude;
    } else {
      body = '?location=' + textInput;
    }
    fetch(riverURL + body)
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => alert(error));
  };

  /**
   *Styles
   */
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchSection: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.border,
      marginBottom: 30,
      height: 85,
      borderRadius: 8,
      width: '95%',
    },
    input: {
      flex: 1,
      paddingTop: 10,
      marginLeft: 0,
      paddingBottom: 10,
      paddingLeft: 8,
      backgroundColor: colors.background,
      color: colors.text,
      borderBottomColor: colors.text,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
    },
    buttonContainer: {
      width: '80%',
      marginVertical: 10,
    },
    title: {
      marginTop: 30,
      paddingBottom: 35,
      color: colors.text,
    },
    locateIcon: {
      marginLeft: 3,
      paddingRight: 0,
    },
  });

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.searchRiverScreenContainer}
      testID={testVariables.searchRiverScreenContainer}>
      <Text h4 h4Style={styles.title}>
        Select river for the sample
      </Text>

      <View style={styles.searchSection}>
        <Icon.Button
          accessibilityLabel={testVariables.searchRiverLocateIcon}
          testID={testVariables.searchRiverLocateIcon}
          style={styles.locateIcon}
          name={isEnabled ? 'crosshairs-gps' : 'crosshairs'}
          size={20}
          color={colors.text}
          backgroundColor="transparent"
          onPress={() => {
            toggleSwitch();
          }}
        />

        <TextInput
          accessibilityLabel={testVariables.searchRiverLocateInput}
          testID={testVariables.searchRiverLocateInput}
          style={styles.input}
          placeholder="River Name or Coordinates"
          placeholderTextColor={colors.text}
          underlineColorAndroid="transparent"
          value={isEnabled ? searchInput : textInput}
          onChangeText={text => setTextInput(text)}
        />
        <Icon.Button
          accessibilityLabel={testVariables.searchRiverSearchIcon}
          testID={testVariables.searchRiverSearchIcon}
          style={styles.searchIcon}
          name="magnify"
          backgroundColor="transparent"
          size={20}
          color={colors.text}
          onPress={() => searchRiver()}
        />
      </View>
      <ScrollView>{renderResults()}</ScrollView>
    </View>
  );
};

export default SearchRiverScreen;
