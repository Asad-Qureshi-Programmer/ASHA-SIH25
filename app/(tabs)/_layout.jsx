// import React from 'react';
// import { Tabs } from 'expo-router';

// export default function TabLayout() {
//   return (
//     <Tabs>
      
//       <Tabs.Screen name="_layout" options={{ href: null }} /> 
//     </Tabs>
//   );
// }
// app/(tabs)/_layout.jsx

import { Tabs } from 'expo-router';
// ... other imports

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        // --- GLOBAL TAB BAR STYLE (Applies to all tabs) ---
        tabBarActiveTintColor: '#0055D4', // Your primary brand color
        tabBarInactiveTintColor: '#888888',
        tabBarShowLabel: false, // <-- Hides the text label on the tab bar
        tabBarStyle: {
          backgroundColor: '#000000', // Light background for the bar
          height: 0,
          maxHeight: 0,
          // marginTop:40,
        },
        
      }}
    >
      {/* 1. Correct Tab Entry Point (Points to app/(tabs)/index.jsx) */}
      <Tabs.Screen 
        name="index" 
        options={{
            title: 'Hero', 
            headerStyle:{
                height: 0
            }
        }}
      />
      
      {/* 2. REMOVE or FIX any broken routes */}
      {/* <Tabs.Screen name="screens/Dashboard" options={{ ... }} /> // <-- DELETE THIS LINE if the file is gone!
      */}

      {/* 3. Hide the layout file itself */}
      <Tabs.Screen name="_layout" options={{ href: null }} /> 
    </Tabs>
  );
}