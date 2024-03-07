// // HomeScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';

// function HomeScreen({ navigation }) {
//   const [events, setEvents] = useState([]);
//   const [rewardPoints, setRewardPoints] = useState(0);

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

//   // Function to fetch reward points from Firestore and listen for real-time updates
//   const fetchRewardPointsRealtime = () => {
//     const userProfileRef = collection(db, 'userProfile');
//     const userQuery = query(userProfileRef, where('name', '==', 'belinda'));

//     // Subscribe to real-time updates
//     const unsubscribe = onSnapshot(userQuery, (snapshot) => {
//       snapshot.forEach((doc) => {
//         setRewardPoints(doc.data().rewardPoints);
//       });
//     });

//     // Return the unsubscribe function to clean up the subscription
//     return unsubscribe;
//   };

//   useEffect(() => {
//     fetchEvents();
//     const unsubscribe = fetchRewardPointsRealtime();

//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }

//     prepare();

//     // Clean up the subscription when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   // LOAD FONT
//   const [fontsLoaded] = useFonts({
//     "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
//     "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
//     "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf")
//   });

//   useEffect(() => {
//     async function prepare() {
//       await SplashScreen.preventAutoHideAsync();
//     }
//     prepare();
//   }, []);

//   if (!fontsLoaded) {
//     return null;
//   } else {
//     SplashScreen.hideAsync();
//   }

//   return (
//     // Container
//     <ScrollView style={styles.container}>
//     <View style={styles.header}>
//       <Text style={styles.headerText}>welcome, belinda</Text>
//     </View>
//      <View style={styles.rewardSec}>
//        <Text style={styles.rewardText}>Current points: {rewardPoints}</Text>
//        <Image source={require("../../assets/img/rewardsSecBackground.jpg")} style={styles.img}/>
//     </View>
//     <View style={styles.eventSec}>
//       <Text style={styles.eventSecText}>Events near you</Text>
//       {events.map((event, index) => (
//           <View
//             key={index}
//             style={styles.indivEvent}
//           >
//             <Image source={{ uri: event.imageUrl }} style={styles.indivEventImg} />
//             <View style={styles.indivEventDesc}>
//               <Text style={styles.indivEventDescText1}>{event.eventName}</Text>
//               <Text style={styles.indivEventDescText2}>By {event.userName}</Text>
//               <View style={styles.indivEventDescInner}>
//                 <Text style={styles.indivEventDescInnerText}>{event.date}</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { 
//                   userName: event.userName,
//                   eventName: event.eventName,
//                   description: event.description,
//                   image: event.imageUrl,
//                   date: event.date,
//                   location: event.location
//                 })}>
//                   <Text style={styles.indivEventDescInnerBtn} >See more</Text>
//                 </TouchableOpacity>
//           </View>
//         </View>
//           </View>
//         ))}
//       {/* <View style={styles.indivEvent}>
//         <View style={styles.indivEventDesc}>
//           <Text style={styles.indivEventDescText1}>Beginner Music Lessons</Text>
//           <Text style={styles.indivEventDescText2}>By Linda Tan</Text>
//           <View style={styles.indivEventDescInner}>
//             <Text style={styles.indivEventDescInnerText}>10 April 2023</Text>
//             <Text style={styles.indivEventDescInnerBtn}>See more</Text>
//           </View>
//         </View>
//         <Image source={require("../../assets/img/event1.jpg")} style={styles.indivEventImg}/>
//       </View>
//        <View style={styles.indivEvent}>
//         <View style={styles.indivEventDesc}>
//           <Text style={styles.indivEventDescText1}>Traditional Muslim Cuisine Cooking Lesson</Text>
//           <Text style={styles.indivEventDescText2}>By Nur Diyana</Text>
//           <View style={styles.indivEventDescInner}>
//             <Text style={styles.indivEventDescInnerText}>1 May 2023</Text>
//             <Text style={styles.indivEventDescInnerBtn}>Join now</Text>
//           </View>
//         </View>
//         <Image source={require("../../assets/img/event2.jpg")} style={styles.indivEventImg}/>
//       </View> */}
//     </View>
//     </ScrollView>
//   );
// }

