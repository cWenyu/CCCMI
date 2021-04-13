import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert, BackHandler} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';

const ReportProblem = ({navigation, route}) => {
  const {colors} = useTheme();
  const [problem, setProblem] = useState('0');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (route.params?.insect_image) {
      setImage(route.params.insect_image);
      console.log(route.params);
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const setDataForPost = async () => {
    let sampleObj = {
      report_image_path: route.params.insect_image,
      report_problem: problem,
      report_problem_description: description,
    };

    return sampleObj;
  };

  const postData = async ob => {
    try {
      var photo = {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      var form = new FormData();
      form.append('report_image_path', photo);
      form.append('report_problem', problem);
      form.append('report_problem_description', description);

      let response = await axios({
        method: 'post',
        url: 'https://cccmi-aquality.tk/aquality_server/reportrecord/',
        data: form,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log(response);
      console.log('data posted');
    } catch (e) {
      console.error(e);
    }
  };

  const handleFinish = () => {
    setDataForPost().then(ob => {
      postData(ob);
    });

    navigation.navigate('AnalyzeInsect');
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={{width: '90%'}}>
        <Image
          source={{
            uri: route.params.insect_image,
          }}
          style={{width: '100%', height: '40%', alignSelf: 'center'}}
        />
        <Card.Divider />
        <Text>
          <Text>Insect Name: </Text>
          <Text style={{fontWeight: 'bold'}}>{route.params.data.class_label}</Text>
        </Text>
        <Text>
          <Text>Predicted count: </Text>
          <Text style={{fontWeight: 'bold'}}>{route.params.data.predicted_count}</Text>
        </Text>
        <Text>
          <Text>Smaller tail: </Text>
          <Text style={{fontWeight: 'bold'}}>{route.params.data.smaller_tail.toString()}</Text>
        </Text>
        <Text>
          <Text>Tail count: </Text>
          <Text style={{fontWeight: 'bold'}}>{route.params.data.tail_count.toString()}</Text>
        </Text>
        <Text>
          <Text>Tail present: </Text>
          <Text style={{fontWeight: 'bold'}}>{route.params.data.tail_present.toString()}</Text>
        </Text>
        <Card.Divider />

        <Text style={{fontSize: 18}}>What went wrong? Choose the reason:</Text>

        <Picker
          selectedValue={problem}
          onValueChange={(itemValue, itemIndex) => setProblem(itemValue)}>
          <Picker.Item label="Choose a reason:" value="0" />
          <Picker.Item
            label="The insect name is wrong."
            value="wrong insect name"
          />
          <Picker.Item
            label="Tail count is wrong."
            value="wrong tail count"
          />
          <Picker.Item label="Other bugs." value="other" />
        </Picker>

        <TextInput
          style={{
            height: '10%',
            width: '100%',
            borderWidth: 1,
            textAlignVertical: 'top',
          }}
          placeholder="Describe the problem."
          onChangeText={text => setDescription(text)}
          defaultValue={description}
          multiline={true}
        />

        <Button
          title="Send feedback"
          onPress={() => {
            handleFinish();
          }}
          buttonStyle={{
            width: 360,
            height: 50,
            backgroundColor: 'blue',
            borderRadius: 5,
          }}
          containerStyle={{margin: 5, alignItems: 'center', marginTop: 35}}
          disabledStyle={{
            borderWidth: 2,
            borderColor: '#00F',
          }}
          disabledTitleStyle={{color: '#00F'}}
          linearGradientProps={null}
          loadingProps={{animating: true}}
          loadingStyle={{}}
          titleProps={{}}
          titleStyle={{marginHorizontal: 22, fontSize: 18}}
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
