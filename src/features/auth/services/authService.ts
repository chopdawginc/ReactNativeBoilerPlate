// authService.ts
import { FIREBASE_COLLECTION } from '@constant'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import Auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { BaseService } from '@services'
import { showFlash } from '@shared/utils'
import { User } from '../../../collections/user'

export default class AuthService extends BaseService<User> {

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
  async loginWithGoogle(): Promise<User | null> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { user, idToken } = await GoogleSignin.signIn()
      const users = await this.where('email', user.email)

      if (users.length !== 0) {
        const googleCredential = Auth.GoogleAuthProvider.credential(idToken)
        const { user: firebaseUser } = await Auth().signInWithCredential(googleCredential)
        const user = await this.read(firebaseUser?.uid)
        return user
      }
      return null
    } catch (error) {
      console.error('Google login failed', error)
      throw error
    }
  }


  // Social login with Apple
  async loginWithApple(): Promise<User | null> {
    try {

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned')
      }

      // @ts-expect-error
      const { email }: any = jwt_decode(appleAuthRequestResponse.identityToken)
      const users = await this.where('email', email)

      if (users.length !== 0) {
        const { identityToken, nonce } = appleAuthRequestResponse
        const appleCredential = Auth.AppleAuthProvider.credential(identityToken, nonce)
        const { user: firebaseUser } = await Auth().signInWithCredential(appleCredential)

        const userInfo =  await this.read(firebaseUser?.uid)
        return userInfo
      } else {
        showFlash('No user exists in our records.')
        return null

      }

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
