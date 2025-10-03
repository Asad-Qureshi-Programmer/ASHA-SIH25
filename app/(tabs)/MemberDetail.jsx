import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// --- REUSABLE COMPONENTS (Unchanged) ---

const DetailCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

const DetailLine = ({ leftText, rightText, isBold, color = '#333' }) => (
  <View style={styles.detailLine}>
    <Text style={[styles.lineText, isBold && styles.lineTextBold, { color }]}>
      {leftText}
    </Text>
    {rightText && <Text style={styles.lineDate}>{rightText}</Text>}
  </View>
);

const HistoryLine = ({ date, event }) => (
    <View style={styles.historyLine}>
        <Text style={styles.historyDate}>{date}</Text>
        <Text style={styles.historyEvent}>{event}</Text>
    </View>
);

// --- NEW COMPONENT FOR CHECKBOX (TT, ANC, etc.) ---
const CheckboxItem = ({ label, isChecked, onPress, isEditMode }) => (
  <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={isEditMode ? onPress : null}
    activeOpacity={isEditMode ? 0.7 : 1}
  >
    <MaterialCommunityIcons 
      name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} 
      size={20} 
      color={isChecked ? '#1E90FF' : '#666'} 
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// --- NEW COMPONENT FOR MEDICATION COUNTS ---
const MedicationInput = ({ iconName, label, count, onChangeText, isEditMode }) => (
    <View style={styles.medicationRow}>
        <MaterialCommunityIcons name={iconName} size={18} color="#666" />
        <Text style={styles.medicationLabel}>{label}</Text>
        {isEditMode ? (
            <TextInput
                style={styles.medicationInput}
                value={count.toString()}
                onChangeText={onChangeText}
                keyboardType="numeric"
                placeholder='0'
            />
        ) : (
            <Text style={styles.medicationCount}>{count}</Text>
        )}
    </View>
);


// --- MAIN DYNAMIC COMPONENT ---

