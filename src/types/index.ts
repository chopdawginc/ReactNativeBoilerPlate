// @index.ts

// Importing necessary types from 'react-native' and other libraries
import {TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {PermissionStatus} from 'react-native-permissions';

// Define a type for different permission types that the application might request
export type PermissionType =
  | 'camera'
  | 'gallery'
  | 'location'
  | 'contacts'
  | 'notifications';

// Interface representing the state of various permissions in the application
export interface PermissionsState {
  camera: PermissionStatus; // Status of camera permission
  gallery: PermissionStatus; // Status of gallery permission
  location: PermissionStatus; // Status of location permission
  contacts: PermissionStatus; // Status of contacts permission
  notifications: PermissionStatus; // Status of notifications permission
}

// Generic interface for handling asynchronous storage operations
export interface AsyncStorageHook<T> {
  fetchAsync: (key: string) => Promise<T | null>; // Function to fetch data asynchronously
  saveAsync: (key: string, value: T) => Promise<void>; // Function to save data asynchronously
  deleteAsync: (key: string) => Promise<void>; // Function to delete data asynchronously
}

// Interface for handling search operations
export interface UseSearchHandlers {
  search: string; // Current search query
  handleSearch: (text: string) => void; // Function to update the search query
}

// Type representing a timestamp with seconds and optional nanoseconds
export type Timestamp = {
  seconds: number; // Number of seconds
  nanoseconds?: number; // Optional number of nanoseconds
};

// Type for formatting date options, used in date formatting functions
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

// Interface for theme context properties, used in theming the application
export interface ThemeContextProps {
  currentTheme: string; // Current theme name
  THEME_COLOR: any; // Theme color settings
  toggleTheme: Function; // Function to toggle between themes
}

// Interface for localization context, used for internationalization
export interface LocalizationContextType {
  t: (key: string, options?: any) => string; // Function to translate keys into localized strings
  changeLanguage: (lng: string) => void; // Function to change the current language
  currentLanguage: string; // Current language code
}

// Interface for provider props, typically used in context providers
export interface ProviderProps {
  children: React.ReactNode; // React nodes to be rendered as children
}

// Interface for button properties, used in button components
export interface ButtonProps {
  text: string; // Text to be displayed on the button
  style?: ViewStyle; // Optional style for the button
  onPress?: Function; // Optional function to handle button press
  isLoading?: Boolean; // Optional flag to indicate loading state
  textStyle?: TextStyle; // Optional style for the button text
}
