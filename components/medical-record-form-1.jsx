import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Button from "./Button";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Select from "./Select";
import { Badge } from "./Badge";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { ChevronDown, User } from "lucide-react";

export default function MedicalRecordForm1() {
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

  const handleCheckboxChange = (field, value) => {
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Avatar style={styles.avatar}>
            <AvatarImage source={{ uri: "/diverse-woman-portrait.png" }} />
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
          <View style={styles.headerInfo}>
            <View style={styles.headerNameRow}>
              <Text style={styles.name}>{formData.name}</Text>
              <Badge variant="secondary" style={styles.badge}>
                Pregnant
              </Badge>
              <ChevronDown size={16} color="#9ca3af" />
            </View>
            <View style={styles.headerDetails}>
              <Text style={styles.details}>📅 Age: {formData.age}</Text>
              <Text style={styles.details}>👤 Gender: {formData.gender}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Tag Multiselect */}
        <View style={styles.field}>
          <Text style={styles.label}>Tag (Multiselect)</Text>
          <Select
            selected={formData.tags[0]}
            onValueChange={(val) => setFormData({ ...formData, tags: [val] })}
            options={["Pregnant", "Newborn", "Child"]}
          />
        </View>
      </View>
      {/* Note */}
      <View style={styles.field}>
        <Text style={styles.label}>Note</Text>
        <View style={styles.noteInputWrapper}>
          <Text style={styles.noteIcon}>💬</Text>
          <Input
            value={formData.note}
            onChangeText={(text) => handleInputChange("note", text)}
            placeholder="i.e. pregnant, 6 months"
          />
        </View>
      </View>

      {/* Medical Info */}
      <View style={styles.field}>
        <Text style={styles.sectionTitle}>Medical Info</Text>

        <Checkbox
          label="ANC visit (0/3 done)"
          value={formData.ancVisit}
          onValueChange={(val) => handleCheckboxChange("ancVisit", val)}
        />

        <Text style={styles.subLabel}>🩹 TT injection</Text>
        <View style={styles.ttRow}>
          {["tt1", "tt2", "booster"].map((type) => (
            <Checkbox
              key={type}
              label={type.toUpperCase()}
              value={formData.ttInjection[type]}
              onValueChange={(val) => handleTTInjectionChange(type, val)}
            />
          ))}
        </View>

        <Checkbox
          label="TB Symptom Checked"
          value={formData.tbSymptomChecked}
          onValueChange={(val) => handleCheckboxChange("tbSymptomChecked", val)}
        />
        <Checkbox
          label="Nutrition Counselling"
          value={formData.nutritionCounselling}
          onValueChange={(val) =>
            handleCheckboxChange("nutritionCounselling", val)
          }
        />
        <Checkbox
          label="VHSND Participation Done"
          value={formData.vhsndParticipation}
          onValueChange={(val) =>
            handleCheckboxChange("vhsndParticipation", val)
          }
        />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.subLabel}>⚖️ Weight</Text>
            <Input
              value={formData.weight}
              onChangeText={(val) => handleInputChange("weight", val)}
            />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.subLabel}>🩺 BP</Text>
            <Input
              value={formData.bp}
              onChangeText={(val) => handleInputChange("bp", val)}
            />
          </View>
        </View>
      </View>

      {/* Danger Signs */}
      <View style={styles.field}>
        <Text style={styles.subLabel}>⚠️ Danger Signs</Text>
        <Input
          value={formData.dangerSigns}
          onChangeText={(val) => handleInputChange("dangerSigns", val)}
          placeholder="i.e. Bleeding, Swelling"
        />
      </View>

      {/* Other Medical Info */}
      <View style={styles.field}>
        <Text style={styles.subLabel}>📋 Other Medical Info</Text>
        <Input
          value={formData.otherMedicalInfo}
          onChangeText={(val) => handleInputChange("otherMedicalInfo", val)}
          placeholder="i.e. Weight decreasing"
        />
      </View>

      {/* Medicines */}
      <View style={styles.field}>
        <Text style={styles.sectionTitle}>Medicines Distributed</Text>
        {[
          "ifaTablets",
          "orsPackets",
          "zincTablets",
          "paracetamol",
          "calciumTablets",
          "dewormingTablets",
        ].map((med) => (
          <View key={med} style={styles.row}>
            <Text style={styles.subLabel}>{med}</Text>
            <Input
              value={formData[med]}
              onChangeText={(val) => handleInputChange(med, val)}
              placeholder="Qty"
            />
          </View>
        ))}
      </View>

      {/* Referred Reasons */}
      <View style={styles.field}>
        <Text style={styles.subLabel}>⚠️ Referred (Reasons)</Text>
        <Input
          value={formData.referredReasons}
          onChangeText={(val) => handleInputChange("referredReasons", val)}
          placeholder="i.e. Swelling, High BP"
        />
      </View>

      {/* Next Visit */}
      <View style={styles.field}>
        <Text style={styles.sectionTitle}>Next Visit (Reminder)</Text>
        <Input
          value={formData.nextVisit}
          onChangeText={(val) => handleInputChange("nextVisit", val)}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Save Button */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Save Medical Record"
          onPress={() => console.log(formData)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40 },
  headerInfo: { flex: 1, marginLeft: 12 },
  headerNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  name: { fontSize: 16, fontWeight: "600" },
  badge: { backgroundColor: "#bfdbfe", color: "#1e3a8a", fontSize: 10 },
  headerDetails: { flexDirection: "row", gap: 12, marginTop: 4 },
  details: { fontSize: 12, color: "#4b5563" },
  content: { paddingTop: 16, paddingBottom: 32 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", color: "#3b82f6", marginBottom: 4 },
  subLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#3b82f6",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
    marginBottom: 8,
  },
  noteInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    padding: 8,
  },
  noteIcon: { marginRight: 6, color: "#9ca3af" },
  row: { flexDirection: "row", gap: 8, marginBottom: 8 },
  flex1: { flex: 1 },
  ttRow: { flexDirection: "row", gap: 16, marginLeft: 12, marginBottom: 8 },
  buttonWrapper: { marginTop: 24 },
});