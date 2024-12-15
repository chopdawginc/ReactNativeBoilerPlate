import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react';
import {KEYS, THEME} from '@constant';
import {useAsyncStorage} from '@hooks';
import {LIGHT_MODE, DARK_MODE} from '@styles/theme';
import {ThemeContextProps, ProviderProps} from '@types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ProviderProps> = ({children}) => {
  const [colors, setColors] = useState(LIGHT_MODE);
  const {fetchAsync, saveAsync} = useAsyncStorage();
  const [currentTheme, setCurrentMode] = useState(THEME.LIGHT);

  const getSavedTheme = useCallback(async () => {
    const fetchCurrentTheme = await fetchAsync(KEYS.THEME);
    if (fetchCurrentTheme === THEME.DARK) {
      setCurrentMode(THEME.DARK);
      setColors(DARK_MODE);
    } else if (fetchCurrentTheme === THEME.LIGHT) {
      setCurrentMode(THEME.LIGHT);
      setColors(LIGHT_MODE);
    }
  }, [fetchAsync]);

  useEffect(() => {
    getSavedTheme();
  }, [getSavedTheme]);

  const onThemeShift = useCallback(async () => {
    setCurrentMode(prevMode => {
      const newMode = prevMode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      setColors(newMode === THEME.LIGHT ? LIGHT_MODE : DARK_MODE);
      saveAsync(KEYS.THEME, newMode);
      return newMode;
    });
  }, [saveAsync]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        THEME_COLOR: colors,
        toggleTheme: onThemeShift,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
