import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioGroup = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioItem}
          onPress={() => onValueChange(option.value)}
          activeOpacity={0.7}
        >
          <View style={styles.radioButton}>
            {selectedValue === option.value && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
  },
  radioLabel: {
    fontSize: 16,
    color: "#374151",
  },
});

export default RadioGroup;
