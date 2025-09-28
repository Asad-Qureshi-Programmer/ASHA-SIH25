
// // import React, { useState, useEffect } from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { View, ActivityIndicator } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // Import all screens
// // import LoginScreen from './screens/LoginScreen';
// // import SignupScreen from './screens/SignupScreen';
// // import Dashboard from './screens/Dashboard';
// // import RegisteredHouses from './screens/RegisteredHouses';
// // import HouseDetails from './screens/HouseDetails';
// // import MemberDetails from './screens/MemberDetails';
// // import ProfileScreen from './screens/ProfileScreen';
// // import NotificationScreen from './screens/NotificationScreen';

// // const Stack = createStackNavigator();
// // const Tab = createBottomTabNavigator();

// // // Custom Tab Bar Component
// // const CustomTabBar = ({ state, descriptors, navigation }) => {
// //   return (
// //     <View style={tabStyles.container}>
// //       {state.routes.map((route, index) => {
// //         const { options } = descriptors[route.key];
// //         const label = options.tabBarLabel || route.name;
// //         const isFocused = state.index === index;

// //         const onPress = () => {
// //           const event = navigation.emit({
// //             type: 'tabPress',
// //             target: route.key,
// //             canPreventDefault: true,
// //           });

// //           if (!isFocused && !event.defaultPrevented) {
// //             navigation.navigate(route.name);
// //           }
// //         };

// //         let iconName;
// //         switch (route.name) {
// //           case 'Dashboard':
// //             iconName = 'home';
// //             break;
// //           case 'Houses':
// //             iconName = 'business';
// //             break;
// //           case 'Add':
// //             iconName = 'add';
// //             break;
// //           case 'Notifications':
// //             iconName = 'notifications';
// //             break;
// //           case 'Profile':
// //             iconName = 'person';
// //             break;
// //           default:
// //             iconName = 'home';
// //         }

// //         return (
// //           <TouchableOpacity
// //             key={route.key}
// //             onPress={onPress}
// //             style={[
// //               tabStyles.tabItem,
// //               route.name === 'Add' && tabStyles.addButton,
// //               isFocused && route.name !== 'Add' && tabStyles.activeTab
// //             ]}
// //           >
// //             <Icon
// //               name={iconName}
// //               size={route.name === 'Add' ? 28 : 24}
// //               color={
// //                 route.name === 'Add'
// //                   ? '#fff'
// //                   : isFocused
// //                   ? '#007AFF'
// //                   : '#666'
// //               }
// //             />
// //           </TouchableOpacity>
// //         );
// //       })}
// //     </View>
// //   );
// // };

// // // Bottom Tab Navigator
// // const TabNavigator = () => (
// //   <Tab.Navigator
// //     tabBar={(props) => <CustomTabBar {...props} />}
// //     screenOptions={{ headerShown: false }}
// //   >
// //     <Tab.Screen name="Dashboard" component={Dashboard} />
// //     <Tab.Screen name="Houses" component={RegisteredHouses} />
// //     <Tab.Screen name="Add" component={Dashboard} />
// //     <Tab.Screen name="Notifications" component={NotificationScreen} />
// //     <Tab.Screen name="Profile" component={ProfileScreen} />
// //   </Tab.Navigator>
// // );

// // // Auth Context
// // const AuthContext = React.createContext();

// // export default function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     checkLoginStatus();
// //   }, []);

// //   const checkLoginStatus = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem('userToken');
// //       setIsLoggedIn(!!token);
// //     } catch (error) {
// //       console.log('Error checking login status:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const login = async (token) => {
// //     try {
// //       await AsyncStorage.setItem('userToken', token);
// //       setIsLoggedIn(true);
// //     } catch (error) {
// //       console.log('Error storing token:', error);
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       await AsyncStorage.removeItem('userToken');
// //       setIsLoggedIn(false);
// //     } catch (error) {
// //       console.log('Error removing token:', error);
// //     }
// //   };

