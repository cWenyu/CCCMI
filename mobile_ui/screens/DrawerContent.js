import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../components/context';
import axios from 'axios';

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const {signOut, toggleTheme} = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    username: '',
    email: '',
  });

  const getData = async () => {
    try {
      let username = await AsyncStorage.getItem('username');
      var bodyFormData = new FormData();
      bodyFormData.append('username', username);

      let response = await axios({
        method: 'post',
        url: 'https://cccmi-aquality.tk/aquality_server/useraccount/userdetail',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      if (response && response.data) {
        setData({
          ...data,
          username: username,
          email: response.data.user_email,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{data.username}</Title>
                <Caption style={styles.caption}>{data.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="file-document" color={color} size={size} />
              )}
              label="Safety Guide"
              onPress={() => {
                props.navigation.navigate('SafetyGuideScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons name="policy" color={color} size={size} />
              )}
              label="Policy and Terms"
              onPress={() => {
                props.navigation.navigate('PolicyTermsScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons name="help" color={color} size={size} />
              )}
              label="Help Page"
              onPress={() => {
                props.navigation.navigate('HelpScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
