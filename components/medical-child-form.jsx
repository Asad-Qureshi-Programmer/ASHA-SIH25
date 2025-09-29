import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import { Textarea } from "./Textarea"; // React Native version

export default function MedicalChildForm() {
  const [formData, setFormData] = useState({
    growth: {
      weight: "",
      height: "",
      muac: "",
    },
    feedingPractices: {
      exclusiveBreastfeeding: false,
      complimentaryFeeding: false,
      frequencyAppropriate: false,
    },
    immunization: {
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
    },
    commonIllness: {
      diarrhea: false,
      coughBreathing: false,
    },
    dangerSigns: "",
  });

  const handleCheckboxChange = (section, field, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Info (For Child)</Text>

      {/* Growth & Nutrition */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Growth & Nutrition</Text>
        <View style={styles.row}>
          <View style={styles.flexItem}>
            <Text style={styles.label}>⚖️ Weight (kg)</Text>
            <InputField
              label=""
              value={formData.growth.weight}
              onChangeText={(value) =>
                handleInputChange("growth", "weight", value)
              }
              placeholder="Weight"
            />
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.label}>📏 Height (cm)</Text>
            <InputField
              label=""
              value={formData.growth.height}
              onChangeText={(value) =>
                handleInputChange("growth", "height", value)
              }
              placeholder="Height"
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>📐 MUAC (cm)</Text>
          <InputField
            label=""
            value={formData.growth.muac}
            onChangeText={(value) => handleInputChange("growth", "muac", value)}
            placeholder="MUAC"
          />
        </View>
      </View>

      {/* Feeding Practices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feeding Practices</Text>
        <CheckboxItem
          label="Exclusive Breastfeeding (0-6 months)"
          checked={formData.feedingPractices.exclusiveBreastfeeding}
          onToggle={(checked) =>
            handleCheckboxChange(
              "feedingPractices",
              "exclusiveBreastfeeding",
              checked
            )
          }
        />
        <CheckboxItem
          label="Complimentary Feeding Started at 6 months"
          checked={formData.feedingPractices.complimentaryFeeding}
          onToggle={(checked) =>
            handleCheckboxChange(
              "feedingPractices",
              "complimentaryFeeding",
              checked
            )
          }
        />
        <CheckboxItem
          label="Frequency of feeding appropriate"
          checked={formData.feedingPractices.frequencyAppropriate}
          onToggle={(checked) =>
            handleCheckboxChange(
              "feedingPractices",
              "frequencyAppropriate",
              checked
            )
          }
        />
      </View>

      {/* Immunization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immunization</Text>
        {Object.keys(formData.immunization).map((key) => (
          <CheckboxItem
            key={key}
            label={key} // you may replace key with a nicer label if needed
            checked={formData.immunization[key]}
            onToggle={(checked) =>
              handleCheckboxChange("immunization", key, checked)
            }
          />
        ))}
      </View>

      {/* Common Illness Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Illness Management</Text>
        <CheckboxItem
          label="Diarrhea in last 2 weeks"
          checked={formData.commonIllness.diarrhea}
          onToggle={(checked) =>
            handleCheckboxChange("commonIllness", "diarrhea", checked)
          }
        />
        <CheckboxItem
          label="Cough/difficulty breathing in last 2 weeks"
          checked={formData.commonIllness.coughBreathing}
          onToggle={(checked) =>
            handleCheckboxChange("commonIllness", "coughBreathing", checked)
          }
        />
      </View>

      {/* Danger Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Danger Signs</Text>
        <Textarea
          value={formData.dangerSigns}
          onChangeText={(value) => handleInputChange("", "dangerSigns", value)}
          placeholder="Danger signs"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12, // works in RN 0.71+, otherwise use marginRight on flexItem
  },
  flexItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#374151",
  },
});
