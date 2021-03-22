import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import DropDown from "../components/index";
import { useTheme } from '@react-navigation/native';

let q1 = {
  title: 'Q1',
  id: 1,
  items: [
    {
      title: 'item 3',
      id: 2,
    },
  ]
};
let q2 = {
  title: 'Q2',
  id: 1,
  items: [
    {
      title: 'item 3',
      id: 2,
    },
  ]
};


const HelpScreenTakeSample = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 0,
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
    title: {
      height: 60,
      width: '100%',
    },
    titleText: {
      paddingTop: 20,
      paddingLeft: 20,
      fontSize: 14,
      color: '#424242',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>What problem are you facing?</Text>
      </View>
      <ScrollView>
        <View>
          <DropDown
            title={q1.title}
            id={q1.id}
            items={q1.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreenTakeSample;


