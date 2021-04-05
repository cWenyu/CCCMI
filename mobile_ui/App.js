/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, Button, Alert} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerContent} from './screens/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from './screens/MainTabScreen';
import SafetyGuideScreen from './screens/SafetyGuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import ArduinoScreen from './screens/ArduinoScreen';
import ArduinoScreen2 from './screens/ArduinoScreen2';
import SurveyPage from './screens/SurveyPage';
import SearchRiverScreen from './screens/SearchRiverScreen';
import SearchRiverScreen2 from './screens/SearchRiverScreen2';
import InsectScreen from './screens/InsectScreen';
import selectInsect1 from './screens/selectInsect1';
import AnalyzeInsect from './screens/AnalyzeInsect';
import ResultPage from './screens/ResultPage';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import uploadImage from './screens/uploadImage';
import {AuthContext} from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeScreen';
import testVariables from './appium_automation_testing/test_variables';
import SampleHistoryScreen from './screens/SampleHistoryScreen';
import HistoryDetail from './screens/HistoryDetail';
import HistoryList from './screens/HistoryList';
import {Provider} from 'react-redux';
import store from './components/reduxStore';
import ReportProblem from './screens/ReportProblem';
import PolicyTermsScreen from './screens/PolicyTermsScreen';
import HelpScreen from './screens/HelpScreen';
import ChangePassword from './screens/ChangePassword';

