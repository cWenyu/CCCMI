import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, colors, ListItem } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

const resultPage = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [river, setRiver] = useState()
  const [arduino, setArduino] = useState()
  const [selectedInsect, setSelectedInsect] = useState([])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',

    },
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius: 3,
    },
    sectionHeader: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      backgroundColor: "#625D52",
      color: 'white',
      height: 40,
      width: "100%",
    },
    listContainer: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
    },
    submitButton: {
      padding: 10,
      borderWidth: 2,
      borderColor: '#44ad55',
      backgroundColor: '#3fa24f',
      marginTop: 15,
    },
  })

  const handleFinish = () => {
    // clearData();
    navigation.navigate('Home')
  }

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('river');
      await AsyncStorage.removeItem('arduino');
      await AsyncStorage.removeItem('selected_insect');
      console.log('local storage data cleared')
    } catch (e) {
      console.error(e);
    }
  }

  const getRiverData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('river');
      return jsonValue != null ? setRiver(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getArduinoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('arduino');
      return jsonValue != null ? setArduino(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getSelectedInsectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selected_insect');
      return jsonValue != null ? setSelectedInsect(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const renderRiver = () => {
    return (
      <View>
        <Text style={styles.sectionHeader}>River</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_name}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Latitude
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.latitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.longitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_catchments}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.river_code}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.local_authority}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
          </ListItem.Subtitle>
            <Text style={styles.title}>{river.transboundary}</Text>
          </ListItem.Content>
        </ListItem>
      </View>
    )
  }

  const renderArduino = () => {
    return (
      <View>
        <Text style={styles.sectionHeader}>Arduino</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Device ID
          </ListItem.Subtitle>
            <Text style={styles.title}>{arduino.arduino_id}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Water pH
          </ListItem.Subtitle>
            <Text style={styles.title}>{arduino.ph}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Water Temperature
          </ListItem.Subtitle>
            <Text style={styles.title}>{arduino.temp}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Date Captured
          </ListItem.Subtitle>
            <Text style={styles.title}>Date  {arduino.date_captured.substring(0, arduino.date_captured.indexOf("T"))}   |  Time {arduino.date_captured.substring(arduino.date_captured.indexOf("T") + 1, 16)}</Text>
          </ListItem.Content>
        </ListItem>
      </View>
    )
  }

  const renderSelectedInsect = () => {
    if (selectedInsect.length > 0) {
      console.log(selectedInsect);    //selected insect list
      let comp = [];
      comp.push(<Text style={styles.sectionHeader}>Selected :</Text>)
      selectedInsect.map(item => {
        comp.push(
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
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
      return comp;
    }
  };

  useEffect(() => {
    getRiverData();
    getArduinoData();
    getSelectedInsectData();
  }, [])

  return (
    <View>
      <ScrollView>
        {river && renderRiver()}
        {arduino && renderArduino()}
        {renderSelectedInsect()}

        <Button
          title="Done"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 22, fontSize: 16 }}
          buttonStyle={styles.submitButton}
          onPress={() => handleFinish()}
        />
      </ScrollView>
    </View>
  )
};

export default resultPage;