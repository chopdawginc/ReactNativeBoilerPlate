// authService.ts
import {FIREBASE_COLLECTION} from '@constant';
import BaseService from './baseService';
import {showFlash} from '@shared/utils';
import {User} from '../collections/user';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
  AppleAuthProvider,
} from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Timestamp} from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId: '123.apps.googleusercontent.com',
});

export default class AuthService extends BaseService<User> {
  constructor() {
    super(FIREBASE_COLLECTION.USERS);
  }

  // Register with email and password
  async register(data: any): Promise<User | null> {
    const {email, password} = data;
    try {
      const authInstance = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(authInstance, email, password);
      const userId = userCredentials.user.uid;

      let formattedData = {
        ...data,
        createdAt: new Date(),
        uid: userId,
      };
      delete formattedData.password;

      await this.update(userId, formattedData);

      return formattedData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // Login with email and password
  async login(email: string, password: string): Promise<User | null> {
    const authUser = await signInWithEmailAndPassword(getAuth(), email, password);
    const savedUser = await this.read(authUser.user.uid);
    return savedUser;
  }

  // Logout
  async logout(): Promise<void> {
    return await signOut(getAuth());
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(getAuth(), email);
  }

  // Send email verification
  async sendEmailVerification(): Promise<void> {
    if (getAuth().currentUser) {
      return await sendEmailVerification(getAuth().currentUser as any);
    }
    throw new Error('No user is currently signed in');
  }

  // Social login with Google
  async loginWithGoogle(): Promise<{user: User | null; eventType: 'signup' | 'signin'}> {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();

      if (signInResult.idToken && signInResult.user) {
        const users = await this.where('email', signInResult.user.email);

        if (users.length !== 0) {
          // User exists - sign in
          const googleCredential = GoogleAuthProvider.credential(signInResult.idToken);
          const {user: firebaseUser} = await signInWithCredential(getAuth(), googleCredential);
          const user = await this.read(firebaseUser?.uid);

          return {user, eventType: 'signin' as const};
        } else {
          // User doesn't exist - register new user
          const googleCredential = GoogleAuthProvider.credential(signInResult.idToken);
          const {user: firebaseUser} = await signInWithCredential(getAuth(), googleCredential);

          // Create user data
          const userData: Partial<User> = {
            email: signInResult.user.email,
            firstName: signInResult.user.givenName || '',
            lastName: signInResult.user.familyName || '',
            createdAt: Timestamp.now(),
            id: firebaseUser.uid,
          };

          await this.update(firebaseUser.uid, userData);
          const newUser = await this.read(firebaseUser.uid);
          return {user: newUser, eventType: 'signup' as const};
        }
      }
      return {user: null, eventType: 'signin' as const};
    } catch (error: any) {
      console.error('Google login failed', error);
      throw error;
    }
  }

  // Social login with Apple
  async loginWithApple(): Promise<{user: User | null; eventType: 'signup' | 'signin'}> {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        return {user: null, eventType: 'signin' as const};
      }

      const {identityToken, nonce, fullName} = appleAuthRequestResponse;

      // Try to read email from the Apple ID token (often only present on first sign-in)
      let emailFromToken: string | null = null;
      try {
        // @ts-expect-error
        const decoded: any = jwt_decode(identityToken);
        emailFromToken = decoded?.email ?? null;
      } catch {
        // ignore decode failures; we'll fall back below
      }

      // If we have an email, check if the user already exists
      let users: User[] = [];
      if (emailFromToken) {
        users = await this.where('email', emailFromToken);
      }

      // Create Firebase credential and sign in
      const appleCredential = AppleAuthProvider.credential(identityToken, nonce);
      const {user: firebaseUser} = await signInWithCredential(getAuth(), appleCredential);

      // If user exists by email OR already has a user doc by UID -> signin
      if (users.length !== 0) {
        const user = await this.read(firebaseUser?.uid);
        return {user, eventType: 'signin' as const};
      }

      const existingByUid = await this.read(firebaseUser?.uid);
      if (existingByUid) {
        return {user: existingByUid, eventType: 'signin' as const};
      }

      // Otherwise, create a new user (signup)
      const userData: Partial<User> = {
        email: emailFromToken || firebaseUser?.email || '',
        firstName: fullName?.givenName || '',
        lastName: fullName?.familyName || '',
        createdAt: Timestamp.now(),
        id: firebaseUser.uid,
      };

      await this.update(firebaseUser.uid, userData);
      const newUser = await this.read(firebaseUser.uid);
      return {user: newUser, eventType: 'signup' as const};
    } catch (error: any) {
      console.error('Apple login failed', error);
      throw error;
    }
  }
}
