# Payment History Workflow

## Overview
This workflow demonstrates the payment history interface, which allows users to view their investment progress, monthly payments, and transaction history. It also provides functionality to add new payments and modify payment methods.

## Screenshots

### Main Payment History Screen
![Payment History Main Screen](../assets/workflows/payment-history-main.png)
*Payment history screen showing investment progress, monthly payment, and transaction list*

### Add Payment Modal
![Add Payment Modal](../assets/workflows/payment-history-add-payment.png)
*Modal interface for adding one-time payments and adjusting payment schedule*

## Key Features
- Investment progress visualization
- Monthly payment display
- Transaction history list
- Quick payment options
- Payment method management
- Payment schedule adjustment

## UI Components

1. **Header Section** *(Shown in first screenshot)*
   - Back navigation arrow button (top left)
   - "YOUR INVESTMENT" title in white text
   - Semi-circular progress gauge showing completion percentage
   - Investment amount display showing paid amount vs total amount
   - Progress indicator uses olive/gold accent color

2. **Monthly Payment Card** *(Highlighted in first screenshot)*
   - Prominent display of monthly payment amount
   - "MONTHLY PAYMENT" label in uppercase
   - Olive/gold background color for emphasis
   - Rounded corners for modern design 
   - Card spans full width with padding

3. **Quick Actions Row** *(Below monthly payment card)*
   - Two action buttons arranged horizontally:
     - Left: "Add one-time payment" with plus icon
     - Right: "Change payment method" with card icon
   - Icons aligned left of text
   - White text on dark background
   - Touch targets with appropriate spacing

4. **Transaction List Section** *(Bottom of first screenshot)*
   - "Recent Transactions" header with right arrow
   - Scrollable list of transactions
   - Each transaction item displays:
     - Investment name (left-aligned)
     - Transaction date (below name)
     - Payment amount (right-aligned)
   - Subtle dividers between transactions
   - White text on dark background
   - Last few transactions visible without scrolling

5. **Add Cash Modal** *(Shown in second screenshot)*
   - Bottom sheet modal with rounded top corners
   - White background for contrast
   - Sections include:
     - "ADD CASH" header text centered
     - Current monthly payment display in olive/gold card
     - Grid of preset payment amount buttons
       - 6 options including "other"
       - 3 buttons per row
       - Selected state with olive/gold background
     - Payment schedule options
       - Grid of month selections
       - 6 options including "other"
       - Numbers followed by "month" or "months"
     - Confirm button at bottom
   - Dismissible by dragging down or tapping overlay

## Design Elements
- Dark mode interface with white text
- Olive/gold accent color for important elements
- Consistent rounded corners on cards and buttons
- Clear typography hierarchy
- Ample padding and spacing
- Touch-friendly button sizes
- Visual feedback on interactive elements
- Modal overlay with semi-transparent background
- Smooth animations for modal presentation

## User Flow

1. **View Investment Progress**
   - User sees current investment progress
   - Total amount paid vs total investment amount
   - Monthly payment amount

2. **Review Transactions**
   - Access recent transaction history
   - View individual payment details
   - Track payment dates and amounts

3. **Add Payment**
   - Select "Add one-time payment"
   - Choose from preset amounts or enter custom amount
   - Optionally adjust payment schedule
   - Confirm payment

4. **Modify Payment Method**
   - Access payment method options
   - Select new payment method
   - Confirm changes

## Notes
- Progress indicator uses a semi-circular gauge for visual feedback
- Transaction history is chronologically ordered
- Quick action buttons provide easy access to common tasks
- Preset payment amounts streamline the payment process
- Payment schedule can be adjusted in monthly increments

## Sample Code

### React Native Component

```typescript
// components/PaymentHistory.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ProgressGauge } from './ProgressGauge';
import { TransactionList } from './TransactionList';
import { formatCurrency } from '../utils/formatters';

interface PaymentHistoryProps {
  totalAmount: number;
  paidAmount: number;
  monthlyPayment: number;
  transactions: Transaction[];
  onAddPayment: () => void;
  onChangeMethod: () => void;
}

interface Transaction {
  id: string;
  name: string;
  date: Date;
  amount: number;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  totalAmount,
  paidAmount,
  monthlyPayment,
  transactions,
  onAddPayment,
  onChangeMethod,
}) => {
  const progressPercentage = (paidAmount / totalAmount) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR INVESTMENT</Text>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <ProgressGauge percentage={progressPercentage} />
        <Text style={styles.progressText}>
          ${formatCurrency(paidAmount)} / ${formatCurrency(totalAmount)}
        </Text>
      </View>

      {/* Monthly Payment Card */}
      <View style={styles.paymentCard}>
        <Text style={styles.paymentLabel}>MONTHLY PAYMENT</Text>
        <Text style={styles.paymentAmount}>
          ${formatCurrency(monthlyPayment)}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onAddPayment}
        >
          <Text style={styles.actionButtonText}>Add one-time payment</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onChangeMethod}
        >
          <Text style={styles.actionButtonText}>Change payment method</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions */}
      <TransactionList transactions={transactions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  progressSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  progressText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
  },
  paymentCard: {
    backgroundColor: '#A98307',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  paymentLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

export default PaymentHistory;
```

