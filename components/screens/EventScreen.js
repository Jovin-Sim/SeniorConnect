// // EventScreen.js
// import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import React, { useState, useEffect } from "react";
// import { useNavigation } from '@react-navigation/native';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from "../../firebaseConfig";

// function EventScreen({ navigation }) {
//   // Use the useNavigation hook to get the navigation object
//   const eventDetailNavigation = useNavigation();
//   const [events, setEvents] = useState([]);

//   // Function to fetch events from Firestore
//   const fetchEvents = async () => {
//     try {
//       const eventsCollection = collection(db, 'events');
//       const snapshot = await getDocs(eventsCollection);
//       const eventsData = snapshot.docs.map(doc => doc.data());
//       setEvents(eventsData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   // Example event handler for navigating to EventDetail
//   const handleNavigateToEventDetail = (event) => {
//     navigation.navigate('EventDetail', { 
//       userName: event.userName,
//       eventName: event.eventName,
//       description: event.description,
//       image: event.imageUrl,
//       date: event.date,
//       location: event.location
//     });
//   };

//   // LOAD FONT
//   const [fontsLoaded] = useFonts({
//     "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
//     "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
//     "Montserrat-Medium": require("../../assets/font/Montserrat-Medium.ttf"),
//     "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf"),
//   });
  
//   useEffect(() => {
//     // Fetch events when the component mounts
//     fetchEvents();

//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare();
//   }, []);

//   if (!fontsLoaded) {
//     return undefined;
//   } else {
//     SplashScreen.hideAsync();
//   }

//   return (
//     // Container
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>All events</Text>
//       </View>
//       <View style={styles.eventSec}>
//         {events.map((event, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.indivEvent}
//             onPress={() => handleNavigateToEventDetail(event)}
//           >
//             <Image source={{ uri: event.imageUrl }} style={styles.indivEventImg} />
//             <View style={styles.indivEventDesc}>
//               <Text style={styles.indivEventDescText1}>{event.eventName}</Text>
//               <Text style={styles.indivEventDescText2}>By {event.userName}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// export default EventScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fdf1e7",
//     padding: 0,
//     width: "100%",
//     height: "100%",
//   },
//   header: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 50,
//     paddingBottom: 10,
//     marginBottom:5,
//   },
//   headerText: {
//     fontFamily: "Montserrat-Bold",
//     fontSize: 20
//   },
//   eventSec: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//   },
//   indivEvent: {
//     width: "95%",
//     height: 280,
//     backgroundColor: "white",
//     borderRadius: 20,
//     overflow: "hidden",
//     padding: 15,
//     paddingTop: 15,
//     paddingBottom: 1,
//     alignSelf: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop: 10,
//     marginBottom: 10
//   },
//   indivEventImg: {
//     width: "100%",
//     height: "70%",
//     borderRadius: 20,
//   },
//   indivEventDesc: {
//     paddingTop: 10,
//   },
//   indivEventDescText1: {
//     fontFamily: "Montserrat-Bold",
//     fontSize: 16
//   },
//   indivEventDescText2: {
//     fontFamily: "Montserrat-Regular",
//     fontSize: 14,
//     color: "#5A5A5A"
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function EventScreen() {
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
        <Text style={styles.headerText}>All events</Text>
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

export default EventScreen;

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

