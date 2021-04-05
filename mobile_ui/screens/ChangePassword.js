import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

const ChangePassword = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>change password screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
