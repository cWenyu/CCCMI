import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native-elements';
export default function GuideContent() {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    title: {
      marginTop: 30,
      paddingBottom: 35,
      color: colors.text,
      textAlign: 'center',
    },
    subTitle: {paddingBottom: 5, fontWeight: 'bold'},
    contentWrap: {width: '96%'},
    content: {
      textAlign: 'justify',
      paddingBottom: 15,
    },
  });

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <View style={styles.contentWrap}>
        <Text h4 h4Style={styles.title}>
          Safety Guide
        </Text>
        <Text style={styles.content}>
          Health and safety should be top of the list for everyone, no matter
          how routine the activity. Working in and near water requires your
          attention to safety matters. {'\n'}
          Typical risks that should be considered before carrying out taking
          river sampling and their associated control measures are displayed in
          safety guide. This guideline does not represent a complete risk
          assessment and should be considered as supplementary information only.
          User should adhere to the health and safety policy/procedures of their
          own organization, club, trust, or employer as appropriate. {'\n'}
          Common sense and respect for conditions - especially following heavy
          rain when streams can be flooded – require particular attention.
          Remember - health and safety matters!
        </Text>
        <Text style={styles.subTitle}>1. Lone sampling</Text>
        <Text style={styles.content}>
          Risk might happen when taking sampling alone accident with no support
          or under assault. Please make sure your mobile phone with enough power
          supply; inform someone of movements and planned return times.
        </Text>
        <Text style={styles.subTitle}>2. Working in water </Text>
        <Text style={styles.content}>
          a. Risk might happen when hypothermia. Please wear appropriate
          clothing; avoid becoming wet; bring spare set of clothes; take shelter
          when appropriate. {'\n'}
          b. Harmful substances and Weil’s Disease. Pleas wear appropriate
          personal protective equipment (PPE) such as footwear and gloves and
          follow good hygiene procedures; ensure no wounds are exposed to raw
          water. Be aware of risk of Weil’s Disease. {'\n'}
          c. Drowning. Although small streams are generally shallow, drowning
          should always be considered as a risk when working in water and life
          jackets or buoyancy aids should always be worn. Operators should not
          work in water deeper than knee-deep. {'\n'}
          d. Slips and trips. Care is needed on wet surfaces and when entering
          and leaving the stream. A staff or pond net handle should be used to
          provide support and balance while walking and also to test for deeper
          pools in turbid waters.
        </Text>
        <Text style={styles.subTitle}>
          3. Working adjacent to roads Strike by moving vehicle.
        </Text>
        <Text style={styles.content}>
          Wear appropriate high-visibility PPE. Park vehicle in appropriate
          location.
        </Text>
        <Text style={styles.subTitle}>
          4. Working in remote areas Danger of hypothermia/drowning.
        </Text>
        <Text style={styles.content}>
          Operators should work in pairs in remote Areas.
        </Text>
        <Text style={styles.subTitle}>5. Summer sampling Sunburn.</Text>
        <Text style={styles.content}>
          Use appropriate protection factor sun cream.
        </Text>

        <Text h4 h4Style={styles.title}>
          Biosecurity
        </Text>
        <Text style={styles.subTitle}>The Problem</Text>
        <Text style={styles.content}>
          Invasive, non-native species can have a damaging impact on native
          plants, animals and ecosystems by spreading disease, competing for
          habitat and food and direct predation. Plants that grow profusely can
          block waterways while some animals can damage riverbanks. Anyone who
          uses waterways may be unknowingly helping to spread invasive species
          from one water body to another in equipment, shoes and clothing.
        </Text>
        <Text style={styles.subTitle}>Three Simple Steps </Text>

        <Text style={styles.content}>
          1.Check: All clothing and equipment should be thoroughly inspected and
          any visible debris (mud, plant or animal matter) should be removed and
          left at the water body where it was found. Particular attention must
          be paid to the seams and seals of boots and waders. Any pockets of
          pooled water should be emptied. {'\n'}
          2.Clean: Equipment should be hosed down or pressure-washed on site. If
          facilities are not available, equipment should be carefully contained,
          e.g. in plastic bags, until such facilities are available. Washings
          should be left at the water body where the equipment was used, or
          contained and not allowed to enter any other watercourse or drainage
          system (i.e. do not put them down the drain or sink). Where possible,
          clean equipment should be dipped in disinfectant solution (e.g.
          Virkon) to kill diseases, but note this is unlikely to kill nonnative
          species. {'\n'}
          3.Dry: Thoroughly drying is the best method for disinfecting clothing
          and equipment. Boots and nets should be hung up to dry. Equipment
          should be thoroughly dry for 48 hours before it is used elsewhere.
          Some non-native species can survive for as many as 15 days in damp
          conditions and up to 2 days in dry conditions, so the drying process
          must be thorough.
        </Text>

        <TouchableOpacity
          style={styles.content}
          onPress={() =>
            Linking.openURL(
              'https://atlanticsalmontrust.org/wp-content/uploads/2017/01/SMALL_STREAMS_-final-vAD10.pdf',
            )
          }>
          <Text style={{color: 'blue'}}>Guide reference</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
