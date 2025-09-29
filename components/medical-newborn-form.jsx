import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";
import InputField from "./InputField";
import { Textarea } from "./Textarea";

export default function MedicalNewbornForm() {
  const [formData, setFormData] = useState({
    placeOfBirth: { home: false, govtFacility: false, privateFacility: false },
    birthWeight: "",
    earlyCare: {
      breastfeedingInitiated: false,
      skinToSkinCare: false,
      cordCareDone: false,
    },
    exclusiveBreastfeedingStart: false,
    feedingIssues: "",
    temperature: { normal: false, low: false, high: false },
    dangerSigns: "",
    immunization: { bcgGiven: false, opv0Given: false, hepatitisBGiven: false },
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Info (For Newborn)</Text>

      {/* Place of Birth */}
      <View style={styles.section}>
        <Text style={styles.label}>🏥 Place of Birth</Text>
        <View style={styles.subSection}>
          <CheckboxItem
            label="Home"
            checked={formData.placeOfBirth.home}
            onToggle={(checked) =>
              handleCheckboxChange("placeOfBirth", "home", checked)
            }
          />
          <CheckboxItem
            label="Govt. Facility"
            checked={formData.placeOfBirth.govtFacility}
            onToggle={(checked) =>
              handleCheckboxChange("placeOfBirth", "govtFacility", checked)
            }
          />
          <CheckboxItem
            label="Private Facility"
            checked={formData.placeOfBirth.privateFacility}
            onToggle={(checked) =>
              handleCheckboxChange("placeOfBirth", "privateFacility", checked)
            }
          />
        </View>
      </View>

      {/* Birth Weight */}
      <View style={styles.section}>
        <Text style={styles.label}>⚖️ Birth Weight</Text>
        <InputField
          label=""
          value={formData.birthWeight}
          onChangeText={(value) => handleInputChange("birthWeight", value)}
          placeholder="Birth Weight"
        />
      </View>

      {/* Early Care */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Early Care</Text>
        <CheckboxItem
          label="Breastfeeding initiated within 1 hour"
          checked={formData.earlyCare.breastfeedingInitiated}
          onToggle={(checked) =>
            handleCheckboxChange("earlyCare", "breastfeedingInitiated", checked)
          }
        />
        <CheckboxItem
          label="Skin-to-skin care given"
          checked={formData.earlyCare.skinToSkinCare}
          onToggle={(checked) =>
            handleCheckboxChange("earlyCare", "skinToSkinCare", checked)
          }
        />
        <CheckboxItem
          label="Cord Care Done"
          checked={formData.earlyCare.cordCareDone}
          onToggle={(checked) =>
            handleCheckboxChange("earlyCare", "cordCareDone", checked)
          }
        />
      </View>

      {/* Feeding & Nutrition */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feeding & Nutrition</Text>
        <CheckboxItem
          label="Exclusive Breastfeeding Start"
          checked={formData.exclusiveBreastfeedingStart}
          onToggle={(checked) =>
            handleCheckboxChange("", "exclusiveBreastfeedingStart", checked)
          }
        />
        <Text style={styles.label}>🍼 Feeding Issues (if any)</Text>
        <Textarea
          value={formData.feedingIssues}
          onChangeText={(value) => handleInputChange("feedingIssues", value)}
          placeholder="Feeding issues"
        />
      </View>

      {/* Temperature & Danger Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌡️ Temperature</Text>
        <CheckboxItem
          label="Normal"
          checked={formData.temperature.normal}
          onToggle={(checked) =>
            handleCheckboxChange("temperature", "normal", checked)
          }
        />
        <CheckboxItem
          label="Low"
          checked={formData.temperature.low}
          onToggle={(checked) =>
            handleCheckboxChange("temperature", "low", checked)
          }
        />
        <CheckboxItem
          label="High"
          checked={formData.temperature.high}
          onToggle={(checked) =>
            handleCheckboxChange("temperature", "high", checked)
          }
        />

        <Text style={styles.label}>⚠️ Danger Signs</Text>
        <Textarea
          value={formData.dangerSigns}
          onChangeText={(value) => handleInputChange("dangerSigns", value)}
          placeholder="Danger signs"
        />
      </View>

      {/* Immunization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immunization</Text>
        <CheckboxItem
          label="BCG Given"
          checked={formData.immunization.bcgGiven}
          onToggle={(checked) =>
            handleCheckboxChange("immunization", "bcgGiven", checked)
          }
        />
        <CheckboxItem
          label="OPV-0 Given"
          checked={formData.immunization.opv0Given}
          onToggle={(checked) =>
            handleCheckboxChange("immunization", "opv0Given", checked)
          }
        />
        <CheckboxItem
          label="Hepatitis B-0 Given"
          checked={formData.immunization.hepatitisBGiven}
          onToggle={(checked) =>
            handleCheckboxChange("immunization", "hepatitisBGiven", checked)
          }
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
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
    marginBottom: 8,
  },
  label: { fontSize: 12, marginBottom: 4, color: "#374151" },
  subSection: { marginLeft: 12 },
});
