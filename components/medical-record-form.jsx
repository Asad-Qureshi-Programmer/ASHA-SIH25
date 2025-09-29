import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements"; // For Avatar, install react-native-elements
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // For icons

export default function MedicalRecordForm() {
  const [formData, setFormData] = useState({
    name: "Sunita Kumar",
    age: 30,
    gender: "Female",
    tags: ["Pregnant"],
    ancVisit: false,
    ttInjection: { tt1: false, tt2: false, booster: false },
    tbSymptomChecked: false,
    nutritionCounselling: false,
    vhsndParticipation: false,
    weight: "",
    bp: "",
    note: "10, pregnant, 6 months",
    dangerSigns: "",
    otherMedicalInfo: "",
    ifaTablets: "",
    orsPackets: "",
    zincTablets: "",
    paracetamol: "",
    calciumTablets: "",
    dewormingTablets: "",
    referredReasons: "",
    nextVisit: "",
  });

  const handleSwitchChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTTInjectionChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      ttInjection: { ...prev.ttInjection, [type]: value },
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: "https://via.placeholder.com/100" }}
          icon={{ name: "user", type: "font-awesome" }}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{formData.name}</Text>
          <Text style={styles.badge}>Pregnant</Text>
          <Text>
            Age: {formData.age} | Gender: {formData.gender}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        {/* Note */}
        <Text style={styles.label}>Note</Text>
        <TextInput
          value={formData.note}
          onChangeText={(text) => handleInputChange("note", text)}
          style={styles.input}
          placeholder="i.e. pregnant, 6 months"
        />

        {/* Medical Info */}
        <Text style={styles.sectionTitle}>Medical Info</Text>

        <View style={styles.switchRow}>
          <Text>ANC visit (0/3 done)</Text>
          <Switch
            value={formData.ancVisit}
            onValueChange={(value) => handleSwitchChange("ancVisit", value)}
          />
        </View>

        {/* TT Injection */}
        <Text>TT Injection</Text>
        {["tt1", "tt2", "booster"].map((type) => (
          <View key={type} style={styles.switchRow}>
            <Text>{type.toUpperCase()}</Text>
            <Switch
              value={formData.ttInjection[type]}
              onValueChange={(value) => handleTTInjectionChange(type, value)}
            />
          </View>
        ))}

        {/* Other switches */}
        {[
          ["tbSymptomChecked", "TB Symptom Checked"],
          ["nutritionCounselling", "Nutrition Counselling"],
          ["vhsndParticipation", "VHSND Participation Done"],
        ].map(([field, label]) => (
          <View key={field} style={styles.switchRow}>
            <Text>{label}</Text>
            <Switch
              value={formData[field]}
              onValueChange={(value) => handleSwitchChange(field, value)}
            />
          </View>
        ))}

        {/* Weight and BP */}
        <Text>Weight</Text>
        <TextInput
          value={formData.weight}
          onChangeText={(text) => handleInputChange("weight", text)}
          style={styles.input}
          placeholder="Weight"
          keyboardType="numeric"
        />
        <Text>BP</Text>
        <TextInput
          value={formData.bp}
          onChangeText={(text) => handleInputChange("bp", text)}
          style={styles.input}
          placeholder="BP"
        />

        {/* Danger Signs */}
        <Text>Danger Signs</Text>
        <TextInput
          value={formData.dangerSigns}
          onChangeText={(text) => handleInputChange("dangerSigns", text)}
          style={styles.input}
          placeholder="i.e. Bleeding, Swelling"
        />

        {/* Other Medical Info */}
        <Text>Other Medical Info</Text>
        <TextInput
          value={formData.otherMedicalInfo}
          onChangeText={(text) => handleInputChange("otherMedicalInfo", text)}
          style={styles.input}
          placeholder="i.e. Weight decreasing"
        />

        {/* Medicines */}
        <Text>Medicines Distributed</Text>
        {[
          "ifaTablets",
          "orsPackets",
          "zincTablets",
          "paracetamol",
          "calciumTablets",
          "dewormingTablets",
        ].map((field) => (
          <TextInput
            key={field}
            value={formData[field]}
            onChangeText={(text) => handleInputChange(field, text)}
            style={styles.input}
            placeholder={field}
          />
        ))}

        {/* Referred Reasons */}
        <Text>Referred (Reasons)</Text>
        <TextInput
          value={formData.referredReasons}
          onChangeText={(text) => handleInputChange("referredReasons", text)}
          style={styles.input}
          placeholder="i.e. Swelling, High BP"
        />

        {/* Next Visit */}
        <Text>Next Visit (Reminder)</Text>
        <TextInput
          value={formData.nextVisit}
          onChangeText={(text) => handleInputChange("nextVisit", text)}
          style={styles.input}
          placeholder="YYYY-MM-DD"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Medical Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerInfo: { marginLeft: 12 },
  name: { fontWeight: "bold", fontSize: 18 },
  badge: {
    backgroundColor: "#cce5ff",
    color: "#004085",
    paddingHorizontal: 6,
    borderRadius: 4,
    marginVertical: 4,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 8 },
  label: { fontWeight: "500", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
