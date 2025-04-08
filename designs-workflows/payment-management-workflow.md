# Payment Management Screen Implementation for Stripe

## Step 1: Define Payment Types with Stripe Integration
- Create a new file `src/types/payment.ts` for payment-related type definitions
- Define these key interfaces:
  - `StripePaymentMethod` - Structure for Stripe payment methods
    - Include fields: id, type, card: { brand, last4, expMonth, expYear }
    - Match Stripe's response format for payment methods
  - `PaymentSliderState` - Structure for slider states
    - Fields: months (3-60), initialPayment, finalPayment, monthlyPayment
  - `PaymentCalculation` - For calculated payment values
    - Include monthlyAmount, totalInterest, totalPayment fields

## Step 2: Create Payment Month Slider Component
- Create `src/features/payment/components/PaymentMonthSlider.tsx`
- Implement with these features:
  - Horizontal slider for month selection (3-60 months)
  - Custom thumb component with current month value
  - Min/max labels at slider ends
  - Tick marks for common term lengths (12, 24, 36, 48 months)
  - OnChange handler to update parent component state
  - Visual indicators for selected month value
  - Accessible control with proper ARIA attributes
  - Snap-to behavior for common month intervals
  - Match the design's olive accent color scheme
  - Implement proper handling of gestures and touch events

## Step 3: Create Initial Payment Slider Component
- Create `src/features/payment/components/InitialPaymentSlider.tsx`
- Implement the following:
  - Horizontal slider for initial payment amount ($0-$15,000)
  - Currency formatted value display
  - Custom thumb with payment preview
  - Min/max labels with currency formatting
  - Step values appropriate for large dollar amounts ($100 or $500 increments)
  - Dynamic range based on total investment amount
  - Visual feedback when interacting with slider
  - Calculate impact on monthly payment in real-time
  - Ensure performance with debounced calculations
  - Match the dark theme UI with proper contrast

## Step 4: Create Final Payment Slider Component
- Create `src/features/payment/components/FinalPaymentSlider.tsx`
- Implement these features:
  - Horizontal slider for final balloon payment
  - Toggle switch to enable/disable final payment
  - Currency formatted display values
  - Dynamic range based on total investment amount
  - Proper calculation of how final payment affects monthly payments
  - Visual indication when final payment is significant
  - Explanatory text about balloon payment benefits
  - Handle edge cases (final payment > total amount)
  - Auto-adjust monthly payment when final payment changes
  - Consistent styling with other payment sliders

## Step 5: Implement Payment Calculator Module
- Create `src/utils/paymentCalculator.ts`
- Implement these calculation functions:
  - `calculateMonthlyPayment(principal, months, interestRate, finalPayment)`
  - `calculateTotalInterest(monthlyPayment, months, principal, finalPayment)`
  - `calculateRecommendedPlan(principal, preferredMonthly?, preferredTerm?)`
  - Accurate amortization with support for balloon payments
  - Consider interest compounding based on payment frequency
  - Handle edge cases (very short terms, very small amounts)
  - Add detailed JSDoc documentation for all functions
  - Implement proper rounding for currency values
  - Create utility functions for formatting currency and percentages

## Step 6: Create Payment Plan Display Component
- Create `src/features/payment/components/PaymentPlanSummary.tsx`
- Implement the following:
  - Visual breakdown of payment plan details
  - Monthly payment amount with prominent display
  - Term length in months/years
  - Total payment amount and interest paid
  - Savings comparison to longer term options
  - Visual chart showing payment breakdown (principal vs. interest)
  - Recommendations toggle with alternative payment plans
  - Responsive layout for different screen sizes
  - Animated transitions when values change
  - Export to PDF option for payment schedule

## Step 7: Implement Stripe Integration Service
- Create `src/services/stripeService.ts` with:
  - `initializeStripe(publishableKey)` - Setup Stripe SDK
  - `createPaymentMethod(cardDetails)` - Create new payment methods
  - `getPaymentMethods()` - Retrieve saved methods
  - `confirmPayment(paymentMethodId, amount, currency)` - Process payment
  - Proper error handling for Stripe-specific errors
  - Secure handling of payment intents
  - Support for 3D Secure authentication when required
  - Test mode toggling for development
  - Webhook handling for payment events
  - Proper TypeScript typing for all Stripe objects

