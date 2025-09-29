"use client";

import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem"; // Custom checkbox component
import InputField from "./InputField"; // Custom input component
import TextAreaField from "./TextAreaField"; // Custom textarea component

export default function ConditionalMedicalForms() {
  const [formData, setFormData] = useState({
    // Medical-Always
    tbSymptomChecked: false,
    nutritionCounselling: false,
    vhsndParticipation: false,
    bp: "",
    otherMedicalInfo: "",

    // Medical-Pregnant
    ancVisit: false,
    tt1: false,
    tt2: false,
    booster: false,
    weight: "",
    bpPregnant: "",
    dangerSigns: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Medical-Always */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medical info (Always)</Text>
        <CheckboxItem
          label="TB Symptom Checked"
          checked={formData.tbSymptomChecked}
          onToggle={(checked) => updateFormData("tbSymptomChecked", checked)}
        />
        <CheckboxItem
          label="Nutrition Counselling"
          checked={formData.nutritionCounselling}
          onToggle={(checked) =>
            updateFormData("nutritionCounselling", checked)
          }
        />
        <CheckboxItem
          label="VHSND Participation Done"
          checked={formData.vhsndParticipation}
          onToggle={(checked) => updateFormData("vhsndParticipation", checked)}
        />
        <InputField
          label="🩺 BP"
          value={formData.bp}
          onChangeText={(text) => updateFormData("bp", text)}
        />
        <TextAreaField
          label="⚠️ Other Medical Info"
          value={formData.otherMedicalInfo}
          onChangeText={(text) => updateFormData("otherMedicalInfo", text)}
          placeholder="i.e. Weight decreasing"
        />
      </View>

      {/* Medical-Pregnant */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medical Info (For Pregnant Women)</Text>
        <CheckboxItem
          label="ANC visit (0/3 done)"
          checked={formData.ancVisit}
          onToggle={(checked) => updateFormData("ancVisit", checked)}
        />
        <Text style={styles.sectionLabel}>🩹 TT injection</Text>
        <CheckboxItem
          label="TT1"
          checked={formData.tt1}
          onToggle={(checked) => updateFormData("tt1", checked)}
        />
        <CheckboxItem
          label="TT2"
          checked={formData.tt2}
          onToggle={(checked) => updateFormData("tt2", checked)}
        />
        <CheckboxItem
          label="Booster"
          checked={formData.booster}
          onToggle={(checked) => updateFormData("booster", checked)}
        />
        <InputField
          label="⚖️ Weight"
          value={formData.weight}
          onChangeText={(text) => updateFormData("weight", text)}
        />
        <InputField
          label="🩺 BP"
          value={formData.bpPregnant}
          onChangeText={(text) => updateFormData("bpPregnant", text)}
        />
        <TextAreaField
          label="⚠️ Danger Signs"
          value={formData.dangerSigns}
          onChangeText={(text) => updateFormData("dangerSigns", text)}
          placeholder="i.e. Bleeding, Swelling"
        />
      </View>

      {/* You can replicate similarly for Newborn & Child sections */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b82f6",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 6,
  },
});
