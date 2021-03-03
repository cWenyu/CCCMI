import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen2 = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => navigation.replace('SurveyPage')}
      onSkip={() => navigation.navigate('SurveyPage')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/takesurvey.gif')}
              style={{height: 250, width: 250}}
            />
          ),
          title: 'Step 1',
          subtitle: 'Complete survey about river surroundings.',
        },
        {
          backgroundColor: '#bdd6db',
          image: (
            <Image
              source={require('../assets/searchriver.gif')}
              style={{height: 300, width: 250, paddingTop: -150}}
            />
          ),
          title: 'Step 2',
          subtitle: 'Search sampling river by name or current location.',
        },
        {
          backgroundColor: '#ced8ff',
          image: (
            <Image
              source={require('../assets/connectarduino.gif')}
              style={{height: 300, width: '100%', marginTop: 0}}
            />
          ),
          title: 'Step 3',
          subtitle: 'Connect to sensor device.',
        },
        {
          backgroundColor: '#7ad0f5',
          image: (
            <Image
              source={require('../assets/selectinsect.gif')}
              style={{
                height: 400,
                width: '100%',
                marginTop: -150,
                resizeMode: 'contain',
              }}
            />
          ),
          title: 'Step 4',
          subtitle: 'Pick insects found by river.',
        },
        {
          backgroundColor: '#7ad0f5',
          image: (
            <Image
              source={require('../assets/recognizeinsect.gif')}
              style={{height: 400, width: '100%', marginTop: -200}}
            />
          ),
          // title: 'Step 5',
          subtitle:
            "Or analyse insects that you don't know with our AI recognition model.",
        },
      ]}
    />
  );
};

export default OnboardingScreen2;

const styles = () =>
  StyleSheet.create({
    image: {
      width: 100,
      height: 100,
    },
  });
