import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function HomeVisit3Form({ navigate, MOCK_DATA, setMockData, houseId }) {
  const [expandedMembers, setExpandedMembers] = useState({});
  // const [formState, setFormState] = useState(prefillFormState());; // 🔹 store all checkboxes/inputs
   const navigation = useNavigation();
  // Find selected house
  const selectedHouse = MOCK_DATA?.houses.find((h) => h.id === houseId) || {
    id: "house_1",
    head: "House 12, Ward 5",
    members: ["member_1", "member_2", "member_3"],
  };

  // Get members for this house
  const houseMembers =
    MOCK_DATA?.member.filter((member) => selectedHouse.members.includes(member.id)) || [];


// Prefill the formState based on member type
const prefillFormState = () => {
  const initialState = {};

  houseMembers.forEach((member) => {
    if (member.status === "Pregnant") {
      initialState[member.id] = {
        ancVisit: true,
        ttInjection: "TT1",
        tbChecked: true,
        weight: "60",
        bp: "110/70",
        ifaTablets: "20",
        note: "6 months pregnant, ANC ongoing"
      };
    } else if (member.status === "Child") {
      initialState[member.id] = {
        zincTablets: "15",
        orsPackets: "10",
        weight: "12",
        note: "Under 5, vaccination done"
      };
    } else if (member.status === "Infant") {
      initialState[member.id] = {
        zincTablets: "10",
        orsPackets: "10",
        weight: "8",
        note: "Newborn, immunizations done"
      };
    } else if (member.status === "Lactating") {
      initialState[member.id] = {
        calciumTablets: "20",
        weight: "55",
        note: "Postpartum checkup done"
      };
    } else if (member.status === "Adolescent") {
      initialState[member.id] = {
        ifaTablets: "10",
        weight: "45",
        note: "Routine health checkup done"
      };
    } else if (member.status === "Chronic") {
      initialState[member.id] = {
        paracetamol: "30",
        weight: "70",
        bp: "130/80",
        note: "Regular health monitoring"
      };
    } else if (member.status === "Normal") {
      initialState[member.id] = {
        weight: "65",
        bp: "120/75",
        note: "General checkup"
      };
    } else if (member.status === "Eligible Couple") {
      initialState[member.id] = {
        familyPlanning: true,
        note: "Counseling done"
      };
    }
  });

  return initialState;
};


// Initialize formState with prefilled data
const [formState, setFormState] = useState(prefillFormState());





  const toggleMember = (memberId) => {
    setExpandedMembers((prev) => ({ ...prev, [memberId]: !prev[memberId] }));
  };

    const toggleCheckbox = (memberId, field) => {
    setFormState((prev) => ({
      ...prev,
      [memberId]: { ...prev[memberId], [field]: !prev[memberId]?.[field] },
    }));
  };

  const selectRadio = (memberId, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [memberId]: { ...prev[memberId], [field]: value },
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      Pregnant: "blue",
      Lactating: "green",
      Child: "orange",
      Infant: "purple",
      Adolescent: "pink",
      Chronic: "red",
      Normal: "gray",
    };
    return colors[status] || "gray";
  };


  const renderCheckbox = (memberId, field, label) => (
    <TouchableOpacity
      onPress={() => toggleCheckbox(memberId, field)}
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: "#888",
          borderRadius: 4,
          marginRight: 6,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: formState[memberId]?.[field] ? "#2563EB" : "white",
        }}
      >
        {formState[memberId]?.[field] && <FontAwesome name="check" size={14} color="white" />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );

  const renderRadio = (memberId, field, value, label) => (
    <TouchableOpacity
      onPress={() => selectRadio(memberId, field, value)}
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: "#888",
          borderRadius: 10,
          marginRight: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {formState[memberId]?.[field] === value && (
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#2563EB" }} />
        )}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );


  // At the bottom of your HomeVisit3Form.jsx
// const handleSubmit = () => {
//   // Loop through all members in this house
//   houseMembers.forEach((member) => {
//     const memberForm = formState[member.id] || {};

