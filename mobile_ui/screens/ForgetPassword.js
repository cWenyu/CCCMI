import React from 'react';
import {
  View,
  Text,

  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const ForgetPassword = ({ navigation }) => {
  const { colors } = useTheme();

  const [data, setData] = React.useState({
    email: '',
    isValidEmail: true,
    isValidInput: true,
    notExistEmail: true,
    greenTickEmail: false,
  });

  const checkUserEmailExist = async val => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('email', val);

      let response = await axios({
        method: 'post',
        url: 'https://cccmi-aquality.tk/aquality_server/useraccount/checkemail',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const validEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (validEmail.test(val.trim())) {
        if (response && response.data && response.data.status) {
          if (response.data.status === 'Email Not Exist') {
            setData({
              ...data,
              greenTickEmail: false,
              isValidEmail: true,
              notExistEmail: false,
            });
          } else {
            setData({
              ...data,
              email: val,
              greenTickEmail: true,
              isValidEmail: true,
              notExistEmail: true,
            });
          }
        }
      } else {
        setData({
          ...data,
          greenTickEmail: false,
          isValidEmail: false,
          notExistEmail: true,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendEmail = async () => {
    if (
      data.email.length == 0
    ) {
      setData({
        ...data,
        isValidEmail: false,
      });
    } else {
      if (
        data.isValidEmail &&
        data.notExistEmail
      ) {
        try {
          var bodyFormData = new FormData();
          bodyFormData.append('email', data.email);
          let response = await axios({
            method: 'post',
            url:
              'https://cccmi-aquality.tk/aquality_server/useraccount/password_reset',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          console.log(response.data.status);
          if (response.data.status === 'Contact admin to verify email') {
            Alert.alert(
              "Email Not Verified",
              "Contact with the admin to verify your email.",
              [
                { text: "OK" }
              ]
            );
          } else {
            Alert.alert(
              "Email Sent",
              "Check you mailbox for password resetting URL",
              [
                { text: "OK", onPress: () => navigation.navigate('SignInScreen') }
              ]
            );
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };



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
            {data.greenTickEmail ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Please enter a valid email address.
               </Text>
            </Animatable.View>
          )}
          {data.notExistEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Email not exist.</Text>
            </Animatable.View>
          )}


          <View style={styles.button}>
            <TouchableOpacity
              style={styles.changePassword}
              onPress={() => {
                handleSendEmail();
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },

});
