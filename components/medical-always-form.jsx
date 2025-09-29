import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import { Textarea } from "./Textarea"; // the React Native version we made

export default function MedicalAlwaysForm() {
  const [formData, setFormData] = useState({
    tbSymptomChecked: false,
    nutritionCounselling: false,
    vhsndParticipation: false,
    bp: "",
    otherMedicalInfo: "",
  });

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical info (Always)</Text>

      <View style={styles.section}>
        {/* TB Symptom Checked */}
        <CheckboxItem
          label="TB Symptom Checked"
          checked={formData.tbSymptomChecked}
          onToggle={(checked) =>
            handleCheckboxChange("tbSymptomChecked", checked)
          }
        />

        {/* Nutrition Counselling */}
        <CheckboxItem
          label="Nutrition Counselling"
          checked={formData.nutritionCounselling}
          onToggle={(checked) =>
            handleCheckboxChange("nutritionCounselling", checked)
          }
        />

        {/* VHSND Participation */}
        <CheckboxItem
          label="VHSND Participation Done"
          checked={formData.vhsndParticipation}
          onToggle={(checked) =>
            handleCheckboxChange("vhsndParticipation", checked)
          }
        />

        {/* BP */}
        <View style={styles.field}>
          <Text style={styles.label}>🩺 BP</Text>
          <InputField
            label=""
            value={formData.bp}
            onChangeText={(value) => handleInputChange("bp", value)}
            placeholder="Blood Pressure"
          />
        </View>

        {/* Other Medical Info */}
        <View style={styles.field}>
          <Text style={styles.label}>📋 Other Medical Info</Text>
          <Textarea
            value={formData.otherMedicalInfo}
            onChangeText={(value) =>
              handleInputChange("otherMedicalInfo", value)
            }
            placeholder="i.e. Weight decreasing"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    maxWidth: 400,
  },
  title: {
    color: "#2563eb", // blue-600
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 16,
  },
  section: {
    gap: 12,
  },
  field: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#374151",
  },
});
