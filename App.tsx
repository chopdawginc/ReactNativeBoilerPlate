import { SafeAreaView } from 'react-native'
import React,{ useEffect} from 'react'
import { RootNavigation } from '@navigation'
import FlashMessage from 'react-native-flash-message'
import { LocalizationProvider, ThemeProvider } from '@contexts'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FLASH_POSITION } from '@enums/StyleGuide'


const App = () => {

  // useEffect(() => {
  //   try {
  //     GoogleSignin.configure({
  //       // TODO: REPLACE YOUR CLIENT_ID WITH TYPE 3
  //       webClientId: '', 
  //     });
  //   } catch (error) {

  //   }
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <LocalizationProvider>
          <RootNavigation />
          <FlashMessage position={FLASH_POSITION.TOP} />
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaView>
  )
}

export default App