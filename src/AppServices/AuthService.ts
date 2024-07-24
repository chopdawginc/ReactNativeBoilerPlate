// authService.ts
import { User } from '../collections/user'
import { FIREBASE_COLLECTION } from '@enums'
import { BaseService } from '../DatabaseServices/BaseService'
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export class AuthService extends BaseService<User> {

  constructor() {
    super(FIREBASE_COLLECTION.USERS)
  }

  // Register with email and password
  async register(data: any): Promise<User | null> {
    const { email, password } = data;
    try {
      const userCredentials = await Auth().createUserWithEmailAndPassword(email, password)
      const userId = userCredentials.user.uid

      let formattedData = {
        ...data,
        createdAt: new Date(),
        uid: userId,
      }
      delete formattedData.password

      await this.update(userId, formattedData)

      return formattedData
    } catch (e) {
      console.log(e)
      return null
    }
  }

  // Login with email and password
  async login(email: string, password: string): Promise<User | null> {
    const authUser = await Auth().signInWithEmailAndPassword(email, password)
    const savedUser = await this.read(authUser.user.uid)
    return savedUser
  }

  // Logout
  async logout(): Promise<void> {
    return await Auth().signOut()
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    return await Auth().sendPasswordResetEmail(email)
  }

  // Send email verification
  // async sendEmailVerification(): Promise<void> {
  //   if (Auth().currentUser) {
  //     return await sendEmailVerification(this.auth.currentUser);
  //   }
  //   throw new Error("No user is currently signed in");
  // }

  // Social login with Google
  async loginWithGoogle(): Promise<FirebaseAuthTypes.User | null> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { user, idToken } = await GoogleSignin.signIn()
      const users = await this.where('email', user.email)

      if (users.length !== 0) {
        const googleCredential = Auth.GoogleAuthProvider.credential(idToken)
        const { user } = await Auth().signInWithCredential(googleCredential)
        return user
      }
      return null
    } catch (error) {
      console.error('Google login failed', error)
      throw error
    }
  }

  // Social login with Facebook
  // async loginWithFacebook(): Promise<UserCredential> {
  //   const provider = new FacebookAuthProvider();
  //   return await signInWithPopup(this.auth, provider);
  // }

  // Phone number authentication
  // async phoneNumberAuth(phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<UserCredential> {
  //   const provider = new PhoneAuthProvider(this.auth);
  //   const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
  //   const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
  //   if (verificationCode) {
  //     const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
  //     return await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  //   }
  //   throw new Error("Verification code is required");
  // }
}
