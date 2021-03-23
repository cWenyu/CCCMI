import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import DropDown from "../components/index";
import { useTheme } from '@react-navigation/native';

let q1 = {
  title: 'Where did the river data come from?',
  id: 1,
  items: [
    {
      title: 'We    use   river   API    from     catchments.ie   for \ngetting  all  river  data  in  Ireland.',
      id: 2,
    },
  ]
};
let q2 = {
  title: 'How to set up sensor device?',
  id: 1,
  items: [
    {
      title: "Make   sure   you're   outside  for  a   better  signal. \nTurn  on your hardware  device and  immerse  only \nthe  sensor probes  in water.  Before  sending data \nfrom    sensors,    hardware   must   wait  at   least \n3  minutes  after  a  cold  start.",
      id: 2,
    },
  ]
};
let q3 = {
  title: 'How is the sample score calculated?',
  id: 1,
  items: [
    {
      title: 'The  steps   to  calculating  the   SSCS   score   are \nstraightforward;  however, it  is not a  simple linear \ncalculation. The  final  score must take account of \nboth  sensitive  (e.g.  Ecdyonurus  /  March Brown) \nand   pollutiontolerant   (e.g.  Chironomids /  blood \nworms) macroinvertebrates. The presence of high \nconcentrations              of              pollution-tolerant \nmacroinvertebrates    reduces    the    final    score, \nwhile  a  high  abundance   of   sensitive  creatures \nincreases   the   score   towards  its  maximum.',
      id: 2,
    },
  ]
};
let q4 = {
  title: 'How accurate is the AI analysis?',
  id: 1,
  items: [
    {
      title: 'Our AI model is approximately 60 percent accurate. ',
      id: 2,
    },
  ]
};
let q5 = {
  title: "Can't find existing insect from selection?",
  id: 1,
  items: [
    {
      title: 'To     update      new     insects,     send    email    to \nccccmi-csteam@gmail.com   with   the   name  and \nimage attached. Once reviewed, we will update the \nselection   list.',
      id: 2,
    },
  ]
};
let q6 = {
  title: "Can't see hardware device on map?",
  id: 1,
  items: [
    {
      title: "The map will only display available online hardware \nin  your  area   that  has  recently sent   data  to  our \ndatabase    15     minutes.   If     you    cannot    find \nyour device on the map, wait at  least 3 minutes on \na cold start  and make sure your  hardware is close \nto   your  phone's  location.  Poor  GPS   or   mobile \nnetwork  signal in  your  area  could  also   interfere \nwith   data    transmission   from    your    hardware.",
      id: 2,
    },
  ]
};


const HelpScreenTakeSample = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 0,
    },
    header: {
      backgroundColor: '#ededed',
      height: 160,
      width: '100%',
    },
    headerText: {
      paddingTop: 50,
      paddingLeft: 20,
      fontSize: 30,
      color: '#424242',
    },
    headerTextSub:{
      paddingLeft: 23,
      fontSize: 13,
      color: '#424242',
    },
    title: {
      height: 60,
      width: '100%',
    },
    titleText: {
      paddingTop: 20,
      paddingLeft: 20,
      fontSize: 14,
      color: '#424242',
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support</Text>
        <Text style={styles.headerTextSub}>Call +353 838841406 or</Text>
        <Text style={styles.headerTextSub}>Email ccccmi-csteam@gmail.com</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>What problem are you facing?</Text>
      </View>
      <ScrollView>
        <View>
          <DropDown
            title={q1.title}
            id={q1.id}
            items={q1.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q2.title}
            id={q2.id}
            items={q2.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q3.title}
            id={q3.id}
            items={q3.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q4.title}
            id={q4.id}
            items={q4.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q5.title}
            id={q5.id}
            items={q5.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />
          <DropDown
            title={q6.title}
            id={q6.id}
            items={q6.items}
            onChange={(id, title) => {
              console.log(id, title);
            }}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreenTakeSample;


