# Financial Calculator Workflow

## Overview
This workflow demonstrates a financial calculator interface for calculating monthly payments and payment plans. The interface allows users to configure payment terms including initial payment, final payment, and payment duration.

## Key Features
- Monthly payment calculation and display
- Adjustable payment duration slider (3-60 months)
- Initial and final payment configuration
- Property value display with location
- Payment plan recommendations
- Toggle for payment recommendations

## UI Components
1. **Header Section**
   - Property image thumbnail
   - Property value display ($56,000 USD)
   - Location indicator

2. **Payment Configuration**
   - Monthly payment amount ($1,150)
   - Months to pay off slider (3-60 months range)
   - Initial payment adjustment ($5,600 - $564)
   - Final payment toggle and amount

3. **Action Elements**
   - Recommendation toggle switch
   - "Sign up" or "Contact us" CTA button
   - Back navigation arrow

## Notes
- The interface includes helpful tooltips for various payment options
- Payment calculations update dynamically based on user inputs
- Recommendation system provides tailored payment suggestions
- Mobile-optimized design with clear visual hierarchy

## User Flow
1. View property details
2. Toggle recommendation if desired
3. Adjust payment duration
4. Configure initial payment
5. Set final payment preference
6. Review monthly payment amount
7. Proceed with sign up or contact

This workflow provides a comprehensive financial planning tool for property payments with flexible configuration options.

## Sample Code

### React Component

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { formatCurrency } from '../utils/formatters';
import InfoTooltip from '../components/InfoTooltip';

interface PropertyDetails {
  name: string;
  location: string;
  value: number;
  image: string;
}

