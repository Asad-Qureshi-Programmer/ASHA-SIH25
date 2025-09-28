import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MemberDetailsScreen = () => {
  const memberData = {
    id: '#121002',
    address: 'Basant Vihar Colony, Dhar MP',
    members: 8,
    highCare: 2,
    pregnant: 1,
    eligible: 2,
    newborn: 1,
    children: 2,
    lastVisit: '24/09/2025',
    memberId: '#121002'
  };

  const familyMembers = [
    {
      id: 1,
      name: 'Ravi Kumar',
      age: 40,
      gender: 'Male',
      status: 'Head',
      statusColor: '#007AFF',
      note: 'High BP',
      medicalInfo: []
    },
    {
      id: 2,
      name: 'Sunita Kumar',
      age: 30,
      gender: 'Female',
      status: 'Pregnant',
      statusColor: '#007AFF',
      note: 'Pregnant',
      medicalInfo: [
        '2/3 ANC Visits done',
        '1/2 TT Vaccine Done',
        '50/100 IFA Tablets delivered'
      ]
    },
    {
      id: 3,
      name: 'Shivam Kumar',
      age: 1,
      gender: 'Male',
      status: 'Child',
      statusColor: '#007AFF',
      note: 'Measles Vaccination due',
      medicalInfo: []
    }
  ];

  const familyHistory = [
    { date: '25/09/2025', event: 'Vaccination of Shivam Kumar Done' },
    { date: '24/09/2025', event: 'ANC Visit for Sunita Kumar' },
    { date: '20/09/2025', event: 'Drop given to Shivam' },
  ];

  const StatCard: React.FC<{ icon: string; title: string; value: number | string; color?: string }> = ({ icon, title, value, color = '#666' }) => (
    <View style={styles.statCard}>
      <Icon name={icon} size={24} color={color} />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  const MemberCard: React.FC<{ member: { id: number; name: string; age: number; gender: string; status: string; statusColor: string; note?: string; medicalInfo: string[] } }> = ({ member }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <View style={styles.memberInfo}>
          <Icon name="person" size={24} color="#4CAF50" />
          <View style={styles.memberDetails}>
            <Text style={styles.memberName}>{member.name}</Text>
            <View style={styles.memberSubInfo}>
              <Text style={styles.memberAge}>Age: {member.age}</Text>
              <Text style={styles.memberGender}>Gender: {member.gender}</Text>
            </View>
            {member.note && (
              <Text style={styles.memberNote}>Note: {member.note}</Text>
            )}
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: member.statusColor }]}>
          <Text style={styles.statusText}>{member.status}</Text>
        </View>
      </View>
      
      {member.medicalInfo.length > 0 && (
        <View style={styles.medicalInfo}>
          <TouchableOpacity style={styles.medicalInfoButton}>
            <Text style={styles.medicalInfoText}>Medical Info ▼</Text>
          </TouchableOpacity>
          {member.medicalInfo.map((info, index) => (
            <Text key={index} style={styles.medicalInfoItem}>• {info}</Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Member Details</Text>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Main Member Card */}
        <View style={styles.mainCard}>
          <View style={styles.mainCardHeader}>
            <View style={styles.memberIdContainer}>
              <Icon name="person" size={24} color="#4CAF50" />
              <Text style={styles.memberId}>{memberData.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#FF4444' }]}>
              <Text style={styles.statusText}>HIGH RISK</Text>
            </View>
            <TouchableOpacity>
              <Icon name="more-vert" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.addressContainer}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.address}>{memberData.address}</Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard icon="group" title="Members" value={memberData.members} color="#4CAF50" />
            <StatCard icon="favorite" title="High Care" value={memberData.highCare} color="#FF4444" />
            <StatCard icon="pregnant-woman" title="Pregnant Women" value={memberData.pregnant} color="#FF9800" />
            <StatCard icon="child-care" title="Eligible Couples" value={memberData.eligible} color="#9C27B0" />
            <StatCard icon="child-friendly" title="Newborn" value={memberData.newborn} color="#00BCD4" />
            <StatCard icon="school" title="Children Under 5" value={memberData.children} color="#673AB7" />
          </View>

          <View style={styles.lastVisit}>
            <Icon name="event" size={16} color="#666" />
            <Text style={styles.lastVisitText}>Last Visit: {memberData.lastVisit}</Text>
            <Text style={styles.lastVisitId}>{memberData.memberId}</Text>
          </View>
        </View>

        {/* Family Members */}
        {familyMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}

        {/* Family History */}
        <View style={styles.familyHistoryContainer}>
          <View style={styles.familyHistoryHeader}>
            <Icon name="history" size={24} color="#666" />
            <Text style={styles.familyHistoryTitle}>Family History</Text>
          </View>
          
          {familyHistory.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyEvent}>{item.event}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="menu" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.addButton]}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="notifications" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberId: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  address: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  lastVisit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  lastVisitText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
    marginLeft: 4,
  },
  lastVisitId: {
    color: '#007AFF',
    fontSize: 14,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  memberInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  memberDetails: {
    marginLeft: 12,
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  memberSubInfo: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  memberAge: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  memberGender: {
    fontSize: 14,
    color: '#666',
  },
  memberNote: {
    fontSize: 14,
    color: '#666',
  },
  medicalInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  medicalInfoButton: {
    marginBottom: 8,
  },
  medicalInfoText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  medicalInfoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  familyHistoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  familyHistoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  familyHistoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  historyItem: {
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  historyEvent: {
    fontSize: 14,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
});

export default MemberDetailsScreen;