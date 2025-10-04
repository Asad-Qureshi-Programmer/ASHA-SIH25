import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function HomeVisitScreen({ navigate, MOCK_DATA }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Use houses from MOCK_DATA
  const allHouses = MOCK_DATA.houses.map(house => ({
    id: house.id,
    house: house.head,
    location: house.address,
    members: house.membersCount,
    beneficiary: getBeneficiaryName(house, MOCK_DATA.member),
    lastVisit: house.lastVisit,
    visitId: `#${house.id}`,
    status: house.risk,
    statusColor: getStatusColor(house.risk),
    houseData: house // Keep reference to original house data
  }));

  // Helper function to get beneficiary name from members
  function getBeneficiaryName(house, members) {
    if (house.members && house.members.length > 0) {
      const firstMemberId = house.members[0];
      const member = members.find(m => m.id === firstMemberId);
      return member ? member.name : 'N/A';
    }
    return 'N/A';
  }

  // Helper function to get status color
  function getStatusColor(risk) {
    switch(risk) {
      case 'High Risk':
        return '#DC2626';
      case 'Antenatal':
        return '#16A34A';
      case 'Vaccination':
        return '#2563EB';
      default:
        return '#6B7280';
    }
  }

  // Filter houses based on search query
  const filteredHouses = allHouses.filter(house => 
    house.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
    house.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    house.beneficiary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedHouse) {
      // Navigate to next page with house data
      navigation.navigate('HouseDetails', { 
        houseName: selectedHouse.house,
        houseData: selectedHouse.houseData,
        members: MOCK_DATA.member.filter(m => selectedHouse.houseData.members.includes(m.id))
      });
    }
  };

  return (
    <View style={styles.container}>
      

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleIcon}>🏠</Text>
        <Text style={styles.title}>Home Visit</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by house, location, or beneficiary..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* House List */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house) => (
            <TouchableOpacity
              key={house.id}
              onPress={() => setSelectedHouse(house)}
              activeOpacity={0.7}
            >
              <View 
                style={[
                  styles.card,
                  selectedHouse?.id === house.id && styles.cardSelected
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleRow}>
                    <View style={[
                      styles.selectionCircle,
                      selectedHouse?.id === house.id && styles.selectionCircleActive
                    ]}>
                      {selectedHouse?.id === house.id && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.cardIcon}>👥</Text>
                    <Text style={styles.cardTitle}>{house.house}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: house.statusColor }]}>
                    <Text style={styles.statusText}>{house.status}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>📍</Text>
                    <Text style={styles.infoText}>{house.location}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>👥</Text>
                    <Text style={styles.infoText}>Members: {house.members}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>👥</Text>
                    <Text style={styles.infoText}>Beneficiary: {house.beneficiary}</Text>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoIcon}>🕐</Text>
                      <Text style={styles.infoText}>Last Visit: {house.lastVisit}</Text>
                    </View>
                    <Text style={styles.visitId}>{house.visitId}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No houses found matching your search</Text>
          </View>
        )}
      </ScrollView>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateIcon}>✏️</Text>
        <Text style={styles.updateButtonText}>Update House/Member Details</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigate("Tasks")} >
          <Text style={styles.backButtonText}  >← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.confirmButton}
  onPress={() => {
    if (selectedHouse) {
      navigate("HomeVisit2Voice", { houseId: selectedHouse.id });
    }
  }}
  disabled={!selectedHouse}
>
  <Text style={styles.confirmButtonText}>Confirm →</Text>
</TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#60D5F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#60D5F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  titleIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    fontSize: 18,
    color: '#999',
    paddingHorizontal: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  cardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#F0F7FF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCircleActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  visitId: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 8,
  },
  updateIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2563EB',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Next page component (HouseDetailsScreen)
export function HouseDetailsScreen({ route }) {
  const { houseName, houseData, members } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>LOGO</Text>
        <View style={styles.headerIcons}>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>31</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>👤</Text>
          </View>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{houseName}</Text>
      </View>

      {/* House Details */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.card}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            House Information
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            📍 {houseData.address}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            🏥 Status: {houseData.risk}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            👶 Pregnant Women: {houseData.pregnantWomen}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            👨‍👩‍👧 Eligible Couples: {houseData.eligibleCouples}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            🍼 Newborn Children: {houseData.newbornChildren}
          </Text>
          <Text style={{ fontSize: 14, color: '#666' }}>
            👶 Children Under 5: {houseData.childrenUnder5}
          </Text>
        </View>

        <View style={[styles.card, { marginTop: 15 }]}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Members ({members.length})
          </Text>
          {members.map(member => (
            <View key={member.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#000' }}>
                {member.name}, {member.age} yrs
              </Text>
              <Text style={{ fontSize: 13, color: '#666' }}>
                {member.role} • {member.status}
              </Text>
              {member.note && (
                <Text style={{ fontSize: 13, color: '#666', marginTop: 3 }}>
                  📝 {member.note}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}