// //   if (isLoading) {
// //     return (
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
// //       <NavigationContainer>
// //         <Stack.Navigator screenOptions={{ headerShown: false }}>
// //           {!isLoggedIn ? (
// //             // Auth Stack
// //             <>
// //               <Stack.Screen name="Login" component={LoginScreen} />
// //               <Stack.Screen name="Signup" component={SignupScreen} />
// //             </>
// //           ) : (
// //             // App Stack
// //             <>
// //               <Stack.Screen name="Main" component={TabNavigator} />
// //               <Stack.Screen name="HouseDetails" component={HouseDetails} />
// //               <Stack.Screen name="MemberDetails" component={MemberDetails} />
// //             </>
// //           )}
// //         </Stack.Navigator>
// //       </NavigationContainer>
// //     </AuthContext.Provider>
// //   );
// // }

// // // Tab Styles
// // const tabStyles = {
// //   container: {
// //     flexDirection: 'row',
// //     backgroundColor: '#fff',
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     borderTopWidth: 1,
// //     borderTopColor: '#e0e0e0',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: -2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 8,
// //   },
// //   tabItem: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     width: 44,
// //     height: 44,
// //     borderRadius: 22,
// //   },
// //   addButton: {
// //     backgroundColor: '#007AFF',
// //     marginBottom: 8,
// //     shadowColor: '#007AFF',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   activeTab: {
// //     backgroundColor: '#E6F3FF',
// //   },
// // };

// // // screens/LoginScreen.js
// // import React, { useState, useContext } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // const LoginScreen = ({ navigation }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const { login } = useContext(AuthContext);

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // Simulate API call
// //       setTimeout(async () => {
// //         await login('dummy-token');
// //         setLoading(false);
// //       }, 1000);
// //     } catch (error) {
// //       setLoading(false);
// //       Alert.alert('Error', 'Login failed. Please try again.');
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={styles.container}
// //       >
// //         <View style={styles.header}>
// //           <View style={styles.logoContainer}>
// //             <Icon name="medical" size={60} color="#007AFF" />
// //             <Text style={styles.logoText}>HealthCare</Text>
// //             <Text style={styles.tagline}>Community Health Management</Text>
// //           </View>
// //         </View>

// //         <View style={styles.formContainer}>
// //           <Text style={styles.title}>Welcome Back!</Text>
// //           <Text style={styles.subtitle}>Sign in to continue</Text>

// //           <View style={styles.inputContainer}>
// //             <Icon name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Email Address"
// //               value={email}
// //               onChangeText={setEmail}
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //               placeholderTextColor="#999"
// //             />
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <Icon name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Password"
// //               value={password}
// //               onChangeText={setPassword}
// //               secureTextEntry={!showPassword}
// //               placeholderTextColor="#999"
// //             />
// //             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
// //               <Icon
// //                 name={showPassword ? 'eye-outline' : 'eye-off-outline'}
// //                 size={20}
// //                 color="#666"
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           <TouchableOpacity style={styles.forgotPassword}>
// //             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[styles.loginButton, loading && styles.disabledButton]}
// //             onPress={handleLogin}
// //             disabled={loading}
// //           >
// //             <Text style={styles.loginButtonText}>
// //               {loading ? 'Signing in...' : 'Sign In'}
// //             </Text>
// //           </TouchableOpacity>

// //           <View style={styles.signupContainer}>
// //             <Text style={styles.signupText}>Don't have an account? </Text>
// //             <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
// //               <Text style={styles.signupLink}>Sign Up</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // // screens/SignupScreen.js
// // const SignupScreen = ({ navigation }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const { login } = useContext(AuthContext);

// //   const handleSignup = async () => {
// //     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     if (formData.password !== formData.confirmPassword) {
// //       Alert.alert('Error', 'Passwords do not match');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // Simulate API call
// //       setTimeout(async () => {
// //         await login('dummy-token');
// //         setLoading(false);
// //       }, 1000);
// //     } catch (error) {
// //       setLoading(false);
// //       Alert.alert('Error', 'Signup failed. Please try again.');
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={styles.container}
// //       >
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             style={styles.backButton}
// //             onPress={() => navigation.goBack()}
// //           >
// //             <Icon name="chevron-back" size={24} color="#007AFF" />
// //           </TouchableOpacity>
// //           <View style={styles.logoContainer}>
// //             <Icon name="medical" size={50} color="#007AFF" />
// //             <Text style={styles.logoText}>HealthCare</Text>
// //           </View>
// //         </View>

// //         <View style={styles.formContainer}>
// //           <Text style={styles.title}>Create Account</Text>
// //           <Text style={styles.subtitle}>Join our healthcare community</Text>

