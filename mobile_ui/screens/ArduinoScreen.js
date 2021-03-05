import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { mapDarkStyle, mapStandardStyle } from '../model/mapData';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 240;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ArduinoScreen = ({ navigation, route }) => {
  const theme = useTheme();
  let markers = [];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBox: {
      position: 'absolute',
      marginTop: Platform.OS === 'ios' ? 40 : 20,
      flexDirection: "row",
      backgroundColor: '#fff',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    chipsScrollView: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 90 : 80,
      paddingHorizontal: 10
    },
    chipsIcon: {
      marginRight: 5,
    },
    chipsItem: {
      flexDirection: "row",
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 8,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      height: 35,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    scrollView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      // padding: 10,
      elevation: 2,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    textContent: {
      flex: 2,
      padding: 10,
    },
    cardtitle: {
      fontSize: 19.5,
      marginTop: 5,
      marginBottom: 5,
      fontWeight: "bold",
      //textDecorationLine: 'underline',
      color: theme.colors.text,
    },
    cardDescription: {
      fontSize: 16,
      color: "#4f4f4f",
      marginBottom: 5,
      color: theme.colors.placeholder,
    },
    cardDescriptionTitle: {
      fontSize: 16,
      color: "#4f4f4f",
      marginBottom: 5,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
    },
    marker: {
      width: 30,
      height: 30,
    },
    button: {
      marginTop: 5,
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      width: 150,
      height: 40,
    },
    signIn: {
      width: '100%',
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
    },
    textSign: {
      fontSize: 14,
      fontWeight: 'bold'
    }
  });

  const initialMapState = {
    markers,
    categories: [
      {
        name: 'Fastfood Center',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'Restaurant',
        icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Dineouts',
        icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Snacks Corner',
        icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Hotel',
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    region: {
      latitude: parseFloat(route.params.currentLocation.latitude),
      longitude: parseFloat(route.params.currentLocation.longitude),
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.060142817690068,
    },
  };


  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    getHardwareDataNearby();
    console.log(JSON.stringify(route.params));
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }, []);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    if (_scrollView.current && _scrollView.current.getNode) {
      const node = _scrollView.current.getNode();
      if (node) {
        node.scrollTo({ x: x, y: 0 });
      }
    }
  }

  const getHardwareDataNearby = async () => {
    try {
      let response = await axios.get(
        'https://cccmi-aquality.tk/aquality_server/all_hardware_near',
        {
          params: {
            latitude: route.params.currentLocation.latitude,
            longitude: route.params.currentLocation.longitude,
          },
        },
      );
      if (response) {
        setMarkersArr(response.data);
      } else {
        console.log("No hardware online...");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setMarkersArr = (arr) => {
    let arrLength = arr.length;
    let tempArr = [];
    for (let i = 0; i < arrLength; i++) {
      tempArr[i] = {
        coordinate: {
          latitude: parseFloat(arr[i].latitude),
          longitude: parseFloat(arr[i].longitude),
        },
        data: {
          deviceId: arr[i].arduino_id,
          ph: arr[i].ph,
          temp: arr[i].temp,
          date: arr[i].date_captured,
        }
      };
    }
    setState({
      ...state,
      markers: tempArr,
    })
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
      <Marker
          coordinate={{
            latitude: parseFloat(route.params.currentLocation.latitude),
            longitude: parseFloat(route.params.currentLocation.longitude),
          }}
          title="Your Location"
        >
          <Image source={require('../assets/pin-person.png')} style={{ height: 45, width: 45 }} />
        </Marker>
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>

            <View style={styles.textContent}>
              <Text style={styles.cardtitle}>Water Monitoring Hardware</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardDescriptionTitle}>Device ID:</Text><Text style={styles.cardDescription}> {marker.data.deviceId}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardDescriptionTitle}>pH Value:</Text><Text style={styles.cardDescription}> {marker.data.ph}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardDescriptionTitle}>Temperature:</Text><Text style={styles.cardDescription}> {marker.data.temp}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardDescriptionTitle}>Date:</Text>
                <Text style={styles.cardDescription}>
                  {' '}{marker.data.date.substring(
                    0,
                    marker.data.date.indexOf('T'),
                  )}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cardDescriptionTitle}>Time:</Text>
                <Text style={styles.cardDescription}>
                  {' '}{marker.data.date.substring(
                    marker.data.date.indexOf('T') + 1,
                    16,
                  )}
                </Text>
              </View>


              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate('InsectScreen',{riverData: route.params.riverData, surveyData: route.params.surveyData, currentLocation: route.params.currentLocation, sensorData: marker.data, surrounding: route.params.surrounding}) }}
                  style={[styles.signIn, {
                    backgroundColor: '#009387',
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: 'white'
                  }]}>SELECT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ArduinoScreen;


