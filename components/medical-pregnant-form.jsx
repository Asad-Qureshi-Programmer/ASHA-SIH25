import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import { Textarea } from "./Textarea";

export default function MedicalPregnantForm() {
  const [formData, setFormData] = useState({
    ancVisit: false,
    ttInjection: { tt1: false, tt2: false, booster: false },
    weight: "",
    bp: "",
    dangerSigns: "",
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
    <View style={styles.container}>
      <Text style={styles.title}>Medical Info (For Pregnant Women)</Text>

      {/* ANC Visit */}
      <CheckboxItem
        label="ANC visit (0/3 done)"
        checked={formData.ancVisit}
        onToggle={(checked) => handleCheckboxChange("ancVisit", checked)}
      />

      {/* TT Injection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🩹 TT Injection</Text>
        <CheckboxItem
          label="TT1"
          checked={formData.ttInjection.tt1}
          onToggle={(checked) => handleTTInjectionChange("tt1", checked)}
        />
        <CheckboxItem
          label="TT2"
          checked={formData.ttInjection.tt2}
          onToggle={(checked) => handleTTInjectionChange("tt2", checked)}
        />
        <CheckboxItem
          label="Booster"
          checked={formData.ttInjection.booster}
          onToggle={(checked) => handleTTInjectionChange("booster", checked)}
        />
      </View>

      {/* Weight & BP */}
      <View style={styles.row}>
        <InputField
          label="⚖️ Weight"
          value={formData.weight}
          onChangeText={(value) => handleInputChange("weight", value)}
          placeholder="Weight"
        />
        <InputField
          label="🩺 BP"
          value={formData.bp}
          onChangeText={(value) => handleInputChange("bp", value)}
          placeholder="BP"
        />
      </View>

      {/* Danger Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Danger Signs</Text>
        <Textarea
          value={formData.dangerSigns}
          onChangeText={(value) => handleInputChange("dangerSigns", value)}
          placeholder="i.e. Bleeding, Swelling"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: 16,
  },
  section: { marginVertical: 8 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: 4,
  },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
});
