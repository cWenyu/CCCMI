import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

const SurveyPage = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>Survey Page</Text>
      <Button title="next" onPress={() => navigation.navigate('SearchRiverScreen')} />
    </View>
  );
};

export default SurveyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
