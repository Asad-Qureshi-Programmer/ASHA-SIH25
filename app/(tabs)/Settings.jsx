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

const { width } = Dimensions.get('window');

// --- THEME COLOR DEFINITIONS ---
const lightTheme = {
    BACKGROUND: '#f5f7fa',
    CARD_BACKGROUND: '#fff',
    TEXT_PRIMARY: '#333',
    TEXT_SECONDARY: '#666',
    BORDER: '#e0e0e0',
    HEADER_BORDER: '#eee',
    PRIMARY_COLOR: '#0056b3',
    DESTRUCTIVE_COLOR: '#E74C3C',
    SWITCH_TRUE: '#28A745',
    SWITCH_FALSE: '#ccc',
};

const darkTheme = {
    BACKGROUND: '#121212',
    CARD_BACKGROUND: '#1e1e1e',
    TEXT_PRIMARY: '#f0f0f0',
    TEXT_SECONDARY: '#ccc',
    BORDER: '#333',
    HEADER_BORDER: '#282828',
    PRIMARY_COLOR: '#6495ED', // Cornflower Blue
    DESTRUCTIVE_COLOR: '#FF6347', // Tomato
    SWITCH_TRUE: '#6495ED',
    SWITCH_FALSE: '#555',
};

// --- REUSABLE COMPONENTS ---

