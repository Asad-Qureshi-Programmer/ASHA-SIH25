import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const MedicalPregnantForm = () => {
  const [formData, setFormData] = useState({
    ancVisit: false,
    ttInjections: {
      tt1: false,
      tt2: false,
      booster: false,
    },
    weight: "",
    bp: "",
    dangerSigns: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateTTInjection = (injection, checked) => {
    setFormData((prev) => ({
      ...prev,
      ttInjections: {
        ...prev.ttInjections,
        [injection]: checked,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medical Info (For Pregnant Women)</Text>
      </View>

      <View style={styles.content}>
        <CheckboxItem
          label="ANC visit (0/3 done)"
          checked={formData.ancVisit}
          onToggle={(checked) => updateFormData("ancVisit", checked)}
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🩹 TT injection</Text>
          <View style={styles.checkboxRow}>
            <CheckboxItem
              label="TT1"
              checked={formData.ttInjections.tt1}
              onToggle={(checked) => updateTTInjection("tt1", checked)}
              compact
            />
            <CheckboxItem
              label="TT2"
              checked={formData.ttInjections.tt2}
              onToggle={(checked) => updateTTInjection("tt2", checked)}
              compact
            />
            <CheckboxItem
              label="Booster"
              checked={formData.ttInjections.booster}
              onToggle={(checked) => updateTTInjection("booster", checked)}
              compact
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <InputField
            label="🩺 Weight"
            value={formData.weight}
            onChangeText={(text) => updateFormData("weight", text)}
            placeholder=""
            style={styles.halfInput}
          />
          <InputField
            label="🩺 BP"
            value={formData.bp}
            onChangeText={(text) => updateFormData("bp", text)}
            placeholder=""
            style={styles.halfInput}
          />
        </View>

        <TextAreaField
          label="⚠️ Danger Signs"
          value={formData.dangerSigns}
          onChangeText={(text) => updateFormData("dangerSigns", text)}
          placeholder="i.e. Bleeding, Swelling"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 16,
  },
  halfInput: {
    flex: 1,
  },
});

export default MedicalPregnantForm;
