import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';
import GuideContent from '../components/safetyGuide';
import {ScrollView} from 'react-native-gesture-handler';

const SafetyGuideScreen = () => {
  const {colors} = useTheme();

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
