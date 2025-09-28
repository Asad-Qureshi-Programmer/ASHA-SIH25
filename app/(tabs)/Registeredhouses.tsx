import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisteredHouses() {
  // Dummy data for houses
  const houses = [
    {
      id: "1",
      name: "Ravi Kumar",
      status: "High Risk",
      statusColor: "#FF3B30",
      address: "Basant Vihar Colony, Dhar MP",
      members: 4,
      lastVisit: "25/09/2025",
      houseId: "#121002",
    },
    {
      id: "2",
      name: "Mukesh",
      status: "Antenatal",
      statusColor: "#34C759",
      address: "Basant Vihar Colony, Dhar MP",
      members: 4,
      lastVisit: "25/09/2025",
      houseId: "#121002",
    },
    {
      id: "3",
      name: "Girish",
      status: "Vaccination",
      statusColor: "#007AFF",
      address: "Basant Vihar Colony, Dhar MP",
      members: 4,
      lastVisit: "25/09/2025",
      houseId: "#121002",
    },
  ];

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

      {/* Title */}
      <Text style={styles.pageTitle}>
        <Icon name="home-outline" size={20} /> Registered Houses
      </Text>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New House</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#666" />
        <TextInput placeholder="Search House" style={styles.searchInput} />
        <TouchableOpacity>
          <Icon name="filter-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* House List */}
      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.address}>
              <Icon name="location-outline" size={14} /> {item.address}
            </Text>
            <Text style={styles.members}>
              <Icon name="people-outline" size={14} /> Members: {item.members}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.lastVisit}>
                <Icon name="calendar-outline" size={14} /> Last Visit: {item.lastVisit}
              </Text>
              <Text style={styles.houseId}>{item.houseId}</Text>
            </View>
          </View>
        )}
      />

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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchInput: { flex: 1, marginLeft: 8 },
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
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  statusBadge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  address: { marginTop: 5, color: "#555" },
  members: { marginTop: 5, color: "#555" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  lastVisit: { fontSize: 12, color: "#777" },
  houseId: { fontSize: 12, color: "#777" },
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