// export default HomeScreen;

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
//     width: "100%",
//   },
//   headerText: {
//     fontFamily: "Montserrat-Black",
//     fontSize: 20
//   },
//   rewardSec: {
//     width: "100%",
//     height: 130,
//     padding: 20,
//     borderRadius: 10,
//     position: "relative",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   rewardText: {
//     zIndex: 3,
//     position: "absolute",
//     textAlign: "center",
//     fontFamily: "Montserrat-Regular",
//     fontSize: 16,
//     color: "white"
//   },
//   img: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     zIndex: -1,
//     position: "relative",
//     // borderRadius: 30,
//   },
//   eventSec: {
//     width: "100%",
//     height: "100%",
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//     marginBottom: 30,
//     display: "flex",
//     flexDirection: "column"
//   },
//   eventSecText: {
//     // fontFamily: "Montserrat-Semibold",
//     fontSize: 17,
//     paddingBottom: 10
//   },
//   indivEvent: {
//     width: "100%",
//     maxHeight: 500,
//     borderRadius: 30,
//     position: "relative",
//     display: "flex",
//     justifyContent: 'end',
//     alignItems: "center",
//     paddingBottom: 30
//   },
//   indivEventDesc: {
//     position: "absolute",
//     bottom: 10,
//     zIndex: 1,
//     width: "95%",
//     height: "45%",
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     marginBottom: 30,
//     borderColor: "white",
//     borderWidth: 2,
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // You can adjust the values as needed
//   },
//   indivEventDescText1: {
//     fontFamily: "Montserrat-Bold",
//     fontSize: 15,
//     paddingBottom: 5,
//   },
//   indivEventDescText2: {
//     fontFamily: "Montserrat-Regular",
//     fontSize: 13,
//   },
//   indivEventDescInner: {
//     width:"100%",
//     height: "60%",
//     backgroundColor: "#fdf1e7",
//     padding: 10,
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     borderRadius: 20,
//     marginTop: 10,
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // You can adjust the values as needed
//     paddingLeft:20,
//     paddingRight: 15
//   },
//   indivEventDescInnerText:{
//     fontFamily: "Montserrat-Bold",
//     fontSize: 18,
//     color: "#FFA500"
//    },
//   indivEventDescInnerBtn: {
//      fontFamily: "Montserrat-Bold",
//      fontSize: 16,
//      color: "white",
//      backgroundColor: "#FFA500",
//      paddingBottom: 10,
//      paddingTop: 10,
//      paddingRight: 10,
//      paddingLeft: 10,
//      borderRadius: 10,
//   },
//   indivEventImg: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 12,
//     // opacity: "80%"
//   },


  
// })

// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(0);

//   // Function to fetch events from Firestore based on user's location
// const fetchEvents = async (userLocation) => {
//   try {
//     let allEvents = [];

//     const eventCollections = ['charityEvents', 'foodEvents', 'leisureEvents', 'sportEvents'];
//     for (const eventCollection of eventCollections) {
//       const eventsCollectionRef = collection(db, eventCollection);
//       const snapshot = await getDocs(eventsCollectionRef);
//       const eventsData = snapshot.docs.map(doc => ({ ...doc.data(), eventType: eventCollection }));
      
//       // Filter events based on location containing the user's location
//       const filteredEvents = eventsData.filter(event => event.location.includes(userLocation));
//       allEvents = [...allEvents, ...filteredEvents];
//     }

