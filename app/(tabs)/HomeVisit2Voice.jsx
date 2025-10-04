import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeVisit2Voice({ navigate, MOCK_DATA, houseId }) {
  // Get the selected house ID from navigation params
  
  
  const [isRecording, setIsRecording] = useState(false);
  const [visitInfo, setVisitInfo] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Find the selected house from MOCK_DATA
  const selectedHouse = MOCK_DATA.houses.find(house => house.id === houseId);

  if (!selectedHouse) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>House not found!</Text>
      </View>
    );
  }

  // Get members for this house
  const houseMembers = MOCK_DATA.member.filter(member => 
    selectedHouse.members.includes(member.id)
  );

  // Generate dynamic text based on house members
  const generateVisitText = () => {
  let text = '';

  houseMembers.forEach((member) => {
    if (member.status === 'Pregnant') {
      text += `ANC visit completed for ${member.name}. `;
      text += `20 IFA tablets given. `;
      text += `TT1 dose administered. `;
      text += `TB symptoms checked. `;
      text += `Weight recorded as 60 kg. `;
      text += `Blood pressure measured at 110/70 mmHg. `;
    } 
    else if (member.status === 'Child') {
      text += `Vaccination given to ${member.name}. `;
      text += `15 zinc tablets provided. `;
      text += `10 ORS packets distributed. `;
      text += `Weight recorded as 12 kg. `;
    } 
    else if (member.status === 'Infant') {
      text += `Immunization completed for ${member.name}. `;
      text += `10 zinc tablets given. `;
      text += `10 ORS packets distributed. `;
      text += `Weight measured as 8 kg. `;
    } 
    else if (member.status === 'Lactating') {
      text += `Post-partum checkup done for ${member.name}. `;
      text += `20 calcium tablets provided. `;
      text += `Weight recorded as 55 kg. `;
    } 
    else if (member.status === 'Adolescent') {
      text += `Health checkup completed for ${member.name}. `;
      text += `10 IFA tablets given. `;
      text += `Weight recorded as 45 kg. `;
    } 
    else if (member.status === 'Chronic') {
      text += `Regular health checkup done for ${member.name}. `;
      text += `30 paracetamol tablets provided. `;
      text += `Weight recorded as 70 kg. `;
      text += `Blood pressure checked at 130/80 mmHg. `;
    } 
    else if (member.status === 'Normal') {
      text += `General checkup done for ${member.name}. `;
      text += `Weight recorded as 65 kg. `;
      text += `Blood pressure recorded at 120/75 mmHg. `;
    } 
    else if (member.status === 'Eligible Couple') {
      text += `Family planning counseling provided to ${member.name}. `;
    }
  });

  return text.trim();
};



 const handleVoicePress = () => {
  if (!isRecording) {
    // Step 1: Start listening
    setIsRecording(true); // Mic turns red
    setVisitInfo('');      // Clear previous text
    setIsTyping(false);    // Not typing yet
  } else {
    // Step 2: Stop listening, show data
    setIsRecording(false); // Mic turns back to normal
    setIsTyping(true);     // Typing starts

    const fullText = generateVisitText();
    typeText(fullText, 0); // Start typing simulation
  }
};


  const typeText = (text, index) => {
    if (index < text.length) {
      setVisitInfo(prev => prev + text[index]);
      // Random delay between 30-80ms for more natural typing
      const delay = Math.random() * 5 + 10;
      setTimeout(() => typeText(text, index + 1), delay);
    } else {
      setIsTyping(false);
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Feather name="home" size={24} color="#000" />
            <Text style={styles.headerTitle}>Home Visit</Text>
          </View>
        </View>

        {/* House Info */}
        <View style={styles.houseInfo}>
          <Text style={styles.houseName}>{selectedHouse.head}</Text>
          <View style={styles.dateRow}>
            <Feather name="clock" size={16} color="#666" />
            <Text style={styles.dateText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
          </View>
        </View>

        {/* Members List */}
        <ScrollView style={styles.membersList}>
          {houseMembers.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberLeft}>
                <View style={styles.avatar}>
                  <Feather name="user" size={24} color="#0066CC" />
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
              <View style={styles.memberRight}>
                <View style={[styles.statusBadge, 
                  member.status === 'Pregnant' && styles.pregnantBadge,
                  member.status === 'Lactating' && styles.lactatingBadge,
                  member.status === 'Child' && styles.childBadge,
                  member.status === 'Infant' && styles.infantBadge,
                  member.status === 'Adolescent' && styles.adolescentBadge,
                  member.status === 'Chronic' && styles.chronicBadge,
                  member.status === 'Normal' && styles.normalBadge
                ]}>
                  <Text style={styles.statusText}>{member.status}</Text>
                </View>
                {/* <Feather name="chevron-down" size={20} color="#666" /> */}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Text Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Click & Tell the info about Today's Home Visit"
            placeholderTextColor="#999"
            multiline
            value={visitInfo}
            onChangeText={setVisitInfo}
            editable={!isTyping}
          />
        </View>

        {/* Voice Button */}
        <View style={styles.voiceButtonContainer}>
          <TouchableOpacity 
            style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
            onPress={handleVoicePress}
            activeOpacity={0.8}
          >
            <Feather 
              name="mic" 
              size={32} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.backButton} onPress={()=>navigate("HomeVisit1")} >
            <Feather name="arrow-left" size={20} color="#0066CC" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
  style={styles.confirmButton}
  onPress={() => {
    if (houseId) {  // assuming houseId comes from route.params
      navigate("HomeVisit3Form", { houseId: houseId });
    }
  }}
  disabled={!houseId}
>
  <Text style={styles.confirmButtonText}>Confirm →</Text>
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  houseInfo: {
    marginBottom: 30,
  },
  houseName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  membersList: {
    gap: 12,
    marginBottom: 16,
   
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  memberRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pregnantBadge: {
    backgroundColor: '#0066CC',
  },
  lactatingBadge: {
    backgroundColor: '#10B981',
  },
  childBadge: {
    backgroundColor: '#F59E0B',
  },
  infantBadge: {
    backgroundColor: '#8B5CF6',
  },
  adolescentBadge: {
    backgroundColor: '#EC4899',
  },
  chronicBadge: {
    backgroundColor: '#EF4444',
  },
  normalBadge: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    maxHeight:120,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
  },
  voiceButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#DC3545',
    shadowColor: '#DC3545',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0066CC',
    backgroundColor: '#fff',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0066CC',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});