// //           <View style={styles.inputContainer}>
// //             <Icon name="person-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Full Name"
// //               value={formData.name}
// //               onChangeText={(text) => setFormData({ ...formData, name: text })}
// //               placeholderTextColor="#999"
// //             />
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <Icon name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Email Address"
// //               value={formData.email}
// //               onChangeText={(text) => setFormData({ ...formData, email: text })}
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //               placeholderTextColor="#999"
// //             />
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <Icon name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Password"
// //               value={formData.password}
// //               onChangeText={(text) => setFormData({ ...formData, password: text })}
// //               secureTextEntry={!showPassword}
// //               placeholderTextColor="#999"
// //             />
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <Icon name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Confirm Password"
// //               value={formData.confirmPassword}
// //               onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
// //               secureTextEntry={!showPassword}
// //               placeholderTextColor="#999"
// //             />
// //             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
// //               <Icon
// //                 name={showPassword ? 'eye-outline' : 'eye-off-outline'}
// //                 size={20}
// //                 color="#666"
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           <TouchableOpacity
// //             style={[styles.loginButton, loading && styles.disabledButton]}
// //             onPress={handleSignup}
// //             disabled={loading}
// //           >
// //             <Text style={styles.loginButtonText}>
// //               {loading ? 'Creating Account...' : 'Create Account'}
// //             </Text>
// //           </TouchableOpacity>

// //           <View style={styles.signupContainer}>
// //             <Text style={styles.signupText}>Already have an account? </Text>
// //             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
// //               <Text style={styles.signupLink}>Sign In</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // // screens/ProfileScreen.js
// // const ProfileScreen = () => {
// //   const { logout } = useContext(AuthContext);

// //   const handleLogout = () => {
// //     Alert.alert(
// //       'Logout',
// //       'Are you sure you want to logout?',
// //       [
// //         { text: 'Cancel', style: 'cancel' },
// //         { text: 'Logout', onPress: logout, style: 'destructive' },
// //       ]
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.profileHeader}>
// //         <View style={styles.avatarContainer}>
// //           <Icon name="person" size={60} color="#007AFF" />
// //         </View>
// //         <Text style={styles.profileName}>Dr. Sarah Johnson</Text>
// //         <Text style={styles.profileRole}>Community Health Worker</Text>
// //       </View>

// //       <View style={styles.profileMenu}>
// //         <TouchableOpacity style={styles.menuItem}>
// //           <Icon name="person-outline" size={24} color="#333" />
// //           <Text style={styles.menuText}>Edit Profile</Text>
// //           <Icon name="chevron-forward" size={20} color="#999" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.menuItem}>
// //           <Icon name="settings-outline" size={24} color="#333" />
// //           <Text style={styles.menuText}>Settings</Text>
// //           <Icon name="chevron-forward" size={20} color="#999" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.menuItem}>
// //           <Icon name="help-circle-outline" size={24} color="#333" />
// //           <Text style={styles.menuText}>Help & Support</Text>
// //           <Icon name="chevron-forward" size={20} color="#999" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.menuItem}>
// //           <Icon name="document-text-outline" size={24} color="#333" />
// //           <Text style={styles.menuText}>Terms & Privacy</Text>
// //           <Icon name="chevron-forward" size={20} color="#999" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
// //           <Icon name="log-out-outline" size={24} color="#FF3B30" />
// //           <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // // screens/NotificationScreen.js
// // const NotificationScreen = () => {
// //   const notifications = [
// //     {
// //       id: 1,
// //       title: 'Vaccination Reminder',
// //       message: 'Shivam Kumar needs measles vaccination',
// //       time: '2 hours ago',
// //       type: 'reminder',
// //       read: false,
// //     },
// //     {
// //       id: 2,
// //       title: 'ANC Visit Due',
// //       message: 'Sunita Kumar has ANC visit scheduled',
// //       time: '4 hours ago',
// //       type: 'appointment',
// //       read: false,
// //     },
// //     {
// //       id: 3,
// //       title: 'Report Submitted',
// //       message: 'Weekly health report has been submitted successfully',
// //       time: '1 day ago',
// //       type: 'success',
// //       read: true,
// //     },
// //   ];

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.headerTitle}>Notifications</Text>
// //       </View>

