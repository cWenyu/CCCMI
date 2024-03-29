import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  BackHandler,
}
  from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import testVariables from '../appium_automation_testing/test_variables';
import { Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {
  resetSurveyForm,
} from '../components/reduxStore';
import {useDispatch} from 'react-redux';

const ArduinoScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (route.params) {
      console.log(JSON.stringify(route.params));
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [route.params])

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

  const [data, setData] = React.useState({
    arduinoId: '',
    notValidDeviceId: true,
    notEmptyDeviceId: true,
  });
  
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      paddingBottom: 0,
      color: colors.text,
    },
    searchSection: {
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
      marginLeft: 13,
      marginRight: 13,
      paddingBottom: 10,
      paddingLeft: 8,
      backgroundColor: colors.background,
      color: colors.text,
      borderBottomColor: colors.text,
      borderRadius: 5,
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
      marginBottom: 20,
    },
    searchIcon: {
      marginLeft: 3,
      paddingRight: 0,
    }
  });

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('arduino', jsonValue);
      console.log('stored data: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const checkDeviceId = async () => {
    if (data.arduinoId.length == 0) {
      setData({
        ...data,
        notEmptyDeviceId: false,
      });
    } else {
      try {
        let response = await axios.get(
          'https://cccmi-aquality.tk/aquality_server/data',
          {
            params: {
              arduino_id: data.arduinoId,
            },
          },
        );
        if (response && response.data && response.data.length == 1) {
          if (response.data[0].arduino_id == data.arduinoId) {
            setData({
              ...data,
              notValidDeviceId: true,
              notEmptyDeviceId: true,
            });
            //save response to async storage
            storeData(response.data[0]);
            navigation.navigate('ArduinoScreen2', route.params);
          }
        } else {
          setData({
            ...data,
            notValidDeviceId: false,
            notEmptyDeviceId: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.arduinoScreenContainer}
      testID={testVariables.arduinoScreenContainer}>
      <Text h4 h4Style={styles.title}>
        Have a sensor device?
      </Text>
      {/* <View style={styles.searchSection}>
        <TextInput
          accessibilityLabel={testVariables.arduinoScreenIDTextInput}
          testID={testVariables.arduinoScreenIDTextInput}
          placeholder="Insert your Device ID"
          placeholderTextColor={colors.text}
          style={styles.input}
          onChangeText={val => {
            textInputChange(val);
          }}
        />
      </View>
      {data.notEmptyDeviceId ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Device ID field connot be empty.</Text>
        </Animatable.View>
      )}
      {data.notValidDeviceId ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Device with device ID not found.</Text>
        </Animatable.View>
      )} */}
      <Button
        title="Search Device Nearby"
        onPress={() => {
          {/* checkDeviceId(); */}
          navigation.navigate('ArduinoScreen2', route.params)
        }}
        buttonStyle={{ width: 250, height: 50, backgroundColor: "#02ab9e", borderRadius: 5, }}
        containerStyle={{ margin: 5, alignItems: "center", marginTop: 55 }}
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
      <Button
        buttonStyle={{ width: 100, height: 35, backgroundColor: colors.backdrop }}
        containerStyle={{ margin: 5, alignItems: 'center', marginTop: 32 }}
        disabledStyle={{
          borderWidth: 2,
          borderColor: '#00F',
        }}
        disabledTitleStyle={{ color: '#00F' }}
        linearGradientProps={null}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
        onPress={() => navigation.navigate('InsectScreen', route.params)}
        title="Skip"
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 17 }}
      />
    </View>
  );
};
export default ArduinoScreen;
