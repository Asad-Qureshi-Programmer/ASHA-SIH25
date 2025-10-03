import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const MedicalAlwaysForm = () => {
  const [formData, setFormData] = useState({
    tbSymptomChecked: false,
    nutritionCounselling: false,
    vhsndParticipation: false,
    bp: "",
    otherMedicalInfo: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Medical Info (Always)</Text>
      </View>

      <View style={styles.content}>
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
          placeholder=""
        />

        <TextAreaField
          label="⚠️ Other Medical Info"
          value={formData.otherMedicalInfo}
          onChangeText={(text) => updateFormData("otherMedicalInfo", text)}
          placeholder="i.e. Weight decreasing"
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});

export default MedicalAlwaysForm;
