// RewardScreen.js
import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

function RewardScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch reward points from Firestore and listen for real-time updates
  const fetchRewardPointsRealtime = () => {
    const userProfileRef = collection(db, 'userProfile');
    const userQuery = query(userProfileRef, where('name', '==', 'belinda'));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setRewardPoints(doc.data().rewardPoints);
        setLoading(false); // Set loading to false once data is fetched
      });
    }, (error) => {
      console.error('Error fetching reward points:', error);
      setError('Error fetching reward points'); // Set error state if there's an error
      setLoading(false); // Set loading to false in case of error
    });

    // Return the unsubscribe function to clean up the subscription
    return unsubscribe;
  };

  useEffect(() => {
    // Fetch reward points and listen for real-time updates when the component mounts
    const unsubscribe = fetchRewardPointsRealtime();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [isFocused]);

  // LOAD FONT
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded || loading) {
    return null; // Return null while fonts are loading or data is being fetched
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }

  return (
    // Container
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Your points</Text>
    </View>
     <View style={styles.pointSec}>
       <Text style={styles.pointText}>Current points: <Text style={styles.pointTextInner}>{rewardPoints}</Text></Text>
       <Image source={require("../../assets/img/rewardsSecBackground.jpg")} style={styles.img}/>
    </View>
    <Text style={styles.rewardSecText}>Available Rewards</Text>
    <View style={styles.rewardSec}>
      <TouchableOpacity onPress={() => navigation.navigate("RewardDetail", { 
              rewardName: "Get a free drink up to $5",
              description: "Sip and save with our 'At Each A Cup' reward! Treat yourself to a refreshing drink of your choice, on the house, at any 'At Each A Cup' location. Redeem your free beverage, valued up to $5, and savor every sip without breaking the bank.",
              imagePath: "../../assets/img/each-a-cup.png",
              points: 100 })} style={styles.indivReward}>
        <Image source={require("../../assets/img/each-a-cup.png")} style={styles.rewardImg}/>
        <Text style={styles.rewardPoints}>100 points</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RewardDetail",{ 
              rewardName: "Feast for free with our 'Koufu Culinary Delight' reward",
              description: "Enjoy a delicious meal on the house at any Koufu outlet, with options valued up to $10. Indulge in your favorite dishes without spending a penny, courtesy of our generous reward offer. Taste the goodness of Koufu cuisine without the cost!",
              imagePath: "../../assets/img/koufu.jpg",
              points: 200 })} style={styles.indivReward}>
        <Image source={require("../../assets/img/koufu.jpg")} style={styles.rewardImg}/>
        <Text style={styles.rewardPoints}>200 points</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RewardDetail",{ 
              rewardName: "FairPrice Bounty: Enjoy $30 on Us!",
              description: "Stock up on essentials and treats alike at FairPrice stores, with a generous allowance of up to $30. Enjoy the convenience of free groceries on us, making your shopping experience both rewarding and budget-friendly. Shop smart and save big with this exclusive offer!",
              imagePath: "../../assets/img/fairprice.jpg",
              points: 300 })} style={styles.indivReward}>
        <Image source={require("../../assets/img/fairprice.jpg")} style={styles.rewardImg}/>
        <Text style={styles.rewardPoints}>300 points</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RewardDetail",{ 
              rewardName: "Tech Treats Galore: Score $50 off your favorite electronics at Best",
              description: "Whether it's the latest smartphone, a cutting-edge laptop, or anything in between, indulge in your tech cravings with this $50 reward. Elevate your electronics game while enjoying substantial savings. Your wish list just got a lot more affordable!",
              imagePath: "../../assets/img/best.jpg",
              points: 400 })} style={styles.indivReward}>
        <Image source={require("../../assets/img/best.jpg")} style={styles.rewardImg}/>
        <Text style={styles.rewardPoints}>400 points</Text>
      </TouchableOpacity>
    </View>
    
    </ScrollView>
  );
}

export default RewardScreen;

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
  },
  headerText: {
    fontFamily: "Montserrat-Black",
    fontSize: 20
  },
  pointSec: {
    width: "100%",
    height: 130,
    padding: 20,
    borderRadius: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    
  },
  pointText: {
    zIndex: 3,
    position: "absolute",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "white",
    paddingLeft: 30,

  },
  pointTextInner: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    color: "white",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: -1,
    position: "relative",
    // borderRadius: 30,
  },
  rewardSec: {
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap', // Allow items to wrap to the next row
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
   
  },
  rewardSecText: {
    paddingLeft: 20,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  indivReward: {
    width: '48%', // Take up half of the width
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30, // Add margin bottom for spacing
  },
  rewardImg: {
    width: "100%",
    height: 100,
    overflow: "hidden",
    borderRadius: 10,
  },
  rewardPoints: {
    textAlign: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "orange",
    marginTop: 10,
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
}) 
