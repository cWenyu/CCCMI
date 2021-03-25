import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { useTheme } from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.homeScreenContainer}
      testID={testVariables.homeScreenContainer}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />


      <Button
        buttonStyle={{ width: 270, height: 50, backgroundColor: "#02ab9e" }}
        containerStyle={{ margin: 5, alignItems: "center", marginTop: 200}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: "#00F"
        }}
        disabledTitleStyle={{ color: "#00F" }}
        linearGradientProps={null}
        icon={<Icon name="water" size={19} color="#0FF" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
        onPress={() =>
          navigation.navigate("SearchRiverScreen")
        }
        title="Take Sample"
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
      />
      <Button
        buttonStyle={{ width: 270, height: 50, backgroundColor: "#02ab9e" }}
        containerStyle={{ margin: 5, alignItems: "center", marginTop: 20}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: "#00F"
        }}
        disabledTitleStyle={{ color: "#00F" }}
        linearGradientProps={null}
        icon={<Icon name="flask-outline" size={19} color="#0FF" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
        onPress={() =>
          navigation.navigate("SampleHistoryScreen")
        }
        title="View Sample"
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
      />
    </View>
  );
};

export default HomeScreen;
const width_proportion = '100%';
const height_proportion = '100%';
const height = '100%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },


});
