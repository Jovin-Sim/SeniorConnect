// App.js
// // IMPORT SCREENS
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useState } from "react";
// // Import screens
// import NavigationBar from "./components/navigation";
// import HomeScreen from "./components/screens/HomeScreen";
// import EventScreen from "./components/screens/EventScreen";
// import EventDetailScreen from "./components/screens/EventDetailScreen";

// const Stack = createNativeStackNavigator();

// const App = () => {
//   const [sz, setSZ] = useState(1);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Navigation"
//           component={NavigationBar}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ headerShown: false }}
//           initialParams={{ sz }}
//         />
//         <Stack.Screen
//           name="Event"
//           component={EventScreen}
//           options={{ headerShown: false }}
//           initialParams={{ sz }}
//         />
//         <Stack.Screen
//           name="EventDetail"
//           component={EventDetailScreen}
//           options={{ headerShown: false }}
//           initialParams={{ sz }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig'; // Adjust the path accordingly
import NavigationBar from "./components/navigation";
import HomeScreen from "./components/screens/HomeScreen";
import EventScreen from "./components/screens/EventScreen";
import EventDetailScreen from "./components/screens/EventDetailScreen";
import LeisureEventsScreen from "./components/screens/LeisureEventScreen";
import FoodEventsScreen from "./components/screens/FoodEventScreen";
import SportEventsScreen from "./components/screens/SportEventScreen";
import CharityEventsScreen from "./components/screens/CharityEventScreen";
import FeedbackScreen from "./components/screens/FeedbackScreen";
import EditProfileScreen from "./components/screens/EditProfileScreen";
import MyEventScreen from "./components/screens/MyEventScreen";
import MyEventDetailScreen from "./components/screens/MyEventDetailScreen";
import RewardDetailScreen from "./components/screens/RewardDetailScreen";
import RewardScreen from "./components/screens/RewardScreen";
import TermsAndConditionsScreen from "./components/screens/Terms&Conditions";


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  const [sz, setSZ] = useState(1);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Navigation"
          component={NavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="LeisureEvent"
          component={LeisureEventsScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="FoodEvent"
          component={FoodEventsScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="SportEvent"
          component={SportEventsScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="CharityEvent"
          component={CharityEventsScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="MyEvents"
          component={MyEventScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="MyEventDetail"
          component={MyEventDetailScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="Reward"
          component={RewardScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
        <Stack.Screen
          name="RewardDetail"
          component={RewardDetailScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />
         <Stack.Screen
          name="Terms&Conditions"
          component={TermsAndConditionsScreen}
          options={{ headerShown: false }}
          initialParams={{ sz }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
