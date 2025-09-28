// export default function AddFamily() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Family Screen</Text>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigate('RegisteredHouses')}>
//         <Text style={styles.backButtonText}>← Back to Houses</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const AddFamilyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* -------------------- Top Header -------------------- */}
      {/* <View style={styles.header}>
        <Text style={styles.logoText}>LOGO</Text>
        <View style={styles.headerIcons}>
          <View style={styles.languageIcon}>
            <Text style={styles.languageText}>अ</Text>
          </View>
          <MaterialCommunityIcons name="account-circle" size={30} color="#000" />
        </View>
      </View> */}

      {/* -------------------- Content Area -------------------- */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="message-text-outline" size={24} color="#000" />
          <Text style={styles.titleText}>Add Family</Text>
        </View>
        

        {/* Name Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Address Input Field */}
        <View style={styles.inputGroup}>
          <View style={styles.addressLabelRow}>
            <Text style={styles.label}>Address</Text>
            {/* Detect Button */}
            <TouchableOpacity style={styles.detectButton}>
              <Feather name="target" size={14} color="#fff" />
              <Text style={styles.detectButtonText}>Detect</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input} />
        </View>

        {/* Main Action Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Family</Text>
          <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70, // Keep icons spaced evenly
    justifyContent: 'space-between',
  },
  languageIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#ADD8E6', // Light Blue/Cyan background
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },

  // --- Content Styles ---
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    // padding: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    fontWeight: '600',
  },
  addressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF', // Dodger Blue
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  detectButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF', // Dodger Blue
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // --- Bottom Nav Styles ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 15,
    paddingBottom: 5, // A little extra space at the bottom edge
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 3.5, // Distribute space
  },
  centerButton: {
    backgroundColor: '#fff',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 10, // Lift the button above the bar
    alignSelf: 'center',
    shadowColor: '#000', // For a subtle lift effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AddFamilyScreen;