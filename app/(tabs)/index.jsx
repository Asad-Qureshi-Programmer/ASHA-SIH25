import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { ta } from 'zod/v4/locales';
import AddFamily from './AddFamily';
import AddMember from './Addmember';
import MemberDetail from './MemberDetail'
import MedicalDetailNewBorn from './../../components/MedicalNewbornForm';
import { set } from 'zod/v4';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import MedicineScreen from './MedicineScreen';
import Profile from './Profile';
import Diary from './DiaryScreen';
import ReportsScreen from './Reports';
import NotificationsScreen from './Notification';
import SettingsScreen from './Settings';
import VoiceToTextMicrophone from './VoiceToTextMic';
// import VHSNDScreen from './VHSND';
let targetRerender = false;
// --- Mock Data Structure ---
const [MOCK_DATA, setMockData] = useState({
  tasks: [
    { id: 1, text: "3 children due for immunization.", done: false },
    { id: 2, text: "2 ANC visits due", done: false },
  ],
  member: [
    // 1. Sunita Kumar (Pregnant, Early Stage)
    {
      id: 1,
      name: "Sunita Kumar",
      age: 30,
      gender: "Female",
      role: "Wife",
      status: "Pregnant",
      note: "Pregnant, 6 months",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "1/5 ANC Visits done. 0/2 TT Vaccine Done. 10/100 IFA Tablets delivered.",
      
      // Detailed Fields (kept for consistency with the initial structure)
      ancDone: 1, 
      tt1: true,
      tt2: false,
      booster: false,
      tbSymptomChecked: true,
      nutritionCounselling: true,
      vhsndParticipationDone: false,
      weight: '55.5',
      bp: '120/80',
      dangerSigns: 'N/A',
      otherMedicalInfo: 'None',
      
      // Medicines Distributed
      ifaTablets: 50,
      zincTablets: 0,
      calciumTablets: 20,
      orsPackets: 5,
      paracetamol: 0,
      dewormingTablets: 1,
    },
  
    // 2. Rajesh Verma (Male, General Health Checkup)
    {
      id: 2,
      name: "Rajesh Verma",
      age: 45,
      gender: "Male",
      role: "Husband",
      status: "Normal",
      note: "Smoker, advised counselling.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "2/5 ANC Visits done. 1/2 TT Vaccine Done. 50/100 IFA Tablets delivered.",
      
      // Detailed Fields (modified to reflect the summary string)
      ancDone: 2, 
      tt1: true,
      tt2: false,
      booster: false,
      tbSymptomChecked: true,
      nutritionCounselling: false,
      vhsndParticipationDone: false,
      weight: '85',
      bp: '135/90',
      dangerSigns: 'Mild headache/fatigue',
      otherMedicalInfo: 'Advised follow-up for high BP.',
      
      // Medicines Distributed
      ifaTablets: 50,
      zincTablets: 0,
      calciumTablets: 0,
      orsPackets: 0,
      paracetamol: 10,
      dewormingTablets: 0,
    },
  
    // 3. Meena Devi (Lactating Mother, Post-partum)
    {
      id: 3,
      name: "Meena Devi",
      age: 25,
      gender: "Female",
      role: "Wife",
      status: "Lactating",
      note: "Child 3 months old. Healthy.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "4/5 ANC Visits done. 2/2 TT Vaccine Done. 85/100 IFA Tablets delivered.",
      
      // Detailed Fields
      ancDone: 4, 
      tt1: true,
      tt2: true,
      booster: true,
      tbSymptomChecked: true,
      nutritionCounselling: true,
      vhsndParticipationDone: true,
      weight: '52',
      bp: '110/70',
      dangerSigns: 'N/A',
      otherMedicalInfo: 'Continuing Calcium/IFA post-partum.',
      
      // Medicines Distributed
      ifaTablets: 30,
      zincTablets: 0,
      calciumTablets: 40,
      orsPackets: 0,
      paracetamol: 0,
      dewormingTablets: 0,
    },
  
    // 4. Anil Kumar (Child, Diarrhoea case)
    {
      id: 4,
      name: "Anil Kumar",
      age: 5,
      gender: "Male",
      role: "Son",
      status: "Child",
      note: "Diarrhoea episode 2 days ago.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "3/5 ANC Visits done. 1/2 TT Vaccine Done. 60/100 IFA Tablets delivered. Danger Signs noted: Swelling.",
      
      // Detailed Fields
      ancDone: 3, 
      tt1: true,
      tt2: false,
      booster: false,
      tbSymptomChecked: false,
      nutritionCounselling: false,
      vhsndParticipationDone: false,
      weight: '18',
      bp: 'N/A',
      dangerSigns: 'Dehydration signs',
      otherMedicalInfo: 'Provided ORS and Zinc.',
      
      // Medicines Distributed
      ifaTablets: 0,
      zincTablets: 14,
      calciumTablets: 0,
      orsPackets: 7,
      paracetamol: 0,
      dewormingTablets: 0,
    },
  
    // 5. Sarita Devi (Senior Citizen, Chronic condition)
    {
      id: 5,
      name: "Sarita Devi",
      age: 72,
      gender: "Female",
      role: "Mother-in-law",
      status: "Chronic",
      note: "History of diabetes and arthritis.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "5/5 ANC Visits done. 2/2 TT Vaccine Done. 100/100 IFA Tablets delivered.",
      
      // Detailed Fields
      ancDone: 5, 
      tt1: true,
      tt2: true,
      booster: true,
      tbSymptomChecked: true,
      nutritionCounselling: true,
      vhsndParticipationDone: false,
      weight: '60',
      bp: '140/95',
      dangerSigns: 'Swelling in feet (mild)',
      otherMedicalInfo: 'Referred to PHC for sugar check.',
      
      // Medicines Distributed
      ifaTablets: 0,
      zincTablets: 0,
      calciumTablets: 30,
      orsPackets: 0,
      paracetamol: 15,
      dewormingTablets: 0,
    },
    
    // 6. Preeti Kumari (Adolescent Girl)
    {
      id: 6,
      name: "Preeti Kumari",
      age: 15,
      gender: "Female",
      role: "Daughter",
      status: "Adolescent",
      note: "Eligible for weekly iron supplementation.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "1/5 ANC Visits done. 2/2 TT Vaccine Done (Rapid completion). 30/100 IFA Tablets delivered.",
      
      // Detailed Fields
      ancDone: 1, 
      tt1: true,
      tt2: true,
      booster: false,
      tbSymptomChecked: true,
      nutritionCounselling: true,
      vhsndParticipationDone: true,
      weight: '42',
      bp: '100/60',
      dangerSigns: 'N/A',
      otherMedicalInfo: 'Mild pallor observed.',
      
      // Medicines Distributed
      ifaTablets: 28, // Weekly supply
      zincTablets: 0,
      calciumTablets: 0,
      orsPackets: 0,
      paracetamol: 0,
      dewormingTablets: 1,
    },
    
    // 7. Rohan Sharma (Infant)
    {
      id: 7,
      name: "Rohan Sharma",
      age: 1,
      gender: "Male",
      role: "Son",
      status: "Infant",
      note: "Due for routine immunization next week.",
      
      // --- UPDATED SUMMARY FIELD ---
      medicalInfo: "4/5 ANC Visits done. 2/2 TT Vaccine Done. 70/100 IFA Tablets delivered (Next distribution pending).",
      
      // Detailed Fields
      ancDone: 4, 
      tt1: true,
      tt2: true,
      booster: false,
      tbSymptomChecked: false,
      nutritionCounselling: true,
      vhsndParticipationDone: true,
      weight: '8',
      bp: 'N/A',
      dangerSigns: 'N/A',
      otherMedicalInfo: 'Checked growth chart - normal.',
      
      // Medicines Distributed
      ifaTablets: 0,
      zincTablets: 0,
      calciumTablets: 0,
      orsPackets: 0,
      paracetamol: 0,
      dewormingTablets: 0,
    },
  ],
  // console.log(memberDataExamples
  
  houses: [
    {
      id: 121002,
      head: "House 1 Ward 5",
      address: "Basant Vihar Colony, Dhar MP",
      risk: "High Risk",
      highCareCount: 2,
      lastVisit: "25/09/2025",
      pregnantWomen: 1,
      eligibleCouples: 2,
      newbornChildren: 1,
      childrenUnder5: 2,
      members: [
        2,3,5,6
      ],
      membersCount: 4,
      history: [
        { date: "25/09/2025", text: "Vaccination of Shivam Kumar Done" },
        { date: "25/09/2025", text: "ANC Visit for Sunita Kumar" },
        { date: "05/09/2025", text: "Drop given to Shivam" },
      ],
    },
    { 
      id: 121003, 
      head: "House 12 Ward 5", 
      address: "Kailash Nagar, Dhar MP", 
      risk: "Antenatal", 
      lastVisit: "25/09/2025",
      pregnantWomen: 1,
      eligibleCouples: 2,
      newbornChildren: 1,
      childrenUnder5: 2,
      members: [
        1, 2, 4, 6
      ],
      membersCount: 4, 
      history: [
        { date: "25/09/2025", text: "Vaccination of Shivam Kumar Done" },
        { date: "25/09/2025", text: "ANC Visit for Sunita Kumar" },
        { date: "05/09/2025", text: "Drop given to Shivam" },
      ],
    },
    { 
      id: 121004,
      head: "House 2 Ward 5", 
      address: "Basant Vihar Colony, Dhar MP", 
      risk: "Vaccination", 
      lastVisit: "24/09/2025",
      pregnantWomen: 0,
      eligibleCouples: 1,
      newbornChildren: 0,
      childrenUnder5: 1,
      members: [
        1, 2
      ],
      membersCount: 2, 
      history: [
        { date: "25/09/2025", text: "Vaccination of Shivam Kumar Done" },
        { date: "25/09/2025", text: "ANC Visit for Sunita Kumar" },
        { date: "05/09/2025", text: "Drop given to Shivam" },
      ],
    },
  ],
});

