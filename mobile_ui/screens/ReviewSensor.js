import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

const ReviewSensor = ({navigation, route}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text>Review sensor screen</Text>
    </View>
  );
};

export default ReviewSensor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
