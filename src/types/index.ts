

import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
import { SCREEN } from '@constant';
import { PermissionStatus } from 'react-native-permissions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PermissionType = 'camera' | 'gallery' | 'location' | 'contacts' | 'notifications';

export interface PermissionsState {
  camera: PermissionStatus;
  gallery: PermissionStatus;
  location: PermissionStatus;
  contacts: PermissionStatus;
  notifications: PermissionStatus;
}

export interface AsyncStorageHook<T> {
  fetchAsync: (key: string) => Promise<T | null>;
  saveAsync: (key: string, value: T) => Promise<void>;
  deleteAsync: (key: string) => Promise<void>;
}

export interface UseSearchHandlers {
  search: string;
  handleSearch: (text: string) => void;
}

export type Timestamp = {
  seconds: number;
  nanoseconds?: number;
};

export type DateFormatOptions = {
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
};

export interface ThemeContextProps {
  currentTheme: string;
  THEME_COLOR: any;
  toggleTheme: Function;
}

export interface LocalizationContextType {
  t: (key: string, options?: any) => string;
  changeLanguage: (lng: string) => void;
  currentLanguage: string;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: Function;
  isLoading?: Boolean;
  textStyle?: TextStyle;
}

export interface ProfileProps {
  user: any
}

export interface HomeProps {
  registerUser: () => void
  loginUser: () => void
  createProduct: () => void
  updateProduct: () => void
  deleteProduct: () => void
  getProducts: () => void
}

export interface ProfileHeaderProps {
  name: string
}

export interface ProfileScreenProps {
  user: { name: string } | null
}

export interface EditProfileScreenProps {
  user: { name: string } | null
  onUpdateProfile: (newData: { name: string }) => void
}

export type RootStackParamList = {
  [SCREEN.LOGIN]: undefined;
  [SCREEN.PROFILE]: undefined;
  [SCREEN.EDIT_PROFILE]: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface LoginScreenProps {
  onLogin: (email: string, password: string) => void
  onGoogleLogin: () => void
  error?: string | null
  loading?: boolean
}

export interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  onGoogleLogin: () => void
  loading?: boolean
}

export interface ifProps {
  condition: any
  children: React.ReactNode
  elseComp?: React.ReactNode
}

export interface LabelProps {
  children: any
  style?: StyleProp<TextStyle>
}
