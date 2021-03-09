import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Picker,
  TextInput,
} from 'react-native';
import {Card, Button} from 'react-native-elements';

import {useTheme} from '@react-navigation/native';

const ReportProblem = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedValue, setSelectedValue] = useState('insect');

  return (
    <View style={styles.container}>

      <Card containerStyle={{width: '90%'}}>
        
        <Image source={require('../assets/insects/ecdyonurus.jpg')} style={{width: '100%', height: '50%', alignSelf: 'center'}}/>
        <Card.Divider />
        <Text><Text>Insect Name: </Text><Text style={{fontWeight: "bold"}}>Caenis</Text></Text>
        <Text><Text>Count: </Text><Text style={{fontWeight: "bold"}}>2</Text></Text>
        <Card.Divider />
      <Text style={{fontSize: 18}}>What went wrong? Choose the reason:</Text>

      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {/* <Picker.Item label="Choose one ..." value="default"/> */}
        <Picker.Item label="The insect name is wrong." value="insect" />
        <Picker.Item label="The count is wrong." value="count" />
        <Picker.Item label="Some bug." value="bug" />
      </Picker>

      <Button
        title="Send feedback"
        onPress={() => {
          // sampleData.push({"river": JSON.stringify(route.params.data)}) //here
          navigation.navigate('AnalyzeInsect');
          // storeData(route.params.data);
        }}
        buttonStyle={{ width: 360, height: 50, backgroundColor: "blue", borderRadius: 5, }}
          containerStyle={{ margin: 5, alignItems: "center", marginTop: 35 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F"
          }}
          disabledTitleStyle={{ color: "#00F" }}
          linearGradientProps={null}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          titleProps={{}}
          titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
      />
      </Card>
      
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