### Add Payment Modal Component

```typescript
// components/AddPaymentModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

interface AddPaymentModalProps {
  visible: boolean;
  currentMonthlyPayment: number;
  onClose: () => void;
  onSubmit: (amount: number, months: number) => void;
}

const PRESET_AMOUNTS = [500, 1000, 3000, 5000, 7000];
const PRESET_MONTHS = [1, 2, 3, 4, 5];

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  visible,
  currentMonthlyPayment,
  onClose,
  onSubmit,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedMonths, setSelectedMonths] = useState<number | null>(null);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>ADD CASH</Text>
          
          {/* Monthly Payment Display */}
          <View style={styles.paymentDisplay}>
            <Text style={styles.paymentLabel}>MONTHLY PAYMENT</Text>
            <Text style={styles.paymentAmount}>
              ${currentMonthlyPayment}
            </Text>
          </View>

          {/* Amount Selection */}
          <Text style={styles.sectionTitle}>
            Bring down your monthly payment
          </Text>
          <View style={styles.amountGrid}>
            {PRESET_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedButton
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={styles.amountButtonText}>
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.amountButton}>
              <Text style={styles.amountButtonText}>other</Text>
            </TouchableOpacity>
          </View>

          {/* Months Selection */}
          <Text style={styles.sectionTitle}>
            Reduce your months to pay off
          </Text>
          <View style={styles.monthsGrid}>
            {PRESET_MONTHS.map((month) => (
              <TouchableOpacity
                key={month}
                style={[
                  styles.monthButton,
                  selectedMonths === month && styles.selectedButton
                ]}
                onPress={() => setSelectedMonths(month)}
              >
                <Text style={styles.monthButtonText}>
                  {month} {month === 1 ? 'month' : 'months'}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthButtonText}>other</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => {
              if (selectedAmount && selectedMonths) {
                onSubmit(selectedAmount, selectedMonths);
              }
            }}
          >
            <Text style={styles.submitButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentDisplay: {
    backgroundColor: '#A98307',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  paymentLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  paymentAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  amountButton: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    margin: '1.5%',
    alignItems: 'center',
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  monthButton: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    margin: '1.5%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#A98307',
  },
  amountButtonText: {
    fontWeight: '500',
  },
  monthButtonText: {
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#A98307',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AddPaymentModal;
```

### Usage Example

```typescript
// screens/PaymentHistoryScreen.tsx
import React, { useState } from 'react';
import PaymentHistory from '../components/PaymentHistory';
import AddPaymentModal from '../components/AddPaymentModal';

const PaymentHistoryScreen: React.FC = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  const mockTransactions = [
    {
      id: '1',
      name: 'Terros Investment',
      date: new Date('2023-03-01'),
      amount: 1150,
    },
    {
      id: '2',
      name: 'Terros Investment',
      date: new Date('2023-02-01'),
      amount: 1150,
    },
    {
      id: '3',
      name: 'Terros Investment',
      date: new Date('2023-01-01'),
      amount: 1150,
    },
  ];

  const handleAddPayment = (amount: number, months: number) => {
    // Handle payment submission
    console.log('Adding payment:', { amount, months });
    setShowAddPayment(false);
  };

  return (
    <>
      <PaymentHistory
        totalAmount={56000}
        paidAmount={40320}
        monthlyPayment={1150}
        transactions={mockTransactions}
        onAddPayment={() => setShowAddPayment(true)}
        onChangeMethod={() => console.log('Change method')}
      />
      
      <AddPaymentModal
        visible={showAddPayment}
        currentMonthlyPayment={1150}
        onClose={() => setShowAddPayment(false)}
        onSubmit={handleAddPayment}
      />
    </>
  );
};

export default PaymentHistoryScreen;
``` 