## Step 8: Create Payment Management Screen
- Create `src/features/payment/screens/PaymentManagementScreen.tsx`
- Implement with:
  - Header showing property name and total price
  - Three sliders: months, initial payment, final payment
  - Real-time payment calculation as sliders change
  - Payment summary with monthly amount prominently displayed
  - Payment method selection via Stripe Elements
  - "Sign Up & Finalize Plan" button at bottom
  - Loading states during calculations and submission
  - Error handling for validation and API issues
  - Responsive layout with ScrollView for smaller screens
  - Proper keyboard handling for payment fields
  - Animation for transitions between payment states
  - Proper navigation to confirmation screen after success

## Integration Requirements:
- Add Stripe React Native SDK to the project
  - Follow installation instructions at stripe.com/docs/react-native
  - Configure Stripe publishable key in .env file
  - Add necessary permissions for card scanning if used
- Create Stripe Payment Sheet configuration
  - Set up appearance to match app theme
  - Configure with merchant name and branding
  - Enable Google/Apple Pay if supported
- Add analytics tracking:
  - Track slider interactions
  - Record payment attempts and completions
  - Measure time spent on payment configuration
- Implement proper error boundaries
  - Handle Stripe-specific errors with user-friendly messages
  - Provide recovery paths for failed payments
  - Consider fallback payment options when available
- Test thoroughly with Stripe test cards
  - Test different card types (Visa, Mastercard, Amex)
  - Test 3D Secure authentication flows
  - Test error cases (insufficient funds, expired cards)

