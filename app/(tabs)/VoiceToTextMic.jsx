import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator, // Used for the "listening" animation
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SimpleMicrophoneListener = () => {
  // State to track if the microphone is active/listening
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Tap to start voice input.');
  
  // Simulation: We use a timeout to simulate the 5-second silence/processing time.
  const LISTENING_DURATION_MS = 5000; 
  let listeningTimeout = null;

  const handleMicPress = () => {
    if (isListening) {
      // 1. Manually Stop Listening (if tapped again)
      clearTimeout(listeningTimeout);
      setIsListening(false);
      setStatusMessage('Listening manually stopped.');
      
    } else {
      // 2. Start Listening
      setIsListening(true);
      setStatusMessage('Listening... Speak now.');
      
      // 3. Set a timer to simulate the automatic stop (5-second silence detection)
      listeningTimeout = setTimeout(() => {
        setIsListening(false);
        setStatusMessage('Done speaking. Processing voice...');
        
        // Simulate text processing time before confirming
        setTimeout(() => {
             setStatusMessage('Listening completed.');
             console.log("Voice input simulated and processed.");
        }, 1000); // 1 second processing time
        
      }, LISTENING_DURATION_MS);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* <Text style={styles.statusLabel}>{statusMessage}</Text> */}
        
        <TouchableOpacity 
          style={styles.micButtonContainer}
          onPress={handleMicPress}
        >
          {isListening && (
            <ActivityIndicator 
              size={30} 
              color="#E74C3C" 
              style={styles.micActiveAnimation}
            />
          )}

          <MaterialCommunityIcons 
            name="microphone" 
            size={26} 
            color="#fff" 
            style={[
              styles.micIcon,
              isListening ? styles.micActive : styles.micInactive
            ]}
          />
        </TouchableOpacity>

        {/* <View style={{ height: 20 }}>
            {isListening && <Text style={styles.stopInstructions}>Tap again to stop manually.</Text>}
        </View> */}

      </View>
    </SafeAreaView>
  );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#0056b3',
    // marginBottom: 50,
    fontWeight: '600',
    textAlign: 'center',
  },
  micButtonContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
  },
  micIcon: {
    width: 35,
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 6,
    // marginTop: 15,
    // position: 'absolute', // Allows the ActivityIndicator to sit behind it
    zIndex: 10,
  },
  micActive: {
    backgroundColor: '#E74C3C', // Red when active
  },
  micInactive: {
    backgroundColor: '#1E90FF', // Blue when inactive
  },
  micActiveAnimation: {
    position: 'absolute',
    opacity: 0.3, // Semi-transparent ring
  },
  stopInstructions: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '500',
  }
});

export default SimpleMicrophoneListener;