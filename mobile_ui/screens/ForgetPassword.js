import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';

const ForgetPassword = () => {
  const {colors} = useTheme();
  return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Forget Password</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Email Address
              </Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Email Address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onEndEditing={val => {
                    checkUserEmailExist(val.nativeEvent.text);
                  }}
                />
              </View>
  
            
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.changePassword}
                  onPress={() => {
                    handleSignUp();
                  }}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.changePassword}>
                    <Text
                      style={[
                        styles.textChangePassword,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Send password reset email
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  changePassword: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textChangePassword: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});
