import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import PolicyTerms from '../components/PolicyTerms';

const PolicyTermsScreen0 = ({navigation}) => {
  const {colors} = useTheme();
  const [CheckBoxVisible, setCheckBoxVisible] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);
  
  const toggleSwitch = () => {
    !boxChecked && navigation.navigate('OnboardingScreen')
    setBoxChecked(previousState => !previousState);
  };
  
  useEffect(() => {
    console.log("boxChecked useEffect",boxChecked);
  }, []);

  /**
   * @param event
   * @private
   */
  const onScroll = e => {
    var offsetY = e.nativeEvent.contentOffset.y; 
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; 
    var contentSizeHeight = Math.round(e.nativeEvent.contentSize.height);
    if (Math.round(offsetY + oriageScrollHeight) >= contentSizeHeight * 0.8) {
      setCheckBoxVisible(true);
    } else {
      setCheckBoxVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <PolicyTerms />
      </ScrollView>

      {CheckBoxVisible && (
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="red"
          onPress={() =>  toggleSwitch()}
          checked={boxChecked}
          title="Confirm TERMS & SERVICE and PRIVACY POLICY "
        />
      )}
    </View>
  );
};

export default PolicyTermsScreen0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
