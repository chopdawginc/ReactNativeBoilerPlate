# Investment Dashboard Implementation Steps

## Step 1: Define Types and Interfaces
- Create file `src/types/investment.ts`
- Define the following interfaces:
 - `InvestmentSummary` - Contains investment progress metrics
 - `Transaction` - Defines structure of transaction data
 - `InvestmentDashboardProps` - Props for the dashboard component
- Ensure all properties have proper TypeScript types
- Use strict typing with string literals for status and transaction types

## Step 2: Create Circular Progress Component
- Create file `src/components/CircularProgress.tsx`
- Implement a reusable SVG-based circular progress indicator
- Parameters should include:
 - Percentage (0-100)
 - Size (in pixels)
 - Stroke width
 - Text size
 - Colors for progress and background
- Use SVG Circle elements with stroke-dasharray for animation
- Calculate radius, circumference, and stroke-dashoffset properly
- Center percentage text inside the circle
- Add "Completed" label underneath percentage

## Step 3: Create Transaction Item Component
- Create file `src/components/TransactionItem.tsx`
- Build component to display a single transaction line item
- Shows transaction description, date, and amount
- Accept transaction data and currency as props
- Implement proper styling for list items
- Use formatters for currency and date display

## Step 4: Create Main Dashboard Screen
- Create file `src/features/investment/screens/DashboardScreen.tsx`
- Implement main screen with following sections:
 - Header with title and back button
 - Circular progress indicator showing completion percentage
 - Current/target investment amount display
 - Monthly payment section with styled card
 - Action buttons (add payment, change method)
 - Recent transactions list with "View All" option
- Add proper loading and error states
- Implement navigation functions to other screens
- Use proper styling with responsive design

## Step 5: Create Investment Service
- Create file `src/services/investmentService.ts`
- Implement API service with the following methods:
 - `getInvestmentSummary()` - Fetches user's investment data
 - `getRecentTransactions(limit)` - Fetches recent transactions
 - `getAllTransactions(page, pageSize)` - Fetches paginated transactions
- Use API endpoints from constants
- Implement proper error handling
- Format returned data according to defined types

## Step 6: Create Custom Hooks
- Create file `src/services/hooks/useInvestmentService.ts`
- Implement custom hook to abstract API interaction
- Track loading and error states
- Wrap service methods with proper state management
- Handle errors with consistent pattern
- Provide type-safe return values

## Step 7: Add to Navigation
- Create file `src/navigation/InvestmentStack.tsx`
- Define stack navigator for investment features
- Include the following screens:
 - Dashboard (main investment screen)
 - Transactions (full transaction history)
 - AddPayment (payment addition form)
 - PaymentMethods (payment method management)
- Define type-safe route parameters
- Set default screen options


