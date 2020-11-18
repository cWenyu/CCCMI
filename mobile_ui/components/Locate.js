import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions } from 'react-native';

export default class Locate extends Component {
  constructor() {
    super();
    this.location = ''
  }

  _renderInput() {
    let width = Dimensions.get('window').width - 20;
    return (
      <>
        <TextInput
          placeholder='E.g.  Liffey or 74.168462, 45.9812645'
          placeholderTextColor='#FFFFFF'
          width={width}
          style={[styles.localInput]}></TextInput>
      </>
    );
  }

  _searchRiver() {
    alert('onclick')
  }

  _openMap() {

  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={[styles.fonts, styles.titleOne]}>First Step...</Text>
          <Text style={[styles.fonts, styles.titleTwo]}>Locate the river</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          {this._renderInput()}
        </View>
        <Text style={styles.textRemind}>River name or Coordinates</Text>

        <View style={{ marginTop: 50 }}>
          <Button title='search' color='green' onPress={() => this._searchRiver()}></Button>

          <Button title='Locate' onPress={() => this._openMap()}></Button>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 50,
  },
  fonts: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  titleOne: {
    fontWeight: 'bold',
  },
  titleTwo: {
    paddingLeft: 50,
    marginTop: 50,
  },
  textRemind: {
    marginTop: 5,
    paddingLeft: 30,
    color: '#FFFFFF',
  },
  localInput: {
    marginTop: 50,
    borderWidth: 1,
    height: 40,
    borderColor: '#95989A',
    borderRadius: 5,
    fontSize: 15,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
});
