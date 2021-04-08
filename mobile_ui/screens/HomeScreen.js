import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, colors} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import GuideContent from '../components/safetyGuide';
import {IconButton, Colors, Button as PaperBtn} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import env from '../components/env.json';
import GetLocation from 'react-native-get-location';

// import { StyleSheet, View, Text, StatusBar } from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';

const API_KEY = env.api_key;

const HomeScreen = ({navigation}) => {
  const safetyTermUrl =
    'https://cccmi-aquality.tk/aquality_server/useraccount/safetyterm';
  const {colors} = useTheme();

  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [weather, setWeather] = useState({
    id: 0,
    main: '',
    description: '',
    icon: '',
  });
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    pressure: 0,
    humidity: 0,
    description: ''
  });
  const [locationStatus, setLocationStatus] = useState(undefined);
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    icon: {
      fontSize: 100,
      alignSelf: 'center',
    },
    temp: {
      alignSelf: 'center',
      fontSize: 20,
      color: colors.text,
    },
    topContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      alignSelf: 'center',
      fontSize: 20,
      color: colors.text,
      fontWeight: '300',
    },
    subtitle: {
      alignSelf: 'center',
      fontSize: 20,
      color: colors.text,
      fontWeight: '600',
    },
    spinner: {
      justifyContent: "space-around",
      padding: 10
    }
  });

  const weatherOptions = {
    Haze: {
      mainIcon: '🌫',
      subIcon: '🧖‍♂️️',
      gradient: ['#c4c4c4', '#d0d0d0'],
    },
    Clouds: {
      mainIcon: '☁',
      subIcon: '☁️',
      gradient: ['#6f7a83', '#eef2f3'],
    },
    Clear: {
      mainIcon: '☀️',
      subIcon: '🌻',
      gradient: ['#2F80ED', '#56CCF2'],
    },
    Snow: {
      mainIcon: '☃️',
      subIcon: '🎄',
      gradient: ['#c5bdd9', '#cacbd2'],
    },
    Thunderstorm: {
      mainIcon: '⚡️',
      subIcon: '🪨',
      gradient: ['#BA8B02', '#181818'],
    },
    Rain: {
      mainIcon: '💧',
      subIcon: '☔️️️',
      gradient: ['#2C3E50', '#4CA1AF'],
    },
    Mist: {
      mainIcon: '🌧',
      subIcon: '🪴️',
      gradient: ['#536976', '#BBD2C5'],
    },
    Dust: {
      mainIcon: '😷',
      subIcon: '🌵️',
      gradient: ['#603813', '#b29f94'],
    },
    Default: {
      mainIcon: '🏖',
      subIcon: '🌴',
      gradient: ['#0e97ff', '#e5e49c'],
    },
  };

  useEffect(() => {
    checkUserSafetyState();
    getLocation();
  }, []);

  // const getLocation = async () => {
  // 	try {
  // 		await Location.requestPermissionsAsync();
  // 		const {
  // 			coords: { latitude, longitude },
  // 		} = await Location.getCurrentPositionAsync();

  // 		getWeather(latitude, longitude);
  // 		setIsLoading(false);
  // 	} catch (e) {
  // 		Alert.alert(
  // 			'이런 🥲',
  // 			'위치 사용에 동의하지 않으면 \n 날씨를 가져올 수 없습니다.',
  // 		);
  // 	}
  // };

  /**
   * @function getOneTimeLocation
   * @description get current location once
   *
   */
  const getLocation = () => {
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
        getWeather(position.latitude, position.longitude);
        setIsLoading(false);
      })
      .catch(error => {
        setLocationStatus({locationStatus: error.message});
      });
  };

  const getWeather = async (latitude, longitude) => {
    try {
      let response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: API_KEY,
          },
        },
      );
      if (response) {
        console.log(response.data);
        setTemp(response.data.main.temp);
        setWeather({
          ...weather,
          id: response.data.weather[0].id,
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        });
        let weather = {
          temp: response.data.main.temp,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          description: response.data.weather[0].description,
        };
        await AsyncStorage.setItem('weatherData', JSON.stringify(weather))
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkUserSafetyState = async () => {
    let userState = await AsyncStorage.getItem('userState');
    if (userState === 'false') {
      setModalVisible(true);
    }
  };

  const changeUserSafetyState = async () => {
    let userID = await AsyncStorage.getItem('userID');
    var bodyFormData = new FormData();
    bodyFormData.append('user_id', userID);

    let response;
    if (userID) {
      response = await axios({
        method: 'post',
        url: safetyTermUrl,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
    }
    if (response && response.data.status_code === 202) {
      setModalVisible(!modalVisible);
      await AsyncStorage.setItem('userState', 'true');
    } else {
      throw new Error('Network response was not ok.');
    }
  };
  
  const renderWeather = () => {


    const main = weather.main;
    const type = weatherOptions[main] ?? weatherOptions['Default'];

    if(location.latitude === undefined && location.longitude === undefined){
      console.log('no location for weather');
    }else{
      console.log(location);
      if (weather.id == 0) {
        console.log("no weather");
        return (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" />
          </View>
        );
      } else {
        return (
          <View style={styles.topContainer}>
            <Text style={styles.icon}>{type.mainIcon}</Text>
            <Text style={styles.temp}>{temp}℃</Text>
            <Text style={styles.title}>{weather.main}</Text>
            <Text style={styles.subtitle}>{weather.description}</Text>
          </View>
        );
      }
    }
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.homeScreenContainer}
      testID={testVariables.homeScreenContainer}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      {/* <Button title='weatherData' onPress={()=> console.log(weatherData)} /> */}
      {renderWeather()}
      <Button
        accessibilityLabel={testVariables.homeScreenTakeNewSampleButton}
        testID={testVariables.homeScreenTakeNewSampleButton}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#02ab9e'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 50}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="water" size={19} color="#0FF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => navigation.navigate('TakeSampleScreen')}
        title="Take Sample"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />
      <Button
        accessibilityLabel={testVariables.homeScreenViewSampleButton}
        testID={testVariables.homeScreenViewSampleButton}
        buttonStyle={{width: 270, height: 50, backgroundColor: '#02ab9e'}}
        containerStyle={{margin: 5, alignItems: 'center', marginTop: 20}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{color: '#00F'}}
        linearGradientProps={null}
        icon={<Icon name="flask-outline" size={19} color="#0FF" />}
        iconContainerStyle={{background: '#000'}}
        loadingProps={{animating: true}}
        loadingStyle={{}}
        onPress={() => navigation.navigate('SampleHistoryScreen')}
        title="View Sample"
        titleProps={{}}
        titleStyle={{marginHorizontal: 22, fontSize: 18}}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View
          style={{
            flex: 15,
          }}>
          <GuideContent />
        </View>
          
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            
          <PaperBtn
            icon="check-circle"
            color={Colors.green500}
            size={20}
            // onPress={() => {
            //   setModalVisible(!modalVisible);
            // }}>
            onPress={() => changeUserSafetyState()}>
            Accept
          </PaperBtn>

          <PaperBtn
            icon="close-circle"
            color={Colors.red500}
            size={20}
            onPress={() => setModalVisible(!modalVisible)}>
            Cancel
          </PaperBtn>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
const width_proportion = '100%';
const height_proportion = '100%';
const height = '100%';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: '100%',
//   },
// });
