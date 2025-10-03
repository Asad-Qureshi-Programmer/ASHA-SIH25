// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Modal } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// // --- Placeholder for the Main VHSND Screen (Imported from previous answer) ---
// // For a complete app, you would import VHSNDScreen from its file.
// const VHSNDScreen = ({ eventCode, eventDate, onBack }) => {
//     // We'll use this mock data to give the screen context
//     const mockData = {
//         date: eventDate || "05 October 2025",
//         location: `Anganwadi Center - Event #${eventCode || 'VH001'}`,
//         participants: "45",
//         services: ["New Pregnancy Registration", "Growth Monitoring (Children)", "IFA Tablets Distributed"],
//         remarks: "High attendance for ANC, but low turnout for Measles vaccine.",
//     };
    
//     // State for the Member Registration Modal
//     const [isRegistrationModalVisible, setRegistrationModalVisible] = useState(false);
    
//     // --- Member Registration Modal Component (Moved here for brevity) ---
//     const MemberRegistrationModal = () => {
//         const [name, setName] = useState('');
//         const [age, setAge] = useState('');
//         const [reason, setReason] = useState('');

//         const handleSubmit = () => {
//             if (name && age && reason) {
//                 console.log("New Member Registered:", { name, age, reason });
//                 // In a real app, send data to server and update list
//                 setRegistrationModalVisible(false);
//                 setName(''); setAge(''); setReason('');
//             } else {
//                 alert("Please fill all details.");
//             }
//         };

//         return (
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={isRegistrationModalVisible}
//                 onRequestClose={() => setRegistrationModalVisible(false)}
//             >
//                 <View style={modalStyles.centeredView}>
//                     <View style={modalStyles.modalView}>
//                         <Text style={modalStyles.modalTitle}>Register New Participant</Text>

//                         <TextInput
//                             style={modalStyles.input}
//                             placeholder="Name"
//                             placeholderTextColor="#999"
//                             onChangeText={setName}
//                             value={name}
//                         />
//                         <TextInput
//                             style={modalStyles.input}
//                             placeholder="Age"
//                             placeholderTextColor="#999"
//                             onChangeText={setAge}
//                             value={age}
//                             keyboardType="numeric"
//                         />
//                         <TextInput
//                             style={modalStyles.input}
//                             placeholder="Reason for Visit (e.g., ANC checkup, Child weight)"
//                             placeholderTextColor="#999"
//                             onChangeText={setReason}
//                             value={reason}
//                         />

//                         <View style={modalStyles.buttonRow}>
//                             <TouchableOpacity
//                                 style={[modalStyles.button, modalStyles.buttonClose]}
//                                 onPress={() => setRegistrationModalVisible(false)}
//                             >
//                                 <Text style={modalStyles.textStyle}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[modalStyles.button, modalStyles.buttonSubmit]}
//                                 onPress={handleSubmit}
//                             >
//                                 <Text style={modalStyles.textStyle}>Add Person</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         );
//     };
    
//     // --- Reusable Card Component ---
//     const Card = ({ title, children, style }) => (
//         <View style={[styles.card, style]}>
//           <Text style={styles.cardTitle}>{title}</Text>
//           <View style={styles.cardContent}>{children}</View>
//         </View>
//       );
      
//     const CheckboxItem = ({ label, isChecked }) => (
//         <View style={styles.checkboxContainer}>
//           <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
//             {isChecked && <Feather name="check" size={14} color="#fff" />}
//           </View>
//           <Text style={styles.checkboxLabel}>{label}</Text>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <MemberRegistrationModal />
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={onBack || (() => console.log('Go Back'))}>
//                     <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>VHSND Day Services</Text>
//                 <TouchableOpacity style={styles.addButton} onPress={() => setRegistrationModalVisible(true)}>
//                     <Feather name="plus-circle" size={24} color="#1E90FF" />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView contentContainerStyle={styles.scrollContent}>

//                 {/* --- Event Information Card (Now dynamic context) --- */}
//                 <Card title="Event Details">
//                     <View style={styles.detailRow}>
//                         <Text style={styles.detailTextBold}>Code:</Text>
//                         <Text style={styles.detailText}>{eventCode || 'VH001'}</Text>
//                     </View>
//                     <View style={styles.detailRow}>
//                         <Text style={styles.detailTextBold}>Date:</Text>
//                         <Text style={styles.detailText}>{mockData.date}</Text>
//                     </View>
//                     <View style={styles.detailRow}>
//                         <Text style={styles.detailTextBold}>Location:</Text>
//                         <Text style={styles.detailText}>{mockData.location}</Text>
//                     </View>
//                     <View style={styles.detailRow}>
//                         <Text style={styles.detailTextBold}>Total Participants:</Text>
//                         <Text style={styles.detailText}>{mockData.participants}</Text>
//                     </View>
//                 </Card>
                
