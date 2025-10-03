import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';

// Standard React Native Vector Icons imports (required for this code to run in a RN environment)
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- DEMO DATA STRUCTURE for ASHA Worker ---
const initialASHAData = {
  id: 'ASHA-7890',
  name: 'Pooja Devi',
  age: "35 years",
  joiningDate: '15/08/2018',
  contact: '+91 98765 43210',
  email: 'pooja.devi@health.in',
  village: 'Shantipura',
  sector: 'Sector A-1',
  populationServed: 1250,
  householdsAssigned: 245,
  
  // Performance Metrics (Mock Data)
  performance: {
    monthlyVisits: 85,
    immunizationRate: '92%',
    ancCompletionRate: '95%',
    incentiveEarnings: '₹ 8,500',
  },
  
  // Credentials
  trainingLevel: 'Level 2 Certified',
  lastTraining: '10/06/2025',
};

// --- REUSABLE COMPONENTS ---

// Card component
const InfoCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Detail line for consistency (Modified to support Edit Mode)
const DetailLine = ({ Icon, label, value, stateKey, isEditable, onValueChange, keyboardType = 'default' }) => (
  <View style={styles.detailLine}>
    {/* Icon is rendered here, applying the fixed style */}
    {Icon && <Icon style={styles.detailIcon} />}
    <Text style={styles.detailLabel}>{label}:</Text>
    {isEditable ? (
        <TextInput
            style={[styles.detailValue, styles.editableInput]}
            value={value}
            onChangeText={(text) => onValueChange(stateKey, text)}
            keyboardType={keyboardType}
            editable={true}
        />
    ) : (
        <Text style={styles.detailValue}>{value}</Text>
    )}
  </View>
);

// Metric box for performance
const MetricBox = ({ Icon, label, value, color, boxStyle }) => (
    <View style={[styles.metricBox, { borderColor: color, backgroundColor: `${color}10` }, boxStyle]}>
        <Icon size={28} style={{ color: color }} />
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
    </View>
);


// --- MAIN COMPONENT ---

