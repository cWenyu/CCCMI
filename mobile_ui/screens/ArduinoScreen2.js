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
import { useDispatch, useSelector } from 'react-redux';
import {
  saveSampleData,
} from '../components/reduxStore';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 240;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ArduinoScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const sampleData = useSelector(state => state.surveyForm.sampleData)
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
        console.log(response.data);
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
          ph: arr[i].pH,
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
                  onPress={() => { dispatch(saveSampleData({...sampleData, sensorData: marker.data }));navigation.navigate('InsectScreen',{riverData: route.params.riverData, surveyData: route.params.surveyData, currentLocation: route.params.currentLocation, sensorData: marker.data, surrounding: route.params.surrounding}) }}
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