import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image, Picker, TextInput} from 'react-native';

import {useTheme} from '@react-navigation/native';

const ReportProblem = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedValue, setSelectedValue] = useState("insect");


  

  return (
    <View style={styles.container}>
      <Image
        style={{width: 100,height: 100}}
        source={require('../assets/insects/caenis.jpg')}
      />
      <Text>From AI Analysis</Text>
      <Text>Insect Name: Caenis</Text>
      <Text>Count: 2</Text>
      <Text>What went wrong? Choose the reason:</Text>
      
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
          {/* <Picker.Item label="Choose one ..." value="default"/> */}
        <Picker.Item label="The insect name is wrong." value="insect" />
        <Picker.Item label="The count is wrong." value="count" />
        <Picker.Item label="Some bug." value="bug" />
      </Picker>

      <Button title='send' onPress={()=> navigation.navigate('AnalyzeInsect')}/>

      

    </View>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
