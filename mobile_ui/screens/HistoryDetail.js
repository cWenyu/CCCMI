import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListItem, Icon} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const HistoryDetail = ({route}) => {
  const {colors} = useTheme();
  const {item} = route.params;
  const [insectsList, setInsectsList] = useState([]);
  const url = 'https://cccmi-aquality.tk/aquality_server/sampledetail';
  var bodyFormData = new FormData();
  bodyFormData.append('sample_id', item.sample_id);

  useEffect(() => {
    fetch(url, {
      method: 'POST', 
      body: bodyFormData, 
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {setInsectsList(json.insect_list);console.log(json)})
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = StyleSheet.create({
    insectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
      paddingHorizontal: 10
    },
    title: {
      color: colors.text,
    },
    listContainer: {
      backgroundColor: colors.background,
    },
    sectionHeader: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      backgroundColor: 'rgba(0, 147, 135, 0.7)',
      color: 'white',
      height: 40,
      width: '100%',
      marginBottom: 15,
      marginTop: 1,
    },
    textStyle: {
      color: colors.text,
      // textAlign: 'center',
      fontSize: 15,
      backgroundColor: colors.background,
    },
  });

  const renderArduino = () => {
    if (item.sample_tmp) {
      return (
        <View>
          <Text style={styles.sectionHeader}>Sensor Device</Text>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water pH
              </ListItem.Subtitle>
              <Text style={styles.title}>{item.sample_pH}</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Water Temperature
              </ListItem.Subtitle>
              <Text style={styles.title}>{item.sample_tmp}</Text>
            </ListItem.Content>
          </ListItem>
        </View>
      );
    } else return <Text>No sensor device connected.</Text>;
  };

  const renderInsects = () => {
    if(insectsList.length > 0) {
      let comp = []
      comp.push(<Text style={styles.sectionHeader}>Insects</Text>);
      insectsList.map(item => {
        comp.push(
          <View style={styles.insectContainer}>
                <Text style={styles.textStyle}>
                  {item.sample_record_insect}
                </Text>
                <Text style={styles.textStyle}>{item.insect_number}</Text>
              </View>
        )
      })
      return comp;
    } else return <Text>No insects.</Text>
  }

  return (
    <View
      style={styles.listContainer}
      accessibilityLabel={testVariables.historyDetailContainer}
      testID={testVariables.historyDetailContainer}>
      <ScrollView>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Sample taken date</ListItem.Subtitle>
            <Text style={styles.title}>{item.newDate}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Sample Score
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_score}</Text>
          </ListItem.Content>
        </ListItem>
        
        
        <Text style={styles.sectionHeader}>River</Text>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.river_name}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Coordinates (Latitude, Longtitude)
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.latitude}, {item.sample_river.longitude}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.river_code}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.local_authority}</Text>
          </ListItem.Content>
        </ListItem>

        {renderArduino()}
        {renderInsects()}
      </ScrollView>
      
    </View>
  );
};

export default HistoryDetail;
