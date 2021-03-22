import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

const HelpScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>Help Page</Text>
      <Button title="Click Here" onPress={() => navigation.navigate('HelpScreenTakeSample')} />
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