//-------------------------------------------------
// import React, { useState } from 'react';
// import {   StyleSheet,
//   TextInput,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform, } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Text } from 'react-native-elements';
// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import * as Animatable from 'react-native-animatable';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import testVariables from '../appium_automation_testing/test_variables';
// import { Button } from 'react-native-elements';
// import { color } from 'react-native-reanimated';
// import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
// import { useTheme } from '@react-navigation/native';


// const ArduinoScreen = ({ navigation, route }) => {

//   React.useEffect(() => {
//     if (route.params) {
//       console.log(JSON.stringify(route.params));
//     }
//   }, [route.params])

//   const [data, setData] = React.useState({
//     arduinoId: '',
//     notValidDeviceId: true,
//     notEmptyDeviceId: true,
//   });
//   const textInputChange = val => {
//     setData({
//       ...data,
//       arduinoId: val,
//     });
//   };
//   const { colors } = useTheme();
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     title: {
//       paddingBottom: 70,
//       color: colors.text,
//     },
//     searchSection: {
//       // flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: colors.border,
//       marginBottom: 30,
//       height: 85,
//       borderRadius: 8,
//       width: '95%',
//     },
//     input: {
//       flex: 1,
//       paddingTop: 10,
//       marginLeft: 13,
//       marginRight:13,
//       paddingBottom: 10,
//       paddingLeft: 8,
//       backgroundColor: colors.background,
//       color: colors.text,
//       borderBottomColor: colors.text,
//       borderRadius: 5,
//     },
//     errorMsg: {
//       color: '#FF0000',
//       fontSize: 14,
//       marginBottom: 20,
//     },
//     searchIcon: {
//       marginLeft: 3,
//       paddingRight: 0,
//     }
//   });

//   const storeData = async value => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('arduino', jsonValue);
//       console.log('stored data: ' + jsonValue);
//     } catch (e) {
//       // saving error
//     }
//   };

//   const checkDeviceId = async () => {
//     if (data.arduinoId.length == 0) {
//       setData({
//         ...data,
//         notEmptyDeviceId: false,
//       });
//     } else {
//       try {
//         let response = await axios.get(
//           'https://cccmi-aquality.tk/aquality_server/data',
//           {
//             params: {
//               arduino_id: data.arduinoId,
//             },
//           },
//         );
//         if (response && response.data && response.data.length == 1) {
//           if (response.data[0].arduino_id == data.arduinoId) {
//             setData({
//               ...data,
//               notValidDeviceId: true,
//               notEmptyDeviceId: true,
//             });
//             //save response to async storage
//             storeData(response.data[0]);
//             navigation.navigate('ArduinoScreen2', route.params);
//           }
//         } else {
//           setData({
//             ...data,
//             notValidDeviceId: false,
//             notEmptyDeviceId: true,
//           });
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };

//   return (
//     <View
//       style={styles.container}
//       accessibilityLabel={testVariables.arduinoScreenContainer}
//       testID={testVariables.arduinoScreenContainer}>
//       <Text h4 h4Style={styles.title}>
//         Have a sensor device?
//       </Text>
//       <View style={styles.searchSection}>
//         <TextInput
//           accessibilityLabel={testVariables.arduinoScreenIDTextInput}
//           testID={testVariables.arduinoScreenIDTextInput}
//           placeholder="Insert your Device ID"
//           placeholderTextColor={colors.text}
//           style={styles.input}
//           onChangeText={val => {
//             textInputChange(val);
//           }}
//         />
//       </View>
//       {data.notEmptyDeviceId ? null : (
//         <Animatable.View animation="fadeInLeft" duration={500}>
//           <Text style={styles.errorMsg}>Device ID field connot be empty.</Text>
//         </Animatable.View>
//       )}
//       {data.notValidDeviceId ? null : (
//         <Animatable.View animation="fadeInLeft" duration={500}>
//           <Text style={styles.errorMsg}>Device with device ID not found.</Text>
//         </Animatable.View>
//       )}
//       <Button
//         title="Search Your Device"
//         onPress={() => {
//           checkDeviceId();
//         }}
//         buttonStyle={{ width: 250, height: 50, backgroundColor: "#02ab9e", borderRadius: 5, }}
//         containerStyle={{ margin: 5, alignItems: "center", marginTop: 55 }}
//         disabledStyle={{
//           borderWidth: 2,
//           borderColor: "#00F"
//         }}
//         disabledTitleStyle={{ color: "#00F" }}
//         linearGradientProps={null}
//         loadingProps={{ animating: true }}
//         loadingStyle={{}}
//         titleProps={{}}
//         titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
//       />
//       <Button
//         buttonStyle={{ width: 95, height: 35, backgroundColor: colors.backdrop }}
//         containerStyle={{ margin: 5, alignItems: 'center', marginTop: 32 }}
//         disabledStyle={{
//           borderWidth: 2,
//           borderColor: '#00F',
//         }}
//         disabledTitleStyle={{ color: '#00F' }}
//         linearGradientProps={null}

