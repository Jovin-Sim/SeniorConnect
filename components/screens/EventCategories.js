import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


function EventCategoriesScreen({ navigation }) {
  const eventDetailNavigation = useNavigation();
  const isFocused = useIsFocused();
  const [events, setEvents] = useState([]);

  // Function to fetch events from Firestore and listen for real-time updates
  const fetchEventsRealtime = () => {
    const eventsCollection = collection(db, 'events');

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log('Fetched events:', eventsData); // Log fetched events
      setEvents(eventsData);
    });

    // Return the unsubscribe function to clean up the subscription
    return unsubscribe; 
  };

  useEffect(() => {
    // Fetch events and listen for real-time updates when the component mounts
    const unsubscribe = fetchEventsRealtime();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [isFocused]);

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

  console.log('Rendered with events:', events); // Log events when rendered

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
      </View>
      <View style={styles.eventSec}>
      <View style={styles.column}>
                <TouchableOpacity style={styles.indivEvent}  onPress={() => navigation.navigate('LeisureEvent')}>
                    <Image source={require("../../assets/img/extracurricular-activities.png")} style={styles.img}/>
                    <Text>Leisure</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={styles.indivEvent} onPress={() => navigation.navigate('SportEvent')}>
                    <Image source={require("../../assets/img/sports.png")} style={styles.img}/>
                    <Text>Sports</Text>
                </TouchableOpacity >
            </View>
            <View style={styles.column}>
                <TouchableOpacity  style={styles.indivEvent} onPress={() => navigation.navigate('FoodEvent')}>
                    <Image source={require("../../assets/img/cooking.png")} style={styles.img}/>
                    <Text>Food</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={styles.indivEvent} onPress={() => navigation.navigate('CharityEvent')}>
                    <Image source={require("../../assets/img/donation.png")} style={styles.img}/>
                    <Text>Charity</Text>
                </TouchableOpacity >
            </View>
      </View>
    </ScrollView>
  );
}

export default EventCategoriesScreen;

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
  eventSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: "70%"
    },
    column: {
        flex: 1,
    },
    indivEvent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: 200
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 400,
        borderColor: "black",
        borderWidth: 3,
        marginBottom: 5
    },
    // indivEvent: {
    //     width: "100%",
    //     height: 200,
    //     flex: 1,
    //     alignItems: 'center',
    // },
});

