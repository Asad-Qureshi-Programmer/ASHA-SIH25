import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CheckboxItem = ({ label, checked, onToggle, compact = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.compactContainer]}
      onPress={() => onToggle(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.label, compact && styles.compactLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 4,
  },
  compactContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    flex: 1,
    minWidth: "45%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  checkedCheckbox: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  compactLabel: {
    fontSize: 14,
  },
});

export default CheckboxItem;
