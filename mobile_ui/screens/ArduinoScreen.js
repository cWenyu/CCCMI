import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';

const ArduinoScreen = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      paddingBottom: 70,
      color: colors.text,
    },
    searchSection: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 30,
    },
    input: {
      flex: 1,
      paddingTop: 10,
      marginLeft: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
    },
  });
  return (
    <View style={styles.container}>
      <Text h4 h4Style={styles.title}>
        Connect to a device.
      </Text>
      <View style={styles.searchSection}>
        <TextInput placeholder="Insert Device ID here." style={styles.input} />
        <Icon.Button
          style={styles.searchIcon}
          name="magnify"
          backgroundColor="transparent"
          size={20}
          color="#000"
          onPress={() => navigation.navigate('ArduinoScreen2')}
        />
      </View>
      {/* <Button title="Turn On Bluetooth" type="outline" /> */}
    </View>
  );
};

export default ArduinoScreen;
