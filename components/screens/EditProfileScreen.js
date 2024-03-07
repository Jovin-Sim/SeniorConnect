import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    query,
    where,
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    doc,
    getDocs,
    updateDoc
  } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '../../firebaseConfig';

function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch the first user profile document
    const fetchUserProfile = async () => {
      try {
        const usersCollection = collection(db, 'userProfile');
        const usersQuery = query(usersCollection);
        const querySnapshot = await getDocs(usersQuery);
        
        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0];
          const userData = firstDoc.data();
          setName(userData.name);
          setAddress(userData.address);
        } else {
          console.log('No user profiles found');
        }
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const saveChanges = async () => {
    try {
      const usersCollection = collection(db, 'userProfile');
      const usersQuery = query(usersCollection);
      const querySnapshot = await getDocs(usersQuery);
      
      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const docRef = doc(db, 'userProfile', firstDoc.id);
        await updateDoc(docRef, {
          name: name,
          address: address,
        });
        console.log('Profile updated successfully');
      } else {
        console.log('No user profiles found');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


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
            <Text style={styles.gridItemText}>Edit Profile</Text>
        </View>
        <View style={styles.gridItem}></View>
      </View>

      <View style={styles.profileSec}>
         {/* Name input field */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
      />
      {/* Address input field */}
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholder="Address"
      />
      {/* Button to save changes */}
      <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
}

export default EditProfileScreen;

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

