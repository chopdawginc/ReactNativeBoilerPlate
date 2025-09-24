import 'react-native-gesture-handler';
import React from 'react';
import {RootNavigation} from '@navigation';
import {FLASH_POSITION} from '@styles/theme';
import FlashMessage from 'react-native-flash-message';
import {LocalizationProvider, ThemeProvider} from '@contexts';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
