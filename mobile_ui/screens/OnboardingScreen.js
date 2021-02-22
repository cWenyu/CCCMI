import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/finger.png')} style={styles.image}/>,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/logo.png')} />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/logo.png')} />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
  ]}
/>
  );
};

export default OnboardingScreen;

const styles = () => StyleSheet.create({
  image: {
    width: '100%', 
    height: 500, 
    marginTop: -200
  }
})