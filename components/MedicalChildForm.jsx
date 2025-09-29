import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const MedicalChildForm = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    muac: "",
    exclusiveBreastfeeding: false,
    complimentaryFeeding: false,
    frequencyFeeding: false,
    bcg: false,
    opv0: false,
    opv1: false,
    opv2: false,
    opv3: false,
    pentavalent1: false,
    pentavalent2: false,
    pentavalent3: false,
    measles1: false,
    measles2: false,
    mrMeaslesRubella: false,
    dptBooster: false,
    vitaminA: false,
    diarrhea: false,
    coughBreathing: false,
    dangerSigns: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medical Info (For Child)</Text>
      </View>

      <View style={styles.content}>
        {/* Growth & Nutrition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Growth & Nutrition</Text>
          <View style={styles.inputRow}>
            <InputField
              label="⚖️ Weight (kg)"
              value={formData.weight}
              onChangeText={(text) => updateFormData("weight", text)}
              placeholder=""
              style={styles.halfInput}
            />
            <InputField
              label="📏 Height (cm)"
              value={formData.height}
              onChangeText={(text) => updateFormData("height", text)}
              placeholder=""
              style={styles.halfInput}
            />
          </View>
          <InputField
            label="📐 MUAC (cm)"
            value={formData.muac}
            onChangeText={(text) => updateFormData("muac", text)}
            placeholder=""
          />
        </View>

        {/* Feeding Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feeding Practices</Text>
          <CheckboxItem
            label="Exclusive Breastfeeding (0-6 months)"
            checked={formData.exclusiveBreastfeeding}
            onToggle={(checked) =>
              updateFormData("exclusiveBreastfeeding", checked)
            }
          />
          <CheckboxItem
            label="Complimentary Feeding Started at 6 months"
            checked={formData.complimentaryFeeding}
            onToggle={(checked) =>
              updateFormData("complimentaryFeeding", checked)
            }
          />
          <CheckboxItem
            label="Frequency of feeding appropriate"
            checked={formData.frequencyFeeding}
            onToggle={(checked) => updateFormData("frequencyFeeding", checked)}
          />
        </View>

        {/* Immunization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Immunization</Text>
          <View style={styles.checkboxGrid}>
            {[
              ["bcg", "BCG"],
              ["opv0", "OPV-0"],
              ["opv1", "OPV-1"],
              ["opv2", "OPV-2"],
              ["opv3", "OPV-3"],
              ["pentavalent1", "Pentavalent-1"],
              ["pentavalent2", "Pentavalent-2"],
              ["pentavalent3", "Pentavalent-3"],
              ["measles1", "Measles-1"],
              ["measles2", "Measles-2"],
              ["mrMeaslesRubella", "MR (Measles-Rubella)"],
              ["dptBooster", "DPT Booster"],
              ["vitaminA", "Vitamin-A"],
            ].map(([field, label]) => (
              <CheckboxItem
                key={field}
                label={label}
                checked={formData[field]}
                onToggle={(checked) => updateFormData(field, checked)}
                compact
              />
            ))}
          </View>
        </View>

        {/* Common Illness Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Illness Management</Text>
          <CheckboxItem
            label="Diarrhea in last 2 weeks"
            checked={formData.diarrhea}
            onToggle={(checked) => updateFormData("diarrhea", checked)}
          />
          <CheckboxItem
            label="Cough/difficulty breathing in last 2 weeks"
            checked={formData.coughBreathing}
            onToggle={(checked) => updateFormData("coughBreathing", checked)}
          />
        </View>

        {/* Health Checks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Checks</Text>
          <TextAreaField
            label="⚠️ Danger Signs"
            value={formData.dangerSigns}
            onChangeText={(text) => updateFormData("dangerSigns", text)}
            placeholder=""
          />
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b82f6",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 8,
  },
  halfInput: {
    flex: 1,
  },
  checkboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

export default MedicalChildForm;