```// Step 1: Define Payment Management Types
// src/types/payment.ts
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  lastFour: string;
  isDefault: boolean;
  expiryDate?: string; // For cards
  name: string;
  brand?: string; // For cards (Visa, Mastercard, etc.)
}

export interface AddCashOption {
  value: number;
  label: string;
}

export type PaymentTerm = 3 | 6 | 12 | 24 | 36 | 48 | 60;

export interface PaymentPlanOption {
  term: PaymentTerm;
  monthlyPayment: number;
  totalPayment: number;
  interestRate: number;
}

// Step 2: Create Add Cash Component
// src/features/payment/components/AddCashForm.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { AddCashOption } from '../../../types/payment';
import { formatCurrency } from '../../../utils/formatters';

interface AddCashFormProps {
  currency: string;
  onAmountSelected: (amount: number) => void;
  presetAmounts: AddCashOption[];
}

export const AddCashForm: React.FC<AddCashFormProps> = ({
  currency,
  onAmountSelected,
  presetAmounts,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setUseCustomAmount(false);
    onAmountSelected(amount);
  };

  const handleCustomAmountChange = (value: string) => {
    // Allow only digits and decimal point
    const filteredValue = value.replace(/[^0-9.]/g, '');
    setCustomAmount(filteredValue);
    
    const numericValue = parseFloat(filteredValue);
    if (!isNaN(numericValue)) {
      setSelectedAmount(numericValue);
      onAmountSelected(numericValue);
    } else {
      setSelectedAmount(null);
    }
  };

  const handleCustomAmountFocus = () => {
    setUseCustomAmount(true);
    setSelectedAmount(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bring down your monthly payment</Text>
      <Text style={styles.subtitle}>
        Add cash to this investment and lower the amount you need to pay monthly.
      </Text>
      
      <View style={styles.amountGrid}>
        {presetAmounts.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.amountButton,
              selectedAmount === option.value && !useCustomAmount && styles.selectedButton,
            ]}
            onPress={() => handlePresetSelect(option.value)}
          >
            <Text style={[
              styles.amountText,
              selectedAmount === option.value && !useCustomAmount && styles.selectedText,
            ]}>
              {formatCurrency(option.value, currency)}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.amountButton,
            useCustomAmount && styles.selectedButton,
          ]}
          onPress={handleCustomAmountFocus}
        >
          <Text style={[
            styles.amountText,
            useCustomAmount && styles.selectedText,
          ]}>
            other
          </Text>
        </TouchableOpacity>
      </View>
      
      {useCustomAmount && (
        <View style={styles.customAmountContainer}>
          <TextInput
            style={styles.customAmountInput}
            value={customAmount}
            onChangeText={handleCustomAmountChange}
            placeholder={`Enter amount in ${currency}`}
            keyboardType="numeric"
            autoFocus
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.medium,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
  },
  amountButton: {
    width: '30%',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  amountText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  selectedText: {
    color: colors.text.onPrimary,
  },
  customAmountContainer: {
    marginTop: spacing.small,
  },
  customAmountInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    fontSize: 16,
    color: colors.text.primary,
  },
});

// Step 3: Create Payment Term Selection Component
// src/features/payment/components/PaymentTermSelector.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { PaymentTerm } from '../../../types/payment';
import { formatCurrency } from '../../../utils/formatters';

interface PaymentTermSelectorProps {
  minimumTerm: PaymentTerm;
  maximumTerm: PaymentTerm;
  currentTerm: PaymentTerm;
  monthlyPayment: number;
  currency: string;
  onTermChange: (term: PaymentTerm) => void;
}

export const PaymentTermSelector: React.FC<PaymentTermSelectorProps> = ({
  minimumTerm,
  maximumTerm,
  currentTerm,
  monthlyPayment,
  currency,
  onTermChange,
}) => {
  // Available term options
  const termOptions: PaymentTerm[] = [3, 6, 12, 24, 36, 48, 60];
  
  // Filter options based on min/max
  const availableTerms = termOptions.filter(
    term => term >= minimumTerm && term <= maximumTerm
  );

  const handleSliderChange = (value: number) => {
    // Find the nearest term option to the slider value
    const nearestTerm = availableTerms.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
    
    onTermChange(nearestTerm as PaymentTerm);
  };

  // Calculate slider position
  const sliderPosition = availableTerms.indexOf(currentTerm);
  const sliderValue = sliderPosition !== -1 ? sliderPosition : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reduce your months to pay off</Text>
      <Text style={styles.subtitle}>
        Pay for extra months to lower your total costs over time.
      </Text>
      
      <View style={styles.termRow}>
        {availableTerms.map((term) => (
          <TouchableOpacity
            key={term}
            style={[
              styles.termButton,
              currentTerm === term && styles.selectedTermButton,
            ]}
            onPress={() => onTermChange(term)}
          >
            <Text style={[
              styles.termText,
              currentTerm === term && styles.selectedTermText,
            ]}>
              {term} months
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.termButton}
        >
          <Text style={styles.termText}>other</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>{minimumTerm} months</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={availableTerms.length - 1}
          step={1}
          value={sliderValue}
          onValueChange={(value) => handleSliderChange(availableTerms[value])}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.background.light}
          thumbTintColor={colors.primary}
        />
        <Text style={styles.sliderLabel}>{maximumTerm} months</Text>
      </View>
      
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentLabel}>Your monthly payment:</Text>
        <Text style={styles.paymentAmount}>
          {formatCurrency(monthlyPayment, currency)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.medium,
  },
  termRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
  },
  termButton: {
    width: '30%',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  selectedTermButton: {
    backgroundColor: colors.primary,
  },
  termText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedTermText: {
    color: colors.text.onPrimary,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: spacing.small,
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  paymentContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.small,
  },
  paymentAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});

// Step 4: Create Payment Method Selector Component
// src/features/payment/components/PaymentMethodSelector.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PaymentMethod } from '../../../types/payment';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { FontAwesome } from '@expo/vector-icons';

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethodId: string | null;
  onSelectMethod: (methodId: string) => void;
  onAddNewMethod: () => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedMethodId,
  onSelectMethod,
  onAddNewMethod,
}) => {
  const getCardIcon = (brand?: string) => {
    if (!brand) return 'credit-card';
    
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'cc-visa';
      case 'mastercard':
        return 'cc-mastercard';
      case 'amex':
      case 'american express':
        return 'cc-amex';
      case 'discover':
        return 'cc-discover';
      default:
        return 'credit-card';
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'card':
        return (
          <FontAwesome
            name={getCardIcon(method.brand)}
            size={24}
            color={colors.text.primary}
          />
        );
      case 'bank':
        return (
          <FontAwesome
            name="bank"
            size={24}
            color={colors.text.primary}
          />
        );
      case 'wallet':
        return (
          <FontAwesome
            name="wallet"
            size={24}
            color={colors.text.primary}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodItem,
            selectedMethodId === method.id && styles.selectedMethodItem,
          ]}
          onPress={() => onSelectMethod(method.id)}
        >
          <View style={styles.methodIcon}>
            {getMethodIcon(method)}
          </View>
          <View style={styles.methodInfo}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDetails}>
              {method.type === 'card' 
                ? `•••• ${method.lastFour} ${method.expiryDate ? `| Exp: ${method.expiryDate}` : ''}`
                : `•••• ${method.lastFour}`
              }
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            {selectedMethodId === method.id && (
              <FontAwesome
                name="check-circle"
                size={24}
                color={colors.primary}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity
        style={styles.addMethodButton}
        onPress={onAddNewMethod}
      >
        <FontAwesome
          name="plus-circle"
          size={20}
          color={colors.primary}
        />
        <Text style={styles.addMethodText}>Add new payment method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.medium,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.small,
  },
  selectedMethodItem: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  methodIcon: {
    marginRight: spacing.medium,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: spacing.small / 2,
  },
  methodDetails: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  checkboxContainer: {
    width: 30,
    alignItems: 'center',
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium,
    marginTop: spacing.small,
  },
  addMethodText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: spacing.small,
  },
});

// Step 5: Create Main Payment Screen
// src/features/payment/screens/PaymentManagementScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { AddCashForm } from '../components/AddCashForm';
import { PaymentTermSelector } from '../components/PaymentTermSelector';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { usePaymentService } from '../../../services/hooks/usePaymentService';
import { AddCashOption, PaymentMethod, PaymentTerm } from '../../../types/payment';
import { formatCurrency } from '../../../utils/formatters';
import { IconButton } from '../../../components/IconButton';

export const PaymentManagementScreen: React.FC = () => {
  const navigation = useNavigation();
  const { 
    getPaymentMethods, 
    calculatePaymentPlan,
    processPayment,
  } = usePaymentService();
  
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [term, setTerm] = useState<PaymentTerm>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  
  // Default preset amounts
  const presetAmounts: AddCashOption[] = [
    { value: 500, label: '$500' },
    { value: 1000, label: '$1000' },
    { value: 3000, label: '$3000' },
    { value: 5000, label: '$5000' },
    { value: 7000, label: '$7000' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const methods = await getPaymentMethods();
        setPaymentMethods(methods);
        
        // Set default payment method if available
        const defaultMethod = methods.find(m => m.isDefault);
        if (defaultMethod) {
          setSelectedMethodId(defaultMethod.id);
        } else if (methods.length > 0) {
          setSelectedMethodId(methods[0].id);
        }
      } catch (error) {
        console.error('Failed to load payment data:', error);
        // Handle error - show toast or error state
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Recalculate monthly payment when amount or term changes
    const calculatePayment = async () => {
      if (amount > 0) {
        try {
          const plan = await calculatePaymentPlan(amount, term);
          setMonthlyPayment(plan.monthlyPayment);
        } catch (error) {
          console.error('Failed to calculate payment plan:', error);
        }
      } else {
        setMonthlyPayment(0);
      }
    };

    calculatePayment();
  }, [amount, term]);

  const handleAmountSelected = (value: number) => {
    setAmount(value);
  };

  const handleTermChange = (newTerm: PaymentTerm) => {
    setTerm(newTerm);
  };

  const handleSelectPaymentMethod = (methodId: string) => {
    setSelectedMethodId(methodId);
  };

  const handleAddNewMethod = () => {
    navigation.navigate('AddPaymentMethod');
  };

  const handleSubmitPayment = async () => {
    if (!selectedMethodId || amount <= 0) {
      // Show validation error
      return;
    }

    try {
      setSubmitting(true);
      await processPayment({
        amount,
        term,
        paymentMethodId: selectedMethodId,
      });
      
      // Navigate to success screen or show confirmation
      navigation.navigate('PaymentSuccess', {
        amount,
        monthlyPayment,
      });
    } catch (error) {
      console.error('Payment processing failed:', error);
      // Show error message
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
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
          <Text style={styles.title}>ADD CASH</Text>
        </View>

        <View style={styles.paymentCard}>
          <Text style={styles.cardTitle}>MONTHLY PAYMENT</Text>
          <Text style={styles.paymentAmount}>
            {formatCurrency(monthlyPayment, 'USD')}
          </Text>
        </View>

        <View style={styles.section}>
          <AddCashForm
            currency="USD"
            onAmountSelected={handleAmountSelected}
            presetAmounts={presetAmounts}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <PaymentTermSelector
            minimumTerm={3}
            maximumTerm={60}
            currentTerm={term}
            monthlyPayment={monthlyPayment}
            currency="USD"
            onTermChange={handleTermChange}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <PaymentMethodSelector
            paymentMethods={paymentMethods}
            selectedMethodId={selectedMethodId}
            onSelectMethod={handleSelectPaymentMethod}
            onAddNewMethod={handleAddNewMethod}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedMethodId || amount <= 0 || submitting) && styles.disabledButton,
          ]}
          onPress={handleSubmitPayment}
          disabled={!selectedMethodId || amount <= 0 || submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color={colors.text.onPrimary} />
          ) : (
            <Text style={styles.submitButtonText}>Confirm Payment</Text>
          )}
        </TouchableOpacity>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: spacing.medium,
  },
  paymentCard: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: spacing.large,
    margin: spacing.medium,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: colors.text.onAccent,
    marginBottom: spacing.small,
  },
  paymentAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.onAccent,
  },
  section: {
    marginBottom: spacing.large,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginHorizontal: spacing.medium,
    marginBottom: spacing.large,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.medium,
    margin: spacing.medium,
    alignItems: 'center',
    marginBottom: spacing.extraLarge,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.onPrimary,
  },
});

// Step 6: Create Payment Success Screen
// src/features/payment/screens/PaymentSuccessScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { formatCurrency } from '../../../utils/formatters';
import { FontAwesome } from '@expo/vector-icons';

type PaymentSuccessRouteParams = {
  amount: number;
  monthlyPayment: number;
};

type PaymentSuccessRouteProp = RouteProp
  { PaymentSuccess: PaymentSuccessRouteParams },
  'PaymentSuccess'
>;

export const PaymentSuccessScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PaymentSuccessRouteProp>();
  const { amount, monthlyPayment } = route.params;

  const handleReturnToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.successIcon}>
          <FontAwesome
            name="check-circle"
            size={80}
            color={colors.success}
          />
        </View>
        
        <Text style={styles.title}>Payment Successful!</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Paid:</Text>
            <Text style={styles.detailValue}>{formatCurrency(amount, 'USD')}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>New Monthly Payment:</Text>
            <Text style={styles.detailValue}>{formatCurrency(monthlyPayment, 'USD')}</Text>
          </View>
        </View>
        
        <Text style={styles.message}>
          Your payment has been processed successfully. Your investment has been updated with
          your additional contribution.
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleReturnToDashboard}
        >
          <Text style={styles.buttonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
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
    padding: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    marginBottom: spacing.large,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    width: '100%',
    marginBottom: spacing.large,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.small,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  message: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.large,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.medium,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.onPrimary,
  },
});

// Step 7: Create Payment Service
// src/services/paymentService.ts
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { httpClient } from './httpClient';
import { PaymentMethod, PaymentPlanOption, PaymentTerm } from '../types/payment';

interface ProcessPaymentRequest {
  amount: number;
  term: PaymentTerm;
  paymentMethodId: string;
}

interface ProcessPaymentResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  monthlyPayment: number;
}

export const paymentService = {
  /**
   * Fetches all payment methods for the current user
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.PAYMENT_METHODS);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  /**
   * Calculate payment plan for a given amount and term
   */
  calculatePaymentPlan: async (
    amount: number,
    term: PaymentTerm
  ): Promise<PaymentPlanOption> => {
    try {
      const response = await httpClient.get(API_ENDPOINTS.CALCULATE_PAYMENT_PLAN, {
        params: { amount, term },
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating payment plan:', error);
      throw error;
    }
  },

  /**
   * Process a payment with the given details
   */
  processPayment: async (
    request: ProcessPaymentRequest
  ): Promise<ProcessPaymentResponse> => {
    try {
      const response = await httpClient.post(API_ENDPOINTS.PROCESS_PAYMENT, request);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  /**
  ```