```// Step 1: Define Types and Interfaces
// src/types/investment.ts
export interface InvestmentSummary {
 totalInvested: number;
 targetAmount: number;
 completionPercentage: number;
 monthlyPayment: number;
 currency: string;
}

export interface Transaction {
 id: string;
 date: string;
 amount: number;
 type: 'payment' | 'deposit' | 'withdrawal';
 description: string;
 status: 'completed' | 'pending' | 'failed';
}

export interface InvestmentDashboardProps {
 investmentSummary: InvestmentSummary;
 recentTransactions: Transaction[];
 isLoading: boolean;
 onAddPayment: () => void;
 onChangePaymentMethod: () => void;
 onViewAllTransactions: () => void;
}

// Step 2: Create Circular Progress Component
// src/components/CircularProgress.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../styles/colors';

interface CircularProgressProps {
 percentage: number;
 size: number;
 strokeWidth: number;
 textSize: number;
 progressColor: string;
 backgroundColor: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
 percentage,
 size,
 strokeWidth,
 textSize,
 progressColor,
 backgroundColor,
}) => {
 const radius = (size - strokeWidth) / 2;
 const circumference = radius * 2 * Math.PI;
 const progressValue = Math.min(Math.max(percentage, 0), 100);
 const strokeDashoffset = circumference - (progressValue / 100) * circumference;

 return (
   <View style={styles.container}>
     <Svg width={size} height={size}>
       <Circle
         cx={size / 2}
         cy={size / 2}
         r={radius}
         stroke={backgroundColor}
         strokeWidth={strokeWidth}
         fill="transparent"
       />
       <Circle
         cx={size / 2}
         cy={size / 2}
         r={radius}
         stroke={progressColor}
         strokeWidth={strokeWidth}
         strokeDasharray={circumference}
         strokeDashoffset={strokeDashoffset}
         strokeLinecap="round"
         fill="transparent"
       />
     </Svg>
     <View style={styles.textContainer}>
       <Text style={[styles.percentageText, { fontSize: textSize }]}>
         {`${progressValue}%`}
       </Text>
       <Text style={styles.completedText}>Completed</Text>
     </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   justifyContent: 'center',
   alignItems: 'center',
 },
 textContainer: {
   position: 'absolute',
   justifyContent: 'center',
   alignItems: 'center',
 },
 percentageText: {
   fontWeight: 'bold',
   color: colors.text.primary,
 },
 completedText: {
   fontSize: 12,
   color: colors.text.secondary,
 },
});

// Step 3: Create Transaction Item Component
// src/components/TransactionItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types/investment';
import { colors } from '../styles/colors';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionItemProps {
 transaction: Transaction;
 currency: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
 transaction,
 currency,
}) => {
 return (
   <View style={styles.container}>
     <View style={styles.leftContent}>
       <Text style={styles.description}>{transaction.description}</Text>
       <Text style={styles.date}>{formatDate(transaction.date)}</Text>
     </View>
     <Text style={styles.amount}>
       {formatCurrency(transaction.amount, currency)}
     </Text>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingVertical: 12,
   borderBottomWidth: 1,
   borderBottomColor: colors.border.light,
 },
 leftContent: {
   flex: 1,
 },
 description: {
   fontSize: 16,
   fontWeight: '500',
   color: colors.text.primary,
   marginBottom: 4,
 },
 date: {
   fontSize: 14,
   color: colors.text.secondary,
 },
 amount: {
   fontSize: 16,
   fontWeight: '600',
   color: colors.text.primary,
 },
});

// Step 4: Create Main Dashboard Screen
// src/features/investment/screens/DashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircularProgress } from '../../../components/CircularProgress';
import { TransactionItem } from '../../../components/TransactionItem';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { InvestmentSummary, Transaction } from '../../../types/investment';
import { formatCurrency } from '../../../utils/formatters';
import { useInvestmentService } from '../../../services/hooks/useInvestmentService';
import { IconButton } from '../../../components/IconButton';

export const DashboardScreen: React.FC = () => {
 const navigation = useNavigation();
 const { getInvestmentSummary, getRecentTransactions } = useInvestmentService();
 const [isLoading, setIsLoading] = useState(true);
 const [investmentSummary, setInvestmentSummary] = useState<InvestmentSummary | null>(null);
 const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

 useEffect(() => {
   const loadData = async () => {
     try {
       setIsLoading(true);
       const summary = await getInvestmentSummary();
       const transactions = await getRecentTransactions(5); // Get top 5 recent transactions
       setInvestmentSummary(summary);
       setRecentTransactions(transactions);
     } catch (error) {
       console.error('Failed to load dashboard data:', error);
       // Handle error - show toast or error state
     } finally {
       setIsLoading(false);
     }
   };

   loadData();
 }, []);

 const handleAddPayment = () => {
   navigation.navigate('AddPayment');
 };

 const handleChangePaymentMethod = () => {
   navigation.navigate('PaymentMethods');
 };

 const handleViewAllTransactions = () => {
   navigation.navigate('Transactions');
 };

 if (isLoading) {
   return (
     <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color={colors.primary} />
     </View>
   );
 }

 if (!investmentSummary) {
   return (
     <View style={styles.errorContainer}>
       <Text style={styles.errorText}>Failed to load investment data</Text>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <Text style={styles.linkText}>Go Back</Text>
       </TouchableOpacity>
     </View>
   );
 }

 return (
   <SafeAreaView style={styles.safeArea}>
     <ScrollView style={styles.container}>
       <View style={styles.header}>
         <IconButton
           iconName="arrow-left"
           onPress={() => navigation.goBack()}
           size={24}
           color={colors.text.primary}
         />
         <Text style={styles.title}>YOUR INVESTMENT</Text>
       </View>

       <View style={styles.progressSection}>
         <CircularProgress
           percentage={investmentSummary.completionPercentage}
           size={180}
           strokeWidth={15}
           textSize={28}
           progressColor={colors.primary}
           backgroundColor={colors.background.light}
         />
         <Text style={styles.investmentAmount}>
           {formatCurrency(investmentSummary.totalInvested, investmentSummary.currency)} / {formatCurrency(investmentSummary.targetAmount, investmentSummary.currency)}
         </Text>
       </View>

       <View style={styles.paymentSection}>
         <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>MONTHLY PAYMENT</Text>
           <IconButton
             iconName="info"
             size={18}
             color={colors.text.secondary}
             onPress={() => {/* Show payment info */}}
           />
         </View>
         <View style={styles.paymentCard}>
           <Text style={styles.paymentAmount}>
             {formatCurrency(investmentSummary.monthlyPayment, investmentSummary.currency)}
           </Text>
         </View>
       </View>

       <View style={styles.actionButtons}>
         <TouchableOpacity style={styles.actionButton} onPress={handleAddPayment}>
           <IconButton iconName="plus-circle" size={20} color={colors.text.primary} />
           <Text style={styles.actionButtonText}>Add one-time payment</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.actionButton} onPress={handleChangePaymentMethod}>
           <IconButton iconName="credit-card" size={20} color={colors.text.primary} />
           <Text style={styles.actionButtonText}>Change payment method</Text>
         </TouchableOpacity>
       </View>

       <View style={styles.transactionsSection}>
         <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Transactions</Text>
           <TouchableOpacity onPress={handleViewAllTransactions}>
             <Text style={styles.viewAllText}>View All</Text>
             <IconButton iconName="chevron-right" size={18} color={colors.primary} />
           </TouchableOpacity>
         </View>
         
         {recentTransactions.length > 0 ? (
           <View style={styles.transactionsList}>
             {recentTransactions.map((transaction) => (
               <TransactionItem
                 key={transaction.id}
                 transaction={transaction}
                 currency={investmentSummary.currency}
               />
             ))}
           </View>
         ) : (
           <Text style={styles.noTransactionsText}>No recent transactions</Text>
         )}
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 safeArea: {
   flex: 1,
   backgroundColor: colors.background.primary,
 },
 container: {
   flex: 1,
   padding: spacing.medium,
 },
 loadingContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 errorContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   padding: spacing.large,
 },
 errorText: {
   fontSize: 16,
   color: colors.text.error,
   marginBottom: spacing.medium,
   textAlign: 'center',
 },
 linkText: {
   fontSize: 16,
   color: colors.primary,
   textDecorationLine: 'underline',
 },
 header: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: spacing.large,
 },
 title: {
   fontSize: 18,
   fontWeight: 'bold',
   color: colors.text.primary,
   marginLeft: spacing.medium,
 },
 progressSection: {
   alignItems: 'center',
   marginBottom: spacing.large,
 },
 investmentAmount: {
   fontSize: 18,
   color: colors.text.primary,
   marginTop: spacing.medium,
 },
 paymentSection: {
   marginBottom: spacing.large,
 },
 sectionHeader: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom: spacing.small,
 },
 sectionTitle: {
   fontSize: 14,
   fontWeight: '500',
   color: colors.text.secondary,
 },
 paymentCard: {
   backgroundColor: colors.accent,
   borderRadius: 8,
   padding: spacing.medium,
   alignItems: 'center',
 },
 paymentAmount: {
   fontSize: 24,
   fontWeight: 'bold',
   color: colors.text.onAccent,
 },
 actionButtons: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: spacing.large,
 },
 actionButton: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 actionButtonText: {
   fontSize: 14,
   color: colors.text.primary,
   marginLeft: spacing.small,
 },
 transactionsSection: {
   marginBottom: spacing.large,
 },
 viewAllText: {
   fontSize: 14,
   color: colors.primary,
 },
 transactionsList: {
   backgroundColor: colors.background.secondary,
   borderRadius: 8,
   padding: spacing.medium,
 },
 noTransactionsText: {
   fontSize: 14,
   color: colors.text.secondary,
   textAlign: 'center',
   paddingVertical: spacing.medium,
 },
});

// Step 5: Create Service for Investment Data
// src/services/investmentService.ts
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { httpClient } from './httpClient';
import { InvestmentSummary, Transaction } from '../types/investment';

export const investmentService = {
 /**
  * Fetches the current investment summary for the logged-in user
  */
 getInvestmentSummary: async (): Promise<InvestmentSummary> => {
   try {
     const response = await httpClient.get(API_ENDPOINTS.INVESTMENT_SUMMARY);
     return response.data;
   } catch (error) {
     console.error('Error fetching investment summary:', error);
     throw error;
   }
 },

 /**
  * Fetches recent transactions with optional limit
  * @param limit Number of transactions to fetch (default: 10)
  */
 getRecentTransactions: async (limit: number = 10): Promise<Transaction[]> => {
   try {
     const response = await httpClient.get(API_ENDPOINTS.TRANSACTIONS, {
       params: { limit },
     });
     return response.data;
   } catch (error) {
     console.error('Error fetching recent transactions:', error);
     throw error;
   }
 },

 /**
  * Fetches all transactions with pagination
  * @param page Page number (starting from 1)
  * @param pageSize Number of items per page
  */
 getAllTransactions: async (page: number = 1, pageSize: number = 20): Promise<{
   transactions: Transaction[];
   totalCount: number;
   totalPages: number;
 }> => {
   try {
     const response = await httpClient.get(API_ENDPOINTS.TRANSACTIONS, {
       params: { page, pageSize },
     });
     return response.data;
   } catch (error) {
     console.error('Error fetching all transactions:', error);
     throw error;
   }
 },
};

// Step 6: Create Custom Hooks
// src/services/hooks/useInvestmentService.ts
import { useState, useCallback } from 'react';
import { investmentService } from '../investmentService';
import { InvestmentSummary, Transaction } from '../../types/investment';

export const useInvestmentService = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<Error | null>(null);

 const getInvestmentSummary = useCallback(async (): Promise<InvestmentSummary> => {
   setIsLoading(true);
   setError(null);
   try {
     const summary = await investmentService.getInvestmentSummary();
     return summary;
   } catch (err) {
     const error = err instanceof Error ? err : new Error('An unknown error occurred');
     setError(error);
     throw error;
   } finally {
     setIsLoading(false);
   }
 }, []);

 const getRecentTransactions = useCallback(async (limit?: number): Promise<Transaction[]> => {
   setIsLoading(true);
   setError(null);
   try {
     const transactions = await investmentService.getRecentTransactions(limit);
     return transactions;
   } catch (err) {
     const error = err instanceof Error ? err : new Error('An unknown error occurred');
     setError(error);
     throw error;
   } finally {
     setIsLoading(false);
   }
 }, []);

 return {
   isLoading,
   error,
   getInvestmentSummary,
   getRecentTransactions,
 };
};

// Step 7: Add to Navigation
// src/navigation/InvestmentStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../features/investment/screens/DashboardScreen';
import { TransactionsScreen } from '../features/investment/screens/TransactionsScreen';
import { AddPaymentScreen } from '../features/investment/screens/AddPaymentScreen';
import { PaymentMethodsScreen } from '../features/investment/screens/PaymentMethodsScreen';

export type InvestmentStackParamList = {
 Dashboard: undefined;
 Transactions: undefined;
 AddPayment: undefined;
 PaymentMethods: undefined;
};

const Stack = createStackNavigator<InvestmentStackParamList>();

export const InvestmentStack: React.FC = () => {
 return (
   <Stack.Navigator
     initialRouteName="Dashboard"
     screenOptions={{
       headerShown: false,
     }}
   >
     <Stack.Screen name="Dashboard" component={DashboardScreen} />
     <Stack.Screen name="Transactions" component={TransactionsScreen} />
     <Stack.Screen name="AddPayment" component={AddPaymentScreen} />
     <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
   </Stack.Navigator>
 );
};
```