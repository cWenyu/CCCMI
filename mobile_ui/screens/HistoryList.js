import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const HistoryList = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { data } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
    },
    listContainer: {
      backgroundColor: colors.background,
    },
  });

  return (
    <View
      style={styles.listContainer}
      accessibilityLabel={testVariables.historyListContainer}
      testID={testVariables.historyListContainer}>
      <ScrollView>
        {
          data.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              containerStyle={styles.listContainer}
              onPress={() => {
                navigation.navigate('HistoryDetail', { item })
              }}
            >
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>Sample ID: {item.sample_id}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default HistoryList;
