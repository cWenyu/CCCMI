import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import {ListItem, Avatar, Card} from 'react-native-elements';
const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.splashContainer}
      testID={testVariables.splashContainer}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/splashscreen.png')}
          style={styles.logo}
          resizeMode="center"
        />
      </View>

      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: '#009387',
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: 'white',
            },
          ]}>
          Search. Connect. Sample.
        </Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInScreen')}
            accessibilityLabel={testVariables.splashTouchableOpacityButton}
            testID={testVariables.splashTouchableOpacityButton}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 0,
          }}>
          <ListItem containerStyle={{backgroundColor: 'transparent'}}>
            <Avatar source={{uri: 'https://i.ibb.co/YRSzzC7/cccmi-logo.png'}}/>
            <Text style={{color: 'white', fontSize: 18}}>CCCMI</Text>
          </ListItem>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#009387',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
