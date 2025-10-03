import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

// Standard React Native Vector Icons imports
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// --- DEMO DATA STRUCTURE ---
const initialInventory = {
  ifaTablets: { stock: 250, unit: 'Tablets', name: 'IFA (Iron Folic Acid)' },
  calciumTablets: { stock: 180, unit: 'Tablets', name: 'Calcium' },
  orsPackets: { stock: 75, unit: 'Packets', name: 'ORS' },
  dewormingTablets: { stock: 40, unit: 'Tablets', name: 'Deworming' },
  paracetamol: { stock: 100, unit: 'Tablets', name: 'Paracetamol' },
};

// --- REUSABLE COMPONENTS ---

// Card component
const InfoCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Component for displaying stock and inputting quantity distributed
const DistributionTracker = ({ itemKey, inventory, distribution, updateDistribution }) => {
  const item = inventory[itemKey];
  const distributedCount = distribution[itemKey] || 0;
  const isLowStock = item.stock < 50;

  return (
    <View style={styles.trackerRow}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={[styles.stockText, isLowStock && styles.stockLow]}>
          Stock: {item.stock} {item.unit}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.givenLabel}></Text>
        <TextInput
          style={styles.inputField}
          value={distributedCount.toString()}
          onChangeText={(text) => {
            const count = parseInt(text) || 0;
            updateDistribution(itemKey, count);
          }}
          keyboardType="numeric"
        />
        <Text style={styles.unitText}>{item.unit.substring(0, 3)}</Text>
      </View>
    </View>
  );
};


// --- MAIN COMPONENT ---

const MedicineDistributionScreen = ({navigate}) => {
  const [inventory] = useState(initialInventory);
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('Select Member');
  const [distribution, setDistribution] = useState({});

  // Helper to update the distribution count for a specific medicine
  const updateDistribution = (key, count) => {
    // Prevent giving more than stock available (optional, but good practice)
    if (count > inventory[key].stock) {
      Alert.alert('Error', `Cannot distribute ${count} ${inventory[key].unit}. Only ${inventory[key].stock} remaining in stock.`);
      count = inventory[key].stock;
    }
    setDistribution(prev => ({
      ...prev,
      [key]: count,
    }));
  };

  // Simulated Member Search
  const handleSearchMember = () => {
    if (memberId.trim() === '121002') { // Simulating a successful search for a demo ID
      setMemberName('Sunita Kumar (Pregnant)');
    } else if (memberId.trim() === '100060') {
      setMemberName('Anil Kumar (Child)');
    } else {
      setMemberName('Member Not Found');
      Alert.alert('Search Failed', 'No member found for the entered ID.');
    }
  };

  // Final Action: Record Distribution
  const handleRecordDistribution = () => {
    if (memberName === 'Select Member' || memberName === 'Member Not Found') {
        Alert.alert('Error', 'Please search and select a valid member first.');
        return;
    }

    const totalItemsGiven = Object.values(distribution).reduce((sum, count) => sum + count, 0);

    if (totalItemsGiven === 0) {
        Alert.alert('Error', 'Please enter at least one quantity to distribute.');
        return;
    }

    Alert.alert(
        "Confirm Distribution",
        `Distribute ${totalItemsGiven} items to ${memberName}?`,
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Confirm", 
                onPress: () => {
                    console.log(`Distribution to ${memberName} (ID: ${memberId}):`, distribution);
                    
                    // --- SIMULATED INVENTORY & RECORD UPDATE ---
                    
                    // 1. Log distribution (In a real app, this updates the member's profile)
                    // 2. Update local inventory state (for next time)
                    const newInventory = { ...inventory };
                    let logMessage = `Distributed to ${memberName}:\n`;

                    for (const [key, count] of Object.entries(distribution)) {
                        if (count > 0) {
                            newInventory[key].stock -= count;
                            logMessage += `- ${count} ${inventory[key].unit} of ${inventory[key].name}\n`;
                        }
                    }

                    // Reset state for next transaction
                    setDistribution({});
                    setMemberId('');
                    setMemberName('Select Member');

                    Alert.alert("Success! Stock Updated.", logMessage);
                    // NOTE: Since state cannot be updated outside of a component, we rely on the initial state for the next render.
                    // In a live app, you would dispatch an action here to update the actual inventory source.
                }
            }
        ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Distribution</Text>
        <View style={styles.headerIconContainer} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* --- 1. Member Selection Card --- */}
        <InfoCard title="Select Recipient">
          <Text style={styles.currentMemberText}>Recipient: <Text style={styles.currentMemberName}>{memberName}</Text></Text>
          <View style={styles.memberInputRow}>
            <TextInput
              style={styles.memberIdInput}
              value={memberId}
              onChangeText={setMemberId}
              placeholder="Enter Member ID (e.g., 121002)"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchMember}>
              <Feather name="search" size={18} color="#fff" />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </InfoCard>

        {/* --- 2. Distribution List Card --- */}
        <InfoCard title="Record Items Distributed">
            {Object.keys(inventory).map(key => (
                <DistributionTracker
                    key={key}
                    itemKey={key}
                    inventory={inventory}
                    distribution={distribution}
                    updateDistribution={updateDistribution}
                />
            ))}
        </InfoCard>


        {/* --- Final Action Button --- */}
        <TouchableOpacity style={styles.recordButton} onPress={handleRecordDistribution}>
          <MaterialCommunityIcons name="pill" size={20} color="#fff" />
          <Text style={styles.recordButtonText}>Record Distribution & Update Stock</Text>
        </TouchableOpacity>

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

  // --- Member Select Styles ---
  currentMemberText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },
  currentMemberName: {
    fontWeight: 'bold',
    color: '#0056b3',
  },
  memberInputRow: {
    flexDirection: 'row',
    flexWrap:"wrap",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  memberIdInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    marginTop: 10,
    fontSize: 15,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 15,
  },

  // --- Tracker/Distribution Styles ---
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  stockText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  stockLow: {
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  givenLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  inputField: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 6,
    paddingVertical: 4,
    marginHorizontal: 5,
  },
  unitText: {
    fontSize: 14,
    color: '#333',
  },

  // --- Action Button ---
  recordButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MedicineDistributionScreen;