const FinancialCalculator: React.FC<{ property: PropertyDetails }> = ({ property }) => {
  // State management
  const [monthlyPayment, setMonthlyPayment] = useState(1150);
  const [monthsToPay, setMonthsToPay] = useState(24);
  const [initialPayment, setInitialPayment] = useState(property.value * 0.1); // 10% default
  const [finalPayment, setFinalPayment] = useState(0);
  const [useRecommendation, setUseRecommendation] = useState(true);
  const [includeFinalPayment, setIncludeFinalPayment] = useState(false);

  // Calculate total and update values when inputs change
  useEffect(() => {
    if (useRecommendation) {
      // Apply recommendation algorithm
      const recommendedMonths = Math.min(36, Math.ceil(property.value / 5000));
      setMonthsToPay(recommendedMonths);
      setInitialPayment(property.value * 0.1);
      setFinalPayment(includeFinalPayment ? property.value * 0.05 : 0);
    }
    
    // Calculate monthly payment based on current values
    const totalOwed = property.value - initialPayment - finalPayment;
    const calculatedMonthly = totalOwed / monthsToPay;
    setMonthlyPayment(Math.ceil(calculatedMonthly / 50) * 50); // Round to nearest $50
  }, [monthsToPay, initialPayment, finalPayment, useRecommendation, includeFinalPayment, property.value]);

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR PAYMENT PLAN</Text>
      </View>

      {/* Monthly payment display */}
      <View style={styles.paymentSection}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>MONTHLY PAYMENT</Text>
          <InfoTooltip message="This is your monthly payment based on selected parameters" />
        </View>
        <Text style={styles.paymentAmount}>${monthlyPayment}</Text>
      </View>

      {/* Property details */}
      <View style={styles.propertyCard}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyName}>{property.name}</Text>
          <Text style={styles.propertyValue}>${formatCurrency(property.value)}</Text>
          <Text style={styles.propertyLocation}>{property.location}</Text>
        </View>
      </View>

      {/* Recommendation toggle */}
      <View style={styles.recommendationSection}>
        <Text style={styles.sectionLabel}>OUR RECOMMENDATION</Text>
        <InfoTooltip message="Enable our recommendation for a tailored investment plan with ideal payments" />
        <Switch
          value={useRecommendation}
          onValueChange={setUseRecommendation}
        />
      </View>

      {/* Months slider */}
      <View style={styles.sliderSection}>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>MONTHS TO PAY OFF</Text>
          <InfoTooltip message="Adjust the timeline for your payments" />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderValue}>3 MONTHS</Text>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={60}
            step={1}
            value={monthsToPay}
            onValueChange={setMonthsToPay}
            disabled={useRecommendation}
          />
          <Text style={styles.sliderValue}>60 MONTHS</Text>
        </View>
      </View>

      {/* Initial payment section */}
      <View style={styles.paymentConfigSection}>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>INITIAL PAYMENT</Text>
          <InfoTooltip message="Set your down payment amount" />
        </View>
        <View style={styles.paymentInputRow}>
          <Text style={styles.paymentInputValue}>${formatCurrency(initialPayment)}</Text>
          <Text style={styles.paymentInputSide}>${formatCurrency(property.value * 0.01)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={property.value * 0.01}
          maximumValue={property.value * 0.3}
          step={100}
          value={initialPayment}
          onValueChange={setInitialPayment}
          disabled={useRecommendation}
        />
      </View>

      {/* Final payment section */}
      <View style={styles.paymentConfigSection}>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>FINAL PAYMENT</Text>
          <InfoTooltip message="Enable a balloon payment at the end of your term" />
          <Switch
            value={includeFinalPayment}
            onValueChange={setIncludeFinalPayment}
          />
        </View>
        {includeFinalPayment && (
          <>
            <View style={styles.paymentInputRow}>
              <Text style={styles.paymentInputValue}>${formatCurrency(finalPayment)}</Text>
              <Text style={styles.paymentInputSide}>${formatCurrency(property.value * 0.01)}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={property.value * 0.01}
              maximumValue={property.value * 0.2}
              step={100}
              value={finalPayment}
              onValueChange={setFinalPayment}
              disabled={useRecommendation}
            />
          </>
        )}
      </View>

      {/* Action button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>SIGN UP IF PLAN FITS</Text>
      </TouchableOpacity>

      {/* Contact option */}
      <View style={styles.contactSection}>
        <Text style={styles.contactText}>Want to pay in full?</Text>
        <TouchableOpacity>
          <Text style={styles.contactLink}>Contact us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  paymentSection: {
    marginBottom: 24,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 12,
    color: '#BBBBBB',
    marginRight: 8,
  },
  paymentAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  propertyImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  propertyDetails: {
    marginLeft: 12,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  propertyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  propertyLocation: {
    fontSize: 12,
    color: '#BBBBBB',
    marginTop: 2,
  },
  recommendationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BBBBBB',
  },
  sliderSection: {
    marginBottom: 24,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BBBBBB',
    marginRight: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  sliderValue: {
    fontSize: 10,
    color: '#BBBBBB',
  },
  paymentConfigSection: {
    marginBottom: 24,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  configLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BBBBBB',
  },
  paymentInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentInputValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymentInputSide: {
    fontSize: 12,
    color: '#BBBBBB',
  },
  signupButton: {
    backgroundColor: '#A98307',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signupButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contactSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 12,
    color: '#BBBBBB',
    marginRight: 4,
  },
  contactLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default FinancialCalculator;
```

### Payment Calculation Utility

```typescript
// utils/calculators.ts

/**
 * Calculate monthly payment based on loan parameters
 */
export function calculateMonthlyPayment(
  totalAmount: number,
  initialPayment: number,
  finalPayment: number,
  months: number
): number {
  // Ensure valid inputs
  if (months <= 0) return 0;
  
  // Calculate remaining amount to finance
  const financedAmount = totalAmount - initialPayment - finalPayment;
  
  // Simple division for equal payments (no interest)
  let monthlyPayment = financedAmount / months;
  
  // Round to nearest $10 for nicer display
  return Math.ceil(monthlyPayment / 10) * 10;
}

/**
 * Generate recommended payment plan based on property value
 */
export function getRecommendedPlan(propertyValue: number): {
  months: number;
  initialPayment: number;
  finalPayment: number;
  monthlyPayment: number;
} {
  // Implement recommendation algorithm based on property value
  const recommendedMonths = Math.min(36, Math.ceil(propertyValue / 5000));
  const initialPayment = propertyValue * 0.1; // 10% down payment
  const finalPayment = propertyValue * 0.05; // 5% balloon payment
  
  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(
    propertyValue,
    initialPayment,
    finalPayment,
    recommendedMonths
  );
  
  return {
    months: recommendedMonths,
    initialPayment,
    finalPayment,
    monthlyPayment
  };
}

/**
 * Format currency values for display
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
```

### Usage Example

```tsx
import React from 'react';
import FinancialCalculator from './components/FinancialCalculator';

const propertyDetails = {
  name: 'South Beach',
  location: 'Pier 330',
  value: 56000,
  image: 'https://example.com/property-image.jpg'
};

const App = () => {
  return (
    <FinancialCalculator property={propertyDetails} />
  );
};

export default App;
```

### InfoTooltip Component

```tsx
// components/InfoTooltip.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface InfoTooltipProps {
  message: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ message }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setTooltipVisible(true)}
        style={styles.infoIcon}
      >
        <Text style={styles.infoIconText}>?</Text>
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={tooltipVisible}
        animationType="fade"
        onRequestClose={() => setTooltipVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setTooltipVisible(false)}
        >
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{message}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setTooltipVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 300,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeButtonText: {
    color: '#A98307',
    fontWeight: 'bold',
  }
});

export default InfoTooltip;
```

### API Integration

```typescript
// services/paymentService.ts
import { getRecommendedPlan } from '../utils/calculators';

interface PropertyDetails {
  id: string;
  name: string;
  location: string;
  value: number;
  image: string;
}

interface PaymentPlan {
  propertyId: string;
  monthlyPayment: number;
  months: number;
  initialPayment: number;
  finalPayment: number;
  includesFinalPayment: boolean;
}

// Fetch property details from API
export async function fetchPropertyDetails(propertyId: string): Promise<PropertyDetails> {
  try {
    const response = await fetch(`https://api.example.com/properties/${propertyId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch property details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
}

// Submit payment plan to server
export async function submitPaymentPlan(plan: PaymentPlan): Promise<{ success: boolean; referenceId?: string }> {
  try {
    const response = await fetch('https://api.example.com/payment-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit payment plan');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting payment plan:', error);
    throw error;
  }
}

// Get payment plan recommendations based on user profile and property
export async function getPersonalizedRecommendation(
  propertyId: string, 
  userId: string
): Promise<PaymentPlan> {
  try {
    // First attempt to get personalized recommendation from server
    const response = await fetch(`https://api.example.com/recommendations?propertyId=${propertyId}&userId=${userId}`);
    
    if (response.ok) {
      return await response.json();
    }
    
    // Fallback to local recommendation if API fails
    const propertyDetails = await fetchPropertyDetails(propertyId);
    const recommendation = getRecommendedPlan(propertyDetails.value);
    
    return {
      propertyId,
      monthlyPayment: recommendation.monthlyPayment,
      months: recommendation.months,
      initialPayment: recommendation.initialPayment,
      finalPayment: recommendation.finalPayment,
      includesFinalPayment: recommendation.finalPayment > 0
    };
  } catch (error) {
    console.error('Error getting personalized recommendation:', error);
    throw error;
  }
}
``` 