import {
  resetSurveyForm,
  updateSelectionHandlers,
  updateQIndex,
  updateAnswers,
} from './components/reduxStore';
import {useDispatch} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import SurroundingsPhotoScreen from './screens/SurroundingsPhotoScreen';
import InsectsPhotoScreen from './screens/InsectsPhotoScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  {
    console.disableYellowBox = true;
  }
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    username: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          username: action.username,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          username: action.username,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          username: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async userName => {
        try {
          await AsyncStorage.setItem('username', userName);
          dispatch({type: 'LOGIN', userName: userName});
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('username');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      // signUp: () => {},
      // toggleTheme: () => {
      //   setIsDarkTheme(isDarkTheme => !isDarkTheme);
      // },
    }),
    [],
  );

  useEffect(() => {
    const getData = async () => {
      let username;
      username = null;
      try {
        username = await AsyncStorage.getItem('username');
        if (username) {
          authContext.signIn(username);
          //TODO: call the endpoint to get user data
        } else {
          dispatch({type: 'LOGOUT'});
        }
      } catch (e) {
        console.log(e);
        dispatch({type: 'LOGOUT'});
      }
    };
    getData();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const HomeStack = createStackNavigator();
  const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      {/* add screen here */}
      <HomeStack.Screen
        name="SampleHistoryScreen"
        component={SampleHistoryScreen}
        options={{
          title: 'SampleHistoryScreen',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      {/* <HomeStack.Screen
        name="SurroundingsPhotoScreen"
        component={SurroundingsPhotoScreen}
        options={{
          title: 'Sample Surroundings',
          headerRight: () => (
            <Icon.Button
              name="information-circle-outline"
              size={25}
              backgroundColor="#009387"
              onPress={() =>
                Alert.alert(
                  'What to do?',
                  'Upload images of the surroundings of sample site here.',
                )
              }
            />
          ),
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      <HomeStack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{
          title: 'Sample History',
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{
          title: 'History List',
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="SearchRiverScreen"
        component={SearchRiverScreen}
        options={{
          title: 'Search River',
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="SearchRiverScreen2"
        component={SearchRiverScreen2}
        options={{
          title: 'Confirm River',
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </HomeStack.Navigator>
  );

  const TakeSampleStack = createStackNavigator();
  const TakeSampleStackScreen = ({navigation}) => {
    const dispatch = useDispatch();

    return (
      <TakeSampleStack.Navigator initialRouteName="OnboardingScreen2">
        <TakeSampleStack.Screen
          name="ReportProblem"
          component={ReportProblem}
          options={{
            // title: 'Introduction of Taking Sample',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <TakeSampleStack.Screen
          name="OnboardingScreen2"
          component={OnboardingScreen2}
          options={{
            title: 'Introduction of Taking Sample',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <TakeSampleStack.Screen
          name="SurveyPage"
          component={SurveyPage}
          options={{
            title: 'The Survey',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('TakeSampleScreen', {
                            screen: 'SurveyPage',
                          });
                          navigation.navigate('Home');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="SurroundingsPhotoScreen"
          component={SurroundingsPhotoScreen}
          options={{
            title: 'Record Surroundings',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="SearchRiverScreen"
          component={SearchRiverScreen}
          options={{
            title: 'Search River',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="SearchRiverScreen2"
          component={SearchRiverScreen2}
          options={{
            title: 'SearchRiverScreen2',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="ArduinoScreen"
          component={ArduinoScreen}
          options={{
            title: 'ArduinoScreen',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="ArduinoScreen2"
          component={ArduinoScreen2}
          options={{
            title: 'ArduinoScreen2',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="InsectScreen"
          component={InsectScreen}
          options={{
            title: 'InsectScreen',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Icon.Button
                name="ios-home"
                size={25}
                backgroundColor="#009387"
                onPress={() =>
                  Alert.alert(
                    'Hold on!',
                    'Go back to Home will not save your proccess of taking sample.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'BACK',
                        onPress: () => {
                          dispatch(resetSurveyForm());
                          navigation.navigate('SurveyPage');
                          navigation.navigate('HomeScreen');
                        },
                      },
                    ],
                  )
                }
              />
            ),
          }}
        />

        <TakeSampleStack.Screen
          name="selectInsect1"
          component={selectInsect1}
          options={{
            title: 'selectInsect1',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <TakeSampleStack.Screen
          name="AnalyzeInsect"
          component={AnalyzeInsect}
          options={{
            title: 'AnalyzeInsect',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <TakeSampleStack.Screen
          name="UploadInsectsPhoto"
          component={InsectsPhotoScreen}
          options={{
            title: 'Upload Insects Photo',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <TakeSampleStack.Screen
          name="ResultPage"
          component={ResultPage}
          options={{
            title: 'Review',
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </TakeSampleStack.Navigator>
    );
  };

  const SafetyStack = createStackNavigator();
  const SafetyStackScreen = ({navigation}) => (
    <SafetyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SafetyStack.Screen
        name="SafetyGuideScreen"
        component={SafetyGuideScreen}
        options={{
          title: 'Safety Guide',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </SafetyStack.Navigator>
  );
  const PolicyStack = createStackNavigator();
  const PolicyStackScreen = ({navigation}) => (
    <PolicyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <PolicyStack.Screen
        name="PolicyTermsScreen"
        component={PolicyTermsScreen}
        options={{
          title: 'Policy and Terms',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </PolicyStack.Navigator>
  );

  const HelpStack = createStackNavigator();
  const HelpStackScreen = ({navigation}) => (
    <HelpStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HelpStack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          title: 'Help Page',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </HelpStack.Navigator>
  );

  const SettingStack = createStackNavigator();
  const SettingStackScreen = ({navigation}) => (
    <SettingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SettingStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <SettingStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'ChangePassword',
        }}
      />
    </SettingStack.Navigator>
  );

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.username !== null ? (
              <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
                <Drawer.Screen
                  name="TakeSampleScreen"
                  component={TakeSampleStackScreen}
                />

                <Drawer.Screen
                  name="SettingsScreen"
                  component={SettingStackScreen}
                />

                <Drawer.Screen
                  name="SafetyGuideScreen"
                  component={SafetyStackScreen}
                />
                <Drawer.Screen
                  name="PolicyTermsScreen"
                  component={PolicyStackScreen}
                />
                <Drawer.Screen 
                name="HelpScreen" 
                component={HelpStackScreen} 
                />
              </Drawer.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
