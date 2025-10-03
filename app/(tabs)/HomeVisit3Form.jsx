import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

export default function HomeVisit3Form({ navigate, MOCK_DATA, houseId }) {
  const [expandedMembers, setExpandedMembers] = useState({});

  // Find selected house
  const selectedHouse = MOCK_DATA?.houses.find((h) => h.id === houseId) || {
    id: "house_1",
    head: "House 12, Ward 5",
    members: ["member_1", "member_2", "member_3"],
  };

  // Get members for this house
  const houseMembers =
    MOCK_DATA?.member.filter((member) => selectedHouse.members.includes(member.id)) || [];

  const toggleMember = (memberId) => {
    setExpandedMembers((prev) => ({ ...prev, [memberId]: !prev[memberId] }));
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
                <Text style={{ fontWeight: "600", fontSize: 16, color: "#1e40af", marginBottom: 6 }}>
                  Medical Info
                </Text>

                {/* Example: Weight & BP */}
                <View style={{ flexDirection: "row", gap: 12, marginBottom: 8 }}>
                    <View style={{ flex: 1, padding: 8 }}>

                    <Text>Weight</Text>
                  <TextInput
                    placeholder="Weight"
                    defaultValue={member.weight}
                    style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }}
                  />
                    </View>

                    <View style={{ flex: 1, padding: 8 }}>
                    <Text>BP</Text>
                  <TextInput
                    placeholder="BP"
                    defaultValue={member.bp}
                    style={{ flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }}
                  />
                    </View>
                </View>

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
                          keyboardType="numeric"
                          defaultValue={member[med] ? String(member[med]) : ""}
                          style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 6 }}
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
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 12 }}>
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

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={() => navigate("HomeVisit4Summary", { houseId })}
        style={{
          marginVertical: 16,
          backgroundColor: "#1e40af",
          paddingVertical: 14,
          borderRadius: 25,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>Confirm →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
