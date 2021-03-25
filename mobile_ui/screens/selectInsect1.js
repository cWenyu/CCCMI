import React, { useEffect, useState, Component } from 'react';
import { View, StyleSheet, Text, Image, Modal, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';
import {IconButton, Colors} from 'react-native-paper';
import testVariables from '../appium_automation_testing/test_variables';

const selectInsect1 = ({ navigation }) => {
  const [insectList, setInsectList] = useState([]);
  const { colors } = useTheme();
  const [selectedInsectList, setSelectedInsectList] = useState([]);

  const [selectedInsect, setSelectedInsect] = useState({
    insect_name: '',
    amount: null,
    insect_image: '',
  });

  const [selecTedAmount, setSelectedAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [actionTriggered, setActionTriggered] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const styles = StyleSheet.create({
    viewContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius:3,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    input: {
      flex: 1,
      paddingTop: 10,
      marginLeft: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: colors.background,
      color: colors.text,
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
    },
    submitButton: {
      padding: 10,
      borderWidth: 2,
      borderColor: '#44ad55',
      backgroundColor: '#3fa24f',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: colors.border,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
      borderColor: colors.text,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: 300,
      height: 'auto',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'red',
    },
    searchSection: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      marginBottom: 30,
    },
  });
  

  const showToast = val => {
    ToastAndroid.show(val + ' has been added.', ToastAndroid.SHORT);
  };

  const handleAdd = (insectName, imageName) => {
    if (!selecTedAmount.trim()) {
      alert('Please Enter amount');
      return;
    }
    const newSelectedInsect = Object.assign({}, selectedInsect);
    newSelectedInsect.insect_name = insectName;
    newSelectedInsect.amount = selecTedAmount;
    newSelectedInsect.insect_image = imageName;
    setSelectedInsect(newSelectedInsect);
    console.log('new insect:' + newSelectedInsect);
    handleUpdate(newSelectedInsect);
    setSelectedAmount('');
  };

  const handleUpdate = todo => {
    const found = selectedInsectList.some(
      el => el.insect_name === todo.insect_name,
    );
    if (!found) {
      const newSelectedInsectList = [...selectedInsectList];
      newSelectedInsectList.push(todo);
      setSelectedInsectList(newSelectedInsectList);
      showToast(todo.insect_name);
    } else {
      alert('Error: duplicate insect detected.');
      // showToast('error: duplicated')
      return;
    }
  };

  useEffect(() => {
    getInsect();
  }, []);

  const getInsect = async () => {
    try {
      let response = await axios.get(
        'http://cccmi-aquality.tk/aquality_server/insect',
      );
      setInsectList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Insect', { post: selectedInsectList });
  };

  return (
    <View
      accessibilityLabel={testVariables.chooseInsectScreenContainer}
      testID={testVariables.chooseInsectScreenContainer}
      style={styles.viewContainer}>
      <ScrollView>
        {insectList.map((item, key) => (
          <View key={key} style={styles.container}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image_path,
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
            <Button
              accessibilityLabel={testVariables.groupList}
              testID={testVariables.groupList}
              onPress={() => {
                setModalVisible(true);
                setActionTriggered(item.insect_name);
                setDescription(item.insect_desc);
                setImage(item.insect_image_path);
              }}
              title="ADD"
              titleProps={{}}
              titleStyle={{ fontSize: 18 }}
              buttonStyle={{
                width: 65,
                marginRight: 10,
                backgroundColor: "#625D52"
              }}
              disabledStyle={{
                borderWidth: 2,
                borderColor: "#00F"
              }}
              disabledTitleStyle={{ color: "#00F" }}
              linearGradientProps={null}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
            />
          </View>
        ))}
        {selectedInsectList.map((item, key) => (
          <View>
            <Text>
              {item.insect_name}
              {item.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Button
        accessibilityLabel={testVariables.submitInsectsAmountButton}
        testID={testVariables.submitInsectsAmountButton}
        title="Done"
        titleProps={{}}
        titleStyle={{ marginHorizontal: 22, fontSize: 16 }}
        buttonStyle={styles.submitButton}
        onPress={() => handleSubmit()}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => { }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: image,
              }}
            />
            <Text style={{color: colors.text, fontSize: 18}}>{actionTriggered}</Text>
            <Text style={{color: colors.text}}>{description}</Text>
            <View  style={styles.searchSection}>
              <TextInput
                accessibilityLabel={testVariables.groupAmountInput}
                testID={testVariables.groupAmountInput}
                placeholder="Insect Amount"
                style={styles.input}
                placeholderTextColor= {colors.text}
                onChangeText={val => setSelectedAmount(val)}
                keyboardType="numeric"
              />
              <IconButton
                accessibilityLabel={testVariables.addAmountIcon}
                testID={testVariables.addAmountIcon}
                icon="check-circle"
                color={Colors.green500}
                size={20}
                onPress={() => {
                  handleAdd(actionTriggered, image);
                  setModalVisible(!modalVisible);
                }}
              />
            </View>

            <IconButton
              accessibilityLabel={testVariables.cancelAddAmountIcon}
              testID={testVariables.cancelAddAmountIcon}
              icon="close-circle"
              color={Colors.red500}
              size={20}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default selectInsect1;

