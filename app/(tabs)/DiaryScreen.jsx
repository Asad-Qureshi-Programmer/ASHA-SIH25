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
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- DEMO DATA FOR REGISTERS ---
const demoRegisters = [
  { id: 1, title: 'Pregnant Women Register (R-1)', icon: 'account-woman', count: 18, color: '#0056b3' },
  { id: 2, title: 'Infant Register (0-1 Year)', icon: 'baby-carriage', count: 12, color: '#28A745' },
  { id: 3, title: 'Children Under 5 Register (R-3)', icon: 'child-friendly', count: 45, color: '#FFC107' },
  { id: 4, title: 'Eligible Couples Register (R-4)', icon: 'human-male-female', count: 78, color: '#E74C3C' },
  { id: 5, title: 'Births & Deaths Register', icon: 'clipboard-list-outline', count: 5, color: '#8E44AD' },
  { id: 6, title: 'Activity Summary & Reporting', icon: 'file-chart-outline', count: 2, color: '#1E90FF' },
];

// --- REUSABLE COMPONENTS ---

// Card component
const InfoCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Component for each Register Link
const RegisterLink = ({ register, onPress }) => (
    <TouchableOpacity 
        style={styles.registerLink} 
        onPress={() => onPress(register)}
    >
        <MaterialCommunityIcons name={register.icon} size={28} color={register.color} />
        <View style={styles.registerDetails}>
            <Text style={styles.registerTitle}>{register.title}</Text>
            <Text style={styles.registerCount}>{register.count} Active Members</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
);


// --- MAIN COMPONENT ---

const ASHADiaryScreen = ({navigate}) => {

    const handleSelectRegister = (register) => {
        // In a real app, this navigates to the detailed list view of the selected register.
        Alert.alert(
            `Viewing Register: ${register.title}`,
            `This screen would now display a filterable list of the ${register.count} active members.`,
            [{ text: "OK" }]
        );
        console.log(`Navigating to register: ${register.title}`);
    };
    
    // Total members across key health registers (1, 2, 3, 4)
    const totalHealthMembers = demoRegisters.slice(0, 4).reduce((sum, reg) => sum + reg.count, 0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate("Tasks")} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ASHA Diary & Registers</Text>
                <View style={styles.headerIconContainer} /> {/* Spacer */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- Overview Card --- */}
                <InfoCard title="Community Health Summary" style={styles.overviewCard}>
                    <View style={styles.summaryRow}>
                        <MaterialCommunityIcons name="clipboard-check-outline" size={28} color="#28A745" />
                        <View style={styles.summaryDetails}>
                            <Text style={styles.summaryCount}>{totalHealthMembers}</Text>
                            <Text style={styles.summaryLabel}>Total Active Beneficiaries</Text>
                        </View>
                    </View>
                    <View style={styles.summaryRow}>
                        <MaterialCommunityIcons name="calendar-month-outline" size={28} color="#0056b3" />
                        <View style={styles.summaryDetails}>
                            <Text style={styles.summaryCount}>Sep 2025</Text>
                            <Text style={styles.summaryLabel}>Last Report Generated</Text>
                        </View>
                    </View>
                </InfoCard>

                {/* --- Register List Card --- */}
                <InfoCard title="Key Health Registers">
                    {demoRegisters.slice(0, 4).map(reg => (
                        <RegisterLink key={reg.id} register={reg} onPress={handleSelectRegister} />
                    ))}
                </InfoCard>

                {/* --- Reporting & Admin Registers --- */}
                <InfoCard title="Reporting & Administration" style={{ marginBottom: 30 }}>
                    {demoRegisters.slice(4).map(reg => (
                        <RegisterLink key={reg.id} register={reg} onPress={handleSelectRegister} />
                    ))}
                </InfoCard>
                
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  
  // --- Card Styles ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0056b3',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 10,
  },
  cardContent: {
    paddingTop: 5,
  },

  // --- Summary Overview Styles ---
  overviewCard: {
    marginBottom: 20,
    backgroundColor: '#e6f0ff', // Light blue tint
    borderColor: '#cce5ff',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d9e9',
  },
  summaryDetails: {
    marginLeft: 15,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  
  // --- Register Link Styles ---
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  registerDetails: {
    flex: 1,
    marginLeft: 15,
  },
  registerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  registerCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default ASHADiaryScreen;