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
export default function PolicyTerms() {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    title: {
      marginTop: 30,
      paddingBottom: 35,
      color: colors.text,
      textAlign: 'center',
    },
    subTitle: {paddingBottom: 5, fontWeight: 'bold', color: colors.text},
    modifyDate: {
      color: colors.text,
      textAlign: 'center',
    },
    contentWrap: {width: '96%'},
    content: {
      textAlign: 'justify',
      paddingBottom: 15,
      color: colors.text,
    },
  });

  return (
    <View style={styles.contentWrap}>
      <Text h4 h4Style={styles.title}>
        AQUALITY 2.0 TERMS & SERVICE and PRIVACY POLICY
      </Text>
      <Text style={styles.modifyDate}>
        Last Updated 17/03/2021 {'\n'}
        Effective Date 17/03/2021{'\n'}
      </Text>
      <Text style={styles.content}>
        CCCMI respects the privacy of our users. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit our mobile application. Please read this Privacy Policy carefully.
        IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT
        ACCESS THE APPLICATION. {'\n\n'}
        We reserve the right to make changes to this Privacy Policy at any time
        and for any reason. We will alert you about any changes by updating the
        “Last updated” date of this Privacy Policy. You are encouraged to
        periodically review this Privacy Policy to stay informed of updates. You
        will be deemed to have been made aware of, will be subject to, and will
        be deemed to have accepted the changes in any revised Privacy Policy by
        your continued use of the Application after the date such revised
        Privacy Policy is posted. {'\n\n'}
        This Privacy Policy does not apply to the third-party online/mobile
        store from which you install the Application or make payments, including
        any in-game virtual items, which may also collect and use data about
        you. We are not responsible for any of the data collected by any such
        third party. {'\n\n'}
        This{' '}
        <Text
          style={{color: 'blue'}}
          onPress={() =>
            Linking.openURL(
              'https://termly.io/resources/templates/privacy-policy-template/',
            )
          }>
          privacy policy
        </Text>{' '}
        was created using Termly.
      </Text>
      <Text style={styles.subTitle}>COLLECTION OF YOUR INFORMATION</Text>
      <Text style={styles.content}>
        We may collect information about you in a variety of ways. The
        information we may collect via the Application depends on the content
        and materials you use, and includes:
      </Text>
      <Text style={styles.subTitle}>Personal Data </Text>
      <Text style={styles.content}>
        Demographic and other personally identifiable information (such as your
        name and email address) that you voluntarily give to us when choosing to
        participate in various activities related to the Application, such as
        chat, posting messages in comment sections or in our forums, liking
        posts, sending feedback, and responding to surveys. If you choose to
        share data about yourself via your profile, online chat, or other
        interactive areas of the Application, please be advised that all data
        you disclose in these areas is public and your data will be accessible
        to anyone who accesses the Application.
      </Text>

      <Text style={styles.subTitle}>Derivative Data </Text>
      <Text style={styles.content}>
        Information our servers automatically collect when you access the
        Application, such as your native actions that are integral to the
        Application, including liking, re-blogging, or replying to a post, as
        well as other interactions with the Application and other users via
        server log files.
      </Text>

      <Text style={styles.subTitle}>Geo-Location Information</Text>
      <Text style={styles.content}>
        We may request access or permission to and track location-based
        information from your mobile device, either continuously or while you
        are using the Application, to provide location-based services. If you
        wish to change our access or permissions, you may do so in your device’s
        settings.
      </Text>

      <Text style={styles.subTitle}>Mobile Device Access</Text>
      <Text style={styles.content}>
        We may request access or permission to certain features from your mobile
        device, including your mobile device’s Bluetooth, calendar, camera,
        microphone, reminders, sensors, storage, and other features. If you wish
        to change our access or permissions, you may do so in your device’s
        settings.
      </Text>

      <Text style={styles.subTitle}>Mobile Device Data </Text>
      <Text style={styles.content}>
        Device information such as your mobile device ID number, model, and
        manufacturer, version of your operating system, phone number, country,
        location, and any other data you choose to provide.
      </Text>

      <Text style={styles.subTitle}>Push Notifications </Text>
      <Text style={styles.content}>
        We may request to send you push notifications regarding your account or
        the Application. If you wish to opt-out from receiving these types of
        communications, you may turn them off in your device’s settings.
      </Text>

      <Text style={styles.subTitle}>Third-Party Data </Text>
      <Text style={styles.content}>
        Information from third parties, such as personal information or network
        friends, if you connect your account to the third party and grant the
        Application permission to access this information.
      </Text>

      <Text style={styles.subTitle}>
        Data From Contests, Giveaways, and Surveys
      </Text>
      <Text style={styles.content}>
        Personal and other information you may provide when entering contests or
        giveaways and/or responding to surveys.
      </Text>

      <Text h4 h4Style={styles.title}>
        USE OF YOUR INFORMATION
      </Text>
      <Text style={styles.content}>
        Having accurate information about you permits us to provide you with a
        smooth, efficient, and customized experience. Specifically, we may use
        information collected about you via the Application to: {'\n\n'}
        1. Compile anonymous statistical data and analysis for use internally or
        with third parties. {'\n'}
        2. Create and manage your account.{'\n'}
        3. Email you regarding your account or order.{'\n'}
        4. Fulfill and manage purchases, orders, payments, and other
        transactions related to the Application.{'\n'}
        5. Generate a personal profile about you to make future visits to the
        Application more personalized.{'\n'}
        6. Increase the efficiency and operation of the Application.{'\n'}
        7. Monitor and analyze usage and trends to improve your experience with
        the Application.{'\n'}
        8. Notify you of updates to the Application.{'\n'}
        9. Offer new products, services, mobile applications, and/or
        recommendations to you.{'\n'}
        10. Perform other business activities as needed.{'\n'}
        11. Request feedback and contact you about your use of the Application.{' '}
        {'\n'}
        12. Resolve disputes and troubleshoot problems.{'\n'}
        13. Respond to product and customer service requests.{'\n'}
        14. Send you a newsletter.{'\n'}
        15. Solicit support for the Application.
      </Text>

      <Text h4 h4Style={styles.title}>
        DISCLOSURE OF YOUR INFORMATION
      </Text>
      <Text style={styles.content}>
        We may share information we have collected about you in certain
        situations. Your information may be disclosed as follows:
      </Text>

      <Text style={styles.subTitle}>By Law or to Protect Rights </Text>
      <Text style={styles.content}>
        If we believe the release of information about you is necessary to
        respond to legal process, to investigate or remedy potential violations
        of our policies, or to protect the rights, property, and safety of
        others, we may share your information as permitted or required by any
        applicable law, rule, or regulation. This includes exchanging
        information with other entities for fraud protection and credit risk
        reduction.
      </Text>

      <Text style={styles.subTitle}>Third-Party Service Providers </Text>
      <Text style={styles.content}>
        We may share your information with third parties that perform services
        for us or on our behalf, including payment processing, data analysis,
        email delivery, hosting services, customer service, and marketing
        assistance.
      </Text>

      <Text style={styles.subTitle}>Third-Party Advertisers </Text>
      <Text style={styles.content}>
        We may use third-party advertising companies to serve ads when you visit
        the Application. These companies may use information about your visits
        to the Application and other websites that are contained in web cookies
        in order to provide advertisements about goods and services of interest
        to you.
      </Text>

      <Text style={styles.subTitle}>Affiliates </Text>
      <Text style={styles.content}>
        We may share your information with our affiliates, in which case we will
        require those affiliates to honor this Privacy Policy. Affiliates
        include our parent company and any subsidiaries, joint venture partners
        or other companies that we control or that are under common control with
        us.
      </Text>

      <Text style={styles.subTitle}>Business Partners </Text>
      <Text style={styles.content}>
        We may share your information with our business partners to offer you
        certain products, services or promotions.
      </Text>

      <Text style={styles.subTitle}>Other Third Parties </Text>
      <Text style={styles.content}>
        We may share your information with advertisers and investors for the
        purpose of conducting general business analysis. We may also share your
        information with such third parties for marketing purposes, as permitted
        by law.
      </Text>

      <Text style={styles.subTitle}>Sale or Bankruptcy </Text>
      <Text style={styles.content}>
        If we reorganize or sell all or a portion of our assets, undergo a
        merger, or are acquired by another entity, we may transfer your
        information to the successor entity. If we go out of business or enter
        bankruptcy, your information would be an asset transferred or acquired
        by a third party. You acknowledge that such transfers may occur and that
        the transferee may decline honor commitments we made in this Privacy
        Policy.{'\n\n'}
        We are not responsible for the actions of third parties with whom you
        share personal or sensitive data, and we have no authority to manage or
        control third-party solicitations. If you no longer wish to receive
        correspondence, emails or other communications from third parties, you
        are responsible for contacting the third party directly.
      </Text>

      <Text h4 h4Style={styles.title}>
        TRACKING TECHNOLOGIES
      </Text>
      <Text style={styles.subTitle}>Cookies and Web Beacons</Text>
      <Text style={styles.content}>
        We may use cookies, web beacons, tracking pixels, and other tracking
        technologies on the Application to help customize the Application and
        improve your experience. When you access the Application, your personal
        information is not collected through the use of tracking technology.
        Most browsers are set to accept cookies by default. You can remove or
        reject cookies, but be aware that such action could affect the
        availability and functionality of the Application. You may not decline
        web beacons. However, they can be rendered ineffective by declining all
        cookies or by modifying your web browser’s settings to notify you each
        time a cookie is tendered, permitting you to accept or decline cookies
        on an individual basis.{'\n\n'}
        You should be aware that getting a new computer, installing a new
        browser, upgrading an existing browser, or erasing or otherwise altering
        your browser’s cookies files may also clear certain opt-out cookies,
        plug-ins, or settings.
      </Text>

      <Text h4 h4Style={styles.title}>
        THIRD-PARTY WEBSITES
      </Text>
      <Text style={styles.content}>
        The Application may contain links to third-party websites and
        applications of interest, including advertisements and external
        services, that are not affiliated with us. Once you have used these
        links to leave the Application, any information you provide to these
        third parties is not covered by this Privacy Policy, and we cannot
        guarantee the safety and privacy of your information. Before visiting
        and providing any information to any third-party websites, you should
        inform yourself of the privacy policies and practices (if any) of the
        third party responsible for that website, and should take those steps
        necessary to, in your discretion, protect the privacy of your
        information. We are not responsible for the content or privacy and
        security practices and policies of any third parties, including other
        sites, services or applications that may be linked to or from the
        Application.
      </Text>

      <Text h4 h4Style={styles.title}>
        SECURITY OF YOUR INFORMATION
      </Text>
      <Text style={styles.content}>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse. Any information
        disclosed online is vulnerable to interception and misuse by
        unauthorized parties. Therefore, we cannot guarantee complete security
        if you provide personal information.
      </Text>

      <Text h4 h4Style={styles.title}>
        POLICY FOR CHILDREN
      </Text>
      <Text style={styles.content}>
        We do not knowingly solicit information from or market to children under
        the age of 18. If you become aware of any data we have collected from
        children under age 18, please contact us using the contact information
        provided below.
      </Text>

      <Text h4 h4Style={styles.title}>
        CONTROLS FOR DO-NOT-TRACK FEATURES
      </Text>
      <Text style={styles.content}>
        Most web browsers and some mobile operating systems [and our mobile
        applications] include a Do-Not-Track (“DNT”) feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. No uniform
        technology standard for recognizing and implementing DNT signals has
        been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard for online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this Privacy Policy.
      </Text>

      <Text h4 h4Style={styles.title}>
        OPTIONS REGARDING YOUR INFORMATION
      </Text>
      <Text style={styles.subTitle}>Account Information</Text>
      <Text style={styles.content}>
        You may at any time review or change the information in your account or
        terminate your account by: {'\n'}
        a. Logging into your account settings and updating your account{'\n'}
        b. Contacting us using the contact information provided below {'\n'}
        Upon your request to terminate your account, we will deactivate or
        delete your account and information from our active databases. However,
        some information may be retained in our files to prevent fraud,
        troubleshoot problems, assist with any investigations, enforce our Terms
        of Use and/or comply with legal requirements.
      </Text>

      <Text style={styles.subTitle}>Emails and Communications</Text>
      <Text style={styles.content}>
        If you no longer wish to receive correspondence, emails, or other
        communications from us, you may opt-out by:{'\n'}a. Noting your
        preferences at the time you register your account with the Application
        {'\n'}b. Logging into your account settings and updating your
        preferences.{'\n'}c. Contacting us using the contact information
        provided below{'\n'}
        If you no longer wish to receive correspondence, emails, or other
        communications from third parties, you are responsible for contacting
        the third party directly.
      </Text>
      <Text h4 h4Style={styles.title}>
        CONTACT US
      </Text>
      <Text style={styles.content}>
        If you have questions or comments about this Privacy Policy, please
        contact us at: {'\n'}
        CCCMI Dundalk Institute of Technology {'\n'}
        Marshes Upper {'\n'}
        Dundalk
      </Text>
    </View>
  );
}
