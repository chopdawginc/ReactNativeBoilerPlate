# Home & Listings Implementation Steps

## Step 1: Define Types and Interfaces
- Create file `src/types/property.ts`
- Define the following interfaces:
  - `Property` - Contains property listing details
  - `PropertyLocation` - Defines location coordinates and region data
  - `PropertyMedia` - Structure for images and videos associated with properties
  - `HomeScreenProps` - Props for the main home screen component
  - `ListingsScreenProps` - Props for the listings screen component
- Ensure all properties have proper TypeScript types
- Use string literals for property status and types

## Step 2: Create Property Card Component
- Create file `src/components/PropertyCard.tsx`
- Implement reusable property card with:
  - Property image thumbnail
  - Location name and plot identifier
  - Price with proper currency formatting
  - Property size with measurement unit
  - Shadow and border radius styling
- Support onPress handler for navigation
- Add proper accessibility labels
- Implement skeleton loading state

## Step 3: Create Promotional Video Component
- Create file `src/components/PromoVideo.tsx`
- Build video player component with:
  - Auto-play capability (configurable)
  - Play/pause controls
  - Expandable to full screen
  - Loading indicator
  - Error state handling
  - Proper video quality management based on connection
- Implement positioning logic for initial vs scrolled state
- Add "Why [Location]" button overlay

## Step 4: Create Home Screen
- Create file `src/features/home/screens/HomeScreen.tsx`
- Implement main screen with the following sections:
  - Header with welcome message and user name
  - Promotional video section at the top
  - "Available Plots" section title
  - FlatList of property cards with proper spacing
  - Bottom navigation bar with icons
- Add pull-to-refresh functionality
- Implement scroll behavior for video minimization
- Add navigation handlers to property detail screen
- Handle loading and error states

## Step 5: Create Full Screen Video Component
- Create file `src/components/FullScreenVideo.tsx`
- Implement modal-based full screen player with:
  - Back button for navigation
  - Share functionality
  - Video controls
  - "START EXPLORING" call-to-action button
- Handle device orientation changes
- Implement proper safe area insets
- Add smooth transitions for opening/closing

## Step 6: Create Listings Screen
- Create file `src/features/property/screens/ListingsScreen.tsx`
- Build screen with:
  - "AVAILABLE PLOTS" header
  - Interactive filter slider/toggle
  - Scrollable property cards
  - Bottom navigation matching home screen
- Implement filter functionality by price, size, or location
- Add animation for filter slider interaction
- Implement sorting options
- Handle empty state with helpful message

## Step 7: Create Property Service
- Create file `src/services/propertyService.ts`
- Implement API service with the following methods:
  - `getProperties(filters)` - Fetches property listings with optional filters
  - `getPropertyById(id)` - Fetches single property details
  - `getFeaturedVideo()` - Retrieves promotional video URL and metadata
  - `getLocationInfo(locationId)` - Fetches details about specific locations
- Use API endpoints from constants file
- Implement proper error handling
- Cache results appropriately

## Step 8: Create Custom Hooks
- Create file `src/hooks/usePropertyData.ts`
- Implement custom hook for property data fetching:
  - Loading states
  - Error handling
  - Data pagination
  - Filter application
  - Data refreshing
- Create additional hooks for video player state management
- Add hooks for filter persistence

## Step 9: Implement Navigation Flow
- Create file `src/navigation/HomeStack.tsx`
- Define stack navigator for home and property features
- Include the following screens:
  - Home (main entry screen)
  - Listings (filtered property view)
  - PropertyDetail (individual property screen)
  - VideoPlayer (full screen video)
- Configure transitions between screens
- Set up deep linking options
- Add type-safe route parameters

## Step 10: Create Design System Components
- Create files for consistent UI elements:
  - `src/components/FilterSlider.tsx`
  - `src/components/BottomNavigationBar.tsx`
  - `src/components/PropertyHeaderLabel.tsx`
- Implement reusable components following the design system
- Ensure consistent spacing, typography, and colors
- Add dark mode support

## Implementation Details

### Property Card Structure
```typescript
interface PropertyCardProps {
  property: Property;
  onPress: (propertyId: string) => void;
  style?: StyleProp<ViewStyle>;
  showFavoriteButton?: boolean;
}

// Component implementation with:
// - Image with gradient overlay
// - Location and plot ID row
// - Price with currency formatting
// - Size with proper unit display
// - Shadow styling for card
```

### Home Screen Layout
```typescript
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  // State for:
  // - Properties list data
  // - Loading state
  // - Video minimization tracking
  // - Refresh control

  // Effects for:
  // - Initial data loading
  // - Scroll position tracking
  // - Video state management

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with welcome message */}
      {/* Promo video component with position management */}
      {/* "Why Location" button */}
      {/* Section title */}
      {/* FlatList of property cards */}
      {/* Bottom navigation bar */}
    </SafeAreaView>
  );
};
```

### Video Player Behavior
```typescript
// Logic for video positioning:
const videoHeight = useMemo(() => {
  // Calculate based on scroll position:
  // - Full height when at top of screen
  // - Minimized when scrolled
  // - Uses Animated values for smooth transitions
  return scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [VIDEO_HEIGHT_EXPANDED, VIDEO_HEIGHT_MINIMIZED],
    extrapolate: 'clamp',
  });
}, [scrollY]);
```

### Listings Screen Filtering
```typescript
// Filter implementation:
const applyFilters = useCallback((properties: Property[], filters: PropertyFilters) => {
  return properties.filter(property => {
    // Apply price range filter
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    
    // Apply size filter
    if (filters.minSize && property.sizeInSqFt < filters.minSize) return false;
    if (filters.maxSize && property.sizeInSqFt > filters.maxSize) return false;
    
    // Apply location filter
    if (filters.location && property.location.name !== filters.location) return false;
    
    return true;
  });
}, []);
```

### Animation and Interaction
```typescript
// For smooth interactions:
const filterPanResponder = useMemo(() => PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (_, gestureState) => {
    // Update filter value based on drag position
    const newValue = calculateValueFromGesture(gestureState);
    setFilterValue(newValue);
  },
  onPanResponderRelease: () => {
    // Apply the filter with current value
    applyFiltersWithValue(filterValue);
  },
}), [filterValue, applyFiltersWithValue]);
```

## Responsive Design Considerations
- Support different device sizes and orientations
- Use flexible layouts with percentage-based dimensions
- Implement proper safe area handling for notches and home indicators
- Consider tablet-specific layouts with multi-column property grid
- Ensure touch targets meet accessibility guidelines (minimum 44x44pt)

## Performance Optimizations
- Implement virtualized lists with FlatList
- Use image caching for property thumbnails
- Lazy load video content
- Memoize expensive calculations and component renders
- Optimize animations with useNativeDriver where possible
- Implement proper list item recycling with key prop and getItemLayout 