//     // Merge old member data with new form updates
//     const updatedMember = {
//       ...member,
//       ...memberForm,
//     };

//     // ---- Build Medical Info summary ----
//     const ancSummary = updatedMember.ancVisit ? "ANC Visit done" : "ANC Visit pending";

//     let ttCount = 0;
//     if (updatedMember.ttInjection === "TT1") ttCount = 1;
//     if (updatedMember.ttInjection === "TT2") ttCount = 2;
//     const ttSummary = `${ttCount}/2 TT Vaccine Done`;

//     const ifaSummary = updatedMember.ifaTablets
//       ? `${updatedMember.ifaTablets}/100 IFA Tablets delivered`
//       : "";

//     const medicinesSummary = [];
//     if (updatedMember.zincTablets) medicinesSummary.push(`${updatedMember.zincTablets} Zinc Tablets`);
//     if (updatedMember.calciumTablets) medicinesSummary.push(`${updatedMember.calciumTablets} Calcium Tablets`);
//     if (updatedMember.orsPackets) medicinesSummary.push(`${updatedMember.orsPackets} ORS Packets`);
//     if (updatedMember.paracetamol) medicinesSummary.push(`${updatedMember.paracetamol} Paracetamol`);
//     if (updatedMember.dewormingTablets) medicinesSummary.push(`${updatedMember.dewormingTablets} Deworming Tablets`);

//     const dangerSummary =
//       updatedMember.dangerSigns && updatedMember.dangerSigns !== "N/A"
//         ? `Danger Signs: ${updatedMember.dangerSigns}`
//         : "";

//     const otherInfo = updatedMember.otherMedicalInfo ? `. ${updatedMember.otherMedicalInfo}` : "";

//     updatedMember.medicalInfo = [
//       ancSummary,
//       ttSummary,
//       ifaSummary,
//       medicinesSummary.length ? medicinesSummary.join(", ") : "",
//       dangerSummary,
//       otherInfo,
//     ]
//       .filter(Boolean)
//       .join(". ");

//     // ---- Update MOCK_DATA globally ----
//     setMockData((prev) => {
//       const prevMembers = prev?.member || [];
//       const prevHouses = prev?.houses || [];

//       // Update this member
//       const updatedMembers = prevMembers.map((m) =>
//         m.id === member.id ? updatedMember : m
//       );

//       // Recalculate house stats
//       const updatedHouses = prevHouses.map((house) => {
//         if (!house.members) return house;

//         const memberObjects = house.members.map(
//           (mid) => updatedMembers.find((m) => m.id === mid) || {}
//         );

//         const pregnantWomen = memberObjects.filter((m) => m.status === "Pregnant").length;
//         const eligibleCouples = memberObjects.filter((m) => m.status === "Eligible Couple").length;
//         const newbornChildren = memberObjects.filter((m) => m.status === "Infant").length;
//         const childrenUnder5 = memberObjects.filter((m) =>
//           ["Child", "Infant"].includes(m.status)
//         ).length;
//         const highCareCount = memberObjects.filter((m) =>
//           ["Pregnant", "Chronic", "Child", "Infant"].includes(m.status)
//         ).length;

//         // History log if member is part of this house
//         const newHistoryEntry = house.members.includes(member.id)
//           ? [
//               { date: new Date().toLocaleDateString(), text: `Updated data for ${updatedMember.name}` },
//               ...(house.history || []),
//             ]
//           : house.history || [];

//         return {
//           ...house,
//           pregnantWomen,
//           eligibleCouples,
//           newbornChildren,
//           childrenUnder5,
//           highCareCount,
//           history: newHistoryEntry,
//         };
//       });

//       return {
//         ...prev,
//         member: updatedMembers,
//         houses: updatedHouses,
//       };
//     });
//   });

//   console.log("✅ Form saved for house:", selectedHouse.id);
// };




