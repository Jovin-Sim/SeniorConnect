// RewardScreen.js
import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import EditProfileScreen from "./EditProfileScreen"

function SettingScreen({ navigation }) {
  // LOAD FONT
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../assets/font/Montserrat-Regular.ttf"),
    // "Montserrat-SemiBold": require("../../assets/font/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("../../assets/font/Montserrat-Medium.ttf"),
    "Montserrat-Black": require("../../assets/font/Montserrat-Black.ttf"),
  });

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
        <Text style={styles.headerText}>Account</Text>
      </View>
      <View style={styles.sec}>
        <TouchableOpacity style={styles.option}>
            <View style={styles.left}>
                <Icon name="ios-person" color="black" size={20} />
                <Text style={styles.text}>Edit profile</Text>
            </View>
            <View style={styles.right}>
                <Icon name="chevron-forward-outline" color="black" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('MyEvents')}>
            <View style={styles.left}>
                <Icon name="calendar" color="black" size={20} />
                <Text style={styles.text}>My events</Text>
            </View>
            <View style={styles.right}>
                <Icon name="chevron-forward-outline" color="black" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms&Conditions')}> 
            <View style={styles.left}>
                <Icon name="document-text" color="black" size={20} />
                <Text style={styles.text}>Terms & Conditions</Text>
            </View>
            <View style={styles.right}>
                <Icon name="chevron-forward-outline" color="black" size={20} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Feedback')}>
            <View style={styles.left}>
                <Icon name="newspaper" color="black" size={20} />
                <Text style={styles.text}>Feedback hub</Text>
            </View>
            <View style={styles.right}>
                <Icon name="chevron-forward-outline" color="black" size={20} />
            </View>
        </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
}

export default SettingScreen;

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
  sec: {
    width: "100%",
    height: 400,
    padding: 10,
  },
  option: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
},
left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
},
text: {
    marginLeft: 10
}

  
});

