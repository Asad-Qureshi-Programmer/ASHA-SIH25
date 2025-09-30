import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Assuming Dimensions is imported in the final environment

// --- REUSABLE COMPONENTS ---

// Card component for sections
const SettingsSection = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Component for a clickable setting item
const SettingItem = ({ icon, label, onPress, value = null, isDestructive = false }) => (
    <TouchableOpacity 
        style={styles.settingItem} 
        onPress={onPress}
    >
        <MaterialCommunityIcons name={icon} size={24} color={isDestructive ? '#E74C3C' : '#0056b3'} />
        <Text style={[styles.settingLabel, isDestructive && styles.destructiveText]}>{label}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {!value && !isDestructive && <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />}
    </TouchableOpacity>
);

// Component for a switch/toggle setting
const ToggleItem = ({ icon, label, value, onToggle }) => (
    <View style={styles.settingItem}>
        <MaterialCommunityIcons name={icon} size={24} color={'#0056b3'} />
        <Text style={styles.settingLabel}>{label}</Text>
        <Switch 
            trackColor={{ false: "#ccc", true: "#28A745" }}
            thumbColor={value ? "#fff" : "#fff"}
            onValueChange={onToggle}
            value={value}
        />
    </View>
);


// --- MAIN COMPONENT ---

const SettingsScreen = ({ navigate }) => {
    // State for toggle settings
    const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    const handleSyncNow = () => {
        Alert.alert("Sync Status", "Data synchronization started. Please wait...", [{ text: "OK" }]);
        // Simulated sync delay
        setTimeout(() => {
            Alert.alert("Sync Complete", "All data successfully synchronized with the central server.", [{ text: "Done" }]);
        }, 2000);
    };

    const handleCheckForUpdates = () => {
        Alert.alert("App Update", "You are running the latest version (v2.1.5).", [{ text: "OK" }]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.headerIconContainer} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- 1. Data & Synchronization --- */}
                <SettingsSection title="Data & Synchronization">
                    <SettingItem 
                        icon="cloud-sync" 
                        label="Synchronize Data Now" 
                        onPress={handleSyncNow}
                    />
                    <ToggleItem 
                        icon="cloud-check" 
                        label="Enable Auto Sync (Wi-Fi only)" 
                        value={isAutoSyncEnabled}
                        onToggle={setIsAutoSyncEnabled}
                    />
                    <ToggleItem 
                        icon="wifi-off" 
                        label="Force Offline Mode" 
                        value={isOfflineMode}
                        onToggle={setIsOfflineMode}
                    />
                    <SettingItem 
                        icon="database-settings" 
                        label="Local Data Storage Details" 
                        onPress={() => console.log('Viewing storage details')}
                        value="32 MB used"
                    />
                </SettingsSection>

                {/* --- 2. Application Settings --- */}
                <SettingsSection title="Application Settings">
                    <SettingItem 
                        icon="translate" 
                        label="Change Language" 
                        onPress={() => console.log('Opening language selector')}
                        value="Hindi (हिन्दी)"
                    />
                    <ToggleItem 
                        icon="theme-light-dark" 
                        label="Dark Mode" 
                        value={isDarkModeEnabled}
                        onToggle={setIsDarkModeEnabled}
                    />
                    <SettingItem 
                        icon="information-outline" 
                        label="Check for Updates" 
                        onPress={handleCheckForUpdates}
                        value="v2.1.5"
                    />
                </SettingsSection>
                
                {/* --- 3. Support & Legal --- */}
                <SettingsSection title="Support & Legal">
                    <SettingItem 
                        icon="help-circle-outline" 
                        label="Help & FAQs" 
                        onPress={() => console.log('Opening help page')}
                    />
                    <SettingItem 
                        icon="shield-lock-outline" 
                        label="Privacy Policy" 
                        onPress={() => console.log('Opening privacy policy')}
                    />
                </SettingsSection>

                {/* --- 4. Account Action --- */}
                <SettingsSection title="Account" style={{ marginBottom: 30 }}>
                    <SettingItem 
                        icon="logout" 
                        label="Log Out" 
                        onPress={() => navigate('Tasks')}
                        isDestructive={true}
                    />
                </SettingsSection>
                
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  
  // --- Card/Section Styles ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  cardContent: {
    // Container for items
  },

  // --- Setting Item Styles ---
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  destructiveText: {
      color: '#E74C3C',
      fontWeight: '600',
  }
});

export default SettingsScreen;