//                 {/* --- Services Offered Card --- */}
//                 <Card title="Services Provided">
//                     <Text style={styles.sectionTitle}>Key Services Delivered:</Text>
//                     {mockData.services.map((service, index) => (
//                         <CheckboxItem key={index} label={service} isChecked={true} />
//                     ))}
//                     <CheckboxItem label="Antenatal Checkups (ANC)" isChecked={false} />
//                 </Card>

//                 {/* --- Notes/Remarks Card --- */}
//                 <Card title="Remarks">
//                     <Text style={styles.notesText}>{mockData.remarks}</Text>
//                 </Card>

//                 {/* --- Submission Button --- */}
//                 <TouchableOpacity style={styles.submitButton} onPress={() => console.log('VHSND Data Updated')}>
//                     <Text style={styles.submitButtonText}>Update VHSND Report</Text>
//                 </TouchableOpacity>

//             </ScrollView>
//         </SafeAreaView>
//     );
// };
// // --- END VHSNDScreen Component ---


// const VHSNDLandingScreen = () => {
//   const [mode, setMode] = useState(null); // 'create' or 'join' or 'view'
//   const [eventCode, setEventCode] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [currentEvent, setCurrentEvent] = useState(null);

//   // Function to simulate creating an event
//   const handleCreate = () => {
//     const randomCode = `VH${Math.floor(Math.random() * 900) + 100}`; // e.g., VH123
//     const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
//     setCurrentEvent({ code: randomCode, date: today });
//   };

//   // Function to simulate joining an event
//   const handleJoin = () => {
//     if (eventCode.length >= 5) {
//       // Simulate successful join and get the date
//       setCurrentEvent({ code: eventCode.toUpperCase(), date: "28 September 2025" });
//     } else {
//       alert("Please enter a valid 5+ character code.");
//     }
//   };

//   if (currentEvent) {
//     // If an event is selected/created, render the main screen
//     return <VHSNDScreen 
//               eventCode={currentEvent.code} 
//               eventDate={currentEvent.date} 
//               onBack={() => setCurrentEvent(null)}
//            />;
//   }

//   return (
//     <SafeAreaView style={landingStyles.container}>
//       <Text style={landingStyles.title}>VHSND Event Management</Text>
      
//       <View style={landingStyles.buttonGroup}>
//         <TouchableOpacity 
//           style={landingStyles.modeButton} 
//           onPress={() => setMode('create')}
//         >
//           <Feather name="plus-square" size={24} color="#fff" />
//           <Text style={landingStyles.modeButtonText}>Create New Event</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[landingStyles.modeButton, { backgroundColor: '#FFC107' }]} 
//           onPress={() => setMode('join')}
//         >
//           <Feather name="link" size={24} color="#333" />
//           <Text style={[landingStyles.modeButtonText, { color: '#333' }]}>Join Existing Event</Text>
//         </TouchableOpacity>
//       </View>

//       {/* --- Create New Event Form --- */}
//       {mode === 'create' && (
//         <View style={landingStyles.formContainer}>
//           <Text style={landingStyles.formText}>Start a new VHSND day record. A random code will be generated.</Text>
//           <TouchableOpacity style={landingStyles.actionButton} onPress={handleCreate}>
//             <Text style={landingStyles.actionButtonText}>Generate Code & Start</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* --- Join Existing Event Form --- */}
//       {mode === 'join' && (
//         <View style={landingStyles.formContainer}>
//           <Text style={landingStyles.formText}>Enter the unique code to join the event.</Text>
//           <TextInput
//             style={landingStyles.input}
//             placeholder="Enter Event Code (e.g., VH123)"
//             placeholderTextColor="#999"
//             onChangeText={setEventCode}
//             value={eventCode}
//             autoCapitalize="characters"
//           />
//           <TouchableOpacity style={landingStyles.actionButton} onPress={handleJoin} disabled={eventCode.length < 5}>
//             <Text style={landingStyles.actionButtonText}>Join Event</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//     </SafeAreaView>
//   );
// };

