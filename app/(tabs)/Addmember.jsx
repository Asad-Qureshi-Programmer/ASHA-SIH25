import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform
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

const AddFamilyFormScreen = ({idd, familyId, addMem, AddtoFam, navigate}) => {
  const [gender, setGender] = useState('Select'); // State for gender
  const [tag, setTag] = useState('Select'); // State for tag
  const [PopUp, setPopUp] = useState(0); 

  // --- STATE VARIABLES TO BE UPDATED ---
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); // Will capture age based on DOB input
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  // -------------------------------------

  function handleAddMember(navigate) {
    const newMember = data()[0];
    AddtoFam(newMember.id, familyId);
    addMem(newMember, familyId, navigate);
  }

  function data(){
    return [
      {
        id: idd+1,
        name: name, // Use state variable
        age: parseInt(age) || 0, // Use state variable
        gender: gender,
        status: status, // Use state variable
        note: note, // Use state variable
        medicalInfo: medicalInfo, // Use state variable
      },
    ]
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
      
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS vs Android
        keyboardVerticalOffset={80} // adjust depending on your header height
      >
        <ScrollView
        //  style={styles.scrollContainer}
          contentContainerStyle={{ padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
      {/* -------------------- Content Area -------------------- */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <TouchableOpacity key={familyId} onPress={() => navigate('HouseDetails', { houseId: familyId })}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Add New Membr</Text>
          {/* <MaterialCommunityIcons name="message-text-outline" size={24} color="#000" /> */}
        </View>

        {/* Name Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            style={styles.input} 
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Date of Birth & Gender Row */}
        <View style={styles.row}>
          {/* Date of Birth Input (Used here to capture Age/DOB) */}
          <View style={styles.halfInput}>
            <Text style={styles.label}>Age (Placeholder for DOB)</Text>
            {/* Using this TextInput to capture 'age' state for simplicity */}
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 30" 
              placeholderTextColor="#999" 
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity onPress={() => setPopUp(!PopUp)}>
              <DropdownPlaceholder value={gender} />
            </TouchableOpacity>
            <View style={PopUp ? {} : {display:"none"}}>
              <View style={styles.dropdownOptions}>
                <TouchableOpacity onPress={() => { setGender("Male"); setPopUp(false); }}>
                  <Text style={styles.dropdownOptionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setGender("Female"); setPopUp(false); }}>
                  <Text style={styles.dropdownOptionText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </View> 

        {/* Status Input Field (New Field to capture state) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status (e.g., Pregnant, Child, Normal)</Text>
          <TextInput
            style={styles.input}
            placeholder="i.e. Pregnant, Child"
            placeholderTextColor="#999"
            value={status}
            onChangeText={setStatus}
          />
        </View>

        {/* Note Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            placeholder="i.e. Measles Vaccination due"
            placeholderTextColor="#999"
            value={note}
            onChangeText={setNote}
          />
        </View>
        
        {/* Medical Info Input Field (New Field to capture state) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medical Info Summary</Text>
          <TextInput
            style={styles.input}
            placeholder="i.e. 2/5 ANC Visits done..."
            placeholderTextColor="#999"
            value={medicalInfo}
            onChangeText={setMedicalInfo}
          />
        </View>

        {/* Main Action Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => {if(name.trim() !== "" && gender != "Select")handleAddMember(navigate)}}>
          <Text style={styles.addButtonText}>Add Member</Text>
          <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>
</ScrollView>
      </KeyboardAvoidingView>
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
  houseListItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderBottomWidth: 5,
    borderTopWidth: 2,
    // marginVertical:5,
    marginBottom: 17,
    borderBottomColor: '#efefef',
    borderTopColor: '#efefef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
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
  },dropdownOptions: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    elevation: 3, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
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