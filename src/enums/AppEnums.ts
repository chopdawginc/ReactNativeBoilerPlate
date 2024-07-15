
export enum FIREBASE_COLLECTION {
    USERS = 'users',
}

export enum STORAGE {
    PROFILE = 'profileImages'
}

export const FIREBASE_ERROR = {
    EMAIL_ALREADY_EXISTS: 'auth/email-already-in-use',
    WRONG_PASSWORD: 'auth/wrong-password',
    NO_USER_FOUND: 'auth/user-not-found',
    INVALID_EMAIL: 'auth/invalid-email',
}

export enum QUERY {
    EQUAL = '==',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    LESS_THAN = '<',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN_OR_EQUAL = '<=',
    ARRAY_CONTAINS = 'array-contains',
    ARRAY_CONTAINS_ANY = 'array-contains-any',
    IN = 'in',
    NOT_IN = 'not-in',
}

export enum KEYS {
    THEME = '@theme',
    LANGUAGE = 'language',
}

export enum SCREEN {
    LOGIN = 'LoginScreen',
    SIGNUP = 'SignupScreen',
    EDIT_PROFILE = 'EditProfile',
}

export enum PERMISSION {
    CAMERA = 'camera',
    GALLERY = 'gallery',
    LOCATION = 'location',
    CONTACTS = 'contacts',
    NOTIFICATIONS = 'notifications',
}

export enum THEME {
    LIGHT = 'light',
    DARK = 'dark',
}
