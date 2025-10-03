import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import Input from "./Input";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

export default function ConditionalMedicalForms1() {
  const [activeTab, setActiveTab] = useState("always");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="always">Medical-Always</TabsTrigger>
          <TabsTrigger value="pregnant">Med-Conditional</TabsTrigger>
          <TabsTrigger value="newborn">Med-Condition2</TabsTrigger>
          <TabsTrigger value="child">Med-Condition3</TabsTrigger>
        </TabsList>

        {/* Medical-Always */}
        <TabsContent value="always">
          <Card>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>
                Medical info (Always)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>TB Symptom Checked</Text>
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>Nutrition Counselling</Text>
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>
                  VHSND Participation Done
                </Text>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>🩺 BP</Text>
                <Input />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>⚠️ Other Medical Info</Text>
                <Textarea placeholder="i.e. Weight decreasing" />
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Info (For Pregnant Women) */}
        <TabsContent value="pregnant">
          <Card>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>
                Medical Info (For Pregnant Women)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>ANC visit (0/3 done)</Text>
              </View>

              <Text style={styles.subTitle}>🩹 TT injection</Text>
              <View style={styles.checkboxRow}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>TT1</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>TT2</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Booster</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={styles.flex1}>
                  <Text style={styles.inputLabel}>⚖️ Weight</Text>
                  <Input />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.inputLabel}>🩺 BP</Text>
                  <Input />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>⚠️ Danger Signs</Text>
                <Textarea placeholder="i.e. Bleeding, Swelling" />
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Info (For Newborn) */}
        <TabsContent value="newborn">
          <Card>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>
                Medical Info (For Newborn)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.subTitle}>🏠 Place of Birth</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Home</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Govt. Facility</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Private Facility</Text>
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>⚖️ Birth Weight</Text>
                <Input />
              </View>

              <Text style={styles.subTitle}>Early Care</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Breastfeeding initiated within 1 hour
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Skin-to-skin care given
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Cord Care Done</Text>
                </View>
              </View>

              <Text style={styles.subTitle}>Feeding & Nutrition</Text>
              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>
                  Exclusive Breastfeeding Start
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  🍼 Feeding Issues (if any)
                </Text>
                <Textarea />
              </View>

              <Text style={styles.subTitle}>Health Checks</Text>
              <View style={styles.checkboxRow}>
                <Checkbox />
                <Text style={styles.checkboxLabel}>🌡️ Temperature</Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>⚠️ Danger Signs</Text>
                <Textarea />
              </View>

              <Text style={styles.subTitle}>Immunization</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>BCG Given</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>OPV-0 Given</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Hepatitis B-0 Given</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Info (For Child) */}
        <TabsContent value="child">
          <Card>
            <CardHeader>
              <CardTitle style={styles.cardTitle}>
                Medical Info (For Child)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.subTitle}>Growth & Nutrition</Text>
              <View style={styles.flexRow}>
                <View style={styles.flex1}>
                  <Text style={styles.inputLabel}>⚖️ Weight (kg)</Text>
                  <Input />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.inputLabel}>📏 Height (cm)</Text>
                  <Input />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>📐 MUAC (cm)</Text>
                <Input />
              </View>

              <Text style={styles.subTitle}>Feeding Practices</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Exclusive Breastfeeding (0-6 months)
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Complimentary Feeding Started at 6 months
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Frequency of feeding appropriate
                  </Text>
                </View>
              </View>

              <Text style={styles.subTitle}>Immunization</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>BCG</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>OPV-2</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Pentavalent-1</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Pentavalent-3</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>Measles-2</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>DPT Booster</Text>
                </View>
              </View>

              <Text style={styles.subTitle}>Common Illness Management</Text>
              <View style={styles.checkboxColumn}>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Diarrhea in last 2 weeks
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox />
                  <Text style={styles.checkboxLabel}>
                    Cough/difficulty breathing in last 2 weeks
                  </Text>
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>⚠️ Danger Signs</Text>
                <Textarea />
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardTitle: {
    color: "#3b82f6",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  checkboxColumn: {
    flexDirection: "column",
    marginVertical: 4,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: "#374151",
  },
  inputWrapper: {
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#374151",
  },
  flexRow: {
    flexDirection: "row",
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
    marginVertical: 8,
  },
});