// // --- STYLES for Landing Page ---
// const landingStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f7f7f7',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 30,
//         textAlign: 'center',
//     },
//     buttonGroup: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 30,
//     },
//     modeButton: {
//         width: '48%',
//         padding: 15,
//         borderRadius: 8,
//         backgroundColor: '#1E90FF',
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     modeButtonText: {
//         color: '#fff',
//         fontSize: 15,
//         fontWeight: '600',
//         marginLeft: 8,
//     },
//     formContainer: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     formText: {
//         fontSize: 15,
//         color: '#666',
//         marginBottom: 15,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 12,
//         fontSize: 16,
//         marginBottom: 15,
//         color: '#333',
//     },
//     actionButton: {
//         backgroundColor: '#28A745',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     actionButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// // --- STYLES for VHSND Screen (Updated/Modified) ---
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f0f0f5', 
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 15,
//         backgroundColor: '#fff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     addButton: {
//         padding: 5,
//     },
//     scrollContent: {
//         padding: 15,
//         paddingBottom: 30,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         padding: 15,
//         marginBottom: 20,
//         elevation: 2,
//     },
//     cardTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: '#1E90FF',
//         marginBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//         paddingBottom: 5,
//     },
//     detailRow: {
//         flexDirection: 'row',
//         marginBottom: 5,
//     },
//     detailTextBold: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#333',
//         width: 130,
//     },
//     detailText: {
//         fontSize: 14,
//         color: '#666',
//         flex: 1,
//     },
//     sectionTitle: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#007BFF',
//         marginTop: 10,
//         marginBottom: 5,
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 6,
//     },
//     checkbox: {
//         width: 20,
//         height: 20,
//         borderRadius: 4,
//         borderWidth: 1,
//         borderColor: '#999',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     checkboxChecked: {
//         backgroundColor: '#28A745', 
//         borderColor: '#28A745',
//     },
//     checkboxLabel: {
//         marginLeft: 8,
//         fontSize: 15,
//         color: '#333',
//     },
//     notesText: {
//         fontSize: 15,
//         color: '#333',
//         padding: 5,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 4,
//     },
//     submitButton: {
//         backgroundColor: '#28A745',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginHorizontal: 15,
//         marginBottom: 30,
//         marginTop: 10,
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// // --- STYLES for Modal Component ---
// const modalStyles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//         width: '90%',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#1E90FF',
//     },
//     input: {
//         width: '100%',
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//         padding: 10,
//         fontSize: 16,
//         color: '#333',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginTop: 10,
//     },
//     button: {
//         borderRadius: 5,
//         padding: 10,
//         elevation: 2,
//         width: '48%',
//         alignItems: 'center',
//     },
//     buttonClose: {
//         backgroundColor: '#ccc',
//     },
//     buttonSubmit: {
//         backgroundColor: '#28A745',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default VHSNDLandingScreen;

import React, { useState, useEffect } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, 
    StyleSheet, SafeAreaView, ScrollView, Modal, 
    Alert, Clipboard // Clipboard is needed for a real copy function
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// --- MOCK DATA ---
const dummyParticipants = [
    { id: 1, name: "Gita Devi", age: 28, reason: "ANC Checkup" },
    { id: 2, name: "Ramesh Singh", age: 5, reason: "Growth Monitoring" },
    { id: 3, name: "Seema Kumari", age: 35, reason: "IFA Tablet Collection" },
];

// Helper function to simulate clipboard copy (requires react-native-clipboard/clipboard in a real app)
const copyToClipboard = (text) => {
    // In a real application, you would use: Clipboard.setString(text);
    Alert.alert("Code Copied", `Event Code ${text} copied to clipboard!`);
};

// --- REUSABLE CARD COMPONENT ---
const Card = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// --- MEMBER REGISTRATION MODAL ---
const MemberRegistrationModal = ({ isVisible, onClose, onAddMember }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (name && age && reason) {
            const newMember = { 
                id: Date.now(), // Use timestamp as unique ID
                name, 
                age: parseInt(age), 
                reason 
            };
            onAddMember(newMember);
            
            // Clear fields and close
            setName(''); setAge(''); setReason('');
            onClose();
        } else {
            Alert.alert("Missing Details", "Please fill in Name, Age, and Reason for Visit.");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalTitle}>Register New Participant</Text>

                    <TextInput
                        style={modalStyles.input}
                        placeholder="Name"
                        placeholderTextColor="#999"
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        style={modalStyles.input}
                        placeholder="Age"
                        placeholderTextColor="#999"
                        onChangeText={setAge}
                        value={age}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[modalStyles.input, { minHeight: 80, textAlignVertical: 'top' }]}
                        placeholder="Reason for Visit (e.g., ANC checkup, Child weight)"
                        placeholderTextColor="#999"
                        onChangeText={setReason}
                        value={reason}
                        multiline={true}
                    />

                    <View style={modalStyles.buttonRow}>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={modalStyles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonSubmit]}
                            onPress={handleSubmit}
                        >
                            <Text style={modalStyles.textStyle}>Add Person</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// --- MAIN VHSND SCREEN (Event View) ---
