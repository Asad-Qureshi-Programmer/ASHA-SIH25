import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default function HouseDetails({navigate}: {navigate: (screen: string) => void}) {
  console.log(navigate);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LOGO</Text>
        <View style={styles.headerRight}>
          <Text style={styles.langIcon}>अ</Text>
          <Icon name="person-circle-outline" size={28} color="#000" />
        </View>
      </View>

      <ScrollView>
        {/* Page Title */}
        <Text style={styles.pageTitle}>
          <Icon name="home-outline" size={20} /> House Details
        </Text>

        {/* Add Member Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => {navigate('AddMember')}}>
          <Text style={styles.addButtonText}>+ Add New Member</Text>
        </TouchableOpacity>

        {/* House Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.houseId}>#121002</Text>
            <View style={[styles.badge, { backgroundColor: "#FF3B30" }]}>
              <Text style={styles.badgeText}>High Risk</Text>
            </View>
          </View>

          <Text style={styles.address}>
            <Icon name="location-outline" size={14} /> Basant Vihar Colony, Dhar MP
          </Text>

          <View style={styles.statsRow}>
            <Stat label="Members" value="8" />
            <Stat label="High Care" value="2" />
          </View>
          <View style={styles.statsRow}>
            <Stat label="Pregnant Women" value="1" />
            <Stat label="Eligible Couples" value="2" />
          </View>
          <View style={styles.statsRow}>
            <Stat label="Newborn Children" value="1" />
            <Stat label="Children (under 5)" value="2" />
          </View>

          <View style={styles.footer}>
            <Text style={styles.lastUpdate}>
              <Icon name="time-outline" size={14} /> Last Update: 25/09/2025
            </Text>
            <Text style={styles.houseId}>#121002</Text>
          </View>
        </View>

        {/* Members */}
        <MemberCard
          id="1"
          name="Ravi Kumar"
          age="40"
          gender="Male"
          note="High BP"
          tag="Head"
          tagColor="#007AFF"
          expanded={expanded}
          toggleExpand={toggleExpand}
        />
        <MemberCard
          id="2"
          name="Sunita Kumar"
          age="30"
          gender="Female"
          note="Pregnant"
          tag="Pregnant"
          tagColor="#34C759"
          expanded={expanded}
          toggleExpand={toggleExpand}
          medicalInfo={[
            "2/3 ANC Visits done",
            "1/2 TT Vaccine Done",
            "50/100 IFA Tablets delivered",
          ]}
        />
        <MemberCard
          id="3"
          name="Shivam Kumar"
          age="1"
          gender="Male"
          note="Measles Vaccination due"
          tag="Child"
          tagColor="#FF9500"
          expanded={expanded}
          toggleExpand={toggleExpand}
        />

        {/* Family History */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Family History</Text>
          <Text style={styles.historyItem}>
            25/09/2025 - Vaccination of Shivam Kumar Done
          </Text>
          <Text style={styles.historyItem}>
            25/09/2025 - ANC Visit for Sunita Kumar
          </Text>
          <Text style={styles.historyItem}>
            05/09/2025 - Drop given to Shivam
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Icon name="home-outline" size={26} color="#000" />
        <Icon name="list-outline" size={26} color="#000" />
        <TouchableOpacity style={styles.plusButton}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <Icon name="notifications-outline" size={26} color="#000" />
        <Icon name="settings-outline" size={26} color="#000" />
      </View>
    </View>
  );
}

/* Member Card Component */
const MemberCard: React.FC<{
  id: string;
  name: string;
  age: string;
  gender: string;
  note: string;
  tag: string;
  tagColor: string;
  expanded: string | null;
  toggleExpand: (id: string) => void;
  medicalInfo?: string[];
}> = ({
  id,
  name,
  age,
  gender,
  note,
  tag,
  tagColor,
  expanded,
  toggleExpand,
  medicalInfo = [],
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{name}</Text>
      <View style={[styles.badge, { backgroundColor: tagColor }]}>
        <Text style={styles.badgeText}>{tag}</Text>
      </View>
    </View>
    <Text>Age: {age}   Gender: {gender}</Text>
    <Text>Note: {note}</Text>

    <TouchableOpacity onPress={() => toggleExpand(id)}>
      <Text style={styles.linkText}>
        Medical Info {expanded === id ? "▲" : "▼"}
      </Text>
    </TouchableOpacity>

    {expanded === id &&
      (medicalInfo.length > 0 ? (
        medicalInfo.map((line, index) => (
          <Text key={index} style={styles.medicalInfo}>
            • {line}
          </Text>
        ))
      ) : (
        <Text style={styles.medicalInfo}>No extra info</Text>
      ))}
  </View>
);

/* Stat component */
const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  logo: { fontWeight: "bold", fontSize: 16 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  langIcon: {
    fontSize: 18,
    backgroundColor: "#E0F0FF",
    borderRadius: 50,
    padding: 6,
    marginRight: 8,
  },
  pageTitle: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    margin: 15,
    padding: 12,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  houseId: { fontWeight: "bold" },
  badge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  address: { marginTop: 5, color: "#555" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  stat: { alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "#777" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  lastUpdate: { fontSize: 12, color: "#777" },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  linkText: { marginTop: 8, color: "#007AFF", fontWeight: "500" },
  medicalInfo: { fontSize: 13, color: "#444", marginLeft: 10 },
  sectionTitle: { fontWeight: "bold", marginBottom: 8 },
  historyItem: { fontSize: 13, color: "#555", marginBottom: 4 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  plusButton: {
    backgroundColor: "#007AFF",
    borderRadius: 40,
    padding: 12,
    marginBottom: 10,
  },
});