// --- Sub-Components ---

const AppHeader = ({ title, navigate }) => (
  <View style={styles.header}>
    <Text style={styles.logo}>LOGO</Text>
    <View style={styles.headerIcons}>
      <View style={styles.userIconWrapper}>
        <VoiceToTextMicrophone></VoiceToTextMicrophone>
      </View>
      <Text style={styles.iconText}>अ</Text>
      <View style={styles.userIconWrapper}>
        <Text style={styles.iconText} onPress={() => navigate("Profile")}>👤</Text>
      </View>
    </View>
  </View>
);

const TaskGridButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.gridButton} onPress={onPress}>
    <View style={styles.gridButtonIconContainer}>
      <Text style={styles.gridButtonIcon}>{icon}</Text>
    </View>
    <Text style={styles.gridButtonText}>{text}</Text>
  </TouchableOpacity>
);

const RiskTag = ({ status }) => {
  let color = '#2563EB'; // Default/Vaccination
  if (status === 'High Risk') color = '#DC2626';
  if (status === 'Antenatal') color = '#10B981';
  if (status === 'Pregnant') color = '#22C55E';
  if (status === 'Head') color = '#2563EB';
  if (status === 'Child') color = '#3B82F6';

  return (
    <View style={[styles.riskTag, { backgroundColor: color }]}>
      <Text style={styles.riskTagText}>{status}</Text>
    </View>
  );
};