console.log("setMockData:", setMockData);


  const renderMemberForm = (member) => {
    const isExpanded = expandedMembers[member.id];

    return (
      <View
        key={member.id}
        style={{
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* Member Header */}
        <TouchableOpacity
          onPress={() => toggleMember(member.id)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            backgroundColor: "#f9f9f9",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#e0f0ff",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              <FontAwesome name="user" size={18} color="#1e40af" />
            </View>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{member.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                backgroundColor: getStatusColor(member.status),
                color: "white",
                fontSize: 12,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 12,
                marginRight: 6,
              }}
            >
              {member.status}
            </Text>
            {isExpanded ? (
              <Entypo name="chevron-up" size={20} color="#555" />
            ) : (
              <Entypo name="chevron-down" size={20} color="#555" />
            )}
          </View>
        </TouchableOpacity>

        {/* Member Details */}
        {isExpanded && (
          <View style={{ padding: 12 }}>
            {/* Age & Gender */}
            <View style={{ flexDirection: "row", gap: 20, marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons name="calendar-outline" size={14} color="#555" />
                <Text style={{ fontSize: 14, color: "#555" }}>Age: {member.age || "N/A"}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <FontAwesome name="user" size={14} color="#555" />
                <Text style={{ fontSize: 14, color: "#555" }}>Gender: {member.gender || "N/A"}</Text>
              </View>
            </View>

            {/* Note */}
<View style={{ marginBottom: 8 }}>
  <Text style={{ fontSize: 14, fontWeight: "600", color: "#1e40af", marginBottom: 4 }}>Note</Text>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 8,
    }}
  >
    <FontAwesome name="heart" size={16} color="#888" />
    <TextInput
      placeholder="i.e. pregnant, 6 months"
      style={{ marginLeft: 6, flex: 1, fontSize: 14, color: "#555" }}
      value={formState[member.id]?.note || ""}
      onChangeText={(text) =>
        setFormState((prev) => ({
          ...prev,
          [member.id]: { ...prev[member.id], note: text },
        }))
      }
    />
  </View>
</View>


            {/* Full Form Based on Status */}
            {(member.status === "Pregnant" ||
              member.status === "Child" ||
              member.status === "Infant" ||
              member.status === "Lactating" ||
              member.status === "Adolescent" ||
              member.status === "Chronic" ||
              member.status === "Normal") && (
              <>
                {/* Medical Info */}
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#1e40af", marginBottom: 10 }}>
              Medical Info
            </Text>

            {/* Default Medical Info */}
            {renderCheckbox(member.id, "tbChecked", "TB Symptom Checked")}
            {renderCheckbox(member.id, "nutritionCounselling", "Nutrition Counselling")}
            {renderCheckbox(member.id, "vhsndParticipation", "VHSND Participation")}
             <View style={{ flexDirection: "row", gap: 12, marginBottom: 8, marginTop:8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{fontWeight:'bold'}} >Weight (kg)</Text>
                    <TextInput
  placeholder="Weight"
  placeholderTextColor="#808080"
  keyboardType="numeric"
  value={formState[member.id]?.weight || ""}
  onChangeText={(val) =>
    setFormState(prev => ({
      ...prev,
      [member.id]: { ...prev[member.id], weight: val }
    }))
  }
  style={[styles.input, {borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:10}]}
/>

                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{fontWeight:'bold'}} >BP</Text>
                    <TextInput
  placeholder="120/80"
  placeholderTextColor="#808080"
  value={formState[member.id]?.bp || ""}
  onChangeText={(val) =>
    setFormState(prev => ({
      ...prev,
      [member.id]: { ...prev[member.id], bp: val }
    }))
  }
  style={[styles.input, {borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:10}]}
/>

                  </View>
                </View>

            {/* Pregnant */}
            {member.status === "Pregnant" && (
              <>
                {renderCheckbox(member.id, "ancVisit", "ANC Visit Done")}

                <Text style={{ fontWeight: "600", marginBottom: 4 , marginTop:8}}>TT Injection</Text>
                {["TT1", "TT2", "Booster"].map((opt) =>
                 <React.Fragment key={opt}>
                  {renderRadio(member.id, "ttInjection", opt, opt)}
                </React.Fragment>
                )}

                

                <Text style={{marginTop:8, fontWeight:'bold'}} >Danger Signs</Text>
                <TextInput placeholder="Enter danger signs" placeholderTextColor="#808080" style={[styles.input, {borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:10}]} />
              </>
            )}

            {/* Infant/Newborn */}
            {member.status === "Infant" && (
              <>
                <Text style={{ fontWeight: "600", marginBottom: 4 }}>Place of Birth</Text>
                {["Home", "Govt. Facility", "Private Facility"].map((opt) =>
                  <React.Fragment key={opt}>
                    {renderRadio(member.id, "placeOfBirth", opt, opt)}
                  </React.Fragment>
                )}

                <Text>Birth Weight (kg)</Text>
                <TextInput placeholder="Birth Weight" placeholderTextColor="#808080" keyboardType="numeric" style={[styles.input, {borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:10}]} />
              </>
            )}

            {/* Child */}
            {member.status === "Child" && (
              <>
                

                <Text style={{fontWeight:'bold'}} >Height (cm)</Text>
                <TextInput placeholder="Height" placeholderTextColor="#808080" keyboardType="numeric" style={[styles.input, {borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:10}]} />
              </>
            )}

                {/* Medicines Distributed */}
                <Text style={{ fontWeight: "600", fontSize: 16, color: "#1e40af", marginBottom: 6 }}>
                  Medicines Distributed
                </Text>
                {["ifaTablets", "orsPackets", "zincTablets", "paracetamol", "calciumTablets", "dewormingTablets"].map(
                  (med, idx) => (
                    <View key={idx}>
                        <Text>{med}</Text>
                        <TextInput
                          placeholder={med}
                          placeholderTextColor="#808080"
                          keyboardType="numeric"
                          value={formState[member.id]?.[med] || ""}
                          onChangeText={(val) => 
                            setFormState(prev => ({
                              ...prev,
                              [member.id]: { ...prev[member.id], [med]: val }
                            }))
                          }
                          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 6, color: "black" }}
                        />
                    </View>
                  )
                )}

                {/* Referred */}
                <Text style={{ fontWeight: "600", fontSize: 14, marginBottom: 4 }}>Referred (Reasons)</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 8,
                  }}
                >
                  <Entypo name="warning" size={16} color="#888" />
                  <TextInput placeholder="i.e. Swelling, High BP" style={{ marginLeft: 6, flex: 1, fontSize: 14, color: "#555" }} />
                </View>

                {/* Next Visit */}
                <Text style={{ fontWeight: "600", fontSize: 14, marginBottom: 4 }}>Next Visit (Reminder)</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 8,
                  }}
                >
                  <Entypo name="calendar" size={16} color="#888" />
                  <TextInput placeholder="Next Visit Tasks" style={{ marginLeft: 6, flex: 1, fontSize: 14, color: "#555" }} />
                </View>
              </>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* Header */}
      <View style={{ marginBottom: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
          <FontAwesome name="home" size={18} color="#333" />
          <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 6 }}>Home Visit</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 2 }}>{selectedHouse.head}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialIcons name="access-time" size={14} color="#555" />
          <Text style={{ fontSize: 14, color: "#555" }}>Date: {new Date().toLocaleDateString("en-GB")}</Text>
        </View>
      </View>

      {/* Members List */}
      {houseMembers.map((member) => renderMemberForm(member))}

<View style={styles.bottomButtons}>

      <TouchableOpacity style={styles.backButton} onPress={() =>  navigate("HomeVisit2Voice", { houseId: selectedHouse.id })}>
      <Text style={styles.backButtonText} >← Back</Text>
    </TouchableOpacity>
      {/* Confirm Button */}
      <TouchableOpacity
        onPress={() => {
          // handleSubmit()
  setTimeout(() => {
    navigate("Tasks");
  }, 1000); // 1000 ms = 1 second
}}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Confirm →</Text>
      </TouchableOpacity>
</View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  input: {
     color: "black", 
 
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
})