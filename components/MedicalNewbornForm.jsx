import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import RadioGroup from "./RadioGroup";

const MedicalNewbornForm = () => {
  const [formData, setFormData] = useState({
    placeOfBirth: "",
    birthWeight: "",
    breastfeedingInitiated: false,
    skinToSkinCare: false,
    cordCareDone: false,
    exclusiveBreastfeeding: false,
    feedingIssues: "",
    temperature: "",
    dangerSigns: "",
    bcgGiven: false,
    opv0Given: false,
    hepatitisBGiven: false,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const placeOfBirthOptions = [
    { label: "Home", value: "home" },
    { label: "Govt. Facility", value: "govt" },
    { label: "Private Facility", value: "private" },
  ];

  const temperatureOptions = [
    { label: "Normal", value: "normal" },
    { label: "Low", value: "low" },
    { label: "High", value: "high" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medical Info (For Newborn)</Text>
      </View>

      <View style={styles.content}>
        {/* Place of Birth */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🏥 Place of Birth</Text>
          <RadioGroup
            options={placeOfBirthOptions}
            selectedValue={formData.placeOfBirth}
            onValueChange={(value) => updateFormData("placeOfBirth", value)}
          />
        </View>

        <InputField
          label="⚖️ Birth Weight"
          value={formData.birthWeight}
          onChangeText={(text) => updateFormData("birthWeight", text)}
          placeholder=""
        />

        {/* Early Care */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Early Care</Text>
          <CheckboxItem
            label="Breastfeeding initiated within 1 hour"
            checked={formData.breastfeedingInitiated}
            onToggle={(checked) =>
              updateFormData("breastfeedingInitiated", checked)
            }
          />
          <CheckboxItem
            label="Skin-to-skin care given"
            checked={formData.skinToSkinCare}
            onToggle={(checked) => updateFormData("skinToSkinCare", checked)}
          />
          <CheckboxItem
            label="Cord Care Done"
            checked={formData.cordCareDone}
            onToggle={(checked) => updateFormData("cordCareDone", checked)}
          />
        </View>

        {/* Feeding & Nutrition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feeding & Nutrition</Text>
          <CheckboxItem
            label="Exclusive Breastfeeding Start"
            checked={formData.exclusiveBreastfeeding}
            onToggle={(checked) =>
              updateFormData("exclusiveBreastfeeding", checked)
            }
          />
          <TextAreaField
            label="🍼 Feeding Issues (if any)"
            value={formData.feedingIssues}
            onChangeText={(text) => updateFormData("feedingIssues", text)}
            placeholder=""
          />
        </View>

        {/* Health Checks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Checks</Text>
          <Text style={styles.sectionLabel}>🌡️ Temperature</Text>
          <RadioGroup
            options={temperatureOptions}
            selectedValue={formData.temperature}
            onValueChange={(value) => updateFormData("temperature", value)}
          />
          <TextAreaField
            label="⚠️ Danger Signs"
            value={formData.dangerSigns}
            onChangeText={(text) => updateFormData("dangerSigns", text)}
            placeholder=""
          />
        </View>

        {/* Immunization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Immunization</Text>
          <CheckboxItem
            label="BCG Given"
            checked={formData.bcgGiven}
            onToggle={(checked) => updateFormData("bcgGiven", checked)}
          />
          <CheckboxItem
            label="OPV-0 Given"
            checked={formData.opv0Given}
            onToggle={(checked) => updateFormData("opv0Given", checked)}
          />
          <CheckboxItem
            label="Hepatitis B-0 Given"
            checked={formData.hepatitisBGiven}
            onToggle={(checked) => updateFormData("hepatitisBGiven", checked)}
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
});

export default MedicalNewbornForm;