//     setEvents(allEvents);
//   } catch (error) {
//     console.error('Error fetching events:', error);
//   }
// };
// Function to fetch events from Firestore based on user's location
const fetchEvents = async () => {
  try {
    // Retrieve user profile to get user's location
    const userProfileRef = collection(db, 'userProfile');
    const userQuery = query(userProfileRef, where('name', '==', 'belinda'));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      const userLocation = userData.address; 

      let allEvents = [];

      const eventCollections = ['charityEvents', 'foodEvents', 'leisureEvents', 'sportEvents'];
      for (const eventCollection of eventCollections) {
        const eventsCollectionRef = collection(db, eventCollection);
        const snapshot = await getDocs(eventsCollectionRef);
        const eventsData = snapshot.docs.map(doc => ({ ...doc.data(), eventType: eventCollection }));
        
        // Filter events based on location containing the user's location
        const filteredEvents = eventsData.filter(event => event.location.includes(userLocation));
        allEvents = [...allEvents, ...filteredEvents];
      }

      setEvents(allEvents);
      console.log('User data:', userLocation);
      console.log('All events:', allEvents);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};


  // Function to fetch reward points from Firestore and listen for real-time updates
  const fetchRewardPointsRealtime = () => {
    const userProfileRef = collection(db, 'userProfile');
    const userQuery = query(userProfileRef, where('name', '==', 'belinda'));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setRewardPoints(doc.data().rewardPoints);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    // Assuming you have userLocation available here
    const userLocation = ""; // You need to replace this with the actual user's location

    fetchEvents();
    const unsubscribe = fetchRewardPointsRealtime();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();

    return () => unsubscribe();
  }, []);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>welcome, belinda</Text>
      </View>
      <View style={styles.rewardSec}>
        <Text style={styles.rewardText}>Current points: {rewardPoints}</Text>
        <Image source={require("../../assets/img/rewardsSecBackground.jpg")} style={styles.img}/>
      </View>
      <View style={styles.eventSec}>
        <Text style={styles.eventSecText}>Events near you</Text>
        {events.map((event, index) => (
          <View key={index} style={styles.indivEvent}>
            <Image source={{ uri: event.imageUrl }} style={styles.indivEventImg} />
            <View style={styles.indivEventDesc}>
              <Text style={styles.indivEventDescText1}>{event.eventName}</Text>
              <Text style={styles.indivEventDescText2}>By {event.userName}</Text>
              <View style={styles.indivEventDescInner}>
                <Text style={styles.indivEventDescInnerText}>{event.date}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { 
                  userName: event.userName,
                  eventName: event.eventName,
                  description: event.description,
                  image: event.imageUrl,
                  date: event.date,
                  location: event.location
                })}>
                  <Text style={styles.indivEventDescInnerBtn}>See more</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

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
    width: "100%",
  },
  headerText: {
    fontFamily: "Montserrat-Black",
    fontSize: 20
  },
  rewardSec: {
    width: "100%",
    height: 130,
    padding: 20,
    borderRadius: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rewardText: {
    zIndex: 3,
    position: "absolute",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "white"
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: -1,
    position: "relative",
  },
  eventSec: {
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 30,
    display: "flex",
    flexDirection: "column"
  },
  eventSecText: {
    fontSize: 17,
    paddingBottom: 10
  },
  indivEvent: {
    width: "100%",
    maxHeight: 500,
    borderRadius: 30,
    position: "relative",
    display: "flex",
    justifyContent: 'end',
    alignItems: "center",
    paddingBottom: 30
  },
  indivEventDesc: {
    position: "absolute",
    bottom: 10,
    zIndex: 1,
    width: "95%",
    height: "45%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 30,
    borderColor: "white",
    borderWidth: 2,
    paddingLeft:20,
    paddingRight: 15
  },
  indivEventDescText1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    paddingBottom: 5,
  },
  indivEventDescText2: {
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  indivEventDescInner: {
    width:"100%",
    height: "60%",
    backgroundColor: "#fdf1e7",
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderRadius: 20,
    marginTop: 10,
    paddingLeft:20,
    paddingRight: 15
  },
  indivEventDescInnerText:{
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#FFA500"
   },
  indivEventDescInnerBtn: {
     fontFamily: "Montserrat-Bold",
     fontSize: 16,
     color: "white",
     backgroundColor: "#FFA500",
     paddingBottom: 10,
     paddingTop: 10,
     paddingRight: 10,
     paddingLeft: 10,
     borderRadius: 10,
  },
  indivEventImg: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
