import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');


// Custom Card Component for repeatable sections
const DetailCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Reusable component for a single line in a card
const DetailLine = ({ leftText, rightText, isBold, color = '#333' }) => (
  <View style={styles.detailLine}>
    <Text style={[styles.lineText, isBold && styles.lineTextBold, { color }]}>
      {leftText}
    </Text>
    {rightText && <Text style={styles.lineDate}>{rightText}</Text>}
  </View>
);

// Reusable component for history entries
const HistoryLine = ({ date, event }) => (
    <View style={styles.historyLine}>
        <Text style={styles.historyDate}>{date}</Text>
        <Text style={styles.historyEvent}>{event}</Text>
    </View>
);

// --- MAIN DYNAMIC COMPONENT ---

const MemberDetailsScreen = ({navigate, member, familyId }) => {
  // Use a split to simulate lines from the simple medicalInfo string
  const medicalInfoLines = member.medicalInfo ? member.medicalInfo.split('.').filter(line => line.trim()) : [];
  
  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
       

        {/* -------------------- Member Header Card (Profile) -------------------- */}
        <View style={styles.memberHeaderCard}>
          <View style={styles.memberInfoRow}>
            <TouchableOpacity onPress={() => {navigate('HouseDetails', { houseId: familyId })}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.memberName}>{member.name}</Text>
            {member.status && (
                <View style={styles.pregnantTag}>
                    <Text style={styles.pregnantText}>{member.status}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.optionsButton}>
              <Feather name="more-vertical" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <FontAwesome name="calendar-o" size={14} color="#666" />
              <Text style={styles.detailText}>Age: {member.age}</Text>
            </View>
            <View style={styles.detailItem}>
              <Feather name="edit-3" size={14} color="#1E90FF" />
              <Text style={styles.detailText}>Gender: {member.gender}</Text>
            </View>
          </View>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <FontAwesome name="sticky-note-o" size={14} color="#666" />
              <Text style={styles.detailText}>Note: {member.note}</Text>
            </View>
          </View>

          <View style={[styles.detailsRow, { justifyContent: 'space-between', marginTop: 10 }]}>
            <View style={styles.detailItem}>
              <FontAwesome name="clock-o" size={14} color="#666" />
              <Text style={styles.detailText}>Last Update: 25/09/2025</Text>
            </View>
            <Text style={styles.idText}>#{member.id.toString().padStart(6, '0')}</Text>
          </View>
        </View>

        {/* -------------------- Medical Info Card (Dynamic) -------------------- */}
        <DetailCard title="Medical Info">
            {/* The first line from the original screenshot is hardcoded for context */}
            <DetailLine leftText="25/09/2025" rightText="Danger: Swelling" isBold color="#E74C3C" /> 
            
            {medicalInfoLines.map((line, index) => (
                <DetailLine key={index} leftText={line.trim()} />
            ))}
            
            <DetailLine leftText="BP: 80/120" /> {/* Hardcoded for illustration */}
        </DetailCard>

        {/* -------------------- Medicines Distributed Card (Placeholder) -------------------- */}
        <DetailCard title="Medicines Distributed">
          <DetailLine leftText="25/09/2025" isBold />
          <DetailLine leftText="IFA Tablet: 20" />
          <DetailLine leftText="ORS Packet: 10" />
          <DetailLine leftText="Calcium Tablet: 20" />
        </DetailCard>

        {/* -------------------- Referred (Reason) Card (Placeholder) -------------------- */}
        <DetailCard title="Referred (Reason)">
          <DetailLine leftText="High BP and weakness" rightText="25/09/2025" isBold />
          <DetailLine leftText="Swelling" rightText="25/09/2025" />
        </DetailCard>

        {/* -------------------- Next Visit (Reminder) Card (Placeholder) -------------------- */}
        <DetailCard title="Next Visit (Reminder)">
          <DetailLine leftText="TT injection dose, IFA tablets distribution" rightText="25/09/2025" isBold />
        </DetailCard>
        
        {/* -------------------- Member History Card (Placeholder) -------------------- */}
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

// --- STYLES (Unchanged for visual consistency) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  titleSection: {
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#000',
  },
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
    marginLeft: 8,
    marginRight: 10,
    color: '#000',
  },
  pregnantTag: {
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
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
    flexWrap: 'wrap', // Added flexWrap to handle multiple details gracefully
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  lineText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1, // Allows text to wrap
  },
  lineTextBold: {
    fontWeight: '600',
  },
  lineDate: {
    fontSize: 14,
    color: '#666',
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

export default MemberDetailsScreen;