import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, BackHandler,} from 'react-native';

import {useTheme} from '@react-navigation/native';
import GuideContent from '../components/safetyGuide';

const SafetyGuideScreen = ({ navigation }) => {
  const {colors} = useTheme();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <View style={styles.container}>
      <GuideContent />
    </View>
  );
};

export default SafetyGuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
