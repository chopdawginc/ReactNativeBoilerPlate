// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import RootNavigation from './src/navigation/RootNavigation';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return <RootNavigation />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { RootNavigation } from '@navigation';
import { FLASH_POSITION } from '@styles/theme';
import FlashMessage from 'react-native-flash-message';
import { LocalizationProvider, ThemeProvider } from '@contexts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <RootNavigation />
          <FlashMessage position={FLASH_POSITION.TOP} />
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
