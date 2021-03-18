import React, {useEffect} from 'react';
import { BackHandler } from "react-native";

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';
import OnboardingScreen from './OnboardingScreen';
import AsyncStorage from '@react-native-community/async-storage';
import PolicyTermsScreen0 from '../screens/PolicyTermsScreen0';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  // AsyncStorage.removeItem('alreadyLaunched');
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      console.log('alreadyLaunched ', value);
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="PolicyTermsScreen0" component={PolicyTermsScreen0} />
        <RootStack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
      </RootStack.Navigator>
    );
  } else {
    return <SignInScreen />;
  }
};

export default RootStackScreen;
