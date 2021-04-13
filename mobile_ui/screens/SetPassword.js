import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import axios from 'axios';

const SetPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const { updateSetFirstTime } = React.useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {

      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      width: '90%',

    },
    text_header: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 30,
    },
    text_footer: {
      color: colors.text,
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
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: colors.text,
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
    eye: {
      right: 18,
      position: 'absolute',
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
  });

  const [data, setData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirm_newpassword: '',
    secureTextEntry: true,
    isValidNewPassword: true,
    isPassword: true,
    confirm_secureTextEntry: true,
    oldSecureTextEntry: true,
    isValidInput: true,
    greenTickUser: false,
    greenTickEmail: false,
  });

  const handlePasswordChange = val => {
    const strongPassword = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#$%^&*])(?=.{8,})',
    );
    if (strongPassword.test(val.trim())) {
      setData({
        ...data,
        newPassword: val,
        isValidNewPassword: true,
      });
    } else {
      setData({
        ...data,
        newPassword: val,
        isValidNewPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = val => {
    if (val.trim() == data.newPassword.trim()) {
      setData({
        ...data,
        confirm_newpassword: val,
        isPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_newpassword: val,
        isPassword: false,
      });
    }
  };

  const updateOldSecureTextEntry = () => {
    setData({
      ...data,
      oldSecureTextEntry: !data.oldSecureTextEntry,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleChangePasswordDone = async () => {
    if (
      data.oldPassword.length == 0 &&
      data.newPassword.length == 0 &&
      data.confirm_newpassword.length == 0
    ) {
      setData({
        ...data,
        isValidInput: false,
      });
    } else {
      if (
        data.isValidNewPassword &&
        data.isPassword

      ) {    
        username = await AsyncStorage.getItem('username');
        try {
          var bodyFormData = new FormData();
          bodyFormData.append('username', username);
          bodyFormData.append('old_password', data.oldPassword);
          bodyFormData.append('new_password', data.newPassword);
          bodyFormData.append('confirm_password', data.confirm_newpassword);
          let response = await axios({
            method: 'post',
            url:
              'https://cccmi-aquality.tk/aquality_server/useraccount/change-password',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          if (response && response.data && response.data.status) {
            if (response.data.message === 'Password updated successfully') {
              try {
                var bodyFormData = new FormData();
                userId = await AsyncStorage.getItem('userID');
                bodyFormData.append('user_id', userId);

                let response = await axios({
                  method: 'post',
                  url:
                    'https://cccmi-aquality.tk/aquality_server/useraccount/firstlogin',
                  data: bodyFormData,
                  headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response && response.data && response.data.status) {
                  if (response.data.status === 'First Time Login State Updated to False') {
                    await AsyncStorage.setItem(
                      'isFirstTime',
                      "false",
                    );
                    updateSetFirstTime();
                  }
                }
              } catch (e) {
                console.error(e);
              }

            } else if (response.data.status === 'Check Username and Password') {
              console.log(response.data.status)
              Alert.alert(
                "Incorrect Old Password",
                "Please enter correct old password.",
                [
                  { text: "BACK", onPress: () => console.log("OK Pressed") }
                ]
              );
            } else if (response.data.status === 'Can not use old password') {
              console.log(response.data.status)
              Alert.alert(
                "Can Not Use Old Password",
                "Please enter a new password.",
                [
                  { text: "BACK", onPress: () => console.log("OK Pressed") }
                ]
              );
            } else if (response.data.status === 'This password is too common.') {
              console.log(response.data.status)
              Alert.alert(
                "Password Too Common",
                "Password must contain atleast 1 special character.",
                [
                  { text: "BACK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
          }
        } catch (e) {
          console.error(e);
        }

      }
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Old Password
           </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Old Password"
            secureTextEntry={data.oldSecureTextEntry ? true : false}
            style={styles.textInput}
            placeholderTextColor={colors.placeholder}
            autoCapitalize="none"
            onEndEditing={val => {
              setData({
                ...data,
                oldPassword: val.nativeEvent.text,
              });
            }}
          />
          <TouchableOpacity style={styles.eye} onPress={updateOldSecureTextEntry}>
            {data.oldSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>



        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          New Password
           </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Your New Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            placeholderTextColor={colors.placeholder}
            autoCapitalize="none"
            onEndEditing={val => {
              setData({
                ...data,
                newPassword: val.nativeEvent.text,
              });
              handlePasswordChange(val.nativeEvent.text);
            }}
          />
          <TouchableOpacity style={styles.eye} onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidNewPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Passwords must contain:{'\n'}
                 At least 8 characters, one uppercase letter, one lowercase
                 letter, one number digit, special character.{'\n'}
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Confirm New Password
           </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            placeholderTextColor={colors.placeholder}
            autoCapitalize="none"
            onChangeText={val => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity style={styles.eye} onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password not match.</Text>
          </Animatable.View>
        )}
        {data.isValidInput ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              All fields ablove must be filled.
               </Text>
          </Animatable.View>
        )}


        <View style={styles.button}>
          <TouchableOpacity
            style={styles.changePassword}
            onPress={() => {
              handleChangePasswordDone();
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
                Change Password
                </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetPassword;


