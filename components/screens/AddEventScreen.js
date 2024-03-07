// // AddEventScreen.js
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; 
import { View, Text, Button, ScrollView, StyleSheet, Image,  TouchableOpacity, TextInput, Modal} from 'react-native';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import {Picker} from "@react-native-picker/picker"

function AddEventScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/font/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../assets/font/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../../assets/font/Montserrat-Medium.ttf'),
    'Montserrat-Black': require('../../assets/font/Montserrat-Black.ttf'),
  });

  const [userName, setUserName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [category, setCategory] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [image, setImage] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setModalVisible(false);
  };

  // Log initial state for debugging
  useEffect(() => {
    console.log('Initial state:', { userName, eventName, eventDescription, eventLocation, image, eventDate });
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || event.nativeEvent.timestamp;
    setShowDatePicker(Platform.OS === 'ios');
    const formattedDate = moment(currentDate).format('MMMM DD, YYYY');
    setEventDate(formattedDate);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveEvent = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
  
      const imageName = `event_image_${Date.now()}.jpg`;
      const storageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(storageRef, blob);
  
      const imageURL = await getDownloadURL(storageRef);
  
      let collectionName = '';
  
      switch (category) {
        case 'Leisure':
          collectionName = 'leisureEvents';
          break;
        case 'Food':
          collectionName = 'foodEvents';
          break;
        case 'Sports':
          collectionName = 'sportEvents';
          break;
        case 'Charity':
          collectionName = 'charityEvents';
          break;
        default:
          console.error('Invalid category');
          return;
      }
  
      const eventsCollection = collection(db, collectionName);
      await addDoc(eventsCollection, {
        userName,
        eventName,
        description: eventDescription,
        date: eventDate,
        location: eventLocation,
        imageUrl: imageURL,
        createdAt: serverTimestamp(),
      });
  
      // Reset state after saving event
      setImage(null);
      setUserName('');
      setEventName('');
      setEventDescription('');
      setEventLocation('');
      setEventDate('');
  
      console.log('Event saved successfully to collection:', collectionName);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // const saveEvent = async () => {
  //   try {
  //     const response = await fetch(image);
  //     const blob = await response.blob();

  //     const imageName = `event_image_${Date.now()}.jpg`;
  //     const storageRef = ref(storage, `images/${imageName}`);
  //     await uploadBytes(storageRef, blob);

  //     const imageURL = await getDownloadURL(storageRef);

  //     const eventsCollection = collection(db, 'leisureEvents');
  //     await addDoc(eventsCollection, {
  //       userName,
  //       eventName,
  //       description: eventDescription,
  //       date: eventDate,
  //       location: eventLocation,
  //       imageUrl: imageURL,
  //       createdAt: serverTimestamp(),
  //     });

  //     setImage(null);
  //     setUserName('');
  //     setEventName('');
  //     setEventDescription('');
  //     setEventLocation('');
  //     setEventDate('');
  //     console.log('Event saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving event:', error);
  //   }
  // };

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
      <Text style={styles.headerText}>Create event</Text>
    </View>
    <View style={styles.field}>
      <Text style={styles.inputLabel}>Your Name</Text>
      <TextInput
          style={styles.fieldInput}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
    </View>
    <View style={styles.field}>
      <Text style={styles.inputLabel}>Event Name</Text>
      <TextInput
          style={styles.fieldInput}
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />
    </View>
    <View style={styles.field}>
      <Text style={styles.inputLabel}>Event Description</Text>
      <TextInput
        style={styles.fieldInput}
        value={eventDescription}
        onChangeText={(text) => setEventDescription(text)}
      />
    </View>
    {/* <View style={styles.field}>
  <Text style={styles.inputLabel}>Categories</Text>
  <Picker
    selectedValue={category}
    style={styles.picker}
    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
  >
    <Picker.Item label="Select a category" value="" />
    <Picker.Item label="Leisure" value="Leisure" />
    <Picker.Item label="Food" value="Food" />
    <Picker.Item label="Sports" value="Sports" />
    <Picker.Item label="Charity" value="Charity" />
  </Picker>
</View> */}
     <View style={styles.field}>
        <Text style={styles.inputLabel}>Categories</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
          <Text>{category || 'Select a category'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <TouchableOpacity>
              <Image source={require("../../assets/img/close.png")} style={styles.modalImg}/>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => handleCategorySelect('Leisure')}>
              <Text style={styles.modalItem}>Leisure</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Food')}>
              <Text style={styles.modalItem}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Sports')}>
              <Text style={styles.modalItem}>Sports</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('Charity')}>
              <Text style={styles.modalItem}>Charity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    <View style={styles.field}>
      <Text style={styles.inputLabel}>Location</Text>
      <TextInput
        style={styles.fieldInput}
        value={eventLocation}
        onChangeText={(text) => setEventLocation(text)}
      />
    </View>
    <View style={styles.field}>
        <Text style={styles.inputLabel}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateFieldInput}>{eventDate ? eventDate : 'Select date'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={eventDate ? new Date(moment(eventDate, 'MMMM DD, YYYY').valueOf()) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
    <View style={styles.imgField}>
      <Text style={styles.imgInputLabel}>Upload image</Text>
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {image && (
          <View style={styles.uploadedImageContainer}>
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          </View>
        )}
      </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={saveEvent}>
        <Image source={require("../../assets/img/rewardsSecBackground.jpg")} style={styles.buttonImg}/>
        <Text style={styles.buttonText}>Save and Confirm</Text>
    </TouchableOpacity>

      {/* <Button title="Save and Confirm" onPress={saveEvent} /> */}

    </ScrollView>
  );
}

export default AddEventScreen;

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20
  },
  field: {
    width: "100%",
    height: "9%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 12,
  },
  imgField: {
    width: "100%",
    padding: 20,
  },
  imgInputLabel: {
    // fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginBottom: 10, // Add margin bottom for spacing
  },
  fieldInput: {
    borderBottomWidth: 2,
    borderColor: "black",
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  dateFieldInput: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderColor: "black",
    // paddingLeft: 15,
    // paddingRight: 15,
    // paddingTop: 10,
    paddingBottom: 5,
  },
  uploadSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Adjust the margin as needed
  },
  uploadButtonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "white",
  },
  uploadedImageContainer: {},
  uploadedImage: {
    width: 200, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: 100,
    padding: 20,
    borderRadius: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30
  },
   buttonImg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: -1,
    position: "relative",
    // borderRadius: 30,
  },
   buttonText: {
    zIndex: 3,
    position: "absolute",
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "white"
  },
  datePicker: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 0,
  },
  picker: {
    height: 50,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  modalContainer: {
    backgroundColor: "white",
    height: "60%",
    width:"80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 100
  },
  modalItem: {
    fontSize: 30,
    alignSelf: "flex-start",
    paddingVertical: 10
  },
  // modalImg: {
  //  width: 200
  // }
 
})
