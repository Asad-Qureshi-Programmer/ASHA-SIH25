import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "always", title: "Medical-Always" },
    { id: "pregnant", title: "Med-Conditional" },
    { id: "newborn", title: "Med-Condition2" },
    { id: "child", title: "Med-Condition3" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2c2c",
    paddingVertical: 8,
  },
  tabContainer: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#4a4a4a",
  },
  tabText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default TabNavigation;
