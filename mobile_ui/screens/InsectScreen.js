import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

const InsectScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const [insectList, setInsectList] = useState([]);
  const [image, setImage] = useState('');
  const [analysedInsect, setAnalysedInsect] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    desc: {
      marginBottom: 20,
      color: colors.text,
    },
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius:3,
    },
  });

  const renderSelectedInsect = () => {
    if (insectList.length > 0) {
      console.log(insectList); //selected insect list
      let comp = [];
      comp.push(<Text accessibilityLabel={testVariables.insectScreenSelectedTitle} testID={testVariables.insectScreenSelectedTitle} style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold', color:colors.text}}>Insects Selected</Text>)
      insectList.map(item => {
        comp.push(
          <View accessibilityLabel={testVariables.insectScreenSelectedInsects} testID={testVariables.insectScreenSelectedInsects} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3,}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.amount}
            </Text>
          </View>,
        );
      });

      storeData(insectList);

      return comp;
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('selected_insect', jsonValue);
      console.log('stored data: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const renderAnalysedInsect = () => {
    if (analysedInsect.length > 0) {
      console.log('analysed insect list:' + analysedInsect);
      let comp = [];
      comp.push(
        <Text
          style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold'}}>
          Analysed Insects:
        </Text>,
      );
      analysedInsect.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.count}
            </Text>
          </View>,
        );
      });
      return comp;
    }
  };

  useEffect(() => {
    if (route.params?.post) {
      setInsectList(route.params.post);
    }
    if (route.params?.insect) {
      setAnalysedInsect(route.params.insect);
    }
  }, [route.params?.post, route.params?.insect]);

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>
      <Button
        title="Select Insect"
        onPress={() => navigation.navigate('selectInsect1')}
        accessibilityLabel={testVariables.insectScreenSelectInsectButton}
        testID={testVariables.insectScreenSelectInsectButton}
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
        buttonStyle={{ width: 270, height: 50, backgroundColor: "#625D52" }}
        containerStyle={{ margin: 5, alignItems: "center", marginTop: 40}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: "#00F"
        }}
        disabledTitleStyle={{ color: "#00F" }}
        linearGradientProps={null}
        icon={<Icon name="buffer" size={19} color="#FAF9F7" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
      />
      <Button
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="AI Analyse"
        onPress={() => {navigation.navigate('AnalyzeInsect')}}
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
        buttonStyle={{ width: 270, height: 50, backgroundColor: "#625D52" }}
        containerStyle={{ margin: 5, alignItems: "center", marginTop: 20, marginBottom: 33}}
        disabledStyle={{
          borderWidth: 2,
          borderColor: "#00F"
        }}
        disabledTitleStyle={{ color: "#00F" }}
        linearGradientProps={null}
        icon={<Icon name="cube" size={19} color="#FAF9F7" />}
        iconContainerStyle={{ background: "#000" }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
      />
      

      <ScrollView>
        {renderSelectedInsect()}
        {renderAnalysedInsect()}
      </ScrollView>
    </View>
  );
};

export default InsectScreen;
