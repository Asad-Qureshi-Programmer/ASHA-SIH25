// export default function Addmember(){
//     return(
//         <>
        
//         </>
//     )
// }
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
// We'll simulate a Picker/Dropdown using a simple view for presentation
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// A placeholder component for the "Select" dropdown/Picker
const DropdownPlaceholder = ({ label, value = 'Select' }) => (
  <View style={styles.dropdown}>
    <Text style={value === 'Select' ? styles.dropdownPlaceholder : styles.dropdownText}>
      {value}
    </Text>
    <Feather name="chevron-down" size={20} color="#000" />
  </View>
);

const AddFamilyFormScreen = () => {
  const [gender, setGender] = useState('Select'); // State for gender
  const [tag, setTag] = useState('Select'); // State for tag

  return (
    <SafeAreaView style={styles.container}>
      
      {/* -------------------- Content Area -------------------- */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="message-text-outline" size={24} color="#000" />
          <Text style={styles.titleText}>Add New Membr</Text>
        </View>

        {/* Name Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Date of Birth & Gender Row */}
        <View style={styles.row}>
          {/* Date of Birth Input */}
          <View style={styles.halfInput}>
            <Text style={styles.label}>Date of birth</Text>
            {/* Could be a TextInput or a date picker component */}
            <TextInput style={styles.input} placeholder="DD/MM/YYYY" placeholderTextColor="#999" />
          </View>

          {/* Gender Dropdown */}
          <View style={styles.halfInput}>
            <Text style={styles.label}>Gender</Text>
            {/* This would typically be a Picker or a custom dropdown */}
            <DropdownPlaceholder value={gender} />
          </View>
        </View>

        {/* Tag Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tag</Text>
          <DropdownPlaceholder value={tag} />
        </View>

        {/* Note Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            placeholder="i.e. Measles Vaccination due"
            placeholderTextColor="#999"
          />
        </View>

        {/* Main Action Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Member</Text>
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
    width: 70,
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
    marginBottom: 30,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfInput: {
    width: '48%', // Allows for spacing between inputs
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
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    height: 46, // Match height of TextInput
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999', // Gray color for 'Select' placeholder
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

  // --- Bottom Nav Styles (Unchanged) ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 3.5,
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
    bottom: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AddFamilyFormScreen;