const VHSNDScreen = ({ eventCode, eventDate, onBack, initialParticipants }) => {
    
    // State to hold the participants list, initialized with dummy data
    const [participantsList, setParticipantsList] = useState(initialParticipants || []);
    const [isRegistrationModalVisible, setRegistrationModalVisible] = useState(false);
    
    // Function passed to the modal to update the participant list
    const handleAddMember = (newMember) => {
        setParticipantsList(prev => [...prev, newMember]);
        setRegistrationModalVisible(false);
    };

    const CheckboxItem = ({ label, isChecked }) => (
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && <Feather name="check" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>{label}</Text>
        </View>
    );

    const mockData = {
        date: eventDate || "05 October 2025",
        location: `Anganwadi Center - Event #${eventCode || 'VH001'}`,
        services: ["New Pregnancy Registration", "Growth Monitoring (Children)", "IFA Tablets Distributed"],
        remarks: "High attendance for ANC, but low turnout for Measles vaccine.",
    };

    return (
        <SafeAreaView style={styles.container}>
            <MemberRegistrationModal 
                isVisible={isRegistrationModalVisible} 
                onClose={() => setRegistrationModalVisible(false)} 
                onAddMember={handleAddMember}
            />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack || (() => console.log('Go Back'))}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>VHSND Day Services</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => setRegistrationModalVisible(true)}>
                    <Feather name="user-plus" size={24} color="#28A745" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- Event Information Card (Dynamic Participant Count) --- */}
                <Card title="Event Details">
                    <View style={styles.detailRow}>
                        <Text style={styles.detailTextBold}>Code:</Text>
                        <Text style={styles.detailText}>{eventCode || 'VH001'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailTextBold}>Date:</Text>
                        <Text style={styles.detailText}>{mockData.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailTextBold}>Location:</Text>
                        <Text style={styles.detailText}>{mockData.location}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailTextBold}>Total Participants:</Text>
                        <Text style={styles.detailTextBoldValue}>{participantsList.length}</Text> 
                    </View>
                </Card>
                
                {/* --- Participants List Card (New) --- */}
                <Card title={`Participants (${participantsList.length})`}>
                    {participantsList.length === 0 ? (
                        <Text style={{ color: '#999' }}>No participants registered yet.</Text>
                    ) : (
                        participantsList.slice(0, 5).map((member, index) => (
                            <View key={member.id} style={styles.participantRow}>
                                <Feather name="users" size={14} color="#1E90FF" style={{ marginRight: 8 }} />
                                <Text style={styles.participantName}>{member.name}, {member.age} yrs</Text>
                                <Text style={styles.participantReason}>{member.reason}</Text>
                            </View>
                        ))
                    )}
                    {participantsList.length > 5 && (
                        <Text style={{ marginTop: 5, color: '#666' }}>...and {participantsList.length - 5} more</Text>
                    )}
                </Card>

                {/* --- Services Offered Card --- */}
                <Card title="Services Provided">
                    <Text style={styles.sectionTitle}>Key Services Delivered:</Text>
                    {mockData.services.map((service, index) => (
                        <CheckboxItem key={index} label={service} isChecked={true} />
                    ))}
                    <CheckboxItem label="Antenatal Checkups (ANC)" isChecked={false} />
                </Card>

                {/* --- Submission Button --- */}
                <TouchableOpacity style={styles.submitButton} onPress={() => console.log('VHSND Data Updated')}>
                    <Text style={styles.submitButtonText}>Update VHSND Report</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};
// --- END VHSNDScreen Component ---


