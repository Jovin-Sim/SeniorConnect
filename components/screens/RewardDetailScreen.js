import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { getDocs, collection, where, query, doc, updateDoc } from 'firebase/firestore';// Import deleteDoc and doc
import { db } from '../../firebaseConfig'; // Import your Firebase configuration
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function RewardDetailScreen({ navigation, route }) {
   
  // LOAD FONT
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../../assets/font/Montserrat-Medium.ttf"),
    "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf"),
  });

const { rewardName, description, imagePath, points } = route.params;

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

  // Function to get image source based on imagePath
  const getImageSource = () => {
    switch (imagePath) {
      case "../../assets/img/each-a-cup.png":
        return require("../../assets/img/each-a-cup.png");
      case "../../assets/img/koufu.jpg":
        return require("../../assets/img/koufu.jpg");
      case "../../assets/img/fairprice.jpg":
        return require("../../assets/img/fairprice.jpg");
      case "../../assets/img/best.jpg":
        return require("../../assets/img/best.jpg");
      default:
        return null;
    }
  };

// Function to handle reward claiming
const claimReward = async () => {
  try {
    // Find the user by name
    const usersRef = collection(db, 'userProfile');
    const querySnapshot = await getDocs(query(usersRef, where("name", "==", "belinda"))); // Use query and where methods correctly
    
    if (querySnapshot.size === 0) {
      // No user found with the name Belinda
      Alert.alert('User not found.');
      return;
    }

    // Assuming there's only one user with the name Belinda
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, 'userProfile', userDoc.id);

    // Deduct points from user's profile
    await updateDoc(userRef, {
      rewardPoints: userDoc.data().rewardPoints - points, // Deduct points from the existing points
    });

    // Show success message or navigate to another screen
    Alert.alert('Reward claimed successfully!');
  } catch (error) {
    console.error('Error claiming reward:', error);
    Alert.alert('An error occurred while claiming the reward.');
  }
};




  return (
    // Container
    <ScrollView style={styles.container}>
      <View style={styles.heroSec}>
         <TouchableOpacity onPress={() => navigation.navigate("Navigation")} style={styles.iconCont}>
           <Image source={require("../../assets/img/back.png")} style={styles.iconImg}/>
         </TouchableOpacity>
         <Image source={getImageSource()} style={styles.heroSecImg}/>
      </View>
      <View style={styles.secondSec}>
        <View style={styles.secondSecLeft}>
          <Text style={styles.text1}>{rewardName}</Text>
        </View>
         <TouchableOpacity onPress={claimReward} style={styles.secondSecRight}>
           <Text style={styles.text3}>Claim reward</Text>
        </TouchableOpacity>
      </View>
     
       <View style={styles.fourthSec}>
        <Text style={styles.text6}>About reward</Text>
        <Text style={styles.text7}>{route.params.description}</Text>
      </View>
      
    </ScrollView>
  );
}

export default RewardDetailScreen;

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
    width: "50%"
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
    height: 300,
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
    fontSize: 16,
    paddingBottom: 10,
  },
  
});
