import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Card, ListItem} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const HistoryDetail = ({route}) => {
  const {colors} = useTheme();
  const {item} = route.params;
  const [insectsList, setInsectsList] = useState([]);
  const [uploadedInsect, setUploadedInsect] = useState([]);
  const [surroundingImage, setSurroundingImage] = useState([]);
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
      .then(json => {
        setInsectsList(json.insect_list);
        setUploadedInsect(json.insect_image_list);
        setSurroundingImage(json.environment_image_list);
        console.log(json);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = StyleSheet.create({
    insectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
      paddingHorizontal: 10,
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
      fontSize: 15,
      backgroundColor: colors.background,
    },
    centerText: {
      alignSelf: 'center'
    }
  });

  const renderRiver = () => {
    return (
      <Card>
        <Card.Title>River Data</Card.Title>
        <Card.Divider />
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
            <Text style={styles.title}>
              {item.sample_river.latitude}, {item.sample_river.longitude}
            </Text>
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
            <Text style={styles.title}>
              {item.sample_river.local_authority}
            </Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Canal</ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.canal}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_river.transboundary}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <Text style={styles.title}>
              {item.sample_river.river_catchments}
            </Text>
          </ListItem.Content>
        </ListItem>
      </Card>
    );
  };

  const renderArduino = () => {
    if (item.sample_tmp) {
      return (
        <Card>
          <Card.Title>Sensor Device</Card.Title>
          <Card.Divider />
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
        </Card>
      );
    } else
      return (
        <Card>
          <Card.Title>Sensor Device</Card.Title>
          <Text>No sensor device connected.</Text>
        </Card>
      );
  };

  const renderWeather = () => {
    if (item.sample_weather) {
      return (
        <Card>
          <Card.Title>Weather</Card.Title>
          <Card.Divider />
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Humidity
              </ListItem.Subtitle>
              <Text style={styles.title}>{item.sample_weather.humidity} %</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Pressure
              </ListItem.Subtitle>
              <Text style={styles.title}>
                {item.sample_weather.pressure} mb
              </Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Temperature
              </ListItem.Subtitle>
              <Text style={styles.title}>{item.sample_weather.temp} °C</Text>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={styles.title}>
                Description
              </ListItem.Subtitle>
              <Text style={styles.title}>
                {item.sample_weather.description}
              </Text>
            </ListItem.Content>
          </ListItem>
        </Card>
      );
    } else
      return (
        <Card>
          <Card.Title>Sample Score</Card.Title>
          <Text>{item.sample_score}</Text>
        </Card>
      );
  };

  const renderSampleScore = () => {
    return (
      <Card>
        <Card.Title>Sample score</Card.Title>
        <Card.Divider />
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <Text style={{alignSelf: 'center'}}>{item.sample_score}</Text>
          </ListItem.Content>
        </ListItem>
      </Card>
    );
  };

  const renderInsects = () => {
    if (insectsList.length > 0) {
      let comp = [];
      comp.push(<Card.Title>Insects</Card.Title>);
      comp.push(<Card.Divider />);
      insectsList.map(item => {
        comp.push(
          <View style={styles.insectContainer}>
            <Text style={styles.textStyle}>{item.sample_record_insect}</Text>
            <Text style={styles.textStyle}>{item.insect_number}</Text>
          </View>,
        );
      });
      return <Card>{comp}</Card>;
    } else
      return (
        <Card>
          <Card.Title>Insects</Card.Title>
          <Card.Divider />
          <Text style={styles.centerText}>No insects.</Text>
        </Card>
      );
  };

  const renderInsectImageUpload = () => {
    if (uploadedInsect.length > 0) {
      let comp = [];
      uploadedInsect.map(item => {
        comp.push(
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: item.insect_image_path,
            }}
          />,
        );
      });

      return (
        <Card>
          <Card.Title>Insects image upload</Card.Title>
          <Card.Divider />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{comp}</View>
        </Card>
      );
    } else
      return (
        <Card>
          <Card.Title>Insects image upload</Card.Title>
          <Card.Divider />
          <Text>No insect image uploaded.</Text>
        </Card>
      );
  };

  const renderSurroundingImage = () => {
    if (surroundingImage.length > 0) {
      let comp = [];
      surroundingImage.map(item => {
        comp.push(
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: item.river_image_path,
            }}
          />,
        );
      });

      return (
        <Card>
          <Card.Title>Surrounding image upload</Card.Title>
          <Card.Divider />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>{comp}</View>
        </Card>
      );
    } else
      return (
        <Card>
          <Card.Title>Surrounding image upload</Card.Title>
          <Card.Divider />
          <Text>No insect image uploaded.</Text>
        </Card>
      );
  };

  const renderDate = () => {
    return (
      <Card>
        <Card.Title>Date sample taken</Card.Title>
        <Card.Divider />
        <Text style={{alignSelf: 'center'}}>{item.sample_date.substring(0,10)}</Text>
      </Card>
    )
  }

  return (
    <View
      style={styles.listContainer}
      accessibilityLabel={testVariables.historyDetailContainer}
      testID={testVariables.historyDetailContainer}>
      <ScrollView>
        {renderDate()}
        {renderRiver()}
        {renderSampleScore()}
        {renderArduino()}
        {renderWeather()}
        {renderInsects()}
        {renderInsectImageUpload()}
        {renderSurroundingImage()}
      </ScrollView>
    </View>
  );
};

export default HistoryDetail;
