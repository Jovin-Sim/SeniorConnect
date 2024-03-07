import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

function CharityEventScreen({ navigation }) {
  const eventDetailNavigation = useNavigation();
  const isFocused = useIsFocused();
  const [events, setEvents] = useState([]);

  // Function to fetch events from Firestore and listen for real-time updates
  const fetchEventsRealtime = () => {
    const eventsCollection = collection(db, 'charityEvents');

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
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem2} onPress={() => navigation.navigate('Navigation')}>
            <Icon name="arrow-back" color="black" size={30} />
        </TouchableOpacity>
        <View style={styles.gridItem}>
            <Text style={styles.gridItemText}>Charity</Text>
        </View>
        <View style={styles.gridItem}></View>
      </View>
      <View style={styles.eventSec}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.indivEvent}
            onPress={() => eventDetailNavigation.navigate('EventDetail', { 
              userName: event.userName,
              eventName: event.eventName,
              description: event.description,
              image: event.imageUrl,
              date: event.date,
              location: event.location })}
          >
            <Image source={{ uri: event.imageUrl }} style={styles.indivEventImg} />
            <View style={styles.indivEventDesc}>
              <Text style={styles.indivEventDescText1}>{event.eventName}</Text>
              <Text style={styles.indivEventDescText2}>By {event.userName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default CharityEventScreen;

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
});

