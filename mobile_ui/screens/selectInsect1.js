import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, Button} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';

const selectInsect1 = ({navigation}) => {
  const [insects, setInsects] = useState([
    {
      id: 1,
      name: 'Caenis',
      amount: '0',
      image: require('../assets/insects/caenis.jpg'),
    },
    {
      id: 2,
      name: 'Ecdyonurus',
      amount: '0',
      image: require('../assets/insects/ecdyonurus.jpg'),
    },
    {
      id: 3,
      name: 'Ephemera Danica',
      amount: '0',
      image: require('../assets/insects/Ephemera_Danica.jpg'),
    },
    {
      id: 4,
      name: 'Heptagenia',
      amount: '0',
      image: require('../assets/insects/Heptagenia.jpg'),
    },
    {
      id: 5,
      name: 'Hydropsychidae',
      amount: '0',
      image: require('../assets/insects/Hydropsychidae.jpg'),
    },
    {
      id: 6,
      name: 'Leptoceridae',
      amount: '0',
      image: require('../assets/insects/Leptoceridae.jpg'),
    },
  ]);

  const update = (amount, index) => {
    console.log('update called');
    console.log('amount: ' + amount + ' index: ' + index);
    insects[index].amount = amount;
    console.log(insects[index]);
    console.log(insects);
    // let newInsects = [...insects];
    // newInsects[index] = {...newInsects[index], amount: amount};
    // setInsects({newInsects});
  };

  const handleSubmit = () => {
    console.log(insects);
  };
  // const [amount, setAmount] = useState('');
  const renderInsects = () => {
    return insects.map((insect, index) => {
      let amount = 0;
      return (
        <View key={index} style={styles.container}>
          <View style={styles.insectContainer}>
            <Image source={insect.image} style={styles.insectImage} />
            <Text style={styles.insectName}>{insect.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="amount"
              // onChangeText={text => setAmount(text)}
              onChangeText={text => (amount = text)}
              keyboardType="numeric"
            />
            <Button
              title="add"
              style={styles.addButton}
              onPress={() => update(amount, index)}
            />
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      {renderInsects()}
      <Button title="Back" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insectImage: {
    height: 80,
    width: 80,
  },
  insectName: {
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  insectContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  amountInput: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
});

export default selectInsect1;