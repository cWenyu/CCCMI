import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import { Button} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

let riverNameList = [];
let dateList = [];
let historyData = [];
let url = 'https://cccmi-aquality.tk/aquality_server/samplerecord/?username=';

/**
 * @param {*} {navigation}
 * @description Sample History Screen component
 * @return {SampleHistoryScreen}
 */
const SampleHistoryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [data, setData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    button: {
      width: 200,
      height: 40,
      marginVertical: 10,
      backgroundColor: '#009387',
      padding: 5,
      borderRadius: 15,
    },
    btnText: {
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
    },
    searchContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 35,
    },
    searchTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    riverNameInput: {
      width: '80%',
      textAlign: 'center',
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resultsContainer: {
      marginTop: 20,
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.border,
      marginBottom: 30,
      marginTop: 30,
      height: 85,
      borderRadius: 8,
      width: '95%',
    },
    input: {
      flex: 1,
      paddingTop: 10,
      marginLeft: 0,
      paddingBottom: 10,
      paddingLeft: 12,
      backgroundColor: colors.background,
      color: colors.text,
      borderBottomColor: colors.text,
      borderRadius: 5,
      marginLeft: 25,
    },
  });

  // FOR DATE
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [river, setRiver] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
    filterDate('date', reconstructDate(currentDate));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  // END FOR DATE

  /**
   * @description life hook
   */
  useEffect(() => {
    getUserName().then(userName => {
      fetch(url + userName)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(json => {
          historyData = json;
        })
        .then(() => convertDate())
        .then(() => setValues())
        .then(() => setLoading(false))
        .catch(error => alert(error));
    });

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const getUserName = async () => {
    let username = await AsyncStorage.getItem('username');
    return username;
  };

  /**
   * @function convertDate
   * @description convert fetched data into local data list,
   *              add a new filed called newDate.
   *
   */
  const convertDate = () => {
    for (const el of historyData) {
      if (el.sample_date) {
        el.newDate = reconstructDate(el.sample_date);
      }
    }
  };

  /**
   * @function setValues
   * @description set riverName list and dateList
   *
   */
  const setValues = () => {
    historyData.forEach(ele => {
      riverNameList.push(ele.sample_river.river_name);
      dateList.push(ele.newDate);
    });
  };

  /**
   * @function reconstructDate
   * @param {String} oldDate
   * @description convert data string in new format: YYYY-mm-dd
   */
  const reconstructDate = oldDate => {
    let date1 = new Date(Date.parse(oldDate));
    let year = date1.getFullYear();
    let month =
      date1.getMonth() + 1 < 10
        ? '0' + (date1.getMonth() + 1)
        : date1.getMonth() + 1;
    let date = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();

    let newDate = year + '-' + month + '-' + date;
    return newDate;
  };

  /**
   * @function filterDate
   * @description filter data by date or river names
   * @param {String} filter date or river_name
   * @param {String} value date value or river name list
   */
  const filterDate = (filter, value) => {
    let searchedRivers = [];
    if (filter === 'date') {
      setFilterType('date');
      searchedRivers = historyData.filter(item => item.newDate === value);
    } else {
      for (const val of value) {
        searchedRivers.push(
          historyData.filter(item => item.sample_river.river_name === val)[0],
        );
      }
      setFilterType('river_name');
    }
    setData(searchedRivers);
  };

  /**
   * @function unique
   * @description get unique river object
   * @param {Array} rivers
   * @param {String} filed
   */
  const unique = rivers => {
    let result = {};
    let finalResult = [];

    for (let i = 0; i < rivers.length; i++) {
      result[rivers[i].sample_river.river_name] = rivers[i].sample_river;
    }

    for (let item in result) {
      finalResult.push(result[item]);
    }
    return finalResult;
  };

  /**
   * @function renderResults
   * @description render filtered result into screen
   *
   */
  const renderResults = () => {
    let type = [];
    let riversNotRepeat = [];
    if (filterType === 'All' && historyData.length > 0) {
      riversNotRepeat = unique(historyData);
    } else {
      riversNotRepeat = unique(data);
    }

    riversNotRepeat.forEach(el => {
      type.push(
        <Button
          accessibilityLabel={testVariables.sampleHistorySearchedSample}
          testID={testVariables.sampleHistorySearchedSample}
          title={el.river_name.toString()}
          onPress={() => selectResult(el.river_id)}
          buttonStyle={{ width: 270, height: 50, backgroundColor: '#02ab9e' }}
          containerStyle={{ margin: 5, alignItems: 'center', marginTop: 20 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: '#00F',
          }}
          disabledTitleStyle={{ color: '#00F' }}
          linearGradientProps={null}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          key={el.river_id}
          titleProps={{}}
          titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
        />,
      );
    });

    return type;
  };
  /**
   * @function selectResult
   * @param {number} riverId
   * @description select river by id
   */
  const selectResult = riverId => {
    let select = [];
    if (filterType === 'date') {
      select = historyData.filter(item => {
        if (
          item.sample_river.river_id === riverId &&
          reconstructDate(item.sample_date) == reconstructDate(date)
        )
          return item;
      });
    } else {
      select = historyData.filter(
        item => item.sample_river.river_id === riverId,
      );
    }

    navigation.navigate('HistoryList', { data: select });
  };

  /**
   * @function selectMatchItem
   * @param {String} keyWord
   * @description select matched rivers
   */
  const selectMatchItem = keyWord => {
    let resArr = [];
    keyWord &&
      riverNameList.filter(item => {
        if (item.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0) {
          resArr.push(item);
        }
      });
    filterDate('riverName', resArr);
  };

  /**
   * @function getInput
   * @param {String} text
   * @description get input text value
   */
  const getInput = text => {
    setRiver(text);
  };

  //UI
  return (
    <SafeAreaView
      accessibilityLabel={testVariables.sampleHistoryScreenContainer}
      testID={testVariables.sampleHistoryScreenContainer}>
      <View style={styles.searchContainer}>
        {/* FOR DATE */}
        <TouchableOpacity
          accessibilityLabel={testVariables.sampleHistoryDatePickerController}
          testID={testVariables.sampleHistoryDatePickerController}
          onPress={showDatepicker}
          style={styles.button}>
          <Text style={styles.btnText}>{formatDate(date)}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            accessibilityLabel={testVariables.sampleHistoryDatePicker}
            testID={testVariables.sampleHistoryDatePicker}
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        {/* END OF DATE */}


        <View style={styles.inputContainer}>
          

          <View style={styles.searchSection}>

            <TextInput
              style={styles.input}
              placeholder="River Liffey ..."
              placeholderTextColor={colors.text}
              underlineColorAndroid="transparent"
              onChangeText={text => getInput(text)}
            />
            <Icon.Button
              style={styles.searchIcon}
              name="magnify"
              backgroundColor="transparent"
              size={20}
              color={colors.text}
              onPress={() => selectMatchItem(river)}
            />
          </View>

        </View>
        <ScrollView style={styles.resultsContainer}>
          {renderResults()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SampleHistoryScreen;
