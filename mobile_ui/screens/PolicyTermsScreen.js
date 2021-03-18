import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, BackHandler} from 'react-native';

import {useTheme} from '@react-navigation/native';
import PolicyTerms from '../components/PolicyTerms';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const PolicyTermsScreen = ({navigation}) => {
  const {colors} = useTheme();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <PolicyTerms />
      </ScrollView>
    </View>
  );
};

export default PolicyTermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
