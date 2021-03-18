import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import PolicyTerms from '../components/PolicyTerms';

const PolicyTermsScreen0 = ({navigation}) => {
  const {colors} = useTheme();
  const [CheckBoxVisible, setCheckBoxVisible] = useState(false);
  const [checked, setChecked] = useState(true);

  useEffect(() => {}, []);

  /**
   * ScrollView滑动回调事件
   * @param event
   * @private
   */
  const onScroll = e => {
    var offsetY = e.nativeEvent.contentOffset.y; // 已经滚动的距离
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; // 可滚动的可见区域高度
    var contentSizeHeight = Math.round(e.nativeEvent.contentSize.height); // 可滚动的总高度
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
          onPress={() => setChecked(!checked)}
          checked={checked}
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
