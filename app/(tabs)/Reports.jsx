import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

// --- DEMO REPORTING DATA ---
const demoReportData = {
  // Monthly Performance
  visitsCompleted: 85,
  visitsTarget: 100,
  reportsFiled: 5,
  
  // Health Metrics (Annual/Cumulative)
  immunizationRate: 0.92, // 92%
  ancCompletion: 0.85,    // 85%
  institutionalDelivery: 0.98, // 98%
  highRiskCases: 3,
};

// --- REUSABLE COMPONENTS ---

// Card component
const InfoCard = ({ title, children, style }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>{children}</View>
  </View>
);

// Component for displaying a single Metric Box
const MetricBox = ({ icon, label, value, unit, color }) => (
    <View style={styles.metricBox}>
        <MaterialCommunityIcons name={icon} size={30} color={color} style={styles.metricIcon} />
        <Text style={styles.metricValue}>{value}{unit}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
    </View>
);

// Component for Progress Bars
const ProgressBar = ({ label, percentage, color }) => {
    const widthStyle = { width: `${percentage * 100}%` };
    const displayValue = `${(percentage * 100).toFixed(0)}%`;

    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{label}</Text>
                <Text style={[styles.progressText, { color }]}>{displayValue}</Text>
            </View>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, widthStyle, { backgroundColor: color }]} />
            </View>
        </View>
    );
};


// --- MAIN COMPONENT ---

const ReportsScreen = ({ navigate }) => {
    const data = demoReportData;

    const monthlyCompletion = data.visitsCompleted / data.visitsTarget;
    const progressColor = monthlyCompletion >= 1 ? '#28A745' : (monthlyCompletion >= 0.7 ? '#FFC107' : '#E74C3C');


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate('Tasks')} style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Performance & Health Reports</Text>
                <TouchableOpacity onPress={() => console.log('Generate PDF')} style={styles.exportButton}>
                    <Feather name="download" size={16} color="#fff" />
                    <Text style={styles.exportText}>Export</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- 1. Monthly Performance Card --- */}
                <InfoCard title="Monthly Work Performance (Sep 2025)">
                    <MetricBox
                        icon="calendar-check-outline"
                        label="Home Visits Completed"
                        value={data.visitsCompleted}
                        unit={`/${data.visitsTarget}`}
                        color="#1E90FF"
                    />
                    <View style={styles.separator} />
                    <ProgressBar
                        label="Target Completion"
                        percentage={monthlyCompletion}
                        color={progressColor}
                    />
                    <View style={styles.reportDetail}>
                        <Text style={styles.detailText}>Reports Filed:</Text>
                        <Text style={styles.detailValue}>{data.reportsFiled}</Text>
                    </View>
                </InfoCard>

                {/* --- 2. Key Health Indicators (KPIs) --- */}
                <InfoCard title="Community Health Indicators (KPIs)">
                    <ProgressBar
                        label="Immunization Coverage Rate"
                        percentage={data.immunizationRate}
                        color="#28A745"
                    />
                    <ProgressBar
                        label="ANC Visits (Minimum 4 visits)"
                        percentage={data.ancCompletion}
                        color="#0056b3"
                    />
                    <ProgressBar
                        label="Institutional Delivery Rate"
                        percentage={data.institutionalDelivery}
                        color="#8E44AD"
                    />
                    <View style={[styles.reportDetail, styles.riskDetail]}>
                        <MaterialCommunityIcons name="alert-outline" size={20} color="#E74C3C" />
                        <Text style={[styles.detailText, styles.riskLabel]}>High-Risk Cases Currently Under Monitoring:</Text>
                        <Text style={[styles.detailValue, { fontWeight: 'bold', color: '#E74C3C' }]}>
                            {data.highRiskCases}
                        </Text>
                    </View>
                </InfoCard>

                {/* --- 3. Incentive Summary (Mock) --- */}
                <InfoCard title="Incentive Eligibility Summary" style={{ marginBottom: 30 }}>
                    <View style={styles.incentiveRow}>
                        <MaterialCommunityIcons name="currency-inr" size={24} color="#28A745" />
                        <Text style={styles.incentiveText}>Estimated Total Earnings</Text>
                        <Text style={styles.incentiveAmount}>₹ 9,500</Text>
                    </View>
                    <View style={styles.incentiveRow}>
                        <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#FFC107" />
                        <Text style={styles.incentiveText}>Pending Claims for Immunization</Text>
                        <Text style={styles.incentiveAmount}>₹ 1,200</Text>
                    </View>
                </InfoCard>
                
            </ScrollView>
        </SafeAreaView>
    );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  exportText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  
  // --- Card Styles ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0056b3',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 10,
  },
  cardContent: {
    paddingTop: 5,
  },

  // --- Metric Box Styles ---
  metricBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  metricIcon: {
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },

  // --- Progress Bar Styles ---
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },

  // --- General Report Details ---
  reportDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0056b3',
  },
  riskDetail: {
      backgroundColor: 'rgba(231, 76, 60, 0.05)',
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 10,
      borderTopWidth: 0,
      marginBottom: 5,
  },
  riskLabel: {
      marginLeft: 5,
      flex: 1,
      color: '#E74C3C',
      fontWeight: '600',
  },
  
  // --- Incentive Summary Styles ---
  incentiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  incentiveText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    color: '#333',
  },
  incentiveAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default ReportsScreen;