//         loadingProps={{ animating: true }}
//         loadingStyle={{}}
//         onPress={() => navigation.navigate('InsectScreen', route.params)}
//         title="skip"
//         titleProps={{}}
//         titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
//       />
//     </View>
//   );
// };
// export default ArduinoScreen;

//-------------------------------------------------------
// const mapDarkStyle = [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#212121"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#212121"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.country",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#9e9e9e"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.locality",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#bdbdbd"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#181818"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#616161"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1b1b1b"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#2c2c2c"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#8a8a8a"
//       }
//     ]
//   },
//   {
//     "featureType": "road.arterial",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#373737"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#3c3c3c"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway.controlled_access",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#4e4e4e"
//       }
//     ]
//   },
//   {
//     "featureType": "road.local",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#616161"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#757575"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#000000"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#3d3d3d"
//       }
//     ]
//   }
// ];

// const mapStandardStyle = [
//   {
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
// ];

// const ArduinoScreen = ({ navigation, route }) => {
//   const colors = useTheme();

//   const [location, setLocation] = useState({
//     latitude: undefined,
//     longitude: undefined,
//   });

//   React.useEffect(() => {
//     if (route.params) {
//       console.log(JSON.stringify(route.params));
//     }
//     setLocation({ latitude: route.params.currentLocation.latitude, longitude: route.params.currentLocation.longitude });
//   }, [route.params])

//   return (
//     <MapView
//       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={styles.map}
//       customMapStyle={colors.dark ? mapDarkStyle : mapStandardStyle}
//       region={{
//         latitude: parseFloat(location.latitude),
//         longitude: parseFloat(location.longitude),
//         latitudeDelta: 0.04,
//         longitudeDelta: 0.08,
//       }}
//     >
//       <Marker
//         coordinate={{
//           latitude: parseFloat(location.latitude),
//           longitude: parseFloat(location.longitude),
//         }}
//         image={require('../assets/map_marker.png')}
//         title="Test Title"
//         description="This is the test description"
//       >
//         <Callout tooltip>
//           <View>
//             <View style={styles.bubble}>
//               <Text style={styles.name}>Hardware Data</Text>
//               <Text>A short description</Text>
//               <Button
//                 title="Search Your Device"
//                 onPress={() => {
//                   checkDeviceId();
//                 }}
//                 buttonStyle={{ width: 100, height: 25, backgroundColor: "#02ab9e", borderRadius: 5, }}
//                 containerStyle={{ margin: 5, alignItems: "center", marginTop: 55 }}
//                 disabledStyle={{
//                   borderWidth: 2,
//                   borderColor: "#00F"
//                 }}
//                 disabledTitleStyle={{ color: "#00F" }}
//                 linearGradientProps={null}
//                 loadingProps={{ animating: true }}
//                 loadingStyle={{}}
//                 titleProps={{}}
//                 titleStyle={{ marginHorizontal: 22, fontSize: 18 }}
//               />
//             </View>
//             <View style={styles.arrowBorder} />
//             <View style={styles.arrow} />
//           </View>
//         </Callout>
//       </Marker>
//       <Marker
//         coordinate={{
//           latitude: 53.9876929,
//           longitude: -6.3765667,
//         }}
//         image={require('../assets/map_marker.png')}
//         title="Test Title"
//         description="This is the test description"
//       >
//         <Callout tooltip>
//           <View>
//             <View style={styles.bubble}>
//               <Text style={styles.name}>Hardware Data</Text>
//               <Text>A short description</Text>
//               <Image
//                 style={styles.image}
//                 source={require('../assets/banners/food-banner1.jpg')}
//               />
//             </View>
//             <View style={styles.arrowBorder} />
//             <View style={styles.arrow} />
//           </View>
//         </Callout>
//       </Marker>
//     </MapView>
//   );
// };

// export default ArduinoScreen;

// const styles = StyleSheet.create({
//   map: {
//     height: '100%'
//   },
//   // Callout bubble
//   bubble: {
//     flexDirection: 'column',
//     alignSelf: 'flex-start',
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     borderColor: '#ccc',
//     borderWidth: 0.5,
//     padding: 15,
//     width: 150,
//   },
//   // Arrow below the bubble
//   arrow: {
//     backgroundColor: 'transparent',
//     borderColor: 'transparent',
//     borderTopColor: '#fff',
//     borderWidth: 16,
//     alignSelf: 'center',
//     marginTop: -32,
//   },
//   arrowBorder: {
//     backgroundColor: 'transparent',
//     borderColor: 'transparent',
//     borderTopColor: '#007a87',
//     borderWidth: 16,
//     alignSelf: 'center',
//     marginTop: -0.5,
//     // marginBottom: -15
//   },
//   // Character name
//   name: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   // Character image
//   image: {
//     width: "100%",
//     height: 80,
//   },
// });


//----------------------------------