// //       <FlatList
// //         data={notifications}
// //         keyExtractor={(item) => item.id.toString()}
// //         renderItem={({ item }) => (
// //           <View style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
// //             <View style={styles.notificationIcon}>
// //               <Icon
// //                 name={
// //                   item.type === 'reminder'
// //                     ? 'alarm-outline'
// //                     : item.type === 'appointment'
// //                     ? 'calendar-outline'
// //                     : 'checkmark-circle-outline'
// //                 }
// //                 size={24}
// //                 color={
// //                   item.type === 'reminder'
// //                     ? '#FF9500'
// //                     : item.type === 'appointment'
// //                     ? '#007AFF'
// //                     : '#34C759'
// //                 }
// //               />
// //             </View>
// //             <View style={styles.notificationContent}>
// //               <Text style={styles.notificationTitle}>{item.title}</Text>
// //               <Text style={styles.notificationMessage}>{item.message}</Text>
// //               <Text style={styles.notificationTime}>{item.time}</Text>
// //             </View>
// //             {!item.read && <View style={styles.unreadDot} />}
// //           </View>
// //         )}
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //   },
// //   header: {
// //     backgroundColor: '#fff',
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#e0e0e0',
// //   },
// //   headerTitle: {
// //     fontSize: 24,
// //     fontWeight: '700',
// //     color: '#1a1a1a',
// //   },
// //   backButton: {
// //     position: 'absolute',
// //     top: 20,
// //     left: 20,
// //     zIndex: 1,
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     padding: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   logoContainer: {
// //     alignItems: 'center',
// //     marginTop: 60,
// //     marginBottom: 40,
// //   },
// //   logoText: {
// //     fontSize: 32,
// //     fontWeight: '700',
// //     color: '#1a1a1a',
// //     marginTop: 12,
// //   },
// //   tagline: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginTop: 4,
// //   },
// //   formContainer: {
// //     flex: 1,
// //     paddingHorizontal: 24,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     color: '#1a1a1a',
// //     marginBottom: 8,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginBottom: 32,
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 12,
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     marginBottom: 16,
// //     borderWidth: 1,
// //     borderColor: '#e0e0e0',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.05,
// //     shadowRadius: 2,
// //     elevation: 1,
// //   },
// //   inputIcon: {
// //     marginRight: 12,
// //   },
// //   input: {
// //     flex: 1,
// //     fontSize: 16,
// //     color: '#1a1a1a',
// //   },
// //   forgotPassword: {
// //     alignSelf: 'flex-end',
// //     marginBottom: 24,
// //   },
// //   forgotPasswordText: {
// //     color: '#007AFF',
// //     fontSize: 14,
// //     fontWeight: '500',
// //   },
// //   loginButton: {
// //     backgroundColor: '#007AFF',
// //     borderRadius: 12,
// //     paddingVertical: 16,
// //     alignItems: 'center',
// //     shadowColor: '#007AFF',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 6,
// //     marginBottom: 24,
// //   },
// //   disabledButton: {
// //     opacity: 0.6,
// //   },
// //   loginButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   signupContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   signupText: {
// //     color: '#666',
// //     fontSize: 14,
// //   },
// //   signupLink: {
// //     color: '#007AFF',
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// //   // Profile Styles
// //   profileHeader: {
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     paddingVertical: 32,
// //     marginBottom: 20,
// //   },
// //   avatarContainer: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     backgroundColor: '#E6F3FF',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 16,
// //   },
// //   profileName: {
// //     fontSize: 24,
// //     fontWeight: '700',
// //     color: '#1a1a1a',
// //     marginBottom: 4,
// //   },
// //   profileRole: {
// //     fontSize: 16,
// //     color: '#666',
// //   },
// //   profileMenu: {
// //     backgroundColor: '#fff',
// //     marginHorizontal: 16,
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //   },
// //   menuItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#f0f0f0',
// //   },
// //   menuText: {
// //     flex: 1,
// //     fontSize: 16,
// //     color: '#1a1a1a',
// //     marginLeft: 16,
// //   },
// //   logoutItem: {
// //     borderBottomWidth: 0,
// //   },
// //   logoutText: {
// //     color: '#FF3B30',
// //   },
// //   // Notification Styles
// //   notificationItem: {
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     backgroundColor: '#fff',
// //     marginHorizontal: 16,
// //     marginVertical: 4,
// //     padding: 16,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.05,
// //     shadowRadius: 2,
// //     elevation: 1,
// //   },
// //   unreadNotification: {
// //     backgroundColor: '#f8f9ff',
// //     borderLeftWidth: 3,
// //     borderLeftColor: '#007AFF',
// //   },
// //   notificationIcon: {
// //     marginRight: 12,
// //     marginTop: 2,
// //   },
// //   notificationContent: {
// //     flex: 1,
// //   },
// //   notificationTitle: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#1a1a1a',
// //     marginBottom: 4,
// //   },
// //   notificationMessage: {
// //     fontSize: 14,
// //     color: '#666',
// //     lineHeight: 20,
// //     marginBottom: 8,
// //   },
// //   notificationTime: {
// //     fontSize: 12,
// //     color: '#999',
// //   },
// //   unreadDot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: 4,
// //     backgroundColor: '#007AFF',
// //     marginTop: 6,
// //   },
// // });

// // export { AuthContext };


// // App.js - Main App Component
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Import Context
// import { AuthContext } from './src/context/AuthContext';

// // Import Components
// import CustomTabBar from './src/components/CustomTabBar';

// // Import Screens
// import LoginScreen from './src/screens/auth/LoginScreen';
// import SignupScreen from './src/screens/auth/SignupScreen';
// import Dashboard from './src/screens/main/Dashboard';
// import RegisteredHouses from './src/screens/main/RegisteredHouses';
// import HouseDetails from './src/screens/main/HouseDetails';
// import MemberDetails from './src/screens/main/MemberDetails';
// import ProfileScreen from './src/screens/main/ProfileScreen';
// import NotificationScreen from './src/screens/main/NotificationScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigator
// const TabNavigator = () => (
//   <Tab.Navigator
//     tabBar={(props) => <CustomTabBar {...props} />}
//     screenOptions={{ headerShown: false }}
//   >
//     <Tab.Screen name="Dashboard" component={Dashboard} />
//     <Tab.Screen name="Houses" component={RegisteredHouses} />
//     <Tab.Screen name="Add" component={Dashboard} />
//     <Tab.Screen name="Notifications" component={NotificationScreen} />
//     <Tab.Screen name="Profile" component={ProfileScreen} />
//   </Tab.Navigator>
// );

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   const checkLoginStatus = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       setIsLoggedIn(!!token);
//     } catch (error) {
//       console.log('Error checking login status:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (token) => {
//     try {
//       await AsyncStorage.setItem('userToken', token);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log('Error storing token:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.log('Error removing token:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{ 
//         flex: 1, 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         backgroundColor: '#f8f9fa'
//       }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {!isLoggedIn ? (
//             // Auth Stack
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Signup" component={SignupScreen} />
//             </>
//           ) : (
//             // App Stack
//             <>
//               <Stack.Screen name="Main" component={TabNavigator} />
//               <Stack.Screen 
//                 name="HouseDetails" 
//                 component={HouseDetails}
//                 options={{
//                   headerShown: true,
//                   title: 'House Details',
//                   headerStyle: { backgroundColor: '#fff' },
//                   headerTintColor: '#007AFF',
//                 }}
//               />
//               <Stack.Screen 
//                 name="MemberDetails" 
//                 component={MemberDetails}
//                 options={{
//                   headerShown: true,
//                   title: 'Member Details',
//                   headerStyle: { backgroundColor: '#fff' },
//                   headerTintColor: '#007AFF',
//                 }}
//               />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// --- Mock Data Structure ---
const MOCK_DATA = {
  tasks: [
    { id: 1, text: "3 children due for immunization.", done: false },
    { id: 2, text: "2 ANC visits due", done: false },
  ],
  houses: [
    {
      id: 121002,
      head: "Ravi Kumar",
      address: "Basant Vihar Colony, Dhar MP",
      risk: "High Risk",
      membersCount: 8,
      highCareCount: 2,
      lastVisit: "25/09/2025",
      pregnantWomen: 1,
      eligibleCouples: 2,
      newbornChildren: 1,
      childrenUnder5: 2,
      members: [
        { id: 1, name: "Ravi Kumar", age: 40, gender: "Male", role: "Head", note: "High BP", status: "Head", medicalInfo: "Prescription updated and medicine delivered." },
        {
          id: 2,
          name: "Sunita Kumar",
          age: 30,
          gender: "Female",
          role: "Wife",
          status: "Pregnant",
          note: "Pregnant",
          medicalInfo: "2/5 ANC Visits done. 1/2 TT Vaccine Done. 50/100 IFA Tablets delivered.",
        },
        { id: 3, name: "Shivam Kumar", age: 1, gender: "Male", role: "Son", status: "Child", note: "Measles Vaccination due", medicalInfo: "Next checkup in 3 months." },
        { id: 4, name: "Priya Kumar", age: 7, gender: "Female", role: "Daughter", status: "Normal", note: "Normal health status", medicalInfo: "Last checked on 20/09/2025" },
      ],
      history: [
        { date: "25/09/2025", text: "Vaccination of Shivam Kumar Done" },
        { date: "25/09/2025", text: "ANC Visit for Sunita Kumar" },
        { date: "05/09/2025", text: "Drop given to Shivam" },
      ],
    },
    { id: 121003, head: "Mukesh", address: "Kailash Nagar, Dhar MP", risk: "Antenatal", membersCount: 4, lastVisit: "25/09/2025" },
    { id: 121004, head: "Girish", address: "Basant Vihar Colony, Dhar MP", risk: "Vaccination", membersCount: 4, lastVisit: "24/09/2025" },
  ],
};

// --- Sub-Components ---

const AppHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.logo}>LOGO</Text>
    <View style={styles.headerIcons}>
      <Text style={styles.iconText}>अ</Text>
      <View style={styles.userIconWrapper}>
        <Text style={styles.iconText}>👤</Text>
      </View>
    </View>
  </View>
);

const TaskGridButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.gridButton} onPress={onPress}>
    <View style={styles.gridButtonIconContainer}>
      <Text style={styles.gridButtonIcon}>{icon}</Text>
    </View>
    <Text style={styles.gridButtonText}>{text}</Text>
  </TouchableOpacity>
);

const RiskTag = ({ status }) => {
  let color = '#2563EB'; // Default/Vaccination
  if (status === 'High Risk') color = '#DC2626';
  if (status === 'Antenatal') color = '#10B981';
  if (status === 'Pregnant') color = '#22C55E';
  if (status === 'Head') color = '#2563EB';
  if (status === 'Child') color = '#3B82F6';

  return (
    <View style={[styles.riskTag, { backgroundColor: color }]}>
      <Text style={styles.riskTagText}>{status}</Text>
    </View>
  );
};

const HouseSummaryCard = ({ house }) => {
  const data = [
    { icon: '👤', label: 'Members', value: house.membersCount },
    { icon: '⚠️', label: 'High Care', value: house.highCareCount },
    { icon: '🤰', label: 'Pregnant Women', value: house.pregnantWomen },
    { icon: '👨‍👩‍👧', label: 'Eligible Couples', value: house.eligibleCouples },
    { icon: '👶', label: 'Newborn Children', value: house.newbornChildren },
    { icon: '👧', label: 'Children (under 5)', value: house.childrenUnder5 },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.summaryAddressContainer}>
        <Text style={styles.iconTextSmall}>📍</Text>
        <Text style={styles.summaryAddressText}>{house.address}</Text>
      </View>
      <View style={styles.summaryGrid}>
        {data.map((item, index) => (
          <View key={index} style={styles.summaryGridItem}>
            <View style={styles.summaryIconValue}>
              <Text style={styles.iconTextSmall}>{item.icon}</Text>
              <Text style={styles.summaryValueText}>{item.value}</Text>
            </View>
            <Text style={styles.summaryLabelText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.summaryFooter}>
        <Text style={styles.summaryFooterText}>
          <Text style={styles.iconTextSmall}>🕒</Text> Last Update: {house.lastVisit}
        </Text>
        <Text style={styles.summaryFooterId}>#{house.id}</Text>
      </View>
    </View>
  );
};

const MemberCard = ({ member }) => {
  const [showMedical, setShowMedical] = useState(false);

  return (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <Text style={styles.iconTextSmall}>👤</Text>
        <Text style={styles.memberName}>{member.name}</Text>
        <RiskTag status={member.status} />
      </View>

      <View style={styles.memberDetails}>
        <Text style={styles.detailText}>
          <Text style={styles.iconTextSmall}>🎂</Text> Age: {member.age}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.iconTextSmall}>✍️</Text> Gender: {member.gender}
        </Text>
      </View>

      <Text style={styles.noteText}>
        <Text style={styles.iconTextSmall}>📝</Text> Note: {member.note}
      </Text>

      <TouchableOpacity onPress={() => setShowMedical(!showMedical)} style={styles.medicalInfoToggle}>
        <Text style={styles.medicalInfoText}>
          Medical Info {showMedical ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showMedical && (
        <View style={styles.medicalInfoContent}>
          <Text style={styles.medicalInfoDetail}>{member.medicalInfo}</Text>
        </View>
      )}
    </View>
  );
};

const FamilyHistoryCard = ({ history }) => (
  <View style={styles.historyCard}>
    <View style={styles.historyHeader}>
      <Text style={styles.iconTextLarge}>⏱️</Text>
      <Text style={styles.historyTitle}>Family History</Text>
    </View>
    {history.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <Text style={styles.historyText}>{item.text}</Text>
      </View>
    ))}
  </View>
);

