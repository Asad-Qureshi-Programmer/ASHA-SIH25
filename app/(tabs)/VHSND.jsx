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

// Standard React Native Vector Icons imports (required for this code to run in a RN environment)
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- DEMO DATA STRUCTURE (Base for new recordings) ---
const initialVHSNDData = {
  date: '30/09/2025', 
  venue: 'Community Hall',
  pregnantWomen: { expected: 15, attended: 0, ifa: 0, counseling: false },
  infants: { expected: 10, attended: 0, growthMonitored: 0, immunization: 0 },
  childrenUnder5: { expected: 25, attended: 0, deworming: 0, nutrition: 0 },
  eligibleCouples: { expected: 40, attended: 0, fpCounseling: 0, condoms: 0 },
};

// --- INITIAL DUMMY HISTORY (NOW WITH FULL DETAILS) ---
const initialPastEvents = [
  { 
    id: 1, 
    date: '01/09/2025', 
    venue: 'Anganwadi Center', 
    totalAttendees: 48, 
    services: 'ANC, Immunization, FP',
    statusColor: '#28A745', 
    details: { // Full data structure matching the form
        date: '01/09/2025',
        venue: 'Anganwadi Center',
        pregnantWomen: { expected: 15, attended: 12, ifa: 100, counseling: true },
        infants: { expected: 10, attended: 8, growthMonitored: 8, immunization: 4 },
        childrenUnder5: { expected: 25, attended: 20, deworming: 20, nutrition: 20 },
        eligibleCouples: { expected: 40, attended: 8, fpCounseling: 8, condoms: 0 },
    }
  },
  { 
    id: 2, 
    date: '01/08/2025', 
    venue: 'School Ground', 
    totalAttendees: 32, 
    services: 'ANC, Deworming',
    statusColor: '#FFC107', 
    details: { // Full data structure matching the form
        date: '01/08/2025',
        venue: 'School Ground',
        pregnantWomen: { expected: 14, attended: 10, ifa: 80, counseling: false },
        infants: { expected: 9, attended: 7, growthMonitored: 7, immunization: 2 },
        childrenUnder5: { expected: 22, attended: 15, deworming: 15, nutrition: 15 },
        eligibleCouples: { expected: 38, attended: 0, fpCounseling: 0, condoms: 0 },
    }
  },
];

// --- REUSABLE COMPONENTS ---

// Card component
const InfoCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Input Component for numeric tracking (e.g., attendance, distribution count)
const NumericTracker = ({ label, icon, expected, value, onChangeText, isService = false }) => (
    <View style={styles.trackerRow}>
        <View style={styles.trackerLabelContainer}>
            <MaterialCommunityIcons name={icon} size={20} color={isService ? '#0056b3' : '#333'} style={styles.trackerIcon} />
            <Text style={styles.trackerLabel}>{label}</Text>
            {!isService && <Text style={styles.expectedText}>(Exp: {expected})</Text>}
        </View>
        <TextInput
            style={styles.trackerInput}
            value={value.toString()}
            onChangeText={onChangeText}
            keyboardType="numeric"
            placeholder="0"
        />
    </View>
);

// Component: Displays a list of past events
const PastEventsList = ({ events, onSelectEvent }) => (
    <InfoCard title="Previous VHSND Events" style={{ marginBottom: 10 }}>
        {events.length === 0 ? (
            <Text style={styles.noEventsText}>No past events recorded yet.</Text>
        ) : (
            events.map((event) => (
                <TouchableOpacity 
                    key={event.id} 
                    style={styles.eventItem} 
                    onPress={() => onSelectEvent(event)}
                >
                    <View style={[styles.eventStatus, { backgroundColor: event.statusColor }]} />
                    <View style={styles.eventDetails}>
                        <Text style={styles.eventDate}>{event.date}</Text>
                        <Text style={styles.eventVenue}>{event.venue}</Text>
                        <Text style={styles.eventSummary}>{event.totalAttendees} Attendees | {event.services}</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
                </TouchableOpacity>
            ))
        )}
    </InfoCard>
);

// --- MAIN COMPONENT ---

