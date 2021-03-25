import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import DetailsScreen from './DetailsScreen';
import InsectScreen from './InsectScreen';
import ArduinoScreen from './ArduinoScreen';
import ArduinoScreen2 from './ArduinoScreen2';
import ResultPage from './ResultPage';

const InsectStack = createStackNavigator();
import selectInsect1 from './selectInsect1';
import AnalyzeInsect from './AnalyzeInsect';

import testVariables from '../appium_automation_testing/test_variables';

const DetailsStack = createStackNavigator();
const ArduinoStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Details" activeColor="#fff" shifting>
    <Tab.Screen
      name="Details"
      component={DetailsStackScreen}
      options={{
        tabBarAccessibilityLabel: testVariables.mainTabScreenDetailsTab,
        tabBarTestID: testVariables.mainTabScreenDetailsTab,
        tabBarLabel: 'Details',
        tabBarColor: '#334E68',
        tabBarIcon: ({color}) => (
          <Icon name="information-outline" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Arduino"
      component={ArduinoStackScreen}
      options={{
        tabBarAccessibilityLabel: testVariables.mainTabScreenArduinoTab,
        tabBarTestID: testVariables.mainTabScreenArduinoTab,
        tabBarLabel: 'Sensors',
        tabBarColor: '#616E7C',
        tabBarIcon: ({color}) => (
          <Icon name="cube-outline" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Insect"
      component={InsectStackScreen}
      options={{
        tabBarAccessibilityLabel: testVariables.mainTabScreenInsectTab,
        tabBarTestID: testVariables.mainTabScreenInsectTab,
        tabBarLabel: 'Insects',
        tabBarColor: '#857F72',
        tabBarIcon: ({color}) => (
          <Icon name="bug-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const ArduinoStackScreen = ({navigation}) => (
  <ArduinoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#616E7C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ArduinoStack.Screen
      name="ArduinoScreen1"
      component={ArduinoScreen}
      options={{
        title: 'Sensor Device',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#616E7C"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <ArduinoStack.Screen
      name="ArduinoScreen2"
      component={ArduinoScreen2}
      options={{
        title: 'Device Details',
      }}
    />
  </ArduinoStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#334E68',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="River Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#334E68"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const InsectStackScreen = ({navigation}) => (
  <InsectStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#857F72',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <InsectStack.Screen
      name="Insect"
      component={InsectScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#857F72"
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button
            tabBarAccessibilityLabel={testVariables.showResultIcon}
            tabBarTestID={testVariables.showResultIcon}
            name="checkmark-outline"
            size={25}
            backgroundColor="#857F72"
            onPress={() => navigation.navigate('ResultPage')}
          />
        ),
      }}
    />

    <InsectStack.Screen
      name="selectInsect1"
      component={selectInsect1}
      options={{
        title: 'Select Insects Group',
      }}
    />
    <InsectStack.Screen
      name="AnalyzeInsect"
      component={AnalyzeInsect}
      options={{
        title: 'Analyze Insect',
      }}
    />
    {/* temporily inside insect stack */}
    <InsectStack.Screen
      name="ResultPage"
      component={ResultPage}
      options={{
        title: 'Review',
      }}
    />
  </InsectStack.Navigator>
);