const ASHAProfileScreen = ({ navigate }) => {
    const [workerData, setWorkerData] = useState(initialASHAData);
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialData, setInitialData] = useState(initialASHAData);

    // Helper to update state fields
    const updateWorkerField = (key, value) => {
        setWorkerData(prev => ({ ...prev, [key]: value }));
    };
    
    // Toggle Edit Mode and handle Save/Cancel
    const handleEditToggle = () => {
        if (isEditMode) {
            setInitialData(workerData); 
            setIsEditMode(false);
            Alert.alert('Success', 'Profile changes saved!');
        } else {
            setIsEditMode(true);
        }
    };

    const handleCancelEdit = () => {
        if (isEditMode) {
            setWorkerData(initialData);
            setIsEditMode(false);
        }
    };

    const handleBack = (navigate) => {
        if (isEditMode) {
            navigate('Profile');
        } else {
            navigate('Home');
        }
    };

    const handleLogout = (navigate) => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: () => {console.log('Logging out...'); }},
        ]);
        navigate("Tasks");
    };

    // Helper functions to wrap icon names for use in DetailLine/MetricBox
    const IconWrapper = (name, library = MaterialCommunityIcons) => (props) => {
        const IconComponent = library;
        return <IconComponent name={name} {...props} />;
    };
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back, Title, and Edit/Save Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleBack(navigate)} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name={isEditMode ? "close" : "arrow-left"} size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                
                {/* Edit/Save Button */}
                <TouchableOpacity 
                    onPress={handleEditToggle} 
                    style={[styles.editSaveButton, isEditMode && styles.saveButtonActive]}
                >
                    <Feather 
                        name={isEditMode ? "save" : "edit"} 
                        size={18} 
                        color={isEditMode ? "#fff" : "#1E90FF"} 
                    />
                    <Text style={[styles.editSaveText, isEditMode && { color: '#fff' }]}>
                        {isEditMode ? "Save" : "Edit"}
                    </Text>
                </TouchableOpacity>

                {/* Logout Button (Hidden in edit mode to prioritize screen space/controls) */}
                {!isEditMode && (
                    <TouchableOpacity onPress={() => handleLogout(navigate)} style={styles.logoutButton}>
                        <Feather name="log-out" size={20} color="#E74C3C" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* -------------------- 1. Personal & Contact Info Card -------------------- */}
                <View style={styles.profileHeaderCard}>
                    <View style={styles.avatarContainer}>
                        <MaterialCommunityIcons name="account-circle" size={80} style={styles.avatarSvg} color="#1E90FF" />
                        
                        {/* Editable Name */}
                        {isEditMode ? (
                            <TextInput 
                                style={[styles.profileName, styles.nameInput]}
                                value={workerData.name}
                                onChangeText={(text) => updateWorkerField('name', text)}
                                editable={true}
                            />
                        ) : (
                            <Text style={styles.profileName}>{workerData.name}</Text>
                        )}
                        
                        <Text style={styles.profileRole}>ASHA Worker - <Text style={styles.profileId}>{workerData.id}</Text></Text>
                    </View>

                    <View style={styles.contactSection}>
                        <DetailLine 
                            Icon={IconWrapper('phone', Feather)} 
                            label="Contact" 
                            value={workerData.contact}
                            stateKey="contact"
                            isEditable={isEditMode}
                            onValueChange={updateWorkerField}
                            keyboardType="phone-pad"
                        />
                        <DetailLine 
                            Icon={IconWrapper('email')} 
                            label="Email" 
                            value={workerData.email}
                            stateKey="email"
                            isEditable={isEditMode}
                            onValueChange={updateWorkerField}
                            keyboardType="email-address"
                        />
                        {/* Age and Joined Date are static/calculated, not editable here */}
                        <DetailLine 
                            Icon={IconWrapper('cake-variant-outline')} 
                            label="Age" 
                            value={`${workerData.age}`}
                            isEditable={isEditMode}
                            stateKey="age"
                            onValueChange={updateWorkerField}
                            keyboardType="Text"
                        />
                        <DetailLine 
                            Icon={IconWrapper('calendar-check-outline')} 
                            label="Joined" 
                            value={workerData.joiningDate}
                        />
                    </View>
                </View>

                
                {/* -------------------- 2. Assigned Area & Demographics -------------------- */}
                <InfoCard title="Assigned Area & Coverage">
                    <DetailLine 
                        Icon={IconWrapper('home-city-outline')} 
                        label="Village" 
                        value={workerData.village}
                        stateKey="village"
                        isEditable={0}
                        onValueChange={updateWorkerField}
                    />
                    <DetailLine 
                        Icon={IconWrapper('map-marker-radius-outline')} 
                        label="Sector" 
                        value={workerData.sector}
                        stateKey="sector"
                        isEditable={0}
                        onValueChange={updateWorkerField}
                    />
                    {/* These are calculated/static statistics */}
                    <DetailLine 
                        Icon={IconWrapper('human-male-female')} 
                        label="Population Served" 
                        value={workerData.populationServed.toString()}
                    />
                </InfoCard>

                {/* -------------------- 3. Performance Metrics Card -------------------- */}
                <InfoCard title="Performance (Current Month)">
                    <View style={styles.metricsGrid}>
                        <MetricBox 
                            Icon={IconWrapper('calendar', Feather)} 
                            label="Visits Completed" 
                            value={workerData.performance.monthlyVisits} 
                            color="#1E90FF" 
                            boxStyle={styles.boxBlue}
                        />
                        <MetricBox 
                            Icon={IconWrapper('shield-checkmark-outline', Ionicons)} 
                            label="Immunization Rate" 
                            value={workerData.performance.immunizationRate} 
                            color="#28A745" 
                            boxStyle={styles.boxGreen}
                        />
                        <MetricBox 
                            Icon={IconWrapper('activity', Feather)} 
                            label="ANC Completion" 
                            value={workerData.performance.ancCompletionRate} 
                            color="#FFC107" 
                            boxStyle={styles.boxAmber}
                        />
                        <MetricBox 
                            Icon={IconWrapper('currency-inr')} 
                            label="Incentives Earned" 
                            value={workerData.performance.incentiveEarnings} 
                            color="#0056b3" 
                            boxStyle={styles.boxDeepBlue}
                        />
                    </View>
                </InfoCard>

                {/* -------------------- 4. Training & Certification -------------------- */}
                <InfoCard title="Training & Certification" style={{ marginBottom: 30 }}>
                    <DetailLine 
                        Icon={IconWrapper('certificate-outline')} 
                        label="Certification" 
                        value={workerData.trainingLevel}
                    />
                    <DetailLine 
                        Icon={IconWrapper('school-outline')} 
                        label="Last Training" 
                        value={workerData.lastTraining}
                    />
                    <TouchableOpacity style={styles.certificateButton}>
                        <Feather name="download" size={16} color="#fff" />
                        <Text style={styles.certificateButtonText}>Download Certificate</Text>
                    </TouchableOpacity>
                </InfoCard>

                {/* Cancel Button visible in edit mode */}
                {isEditMode && (
                    <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel Edit</Text>
                    </TouchableOpacity>
                )}


            </ScrollView>
        </SafeAreaView>
    );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa', 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerIconContainer: {
        padding: 5,
        width: 40, 
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    
    // --- Edit/Save Button Styles ---
    editSaveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#e6f0ff', // Light blue background for Edit
        borderRadius: 8,
        marginLeft: 10,
    },
    saveButtonActive: {
        backgroundColor: '#28A745', // Green for Save
    },
    editSaveText: {
        color: '#1E90FF',
        marginLeft: 4,
        fontWeight: '600',
        fontSize: 14,
    },
    logoutButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-end',
    },
    
    // --- Profile Header Card ---
    profileHeaderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarSvg: {
        backgroundColor: '#e6f0ff',
        borderRadius: 40, 
        padding: 8,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#333',
        marginTop: 5,
    },
    nameInput: {
        borderBottomWidth: 2,
        borderBottomColor: '#1E90FF',
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    profileRole: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        marginBottom: 16,
    },
    profileId: {
        fontWeight: 'bold',
        color: '#0056b3',
    },
    contactSection: {
        width: '100%',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },

    // --- General Card Styles ---
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0056b3', 
        borderBottomWidth: 2,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
        marginBottom: 10,
    },
    
    // --- Detail Line Styles ---
    detailLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailIcon: {
        color: '#1E90FF',
        marginRight: 12,
        width: 20, 
        height: 20,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        minWidth: 120, 
    },
    detailValue: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
        flexShrink: 1, 
        flex: 1,
    },
    editableInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#1E90FF',
        paddingVertical: 2,
        paddingHorizontal: 4,
        fontSize: 16,
        color: '#000',
    },

    // --- Metrics Grid Styles (Unchanged) ---
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    metricBox: {
        width: (width - 45) / 2 - 10, 
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 4,
        color: '#333',
    },
    metricLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 2,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    boxBlue: { borderColor: '#1E90FF', backgroundColor: 'rgba(30, 144, 255, 0.06)' },
    boxGreen: { borderColor: '#28A745', backgroundColor: 'rgba(40, 167, 69, 0.06)' },
    boxAmber: { borderColor: '#FFC107', backgroundColor: 'rgba(255, 193, 7, 0.06)' },
    boxDeepBlue: { borderColor: '#0056b3', backgroundColor: 'rgba(0, 86, 179, 0.06)' },
    
    // --- Training Button (Unchanged) ---
    certificateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        shadowColor: '#1E90FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    certificateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    
    // --- New Cancel Button ---
    cancelButton: {
        backgroundColor: '#E74C3C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 30,
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ASHAProfileScreen;