const VHSNDScreen = ({navigate}) => {
  const [vhsndData, setVhsndData] = useState(initialVHSNDData);
  const [venue, setVenue] = useState(initialVHSNDData.venue);
  const [pastEvents, setPastEvents] = useState(initialPastEvents);
  
  // Helper to update deeply nested state
  const updateCategoryField = (category, key, value) => {
    setVhsndData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: typeof prev[category][key] === 'boolean' ? value : (parseInt(value) || 0),
      }
    }));
  };

  const formatDetailsForAlert = (details) => {
    let summary = `Date: ${details.date}\nVenue: ${details.venue}\n\n`;
    
    summary += "--- Attendance & Services ---\n";
    
    // Pregnant Women
    summary += `🤰 Pregnant Women (Att: ${details.pregnantWomen.attended}/${details.pregnantWomen.expected})\n`;
    summary += `  - IFA Distributed: ${details.pregnantWomen.ifa}\n`;
    summary += `  - Counselling: ${details.pregnantWomen.counseling ? 'Done ✅' : 'Pending ❌'}\n`;

    // Infants
    summary += `👶 Infants (Att: ${details.infants.attended}/${details.infants.expected})\n`;
    summary += `  - Growth Monitored: ${details.infants.growthMonitored}\n`;
    summary += `  - Immunizations: ${details.infants.immunization}\n`;

    // Children Under 5
    summary += `👧 Children U5 (Att: ${details.childrenUnder5.attended}/${details.childrenUnder5.expected})\n`;
    summary += `  - Deworming: ${details.childrenUnder5.deworming}\n`;

    // Eligible Couples
    summary += `🧑‍🤝‍🧑 Couples (Att: ${details.eligibleCouples.attended}/${details.eligibleCouples.expected})\n`;
    summary += `  - FP Counselling: ${details.eligibleCouples.fpCounseling}\n`;

    return summary;
  };

  const handleRecordEvent = () => {
    const totalAttendees = 
      vhsndData.pregnantWomen.attended + 
      vhsndData.infants.attended + 
      vhsndData.childrenUnder5.attended + 
      vhsndData.eligibleCouples.attended;
    
    if (!venue || totalAttendees === 0) {
      Alert.alert("Incomplete Data", "Please fill in the venue and record attendance for at least one group.");
      return;
    }

    Alert.alert(
      "Confirm VHSND Record",
      `Record event at ${venue} with ${totalAttendees} total attendees?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Record", 
          onPress: () => {
            // 1. Grab and Format Data
            const serviceList = [];
            if (vhsndData.pregnantWomen.attended > 0) serviceList.push('ANC');
            if (vhsndData.infants.attended > 0) serviceList.push('Infant Care');
            if (vhsndData.childrenUnder5.attended > 0) serviceList.push('Child Care');
            if (vhsndData.eligibleCouples.attended > 0) serviceList.push('FP');

            const newEvent = {
              id: Date.now(),
              date: vhsndData.date,
              venue: venue,
              totalAttendees: totalAttendees,
              services: serviceList.join(', '),
              statusColor: totalAttendees >= 50 ? '#28A745' : '#1E90FF', 
              details: { ...vhsndData, venue }, // Store full details including venue
            };

            // 2. Push to the previous list
            setPastEvents(prev => [newEvent, ...prev]);

            // 3. Reset the current form
            setVhsndData(initialVHSNDData);
            setVenue(initialVHSNDData.venue);

            Alert.alert("Success", "VHSND Event data recorded successfully!");
          }
        }
      ]
    );
  };

  const handleViewPastEvent = (event) => {
      // Use the helper function to format the full details from the stored 'details' object
      const detailedSummary = formatDetailsForAlert(event.details);

      Alert.alert(
          `VHSND Event: ${event.date}`,
          detailedSummary,
          [{ text: "OK" }]
      );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record VHSND Event</Text>
        <View style={styles.headerIconContainer} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* --- Section 1: Previous Events List --- */}
        <PastEventsList 
            events={pastEvents} 
            onSelectEvent={handleViewPastEvent} 
        />
        
        {/* --- Current Event Details Card --- */}
        <InfoCard title="Event Details (Current Recording)">
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{vhsndData.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Venue:</Text>
            <TextInput
              style={[styles.detailValue, styles.venueInput]}
              value={venue}
              onChangeText={setVenue}
              placeholder="e.g., School / Anganwadi"
            />
          </View>
        </InfoCard>

        {/* --- 1. Pregnant Women Services --- */}
        <InfoCard title="1. Pregnant Women (ANC)">
          <NumericTracker
            label="Attendance"
            icon="account-woman"
            expected={vhsndData.pregnantWomen.expected}
            value={vhsndData.pregnantWomen.attended}
            onChangeText={(v) => updateCategoryField('pregnantWomen', 'attended', v)}
          />
          <NumericTracker
            label="IFA Tablets Distributed"
            icon="pill"
            value={vhsndData.pregnantWomen.ifa}
            onChangeText={(v) => updateCategoryField('pregnantWomen', 'ifa', v)}
            isService
          />
          <View style={styles.checkboxServiceRow}>
            <MaterialCommunityIcons name="comment-check-outline" size={20} color="#0056b3" />
            <Text style={styles.serviceLabel}>Nutrition Counselling Done</Text>
            <TouchableOpacity 
              onPress={() => updateCategoryField('pregnantWomen', 'counseling', !vhsndData.pregnantWomen.counseling)}
              style={styles.serviceCheck}
            >
              <MaterialCommunityIcons 
                name={vhsndData.pregnantWomen.counseling ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                size={24}
                color={vhsndData.pregnantWomen.counseling ? '#28A745' : '#ccc'}
              />
            </TouchableOpacity>
          </View>
        </InfoCard>

        {/* --- 2. Infant Services --- */}
        <InfoCard title="2. Infants (0-1 yr)">
          <NumericTracker
            label="Attendance"
            icon="baby-carriage"
            expected={vhsndData.infants.expected}
            value={vhsndData.infants.attended}
            onChangeText={(v) => updateCategoryField('infants', 'attended', v)}
          />
          <NumericTracker
            label="Growth Monitoring Done"
            icon="chart-timeline-variant"
            value={vhsndData.infants.growthMonitored}
            onChangeText={(v) => updateCategoryField('infants', 'growthMonitored', v)}
            isService
          />
          <NumericTracker
            label="Immunizations Given"
            icon="needle"
            value={vhsndData.infants.immunization}
            onChangeText={(v) => updateCategoryField('infants', 'immunization', v)}
            isService
          />
        </InfoCard>
        
        {/* --- 3. Children Under 5 Services --- */}
        <InfoCard title="3. Children Under 5">
          <NumericTracker
            label="Attendance"
            icon="child-friendly"
            expected={vhsndData.childrenUnder5.expected}
            value={vhsndData.childrenUnder5.attended}
            onChangeText={(v) => updateCategoryField('childrenUnder5', 'attended', v)}
          />
          <NumericTracker
            label="Deworming Tablets Given"
            icon="pill"
            value={vhsndData.childrenUnder5.deworming}
            onChangeText={(v) => updateCategoryField('childrenUnder5', 'deworming', v)}
            isService
          />
        </InfoCard>

        {/* --- 4. Eligible Couples (FP) Services --- */}
        <InfoCard title="4. Eligible Couples (FP)">
          <NumericTracker
            label="Attendance"
            icon="human-male-female"
            expected={vhsndData.eligibleCouples.expected}
            value={vhsndData.eligibleCouples.attended}
            onChangeText={(v) => updateCategoryField('eligibleCouples', 'attended', v)}
          />
          <NumericTracker
            label="FP Counselling Done"
            icon="head-dots-horizontal-outline"
            value={vhsndData.eligibleCouples.fpCounseling}
            onChangeText={(v) => updateCategoryField('eligibleCouples', 'fpCounseling', v)}
            isService
          />
        </InfoCard>


        {/* --- Final Action Button --- */}
        <TouchableOpacity style={styles.recordButton} onPress={handleRecordEvent}>
          <Feather name="save" size={20} color="#fff" />
          <Text style={styles.recordButtonText}>Record VHSND Event</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLESHEET (Unchanged) ---

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

  // --- Detail Styles (Event Details) ---
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  venueInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 2,
    fontSize: 15,
  },

  // --- Tracker Styles ---
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  trackerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trackerIcon: {
    marginRight: 8,
  },
  trackerLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  expectedText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  trackerInput: {
    width: 60,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 6,
    paddingVertical: 4,
  },

  // --- Checkbox/Service Row ---
  checkboxServiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceLabel: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  serviceCheck: {
    padding: 5,
  },

  // --- Action Button ---
  recordButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28A745', // Green for action
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // --- Past Events List Styles ---
  noEventsText: {
      fontSize: 15,
      color: '#999',
      textAlign: 'center',
      paddingVertical: 10,
  },
  eventItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
  },
  eventStatus: {
      width: 6,
      height: '80%',
      borderRadius: 3,
      marginRight: 10,
  },
  eventDetails: {
      flex: 1,
  },
  eventDate: {
      fontSize: 16,
      fontWeight: '700',
      color: '#333',
  },
  eventVenue: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
  },
  eventSummary: {
      fontSize: 12,
      color: '#999',
      marginTop: 2,
  },
});

export default VHSNDScreen;