import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot
  } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '../../firebaseConfig';

function TermsAndConditionsScreen({ navigation }) {

  const { fontsLoaded } = useFonts({
    'Montserrat-Regular': require('../../assets/font/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../assets/font/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      console.log('Fonts not loaded');
    } else {
      SplashScreen.hideAsync();
      console.log('Fonts loaded');
    }
  }, [fontsLoaded]);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem2} onPress={() => navigation.navigate('Navigation')}>
            <Icon name="arrow-back" color="black" size={30} />
        </TouchableOpacity>
        <View style={styles.gridItem}>
            <Text style={styles.gridItemText}>Terms & Conditions</Text>
        </View>
        <View style={styles.gridItem}></View>
      </View>

      <View style={styles.sec}>
        <Text style={styles.secText}>These terms and conditions govern your use of the SeniorConnect mobile application created for educational purposes. By downloading or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.</Text>

        <Text style={styles.secText}>1. Purpose
        The SeniorConnect App is designed for educational purposes as part of a school project aimed at providing assistance and connectivity for senior citizens. It offers various features to help elders stay connected with their loved ones, access relevant information, and improve their quality of life.</Text>

        <Text style={styles.secText}>2. Limited License

The SeniorConnect App is provided to you on a limited, non-exclusive, and non-transferable basis solely for your personal, non-commercial use in connection with the school project. You may not use the App for any other purpose without prior written consent from the School.</Text>

<Text style={styles.secText}>3. User Responsibilities

By using the SeniorConnect App, you agree to:

Use the App in compliance with all applicable laws, rules, and regulations.
Respect the privacy and rights of other users and not engage in any unlawful or harmful activities.</Text>

<Text style={styles.secText}>4. Content

The content provided in the SeniorConnect App, including but not limited to text, images, and multimedia, is for educational purposes only. The School does not guarantee the accuracy, completeness, or reliability of any content available through the App.</Text>

<Text style={styles.secText}>5. Privacy

Your privacy is important to us. The School may collect and use personal information in accordance with its Privacy Policy. By using the SeniorConnect App, you consent to the collection, storage, and use of your information as described in the Privacy Policy.</Text>

<Text style={styles.secText}>6. Modifications

The School reserves the right to modify or discontinue the SeniorConnect App at any time without prior notice. We may also update these Terms from time to time. Your continued use of the App after any such changes constitutes your acceptance of the new Terms.</Text>

<Text style={styles.secText}>7. Disclaimer

THE SENIORCONNECT APP IS PROVIDED ON AN "AS-IS" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. THE SCHOOL DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</Text>

<Text style={styles.secText}>8. Limitation of Liability

IN NO EVENT SHALL THE SCHOOL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SENIORCONNECT APP, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</Text>
      </View>
    
    </ScrollView>
  );
}

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf1e7",
    padding: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 10,
    marginBottom:5,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 10,
    marginBottom:5,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
  },
  gridItem2: {
    flex: 1,
    alignItems: 'left',
  },
  gridItemText: {
    textAlign: 'center',
    fontFamily: "Montserrat-Bold",
    fontSize: 20
  },
  eventSec: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  indivEvent: {
    width: "95%",
    height: 280,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    padding: 15,
    paddingTop: 15,
    paddingBottom: 1,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    marginBottom: 10
  },
  indivEventImg: {
    width: "100%",
    height: "70%",
    borderRadius: 20,
  },
  indivEventDesc: {
    paddingTop: 10,
  },
  indivEventDescText1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16
  },
  indivEventDescText2: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#5A5A5A"
  },
  sec: {
    width: "100%",
    height: "100%",
    padding: 10
  },
  secText: {
    paddingBottom: 30,
  }
});

