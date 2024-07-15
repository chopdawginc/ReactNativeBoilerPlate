import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { showFlash } from '@helpers'
import { FIREBASE_COLLECTION } from '@enums'
import auth from '@react-native-firebase/auth'
import { getCollectionDataWhere, getDocumentData } from '@helpers'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication'

const useSocialLogins = () => {
    const [userData, setUserData] = useState({})
    const [appleLoading, setAppleLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const onGoogleLogin = async () => {
        try {
            setGoogleLoading(true)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
            const { user, idToken } = await GoogleSignin.signIn()
            const users = await getCollectionDataWhere(FIREBASE_COLLECTION.USERS, 'email', user.email)

            if (users.length !== 0) {
                const googleCredential = auth.GoogleAuthProvider.credential(idToken)
                const { user: firebaseUser } = await auth().signInWithCredential(googleCredential)
                const userInfo = await getDocumentData(FIREBASE_COLLECTION.USERS, firebaseUser.uid)
                setUserData(userInfo)
            }
            else showFlash('No user exists in our records.')
        } catch (error) {
            console.log('ERROR:', error)
        } finally {
            setGoogleLoading(false)
        }
    }


    const onAppleLogin = async () => {
        try {
            setAppleLoading(true)

            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            })

            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identity token returned')
            }

            // @ts-expect-error
            const { email }: any = jwt_decode(appleAuthRequestResponse.identityToken)

            const users = await getCollectionDataWhere(FIREBASE_COLLECTION.USERS, 'email', email)

            if (users.length !== 0) {
                const { identityToken, nonce } = appleAuthRequestResponse
                const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
                const { user: firebaseUser } = await auth().signInWithCredential(appleCredential)

                const userInfo = await getDocumentData(FIREBASE_COLLECTION.USERS, firebaseUser.uid)
                setUserData(userInfo)
            } else { showFlash('No user exists in our records.') }

            console.log('Email:', email)

        } catch (error) { console.log('ERROR:', error) } finally { setAppleLoading(false) }
    }

    return {
        userData,
        onGoogleLogin,
        googleLoading,
        onAppleLogin,
        appleLoading,
    }
}

export default useSocialLogins

