// FeedbackScreen.js
import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
  } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import {Picker} from "@react-native-picker/picker"

function FeedbackScreen({ navigation }) {
  // LOAD FONT
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    // "Montserrat-SemiBold": require("../../assets/font/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../../assets/font/Montserrat-Medium.ttf"),
    "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf"),
  });

  const [feedback, setFeedback] = useState('');

  const saveFeedbackToFirestore = async (feedbackData) => {
    try {
      const db = getFirestore();
      const feedbackRef = collection(db, 'feedback');
      const feedbackDoc = await addDoc(feedbackRef, {
        feedback: feedbackData,
        timestamp: serverTimestamp(),
      });
      console.log('Feedback document written with ID: ', feedbackDoc.id);
      setFeedback('');
      Alert.alert('Feedback have been submitted successfully!');
      // Optionally, you can show a success message or navigate to another screen
    } catch (error) {
      console.error('Error adding feedback: ', error);
      // Optionally, you can show an error message to the user
    }
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Navigation')}>
        <Icon name="arrow-back" color="black" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Give Feedback</Text>
      </View>
      <View style={styles.sec}>
       <Text style={styles.text1}>Tell us something</Text>
       <TextInput
            style={styles.textInput}
            placeholder="Enter your text here"
            onChangeText={(text) => setFeedback(text)}
            value={feedback}
       />
       <TouchableOpacity onPress={() => saveFeedbackToFirestore(feedback)}>
            <View style={styles.btn}>
                <Text style={styles.text2}>Share Feedback</Text>
            </View>
       </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
}

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf1e7",
    padding: 0,
    width: "100%",
    height: "100%",
  },

text: {
    marginLeft: 10
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
headerText: {
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 'auto', // Pushes "Give Feedback" text to the center
    marginRight: 'auto', // Pushes "Give Feedback" text to the center
    fontFamily: "Montserrat-Bold",

},
sec: {
    width: "100%",
    height: 500,
    padding: 10,
    marginTop: 30,
    paddingHorizontal: 25
},
textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 300,
    fontSize: 16,
},
btn: {
    marginTop: 10,
    width: "100%",
    height: 80,
    backgroundColor: "black",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center"

},
text1: {
    fontFamily: "Montserrat-Medium",
    marginBottom: 10
},
text2: {
    // paddingVertical: 20,
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 18
   
}

  
});

