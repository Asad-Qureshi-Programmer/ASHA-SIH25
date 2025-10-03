// app/index.jsx

import 'react-native-gesture-handler';
// Must be line 1 or 2
import React from 'react'; 
import { Redirect } from 'expo-router';

// This component serves as the application's root entry point.
// It immediately redirects the user to the starting page of your tabs group.
export default function Index() {
  // Replace the path with the actual path to your main tabs entry screen.
  // Since your tabs are grouped under (tabs), the starting point is often just '/(tabs)'.
  return <Redirect href="/(tabs)" />;
}