const MemberDetailsScreen = ({ navigate, member, familyId, setMemberData }) => {
  
  // Use a dummy member object for initial state, extended to include fields from the image
  const initialMember = member || {
    id: 121002,
    name: "Sunita Kumar",
    age: 30,
    gender: "Female",
    role: "Wife",
    status: "Pregnant",
    note: "Pregnant, 6 months",
    medicalInfo: "2/5 ANC Visits done. 1/2 TT Vaccine Done. 50/100 IFA Tablets delivered.",
    // Medical Info Fields
    ancDone: 0, // Placeholder for 0/3 done
    tt1: false,
    tt2: false,
    booster: false,
    tbSymptomChecked: false,
    nutritionCounselling: false,
    vhsndParticipationDone: false,
    weight: '55',
    bp: '120/80',
    dangerSigns: 'N/A',
    otherMedicalInfo: 'None',
    
    // Medicines Distributed
    ifaTablets: 50,
    zincTablets: 0,
    calciumTablets: 20,
    orsPackets: 5,
    paracetamol: 0,
    dewormingTablets: 1,
  };
  familyId = familyId || 1001;


  // State to manage the mode and editable data
  const [isEditMode, setIsEditMode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [memberData, setmemberData] = useState(initialMember);

  // Helper function to update nested data
  const updateMedicalField = (key, value) => {
      setmemberData(prev => ({ ...prev, [key]: value }));
  };

  // Helper function for toggling boolean fields
  const toggleBoolean = (key) => {
      setmemberData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Placeholder for navigation logic
  const handleBack = () => {
    navigate('HouseDetails', { houseId: familyId });
    Alert.alert("Back Navigation", "Implement navigation back to House Details.");
  };
  
  // Placeholder for saving changes
  const handleSave = () => {
      // console.log('Saving changes:', memberData);
      // Logic to send memberData to API
      setIsEditMode(false); // Switch back to view mode
      setShowOptions(false);
      Alert.alert("Save Successful", "Changes have been saved.");
      // setmemberData(memberData); // Call external update function if provided
  };
  
  // Conditionally rendered Input/Text component for Profile/Header
  const ProfileDetail = ({ iconName, label, value, stateKey, isEditable = true }) => {
      return (
          <View style={styles.detailItem}>
              <FontAwesome name={iconName} size={14} color={isEditMode && isEditable ? '#1E90FF' : '#666'} />
              {isEditMode && isEditable ? (
                  <TextInput
                      style={styles.inputField}
                      value={value.toString()}
                      onChangeText={(text) => setmemberData({ ...memberData, [stateKey]: text })}
                      keyboardType={stateKey === 'age' ? 'numeric' : 'default'}
                  />
              ) : (
                  <Text style={styles.detailText}>{label}: {value}</Text>
              )}
          </View>
      );
  };

  // useEffect(() => {
  //   setMemberData(memberData)
  // }, memberData);
  
  // --- RENDERING ---
  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- Options Dropdown --- */}
      {showOptions && (
          <View style={styles.optionsDropdown}>
              <TouchableOpacity style={styles.optionItem} onPress={() => { setIsEditMode(true); setShowOptions(false); }}>
                  <Text style={styles.optionText}>Edit Mode</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionItem} onPress={() => { 
                  if (isEditMode) {
                      // Optional: Ask for confirmation to discard changes
                      Alert.alert(
                          "Discard Changes?",
                          "Are you sure you want to switch to View Mode? Unsaved changes will be lost.",
                          [
                              { text: "Cancel", style: "cancel" },
                              { text: "Discard", onPress: () => { setIsEditMode(false); setShowOptions(false); } }
                          ]
                      );
                      setIsEditMode(false); 
                      setShowOptions(false);
                  } else {
                      setIsEditMode(false); 
                      setShowOptions(false);
                  }
              }}>
                  <Text style={styles.optionText}>View Mode</Text>
              </TouchableOpacity>
          </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* -------------------- Member Header Card (Profile) -------------------- */}
        <View style={styles.memberHeaderCard}>
          <View style={styles.memberInfoRow}>
            <TouchableOpacity onPress={handleBack}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            
            {/* Member Name (Editable) */}
            {isEditMode ? (
                 <TextInput
                      style={styles.memberNameInput}
                      value={memberData.name}
                      onChangeText={(text) => setmemberData({ ...memberData, name: text })}
                  />
            ) : (
                <Text style={styles.memberName}>{memberData.name}</Text>
            )}

            {memberData.status && (
                <View style={styles.pregnantTag}>
                    <Text style={styles.pregnantText}>{memberData.status}</Text>
                </View>
            )}
            
            {/* Options Button (3 dots) */}
            <TouchableOpacity 
                style={styles.optionsButton} 
                onPress={() => setShowOptions(!showOptions)}
            >
              <Feather name="more-vertical" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Details Row (Age, Gender) */}
          <View style={styles.detailsRow}>
            <ProfileDetail iconName="calendar-o" label="Age" value={memberData.age} stateKey="age" />
            <ProfileDetail iconName="venus-mars" label="Gender" value={memberData.gender} stateKey="gender" /> 
          </View>
          
          {/* Tag (Multiselect)
          <View style={styles.tagSelectContainer}>
             <Text style={styles.label}>Tag (Multiselect)</Text>
             <View style={styles.tagSelect}>
                 <Text style={styles.tagText}>Select Tag</Text>
                 <Feather name="chevron-down" size={16} color="#666" />
             </View>
          </View> */}

          {/* Note Row (Editable) */}
          <View style={styles.noteContainer}>
              <Text style={styles.label}>Note</Text>
              {isEditMode ? (
                  <TextInput
                      style={styles.noteInput}
                      value={memberData.note}
                      onChangeText={(text) => updateMedicalField('note', text)}
                      placeholder="i.e. pregnant, 6 months"
                      multiline={true}
                  />
              ) : (
                  <Text style={styles.noteText}>{memberData.note}</Text>
              )}
          </View>
          
        </View>

        {/* -------------------- Medical Info Card -------------------- */}
        <DetailCard title="Medical Info">
            
            {/* ANC Visit */}
            <View style={styles.medicalInfoRow}>
                <Text style={styles.checkboxLabel}>ANC visit</Text>
                {isEditMode ? (
                    <TextInput
                        style={[styles.inputField, { width: 50, textAlign: 'center' }]}
                        value={memberData.ancDone.toString()}
                        onChangeText={(text) => updateMedicalField('ancDone', parseInt(text) || 0)}
                        keyboardType="numeric"
                    />
                ) : (
                    <Text style={styles.detailText}>
                        <Text style={{fontWeight:'bold'}}>{memberData.ancDone}</Text>/3 done
                    </Text>
                )}
            </View>
            
            {/* TT Injection */}
            <View style={styles.ttInjectionRow}>
                <Text style={styles.checkboxLabel}>TT Injection</Text>
                <View style={styles.ttCheckboxGroup}>
                    <CheckboxItem 
                        label="TT1" 
                        isChecked={memberData.tt1} 
                        onPress={() => toggleBoolean('tt1')} 
                        isEditMode={isEditMode}
                    />
                    <CheckboxItem 
                        label="TT2" 
                        isChecked={memberData.tt2} 
                        onPress={() => toggleBoolean('tt2')} 
                        isEditMode={isEditMode}
                    />
                    <CheckboxItem 
                        label="Booster" 
                        isChecked={memberData.booster} 
                        onPress={() => toggleBoolean('booster')} 
                        isEditMode={isEditMode}
                    />
                </View>
            </View>
            
            {/* Checkbox List */}
            {[
                { label: 'TB Symptom Checked', key: 'tbSymptomChecked' },
                { label: 'Nutrition Counselling', key: 'nutritionCounselling' },
                { label: 'VHSND Participation Done', key: 'vhsndParticipationDone' },
            ].map((item) => (
                <CheckboxItem
                    key={item.key}
                    label={item.label}
                    isChecked={memberData[item.key]}
                    onPress={() => toggleBoolean(item.key)}
                    isEditMode={isEditMode}
                />
            ))}

            <View style={styles.twoColumnInputRow}>
                {/* Weight */}
                <View style={styles.twoColumnItem}>
                    <MaterialCommunityIcons name="weight-kilogram" size={18} color="#666" />
                    {isEditMode ? (
                        <TextInput
                            style={styles.smallInput}
                            value={memberData.weight}
                            onChangeText={(text) => updateMedicalField('weight', text)}
                            placeholder="Weight"
                            keyboardType="numeric"
                        />
                    ) : (
                        <Text style={styles.detailText}>Weight: {memberData.weight} kg</Text>
                    )}
                </View>
                
                {/* BP */}
                <View style={styles.twoColumnItem}>
                    <FontAwesome name="heartbeat" size={18} color="#666" />
                    {isEditMode ? (
                        <TextInput
                            style={styles.smallInput}
                            value={memberData.bp}
                            onChangeText={(text) => updateMedicalField('bp', text)}
                            placeholder="BP"
                        />
                    ) : (
                        <Text style={styles.detailText}>BP: {memberData.bp}</Text>
                    )}
                </View>
            </View>
            
            {/* Danger Signs */}
            <View style={styles.inputGroup}>
                <FontAwesome name="warning" size={18} color="#666" />
                {isEditMode ? (
                    <TextInput
                        style={styles.fullWidthInput}
                        value={memberData.dangerSigns}
                        onChangeText={(text) => updateMedicalField('dangerSigns', text)}
                        placeholder="i.e. Bleeding, Swelling"
                    />
                ) : (
                    <Text style={styles.detailText}>Danger Signs: {memberData.dangerSigns}</Text>
                )}
            </View>

            {/* Other Medical Info */}
            <View style={styles.inputGroup}>
                <Feather name="file-text" size={18} color="#666" />
                {isEditMode ? (
                    <TextInput
                        style={styles.fullWidthInput}
                        value={memberData.otherMedicalInfo}
                        onChangeText={(text) => updateMedicalField('otherMedicalInfo', text)}
                        placeholder="i.e. Weight decreasing"
                    />
                ) : (
                    <Text style={styles.detailText}>Other Info: {memberData.otherMedicalInfo}</Text>
                )}
            </View>

        </DetailCard>

        {/* -------------------- Medicines Distributed Card -------------------- */}
        <DetailCard title="Medicines Distributed">
            <View style={styles.medicationGrid}>
                <MedicationInput 
                    iconName="pill" 
                    label="IFA Tablets" 
                    count={memberData.ifaTablets}
                    onChangeText={(text) => updateMedicalField('ifaTablets', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
                 <MedicationInput 
                    iconName="package-variant" 
                    label="ORS Packets" 
                    count={memberData.orsPackets}
                    onChangeText={(text) => updateMedicalField('orsPackets', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
                <MedicationInput 
                    iconName="pill" 
                    label="Zinc Tablets" 
                    count={memberData.zincTablets}
                    onChangeText={(text) => updateMedicalField('zincTablets', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
                <MedicationInput 
                    iconName="pill" 
                    label="Paracetamol" 
                    count={memberData.paracetamol}
                    onChangeText={(text) => updateMedicalField('paracetamol', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
                <MedicationInput 
                    iconName="pill" 
                    label="Calcium Tablets" 
                    count={memberData.calciumTablets}
                    onChangeText={(text) => updateMedicalField('calciumTablets', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
                <MedicationInput 
                    iconName="pill" 
                    label="Deworming Tablets" 
                    count={memberData.dewormingTablets}
                    onChangeText={(text) => updateMedicalField('dewormingTablets', parseInt(text) || 0)}
                    isEditMode={isEditMode}
                />
            </View>
        </DetailCard>
        
        {/* -------------------- Referred (Reasons) -------------------- */}
        <DetailCard title="Referred (Reasons)">
            <View style={styles.inputGroup}>
                <FontAwesome name="warning" size={18} color="#666" />
                {isEditMode ? (
                    <TextInput
                        style={styles.fullWidthInput}
                        value="i.e. Swelling, High BP" // Placeholder value
                        onChangeText={() => {}} // Placeholder onChange
                        placeholder="i.e. Swelling, High BP"
                    />
                ) : (
                    <Text style={styles.detailText}>Not Referred</Text>
                )}
            </View>
        </DetailCard>

        {/* -------------------- Next Visit (Reminder) -------------------- */}
        <DetailCard title="Next Visit (Reminder)">
            <View style={styles.inputGroup}>
                <Feather name="clock" size={18} color="#666" />
                {isEditMode ? (
                    <TextInput
                        style={styles.fullWidthInput}
                        value="i.e. Next ANC visit on 15/10/2025" // Placeholder value
                        onChangeText={() => {}} // Placeholder onChange
                        placeholder="i.e. Next ANC visit on 15/10/2025"
                    />
                ) : (
                    <Text style={styles.detailText}>None set</Text>
                )}
            </View>
        </DetailCard>


        {/* -------------------- Save Button (Only in Edit Mode) -------------------- */}
        {isEditMode && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        )}

        {/* -------------------- Member History Card (Placeholder) -------------------- */}
        {/* Retaining original placeholder card, ensuring it is at the bottom */}
        <DetailCard title="Member History" style={{ marginBottom: 30 }}>
            <View style={styles.historyTitleRow}>
                <MaterialCommunityIcons name="history" size={20} color="#333" />
                <Text style={styles.historyTitleText}>Member History</Text>
            </View>
            <HistoryLine date="25/09/2025" event="TT Done" />
            <HistoryLine date="25/09/2025" event="ANC Visit" />
            <HistoryLine date="05/09/2025" event="IFA Tablets delivered" />
        </DetailCard>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background for contrast
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  
  // --- Member Header Card Styles ---
  memberHeaderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  memberInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 10,
    color: '#000',
  },
  memberNameInput: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 15,
      marginRight: 10,
      color: '#000',
      borderBottomWidth: 1,
      borderColor: '#1E90FF',
      flex: 1,
      paddingVertical: 0,
  },
  pregnantTag: {
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 10,
  },
  pregnantText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  optionsButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 5, 
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  idText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
  },
  
  // --- Tag and Note Styles ---
  label: {
      fontSize: 12,
      color: '#666',
      marginBottom: 5,
  },
  tagSelectContainer: {
      marginTop: 10,
      marginBottom: 10,
  },
  tagSelect: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#f9f9f9',
  },
  tagText: {
      fontSize: 14,
      color: '#333',
  },
  noteContainer: {
      marginTop: 5,
      marginBottom: 10,
  },
  noteInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      minHeight: 40,
      fontSize: 14,
      backgroundColor: '#fff',
  },
  noteText: {
      fontSize: 14,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eee',
      color: '#333',
  },


  // --- Medical Info Specific Styles ---
  medicalInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
  },
  ttInjectionRow: {
      marginBottom: 10,
  },
  ttCheckboxGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 2,
    minWidth: '30%', // For TT group
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  twoColumnInputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 15,
  },
  twoColumnItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
  },
  smallInput: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#1E90FF',
      marginLeft: 5,
      paddingHorizontal: 5,
      paddingVertical: 2,
      fontSize: 14,
      color: '#000',
  },
  inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
  },
  fullWidthInput: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#1E90FF',
      marginLeft: 10,
      paddingHorizontal: 5,
      paddingVertical: 2,
      fontSize: 14,
      color: '#000',
  },

  // --- Medication Styles ---
  medicationGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
  },
  medicationRow: {
      width: '48%', // Two columns
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingRight: 5,
  },
  medicationLabel: {
      flex: 1,
      marginLeft: 5,
      fontSize: 14,
      color: '#333',
  },
  medicationInput: {
      width: 40,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderColor: '#1E90FF',
      fontSize: 14,
      color: '#000',
      paddingVertical: 2,
  },
  medicationCount: {
      width: 40,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1E90FF',
  },


  // --- General/Reused Styles ---
  inputField: { // Reused for profile/header
      fontSize: 14,
      color: '#000',
      borderBottomWidth: 1,
      borderColor: '#1E90FF',
      paddingHorizontal: 4,
      paddingVertical: 2,
      minWidth: 50,
      marginLeft: 5,
  },
  saveButton: {
      backgroundColor: '#28A745', 
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 20,
      marginTop: 10,
  },
  saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  optionsDropdown: {
      position: 'absolute',
      top: 50, 
      right: 15,
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      zIndex: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
  },
  optionItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
  optionText: {
      fontSize: 16,
      color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  cardContent: {
    paddingTop: 5,
  },
  historyTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  historyTitleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginLeft: 5,
  },
  historyLine: {
      flexDirection: 'row',
      marginBottom: 8,
  },
  historyDate: {
      fontSize: 14,
      color: '#333',
      width: 90,
  },
  historyEvent: {
      fontSize: 14,
      color: '#333',
      flex: 1,
  },
});

export default MemberDetailsScreen;