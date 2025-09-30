import React from 'react';
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
import { useState } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

// --- DEMO NOTIFICATIONS DATA ---
const [demoNotifications,setDemoNoti] = useState([
  { 
    id: 1, 
    type: 'ALERT', 
    title: 'High-Risk Case Follow-up Due', 
    message: 'Sunita Devi (ID: 121002) is due for a high BP check today.', 
    time: '2 hours ago', 
    icon: 'heart-pulse', 
    color: '#E74C3C', // Red for urgency
  },
  { 
    id: 2, 
    type: 'TASK', 
    title: 'Infant Immunization Reminder', 
    message: 'Rohan Sharma is due for the 6-week vaccination (IPV/Penta).', 
    time: '4 hours ago', 
    icon: 'needle', 
    color: '#0056b3', // Blue for tasks
  },
  { 
    id: 3, 
    type: 'REPORT', 
    title: 'Monthly Report Filed Successfully', 
    message: 'Your September activity report has been submitted and approved.', 
    time: 'Yesterday, 6:30 PM', 
    icon: 'check-circle-outline', 
    color: '#28A745', // Green for success
  },
  { 
    id: 4, 
    type: 'INFO', 
    title: 'New Training Module Available', 
    message: 'A new module on Malaria prevention is available in the ASHA Training section.', 
    time: '2 days ago', 
    icon: 'information-outline', 
    color: '#FFC107', // Amber for info
  },
  { 
    id: 5, 
    type: 'TASK', 
    title: 'VHSND Event Today', 
    message: 'The monthly VHSND camp is scheduled at the Community Hall.', 
    time: '3 days ago', 
    icon: 'account-group-outline', 
    color: '#0056b3',
  },
]);

// --- REUSABLE COMPONENTS ---

// Component for a single Notification Item
const NotificationItem = ({ notification, onPress }) => (
    <TouchableOpacity 
        style={styles.notificationItem} 
        onPress={() => onPress(notification)}
    >
        <View style={[styles.iconContainer, { backgroundColor: notification.color + '15' }]}>
            <MaterialCommunityIcons name={notification.icon} size={24} color={notification.color} />
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>{notification.message}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
    </TouchableOpacity>
);


// --- MAIN COMPONENT ---

const NotificationsScreen = ({ navigate }) => {
    const [notifications, setNotifications] = useState(demoNotifications);

    const handleClearAll = () => {
        setNotifications([]);

    };
    
    const handleNotificationPress = (notification) => {
        // In a real app, this would navigate to the relevant record/screen (e.g., the member's profile)
        Alert.alert(
            notification.title,
            notification.message + `\n\nAction: Clicked on a ${notification.type} alert.`,
            [{ text: "View Details" }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications ({notifications.length})</Text>
                
                {notifications.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyText}>You're all caught up!</Text>
                        <Text style={styles.emptySubText}>No new alerts or tasks at the moment.</Text>
                    </View>
                ) : (
                    notifications.map(notif => (
                        <NotificationItem 
                            key={notif.id}
                            notification={notif}
                            onPress={handleNotificationPress}
                        />
                    ))
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
  },
  clearButton: {
      paddingVertical: 4,
      paddingHorizontal: 8,
  },
  clearText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#E74C3C',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  
  // --- Notification Item Styles ---
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#1E90FF', // Default border color for new items
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    paddingRight: 10,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },

  // --- Empty State Styles ---
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});

export default NotificationsScreen;