// --- LANDING SCREEN (Event Selection/Creation) ---
const VHSNDLandingScreen = () => {
    const [mode, setMode] = useState(null); // 'create' or 'join' or 'view'
    const [inputCode, setInputCode] = useState('');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [generatedCode, setGeneratedCode] = useState(null);

    // Function to handle the creation process
    const handleGenerateCode = () => {
        const randomCode = `VH${Math.floor(Math.random() * 900) + 100}`;
        setGeneratedCode(randomCode);
    };
    
    // Function to finalize creation and move to the VHSND screen
    const finalizeCreate = () => {
        const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        setCurrentEvent({ 
            code: generatedCode, 
            date: today, 
            participants: [] // Start with no participants
        });
        setGeneratedCode(null); // Clear the generated code display
    };

    // Function to simulate joining an event
    const handleJoin = () => {
        if (inputCode.length >= 5) {
            // Simulate successful join and fetch data
            setCurrentEvent({ 
                code: inputCode.toUpperCase(), 
                date: "28 September 2025", 
                participants: dummyParticipants // Load with dummy data
            });
        } else {
            Alert.alert("Invalid Code", "Please enter a valid 5+ character code.");
        }
    };

    // Render the main VHSND screen if an event is active
    if (currentEvent) {
        return <VHSNDScreen 
                  eventCode={currentEvent.code} 
                  eventDate={currentEvent.date} 
                  initialParticipants={currentEvent.participants}
                  onBack={() => setCurrentEvent(null)}
               />;
    }

    // Render the Landing Page
    return (
        <SafeAreaView style={landingStyles.container}>
            <Text style={landingStyles.title}>VHSND Event Management</Text>
            
            <View style={landingStyles.buttonGroup}>
                <TouchableOpacity 
                    style={landingStyles.modeButton} 
                    onPress={() => { setMode('create'); setGeneratedCode(null); setInputCode(''); }}
                >
                    <Feather name="plus-square" size={24} color="#fff" />
                    <Text style={landingStyles.modeButtonText}>Create New Event</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[landingStyles.modeButton, { backgroundColor: '#FFC107' }]} 
                    onPress={() => { setMode('join'); setGeneratedCode(null); setInputCode(''); }}
                >
                    <Feather name="link" size={24} color="#333" />
                    <Text style={[landingStyles.modeButtonText, { color: '#333' }]}>Join Existing Event</Text>
                </TouchableOpacity>
            </View>

            {/* --- Create New Event Form/Code Display --- */}
            {mode === 'create' && (
                <View style={landingStyles.formContainer}>
                    {generatedCode ? (
                        <View>
                            <Text style={landingStyles.formText}>Share this unique code for others to join:</Text>
                            <View style={landingStyles.codeDisplayRow}>
                                <Text style={landingStyles.codeText}>{generatedCode}</Text>
                                <TouchableOpacity 
                                    style={landingStyles.copyButton} 
                                    onPress={() => copyToClipboard(generatedCode)}
                                >
                                    <Feather name="copy" size={20} color="#fff" />
                                    <Text style={landingStyles.copyButtonText}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={landingStyles.actionButton} onPress={finalizeCreate}>
                                <Text style={landingStyles.actionButtonText}>Proceed to Event</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <Text style={landingStyles.formText}>Start a new VHSND day record. Click below to generate the code.</Text>
                            <TouchableOpacity style={landingStyles.actionButton} onPress={handleGenerateCode}>
                                <Text style={landingStyles.actionButtonText}>Generate Code & Share</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            {/* --- Join Existing Event Form --- */}
            {mode === 'join' && (
                <View style={landingStyles.formContainer}>
                    <Text style={landingStyles.formText}>Enter the unique code to join the event.</Text>
                    <TextInput
                        style={landingStyles.input}
                        placeholder="Enter Event Code (e.g., VH123)"
                        placeholderTextColor="#999"
                        onChangeText={setInputCode}
                        value={inputCode}
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity style={landingStyles.actionButton} onPress={handleJoin} disabled={inputCode.length < 5}>
                        <Text style={landingStyles.actionButtonText}>Join Event</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};

// --- STYLES for Landing Page (New/Modified) ---
const landingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    modeButton: {
        width: '48%',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modeButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    formText: {
        fontSize: 15,
        color: '#666',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    codeDisplayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    codeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    copyButton: {
        flexDirection: 'row',
        backgroundColor: '#1E90FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        alignItems: 'center',
    },
    copyButtonText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: '600',
    }
});

// --- STYLES for VHSND Screen (Updated/Modified) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        padding: 5,
    },
    scrollContent: {
        padding: 15,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E90FF',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    detailTextBold: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: 140,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        textAlign: 'right',
    },
    detailTextBoldValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28A745',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
        marginTop: 10,
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#28A745', 
        borderColor: '#28A745',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 30,
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Participant List Styles
    participantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f5',
    },
    participantName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginRight: 10,
    },
    participantReason: {
        fontSize: 13,
        color: '#666',
        flexShrink: 1,
    }
});

// --- STYLES for Modal Component (Unchanged) ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        alignItems: 'center',
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1E90FF',
    },
    input: {
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '48%',
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: '#ccc',
    },
    buttonSubmit: {
        backgroundColor: '#28A745',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default VHSNDLandingScreen;