const HouseSummaryCard = ({ house }) => {
  const data = [
    { icon: '👤', label: 'Members', value: house.membersCount },
    { icon: '⚠️', label: 'High Care', value: house.highCareCount },
    { icon: '🤰', label: 'Pregnant Women', value: house.pregnantWomen },
    { icon: '👨‍👩‍👧', label: 'Eligible Couples', value: house.eligibleCouples },
    { icon: '👶', label: 'Newborn Children', value: house.newbornChildren },
    { icon: '👧', label: 'Children (under 5)', value: house.childrenUnder5 },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.summaryAddressContainer}>
        {/* <Text style={styles.iconTextSmall}>📍</Text> */}
        <Text style={styles.summaryAddressText}>{house.address}</Text>
      </View>
      <View style={styles.summaryGrid}>
        {data.map((item, index) => (
          <View key={index} style={styles.summaryGridItem}>
            <View style={styles.summaryIconValue}>
              <Text style={styles.iconTextSmall}>{item.icon}</Text>
              <Text style={styles.summaryValueText}>{item.value}</Text>
            </View>
            <Text style={styles.summaryLabelText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.summaryFooter}>
        <Text style={styles.summaryFooterText}>
          <Text style={styles.iconTextSmall}>🕒</Text> Last Update: {house.lastVisit}
        </Text>
        <Text style={styles.summaryFooterId}>#{house.id}</Text>
      </View>
    </View>
  );
};

const MemberCard = ({ member }) => {
  const [showMedical, setShowMedical] = useState(false);

  return (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <Text style={styles.iconTextSmall}>👤</Text>
        <Text style={styles.memberName}>{member.name}</Text>
        <RiskTag status={member.status} />
      </View>

      <View style={styles.memberDetails}>
        <Text style={styles.detailText}>
          <Text style={styles.iconTextSmall}>🎂</Text> Age: {member.age}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.iconTextSmall}>✍️</Text> Gender: {member.gender}
        </Text>
      </View>

      <Text style={styles.noteText}>
        <Text style={styles.iconTextSmall}>📝</Text> Note: {member.note}
      </Text>

      <TouchableOpacity onPress={() => setShowMedical(!showMedical)} style={styles.medicalInfoToggle}>
        <Text style={styles.medicalInfoText}>
          Medical Info {showMedical ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showMedical && (
        <View style={styles.medicalInfoContent}>
          <Text style={styles.medicalInfoDetail}>{member.medicalInfo}</Text>
        </View>
      )}
    </View>
  );
};

const FamilyHistoryCard = ({ history }) => (
  <View style={styles.historyCard}>
    <View style={styles.historyHeader}>
      <Text style={styles.iconTextLarge}>⏱️</Text>
      <Text style={styles.historyTitle}>Family History</Text>
    </View>
    {history.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={styles.historyText}>{item.text}</Text>
      </View>
    ))}
  </View>
);

