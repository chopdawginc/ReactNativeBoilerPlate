import { SafeAreaView } from 'react-native';
import React from 'react';
import { RootNavigation } from '@navigation';
import { FLASH_POSITION } from '@styles/theme';
import FlashMessage from 'react-native-flash-message';
import { LocalizationProvider, ThemeProvider } from '@contexts';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <LocalizationProvider>
          <RootNavigation />
          <FlashMessage position={FLASH_POSITION.TOP} />
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
