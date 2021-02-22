import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
    onDone={() => navigation.navigate('SignInScreen')}
    onSkip={() => navigation.replace('SignInScreen')}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/cccmi-logo.png')} style={{height:250, width: 250, marginTop: -100}}/>,
      title: 'Welcome to Aquality 2.0 !',
      subtitle: 'By CCCMI',
    },
    {
      backgroundColor: '#bdd6db',
      image: <Image source={require('../assets/swiper1.png')} style={{height:300, width: '100%', marginTop: -100}}/>,
      title: 'Take Sample',
      subtitle: 'Start taking sample all on your smartphone',
    },
    {
      backgroundColor: '#ced8ff',
      image: <Image source={require('../assets/swiper2.png')} style={{height: 200, width: '100%', marginTop: 0}}/>,
      title: 'Connect to our sensor devices',
      subtitle: 'Automate water temperature and pH data gathering',
    },
    {
      backgroundColor: '#7ad0f5',
      image: <Image source={require('../assets/swiper3.png')} style={{height: 400, width: '100%', marginTop: -200}}/>,
      title: 'Insect Analysis with AI model',
      subtitle: 'Use AI model to analyse insects that you don\'t know',
    },
  ]}
/>
  );
};

export default OnboardingScreen;

const styles = () => StyleSheet.create({
  image: {
    width: 100, 
    height: 100,
  }
})