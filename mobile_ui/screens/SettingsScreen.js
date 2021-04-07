import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListItem, Icon} from 'react-native-elements';

const SettingsScreen = ({navigation}) => {
  const {colors} = useTheme();

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
  return (
    <View
      style={styles.listContainer}>
      <ScrollView>
      <ListItem 
      bottomDivider 
      containerStyle={styles.listContainer}
                  onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Change Password</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
      
    </View>
  );
};

export default SettingsScreen;
