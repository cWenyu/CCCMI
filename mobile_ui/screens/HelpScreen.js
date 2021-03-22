import React from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem, Icon, Avatar  } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const HelpScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      backgroundColor: '#ededed',
      height: 150,
      width: '100%',
    },
    headerText: {
      paddingTop: 50,
      paddingLeft: 20,
      fontSize: 30,
      color: '#424242',
    },
    headerTitle: {
      height: 60,
      width: '100%',
    },
    headerTitleText: {
      paddingTop: 20,
      paddingLeft: 20,
      fontSize: 14,
      color: '#424242',
    },
    title: {
      color: 'black',
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
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Choose an area you need help</Text>
      </View>
      <View style={styles.listContainer}>

      <ListItem
          Component={TouchableHighlight}
          containerStyle={{}}
          disabledStyle={{ opacity: 0.5 }}
          bottomDivider
          topDivider
          onPress={() => navigation.navigate('HelpScreenTakeSample')}
          pad={20}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Text>Taking Sample</Text>
            </ListItem.Title>
            {/* <ListItem.Subtitle>
              <Text>React Native Elements</Text>
            </ListItem.Subtitle> */}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem
          Component={TouchableHighlight}
          containerStyle={{}}
          disabledStyle={{ opacity: 0.5 }}
          bottomDivider
          topDivider
          onPress={() => navigation.navigate('HelpScreenTakeSample')}
          pad={20}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Text>Viewing Sample</Text>
            </ListItem.Title>
            {/* <ListItem.Subtitle>
              <Text>React Native Elements</Text>
            </ListItem.Subtitle> */}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem
          Component={TouchableHighlight}
          containerStyle={{}}
          disabledStyle={{ opacity: 0.5 }}
          bottomDivider
          topDivider
          onPress={() => navigation.navigate('HelpScreenTakeSample')}
          pad={20}
        >
          <ListItem.Content>
            <ListItem.Title>
              <Text>Setting</Text>
            </ListItem.Title>
            {/* <ListItem.Subtitle>
              <Text>React Native Elements</Text>
            </ListItem.Subtitle> */}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
  );
};

export default HelpScreen;


