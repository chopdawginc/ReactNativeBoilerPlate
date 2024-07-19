// authService.ts
import { initializeApp } from "firebase/app";
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, UserCredential } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(app);
  }

  // Register with email and password
  async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login with email and password
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // Send email verification
  async sendEmailVerification(): Promise<void> {
    if (this.auth.currentUser) {
      return await sendEmailVerification(this.auth.currentUser);
    }
    throw new Error("No user is currently signed in");
  }

  // Social login with Google
  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Social login with Facebook
  async loginWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Phone number authentication
  async phoneNumberAuth(phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<UserCredential> {
    const provider = new PhoneAuthProvider(this.auth);
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
    const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
    if (verificationCode) {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      return await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
    }
    throw new Error("Verification code is required");
  }
}