const BottomTabs = ({ activeTab, setTab }) => {
  const tabs = [
    { name: 'Home', icon: '🏠', screen: 'Tasks' },
    { name: 'List', icon: '📝', screen: 'Houses' },
    { name: 'Add', icon: '➕', screen: 'AddFamily', large: true },
    { name: 'Alerts', icon: '🔔', screen: 'Alerts' },
    { name: 'Settings', icon: '⚙️', screen: 'Settings' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={tab.large ? styles.largeTabButton : styles.tabButton}
          onPress={() => setTab(tab.screen)}
        >
          <Text style={[styles.tabIcon, tab.large && styles.largeTabIcon, activeTab === tab.screen && styles.activeTabIcon]}>
            {tab.icon}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


// --- Screen Components ---
const markTodosDone = (navigate) => {
  MOCK_DATA.tasks.forEach(task => {
    if (task.done) {
      // task.done = false;
    } else {
      task.done = true;
    }
  });
}

const today = new Date();
const localeDate = today.toLocaleDateString();

const TodayTasksScreen = ({ navigate }) => (
  <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
    <View style={styles.screenHeader}>
      <Text style={styles.screenTitle}>Today's Tasks</Text>
      <Text style={styles.dateText}>{localeDate}</Text>
    </View>

    <View style={styles.tasksCard}>
      {MOCK_DATA.tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          {/* Checkbox implementation for interactive task completion */}
          <TouchableOpacity style={styles.checkbox} onPress={() => { task.done = !task.done; }}>
            <Text style={styles.checkboxText}>{task.done === true ? "✔️" : " "}</Text>
          </TouchableOpacity>
          <Text style={styles.taskText}>{task.text}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.doneButton} onPress={() => markTodosDone(navigate)}>
        <Text style={styles.doneButtonText}>✔️ Done</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.gridContainer}>
      <TaskGridButton icon="🏠" text="Start Home Visit" onPress={() => navigate('HouseDetails', { houseId: MOCK_DATA.houses[0].id })} />
      <TaskGridButton icon="✏️" text="Add/Update House Details" onPress={() => navigate('Houses')} />
      <TaskGridButton icon="👨‍👩‍👧‍👦" text="VHSND" onPress={() => { navigate('VHSND')}} />
      <TaskGridButton icon="💉" text="Medicine" onPress={() => { navigate('Medicine')}} />
      <TaskGridButton icon="📘" text="ASHA Diary" onPress={() => { navigate('ASHADIARY')}} />
      <TaskGridButton icon="📈" text="Reports" onPress={() => { navigate('Reports')}} />
    </View>

  </ScrollView>
);

const RegisteredHousesScreen = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHouses = MOCK_DATA.houses.filter(h =>
    h.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.screenHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => {navigate('Tasks')}} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Registered Houses</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addHouseButton}>
        <Text style={styles.addHouseButtonText} onPress={() => {navigate("AddFamily")}}>➕ Add New House</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Text style={styles.iconTextSmall}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search House"
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text style={styles.iconTextSmall}>☰</Text>
      </View>

      {filteredHouses.map((house) => (
        <TouchableOpacity key={house.id} style={styles.houseListItem} onPress={() => navigate('HouseDetails', { houseId: house.id })}>
          <View style={styles.houseListHeader}>
            <Text style={styles.iconTextSmall}>👤</Text>
            <Text style={styles.houseHeadName}>{house.head}</Text>
            <RiskTag status={house.risk} />
          </View>
          <Text style={styles.houseDetailText}>
            <Text style={styles.iconTextSmall}></Text> {house.address}
          </Text>
          <View style={styles.houseDetailRow}>
            <Text style={styles.houseDetailText}>
              <Text style={styles.iconTextSmall}></Text> Members: {house.membersCount}
            </Text>
            <Text style={styles.houseDetailText}>
              <Text style={styles.iconTextSmall}></Text> Last Visit: {house.lastVisit}
            </Text>
            <Text style={styles.houseDetailId}>#{house.id}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const HouseDetailsScreen = ({ houseId, navigate }) => {
  const house = MOCK_DATA.houses.find(h => h.id === houseId);
  const member = MOCK_DATA.member;
  const [searchTerm, setSearchTerm] = useState('');

  const membersOfFam = member.filter((member) => (
    house.members.some((id) => id === member.id)
  ));

  const filteredMembers = membersOfFam.filter((member) => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    // member.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (searchTerm.toLowerCase().startsWith("m") && member.gender.toLowerCase() === "male") ||
    (searchTerm.toLowerCase().startsWith("f") && member.gender.toLowerCase() === "female")
  );
  if (!house) {
    return <View style={styles.screenContainer}><Text style={styles.errorText}>House not found.</Text></View>;
  }


  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
      
      <View style={styles.screenHeader}>


        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => {navigate('Houses')}} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>House Details</Text>
        </View>

        <View style={styles.detailHeaderRight}>
          <RiskTag status={house.risk} />
          <Text style={styles.iconTextSmall}>⋮</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addMemberButton}>
        <Text style={styles.addMemberButtonText} onPress={() => {navigate('AddMember')}}>➕ Add New Member</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Text style={styles.iconTextSmall}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search House"
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text style={styles.iconTextSmall}>☰</Text>
      </View>

      <HouseSummaryCard house={house} />

      {
        filteredMembers.map((member) => (
          
            <TouchableOpacity onPress={() => {navigate('MemberDetail', {MemberId: member.id});}}>
              <MemberCard key={member.id} member={member} />
            </TouchableOpacity>
          
        ))
      }

      <FamilyHistoryCard history={house.history} />
    </ScrollView>
  );
};