// Card component for sections
const SettingsSection = ({ title, children, style, themeStyles }) => (
  <View style={[styles.card, themeStyles.card, style]}>
    <Text style={[styles.cardTitle, themeStyles.cardTitle]}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Component for a clickable setting item
const SettingItem = ({ icon, label, onPress, value = null, isDestructive = false, themeStyles }) => (
    <TouchableOpacity 
        style={[styles.settingItem, themeStyles.settingItem]} 
        onPress={onPress}
    >
        <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={isDestructive ? themeStyles.DESTRUCTIVE_COLOR : themeStyles.PRIMARY_COLOR} 
        />
        <Text style={[styles.settingLabel, themeStyles.settingLabel, isDestructive && styles.destructiveText]}>
            {label}
        </Text>
        {value && <Text style={[styles.settingValue, themeStyles.settingValue]}>{value}</Text>}
        {!value && !isDestructive && <MaterialCommunityIcons name="chevron-right" size={20} color={themeStyles.TEXT_SECONDARY} />}
    </TouchableOpacity>
);

// Component for a switch/toggle setting
const ToggleItem = ({ icon, label, value, onToggle, themeStyles }) => (
    <View style={[styles.settingItem, themeStyles.settingItem]}>
        <MaterialCommunityIcons name={icon} size={24} color={themeStyles.PRIMARY_COLOR} />
        <Text style={[styles.settingLabel, themeStyles.settingLabel]}>{label}</Text>
        <Switch 
            trackColor={{ false: themeStyles.SWITCH_FALSE, true: themeStyles.SWITCH_TRUE }}
            thumbColor={value ? themeStyles.CARD_BACKGROUND : themeStyles.CARD_BACKGROUND}
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

    // --- THEME LOGIC ---
    const theme = isDarkModeEnabled ? darkTheme : lightTheme;


    const getCurrentThemeStyles = () => ({
        // Colors
        PRIMARY_COLOR: theme.PRIMARY_COLOR,
        DESTRUCTIVE_COLOR: theme.DESTRUCTIVE_COLOR,
        SWITCH_TRUE: theme.SWITCH_TRUE,
        SWITCH_FALSE: theme.SWITCH_FALSE,
        TEXT_SECONDARY: theme.TEXT_SECONDARY,
        CARD_BACKGROUND: theme.CARD_BACKGROUND,

        // Style Overrides
        container: {
            backgroundColor: theme.BACKGROUND,
        },
        header: {
            backgroundColor: theme.CARD_BACKGROUND,
            borderBottomColor: theme.HEADER_BORDER,
        },
        headerTitle: {
            color: theme.TEXT_PRIMARY,
        },
        card: {
            backgroundColor: theme.CARD_BACKGROUND,
            borderColor: theme.BORDER,
        },
        cardTitle: {
            color: theme.TEXT_SECONDARY,
            borderBottomColor: theme.HEADER_BORDER,
        },
        settingItem: {
            borderBottomColor: theme.HEADER_BORDER,
        },
        settingLabel: {
            color: theme.TEXT_PRIMARY,
        },
        settingValue: {
            color: theme.TEXT_SECONDARY,
        },
    });

    const themeStyles = getCurrentThemeStyles();

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
        <SafeAreaView style={[styles.container, themeStyles.container]}>
            <View style={[styles.header, themeStyles.header]}>
                <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme.TEXT_PRIMARY} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, themeStyles.headerTitle]}>Settings</Text>
                <View style={styles.headerIconContainer} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- 1. Data & Synchronization --- */}
                <SettingsSection title="Data & Synchronization" themeStyles={themeStyles}>
                    <SettingItem 
                        icon="cloud-sync" 
                        label="Synchronize Data Now" 
                        onPress={handleSyncNow}
                        themeStyles={themeStyles}
                    />
                    <ToggleItem 
                        icon="cloud-check" 
                        label="Enable Auto Sync (Wi-Fi only)" 
                        value={isAutoSyncEnabled}
                        onToggle={setIsAutoSyncEnabled}
                        themeStyles={themeStyles}
                    />
                    <ToggleItem 
                        icon="wifi-off" 
                        label="Force Offline Mode" 
                        value={isOfflineMode}
                        onToggle={setIsOfflineMode}
                        themeStyles={themeStyles}
                    />
                    <SettingItem 
                        icon="database-settings" 
                        label="Local Data Storage Details" 
                        onPress={() => console.log('Viewing storage details')}
                        value="114 MB used"
                        themeStyles={themeStyles}
                    />
                </SettingsSection>

                {/* --- 2. Application Settings --- */}
                <SettingsSection title="Application Settings" themeStyles={themeStyles}>
                    <SettingItem 
                        icon="translate" 
                        label="Change Language" 
                        onPress={() => console.log('Opening language selector')}
                        value="Hindi (हिन्दी)"
                        themeStyles={themeStyles}
                    />
                    <ToggleItem 
                        icon="theme-light-dark" 
                        label="Dark Mode" 
                        value={isDarkModeEnabled}
                        onToggle={setIsDarkModeEnabled}
                        themeStyles={themeStyles}
                    />
                    <SettingItem 
                        icon="information-outline" 
                        label="Check for Updates" 
                        onPress={handleCheckForUpdates}
                        value="v2.1.5"
                        themeStyles={themeStyles}
                    />
                </SettingsSection>
                
                {/* --- 3. Support & Legal --- */}
                <SettingsSection title="Support & Legal" themeStyles={themeStyles}>
                    <SettingItem 
                        icon="help-circle-outline" 
                        label="Help & FAQs" 
                        onPress={() => console.log('Opening help page')}
                        themeStyles={themeStyles}
                    />
                    <SettingItem 
                        icon="shield-lock-outline" 
                        label="Privacy Policy" 
                        onPress={() => console.log('Opening privacy policy')}
                        themeStyles={themeStyles}
                    />
                </SettingsSection>

                {/* --- 4. Account Action --- */}
                <SettingsSection title="Account" style={{ marginBottom: 30 }} themeStyles={themeStyles}>
                    <SettingItem 
                        icon="logout" 
                        label="Log Out" 
                        onPress={() => navigate('Tasks')}
                        isDestructive={true}
                        themeStyles={themeStyles}
                    />
                </SettingsSection>
                
            </ScrollView>
        </SafeAreaView>
    );
};

// --- STYLESHEET (Only static layout styles remain here) ---

const styles = StyleSheet.create({
  // Static layout styles
  container: {
    paddingTop: 40,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
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
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  
  // --- Card/Section Styles ---
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
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
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  settingValue: {
    fontSize: 16,
    marginRight: 10,
  },
  destructiveText: {
      fontWeight: '600',
      // Color handled by themeStyles
  }
});

export default SettingsScreen;
