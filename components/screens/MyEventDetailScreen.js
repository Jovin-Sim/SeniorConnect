import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { addDoc, getDocs, collection, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'; // Import deleteDoc and doc
import { db } from '../../firebaseConfig'; // Import your Firebase configuration
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function MyEventDetailScreen({ navigation, route }) {
  // LOAD FONT
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../../assets/font/Montserrat-Medium.ttf"),
    "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf"),
  });

  // Function to store event details when user joins
  const joinEvent = async (eventDetails,imageURL) => {
    try {
      // Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `event_images/${Date.now()}`);
      await uploadBytes(storageRef, imageURL);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      const userJoinedEventCollection = collection(db, 'userJoinedEvent');
      await addDoc(userJoinedEventCollection, {
        ...eventDetails,
        imageURL: imageURL,
        joinedAt: serverTimestamp(),
      });
      console.log('Event details stored successfully in userJoinedEvent collection');
    } catch (error) {
      console.error('Error storing event details:', error);
    }
  };

 // Function to leave the event
const leaveEvent = async () => {
    try {
      const userJoinedEventCollection = collection(db, 'userJoinedEvent');
      
      // Query the collection to find the document with the matching event name
      const querySnapshot = await getDocs(userJoinedEventCollection);
      const eventDoc = querySnapshot.docs.find(doc => doc.data().eventName === route.params.eventName);
      
      if (eventDoc) {
        // Delete the document with the matching event name
        await deleteDoc(doc(userJoinedEventCollection, eventDoc.id));
        console.log('Event details deleted successfully from userJoinedEvent collection');
         // Display an alert
        Alert.alert('You have left the event');
        navigation.navigate('MyEvents')
      } else {
        console.log('Event not found');
      }
    } catch (error) {
      console.error('Error leaving event:', error);
    }
  };
  
  const handleJoinNow = () => {
    const eventDetails = {
      eventName: route.params.eventName,
      organizerName: route.params.userName,
      date: route.params.date,
      location: route.params.location,
      description: route.params.description,
    };

    const imageURL = route.params.image;
    joinEvent(eventDetails,imageURL);
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
    // Container
    <ScrollView style={styles.container}>
      <View style={styles.heroSec}>
         <TouchableOpacity onPress={() => navigation.navigate("MyEvents")} style={styles.iconCont}>
           <Image source={require("../../assets/img/back.png")} style={styles.iconImg}/>
         </TouchableOpacity>
         <Image source={{ uri: route.params.image }} style={styles.heroSecImg}/>
      </View>
      <View style={styles.secondSec}>
        <View style={styles.secondSecLeft}>
          <Text style={styles.text1}>{route.params.eventName}</Text>
          <Text style={styles.text2}>By {route.params.userName}</Text>
        </View>
         <TouchableOpacity onPress={leaveEvent} style={styles.secondSecRight}>
           <Text style={styles.text3}>Leave Event</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.thirdSec}>
        <View style={styles.thirdSecLeft}>
          <Text style={styles.text4}>{route.params.date}</Text>
        </View>
        <View style={styles.thirdSecRight}>
           <Text style={styles.text5}>{route.params.location}</Text>
        </View>
         <Image source={require("../../assets/img/eventDetailsBackground.jpg")} style={styles.thirdSecImg}/>
      </View>
       <View style={styles.fourthSec}>
        <Text style={styles.text6}>About Event</Text>
        <Text style={styles.text7}>{route.params.description}</Text>
      </View>
       <View style={styles.fifthSec}>
        <Text style={styles.text8}>Points to be claimed:</Text>
        <View style={styles.fifthSecRight}>
          <Image source={require("../../assets/img/eventDetailsBackground.jpg")} style={styles.fifthSecImg}/>
          <Text style={styles.text9}>40 points</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default MyEventDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#242152",
    padding: 0,
    width: "100%",
    height: "100%",
  },
  heroSec: {
    width: "100%",
    height: 350,
    position: "relative",
  },
  heroSecImg: {
    width: "100%",
    height: "100%",
    // opacity: "70%"
  },
  heroBtn: {
    position: "absolute",
    color: "white",
    zIndex: 2,
  },
  iconCont: {
    width: 40,
    height: 40,
    position: "absolute",
    zIndex: 2,
    top: 40,
    left: 10,
    backgroundColor: 'rgba(204, 204, 204, 0.9)',
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  iconImg: {
    width: "80%",
    height: "80%"
  },
  secondSec: {
    width: "100%",
    height: 130,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondSecLeft: {
    width: "65%"
  },
  secondSecRight: {
    backgroundColor: 'rgba(204, 204, 204, 0.9)',
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    padding: 20,
    borderRadius: 20,
  },
  text1: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    paddingBottom: 10,
  },
  text2: {
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  text3: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  thirdSec: {
    width: "95%",
    height: 110,
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  thirdSecImg: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    zIndex: -1,
    position: "absolute",
  },
  thirdSecLeft: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    paddingLeft: 20,
  },
  thirdSecRight: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    paddingRight: 20,
  },
  text4: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    paddingBottom: 10,
  },
  text5: {
    color: "white",
    fontSize: 14,
    paddingBottom: 10,
  },
  fourthSec: {
    width: "100%",
    height: 130,
    padding: 15,
  },
  text6: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    paddingBottom: 10,
  },
  text7: {
    color: "white",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    paddingBottom: 10,
  },
  fifthSec: {
    width: "100%",
    height: "10%",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fifthSecRight: {
    width: 100,
    height: 50,
    display: "flex",
    justifyContent:"center"
  },
  fifthSecImg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: -1,
    position: "absolute",
  },
  text8: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  text9: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    alignSelf: "center",
  },
});