// --- Main App Component ---

const AddFam = (fam, navigate) => {
  MOCK_DATA.houses.push(fam);
  navigate("Tasks");
}
const AddtoFam = (id, famId) => {
  MOCK_DATA.houses.find(h => h.id === famId).members.push(id);
}
const AddMem = (mem, familyId, navigate) => {
  MOCK_DATA.member.push(mem);
  MOCK_DATA.houses.find(h => h.id === familyId).membersCount += 1;
  if(mem.status === "High Risk" || mem.status === "Pregnant" || mem.status === "Antenatal"){
    MOCK_DATA.houses.find(h => h.id === familyId).highCareCount += 1;
    if(mem.status === "Pregnant"){
      MOCK_DATA.houses.find(h => h.id === familyId).pregnantWomen += 1;
    }
  }
  navigate('HouseDetails', { houseId: familyId });
}
const setMemberData = (mem) => {
  const index = mem.id;
  setMockData(prevData => {
    const updatedMembers = prevData.member.map(m => m.id === index ? mem : m);
    return { ...prevData, member: updatedMembers };
  });
}

const App = () => {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [houseId, setHouseId] = useState(MOCK_DATA.houses[0].id);
  const [MemberId, setMemberId] = useState(MOCK_DATA.member[0].id);
  const [currentScreen, setCurrentScreen] = useState('Tasks'); 

  const navigate = (screenName, params = {}) => {
    setCurrentScreen(screenName);
    // console.log(screenName, params);
    if (params.houseId) {
      setHouseId(params.houseId);
    }
    if (params.MemberId) {
      setMemberId(params.MemberId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Tasks':
        return <TodayTasksScreen navigate={navigate} />;
      case 'Houses':
        return <RegisteredHousesScreen navigate={navigate} />;
      case 'HouseDetails':
        return <HouseDetailsScreen houseId={houseId} navigate={navigate} />;
      case 'AddFamily':
        return <AddFamily navigate={navigate} AddFam={AddFam} idd={MOCK_DATA.houses[MOCK_DATA.houses.length-1].id}></AddFamily>;
      case 'AddMember':
        return <AddMember navigate={navigate} addMem={AddMem} familyId={houseId} AddtoFam={AddtoFam} idd={MOCK_DATA.member[MOCK_DATA.member.length-1].id} ></AddMember>;
      case 'MemberDetail':
        return <MemberDetail navigate={navigate} setMemberData={setMemberData} member={MOCK_DATA.member.find(mem => mem.id === MemberId)} familyId={houseId}></MemberDetail>;
      case "Medicine":
        return <MedicineScreen navigate={navigate} />;
      case "Profile":
        return <Profile navigate={navigate} />;
      // case 'VHSND':
      //   return <VHSNDScreen navigate={navigate}></VHSNDScreen>;
      case 'ASHADIARY':
        return <Diary navigate={navigate}></Diary>;
      case 'Reports':
        return <ReportsScreen navigate={navigate}></ReportsScreen>;
      case 'Alerts':
        return <NotificationsScreen navigate={navigate}></NotificationsScreen>;
      case 'Settings':
        return <SettingsScreen navigate={navigate}></SettingsScreen>;
      default:
        return <TodayTasksScreen navigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <AppHeader title="App Title" navigate={navigate} />
      {/* <View style={{maxWidth:"80%", alignSelf:"center", flex:1, scrollbarWidth: 'none',}}> */}
        {renderScreen()}
      {/* </View> */}
      <BottomTabs activeTab={activeTab} setTab={(tab) => { setActiveTab(tab); navigate(tab); }} />
      {/* <View style={{width:"100%", height:"50px", backgroundColor:"#fff"}}></View> */}
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  screenContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop:50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
    color: '#4B5563',
    marginHorizontal: 10,
  },
  iconTextSmall: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 4,
    marginLeft:10,
  },
  userIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  // Screen Title/Header
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Tasks Screen
  tasksCard: {
    backgroundColor: '#EBF8FF', // Light blue background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginRight: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 12,
    alignContent:"center",
    textAlign:"center",
    alignItems:"center",
    justifyItems:"center",
    color: '#3B82F6',
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
  },
  doneButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  gridButton: {
    width: (width - 65) / 2, // 15*3 padding, divided by 2
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  gridButtonIconContainer: {
    backgroundColor: '#DBEAFE', // Lighter blue
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  gridButtonIcon: {
    fontSize: 28,
    color: '#1D4ED8', // Darker blue
  },
  gridButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  // Registered Houses Screen
  addHouseButton: {
    backgroundColor: 'rgb(30 144 255)',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addHouseButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  houseListItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderBottomWidth: 5,
    borderTopWidth: 2,
    // marginVertical:5,
    marginBottom: 17,
    borderBottomColor: '#efefef',
    borderTopColor: '#efefef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  houseListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  houseHeadName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 10,
  },
  houseDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  houseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  houseDetailId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  // Risk Tag
  riskTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  riskTagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // House Details Screen
  addMemberButton: {
    backgroundColor: `rgb(30 144 255)`, // Green for Add Member
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addMemberButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  summaryAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  summaryAddressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryGridItem: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  summaryIconValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryValueText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 5,
  },
  summaryLabelText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryFooterText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryFooterId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  // Member Card
  memberCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 10,
  },
  memberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
  },
  noteText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },
  medicalInfoToggle: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  medicalInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  medicalInfoContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  medicalInfoDetail: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  // Family History
  historyCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 5,
  },
  historyItem: {
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
  },
  historyText: {
    fontSize: 15,
    color: '#1F2937',
  },
  iconTextLarge: {
    fontSize: 20,
    color: '#4B5563',
  },
  // Bottom Tabs
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  largeTabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -10, // Lift the button up
    borderWidth: 5,
    borderColor: '#F7F8FC', // Match background for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  largeTabIcon: {
    fontSize: 30,
    color: '#FFF',
  },
  activeTabIcon: {
    color: '#1D4ED8', // Highlight active tab
  },
});

export default App;
