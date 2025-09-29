import { View, StyleSheet } from "react-native";
import CheckboxItem from "./CheckboxItem";

const CheckboxGroup = ({ options, selectedValues, onValueChange }) => {
  const handleToggle = (value, checked) => {
    if (checked) {
      onValueChange([...selectedValues, value]);
    } else {
      onValueChange(selectedValues.filter((v) => v !== value));
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <CheckboxItem
          key={option.value}
          label={option.label}
          checked={selectedValues.includes(option.value)}
          onToggle={(checked) => handleToggle(option.value, checked)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});

export default CheckboxGroup;
