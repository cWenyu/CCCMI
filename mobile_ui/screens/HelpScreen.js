import React from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const HelpScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      backgroundColor: colors.background,
      height: 160,
      width: '100%',

    },
    headerText: {
      paddingTop: 50,
      paddingLeft: 20,
      fontSize: 30,
      color: colors.text,
    },
    headerTextSub:{
      paddingLeft: 23,
      fontSize: 13,
      color: colors.text,
    },
    headerTitle: {
      height: 60,
      width: '100%',
    },
    headerTitleText: {
      paddingTop: 20,
      paddingLeft: 20,
      fontSize: 14,
      color: colors.text,
      fontWeight: 'bold',
    },
    title: {
      color: colors.text,
    },
    listContainer: {
      backgroundColor: colors.background,
      width: '100%',
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support</Text>
        <Text style={styles.headerTextSub}>Call +353 838841406 or</Text>
        <Text style={styles.headerTextSub}>Email ccccmi-csteam@gmail.com</Text>
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Choose an area you need help</Text>
      </View>
      <View style={styles.listContainer}>

        <ListItem
          Component={TouchableHighlight}
          containerStyle={styles.listContainer}
          disabledStyle={{ opacity: 0.5 }}
          bottomDivider
          topDivider
          onPress={() => navigation.navigate('HelpScreenTakeSample')}
          pad={20}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.title}>Take Sample</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <View style={styles.listContainer}>
        <ListItem
          Component={TouchableHighlight}
          containerStyle={styles.listContainer}
          disabledStyle={{ opacity: 0.5 }}
          bottomDivider
          topDivider
          onPress={() => navigation.navigate('HelpScreenViewSample')}
          pad={20}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.title}>View Sample</Text>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

    </View>
  );
};

export default HelpScreen;


