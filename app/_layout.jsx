// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
import 'react-native-gesture-handler';
// Must be line 1 or 2
import React from 'react'; 
// ... all other imports
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