const BottomTabs = ({ activeTab, setTab }) => {
  const tabs = [
    { name: 'Home', icon: '🏠', screen: 'Tasks' },
    { name: 'List', icon: '📝', screen: 'Houses' },
    { name: 'Add', icon: '➕', screen: 'Add', large: true },
    { name: 'Alerts', icon: '🔔', screen: 'Alerts' },
    { name: 'Settings', icon: '⚙️', screen: 'Settings' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={tab.large ? styles.largeTabButton : styles.tabButton}
          onPress={() => setTab(tab.screen)}
        >
          <Text style={[styles.tabIcon, tab.large && styles.largeTabIcon, activeTab === tab.screen && styles.activeTabIcon]}>
            {tab.icon}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


// --- Screen Components ---

const TodayTasksScreen = ({ navigate }) => (
  <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
    <View style={styles.screenHeader}>
      <Text style={styles.screenTitle}>Today's Tasks</Text>
      <Text style={styles.dateText}>26/09/2025</Text>
    </View>

    <View style={styles.tasksCard}>
      {MOCK_DATA.tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          {/* Checkbox implementation for interactive task completion */}
          <TouchableOpacity style={styles.checkbox}>
            <Text style={styles.checkboxText}></Text>
          </TouchableOpacity>
          <Text style={styles.taskText}>{task.text}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>✔️ Done</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.gridContainer}>
      <TaskGridButton icon="🏠" text="Start Home Visit" onPress={() => navigate('HouseDetails', { houseId: MOCK_DATA.houses[0].id })} />
      <TaskGridButton icon="✏️" text="Add/Update House Details" onPress={() => navigate('Houses')} />
      <TaskGridButton icon="👨‍👩‍👧‍👦" text="VHSND" onPress={() => {}} />
      <TaskGridButton icon="💉" text="Medicine" onPress={() => {}} />
      <TaskGridButton icon="📘" text="ASHA Diary" onPress={() => {}} />
      <TaskGridButton icon="📈" text="Reports" onPress={() => {}} />
    </View>

  </ScrollView>
);

const RegisteredHousesScreen = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHouses = MOCK_DATA.houses.filter(h =>
    h.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Registered Houses</Text>
      </View>

      <TouchableOpacity style={styles.addHouseButton}>
        <Text style={styles.addHouseButtonText}>➕ Add New House</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Text style={styles.iconTextSmall}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search House"
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text style={styles.iconTextSmall}>☰</Text>
      </View>

      {filteredHouses.map((house) => (
        <TouchableOpacity key={house.id} style={styles.houseListItem} onPress={() => navigate('HouseDetails', { houseId: house.id })}>
          <View style={styles.houseListHeader}>
            <Text style={styles.iconTextSmall}>👤</Text>
            <Text style={styles.houseHeadName}>{house.head}</Text>
            <RiskTag status={house.risk} />
          </View>
          <Text style={styles.houseDetailText}>
            <Text style={styles.iconTextSmall}>📍</Text> {house.address}
          </Text>
          <View style={styles.houseDetailRow}>
            <Text style={styles.houseDetailText}>
              <Text style={styles.iconTextSmall}>👥</Text> Members: {house.membersCount}
            </Text>
            <Text style={styles.houseDetailText}>
              <Text style={styles.iconTextSmall}>🕒</Text> Last Visit: {house.lastVisit}
            </Text>
            <Text style={styles.houseDetailId}>#{house.id}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const HouseDetailsScreen = ({ houseId, navigate }) => {
  const house = MOCK_DATA.houses.find(h => h.id === houseId);

  if (!house) {
    return <View style={styles.screenContainer}><Text style={styles.errorText}>House not found.</Text></View>;
  }

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>House Details</Text>
        <View style={styles.detailHeaderRight}>
          <RiskTag status={house.risk} />
          <Text style={styles.iconTextSmall}>⋮</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addMemberButton}>
        <Text style={styles.addMemberButtonText}>➕ Add New Member</Text>
      </TouchableOpacity>

      <HouseSummaryCard house={house} />

      {house.members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}

      <FamilyHistoryCard history={house.history} />
    </ScrollView>
  );
};


// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [houseId, setHouseId] = useState(MOCK_DATA.houses[0].id);
  const [currentScreen, setCurrentScreen] = useState('Tasks'); // 'Tasks', 'Houses', 'HouseDetails'

  const navigate = (screenName, params = {}) => {
    setCurrentScreen(screenName);
    if (params.houseId) {
      setHouseId(params.houseId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Tasks':
        return <TodayTasksScreen navigate={navigate} />;
      case 'Houses':
        return <RegisteredHousesScreen navigate={navigate} />;
      case 'HouseDetails':
        return <HouseDetailsScreen houseId={houseId} navigate={navigate} />;
      default:
        return <TodayTasksScreen navigate={navigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <AppHeader title="App Title" />
      {renderScreen()}
      <BottomTabs activeTab={activeTab} setTab={(tab) => { setActiveTab(tab); navigate(tab === 'List' ? 'Houses' : 'Tasks'); }} />
      {/* <View style={{width:"100%", height:"50px", backgroundColor:"#fff"}}></View> */}
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    // marginBottom: 50,
  },
  screenContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 22,
    color: '#4B5563',
    marginHorizontal: 10,
  },
  iconTextSmall: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 4,
  },
  userIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  // Screen Title/Header
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Tasks Screen
  tasksCard: {
    backgroundColor: '#EBF8FF', // Light blue background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginRight: 10,
    // Add text alignment to handle potential checkmark if state were implemented
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 12,
    color: '#3B82F6',
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
  },
  doneButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridButton: {
    width: (width - 45) / 2, // 15*3 padding, divided by 2
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  gridButtonIconContainer: {
    backgroundColor: '#DBEAFE', // Lighter blue
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  gridButtonIcon: {
    fontSize: 28,
    color: '#1D4ED8', // Darker blue
  },
  gridButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  // Registered Houses Screen
  addHouseButton: {
    backgroundColor: '#1D4ED8',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addHouseButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  houseListItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  houseListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  houseHeadName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 10,
  },
  houseDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  houseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  houseDetailId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  // Risk Tag
  riskTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  riskTagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // House Details Screen
  addMemberButton: {
    backgroundColor: '#10B981', // Green for Add Member
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addMemberButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  summaryAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  summaryAddressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryGridItem: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  summaryIconValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryValueText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 5,
  },
  summaryLabelText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryFooterText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryFooterId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  // Member Card
  memberCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 10,
  },
  memberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
  },
  noteText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },
  medicalInfoToggle: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  medicalInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  medicalInfoContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  medicalInfoDetail: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  // Family History
  historyCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 5,
  },
  historyItem: {
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
  },
  historyText: {
    fontSize: 15,
    color: '#1F2937',
  },
  iconTextLarge: {
    fontSize: 20,
    color: '#4B5563',
  },
  // Bottom Tabs
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  largeTabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -10, // Lift the button up
    borderWidth: 5,
    borderColor: '#F7F8FC', // Match background for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  largeTabIcon: {
    fontSize: 30,
    color: '#FFF',
  },
  activeTabIcon: {
    color: '#1D4ED8', // Highlight active tab
  },
});

export default App;
