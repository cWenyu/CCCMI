import React, {useEffect, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';

const selectInsect1 = ({navigation}) => {
  const [insectList, setInsectList] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    getInsect();
  });

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
    navigation.navigate('Insect');
  };

  return (
    <View style={styles.viewContainer}>
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
            <TextInput
              placeholder="amount"
              style={styles.input}
              keyboardType="numeric"
            />
            <Button
              title="add"
              buttonStyle={{
                width: 50,
                marginRight: 10,
                backgroundColor: '#33cccc',
              }}
            />
          </View>
        ))}
      </ScrollView>

      <Button
        title="Done"
        buttonStyle={styles.submitButton}
        onPress={() => handleSubmit()}
      />
    </View>
  );
};

export default selectInsect1;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 100,
  },
  submitButton: {
    backgroundColor: '#009999',
    padding: 25,
  },
});
