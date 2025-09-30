import { FIREBASE_COLLECTION, FIREBASE_ERROR, QUERY, STORAGE } from '@constant';
import auth from '@react-native-firebase/auth';
import { isIOS, showFlash } from '@shared/utils';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Collection functions
export const fetchCollectionData = async (collection: string) => {
  let data: any[] = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .orderBy('createdAt', 'desc')
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data() });
    } else {
      console.log('No document found!');
    }
  });
  return data;
};

export const fetchCollectionDataWithoutOrder = async (collection: string) => {
  let data: any[] = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data() });
    } else {
      console.log('No document found!');
    }
  });
  return data;
};

export const fetchCollectionDataWithCondition = async (
  collection: string,
  key: string,
  id: string,
) => {
  let data: any = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, QUERY.EQUAL, id)
    .get();

  if (querySnapshot.empty) {
    return data;
  }
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data(), doc_id: doc.id });
    } else {
      console.log('No document found!');
    }
  });

  return data;
};

// Document functions
export const fetchDocumentData = async (collection: string, doc: string) => {
  let found = {};
  await firestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        found = { ...doc.data(), doc_id: doc?.id };
      }
    });
  return found;
};

export const addDocument = async (collection: string, jsonObject: any) => {
  try {
    const docRef = firestore().collection(collection).doc();
    jsonObject.documentId = docRef.id;
    jsonObject.createdAt = firestore.FieldValue.serverTimestamp();
    await docRef.set(jsonObject, { merge: true });
    return docRef.id;
  } catch (error) {
    console.error('Error writing document: ', error);
    return null;
  }
};

export async function updateDocument(
  collection: string,
  doc: string,
  jsonObject: any,
  merge = true,
) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}

export const deleteDocument = async (collection: string, doc: string) => {
  await firestore().collection(collection).doc(doc).delete();
};

// SubCollections functions
export const saveDataInSubCollection = async (
  collection: string,
  doc: string,
  subCollection: string,
  jsonObject: any,
) => {
  const docRef = await firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .doc();

  await docRef
    .set(jsonObject, { merge: true })
    .then(() => {})
    .catch(error => console.log(error));
};

export const getSubCollectionData = async (
  collection: string,
  docId: string,
  subCollection: string,
) => {
  let data: any[] = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .doc(docId)
    .collection(subCollection)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc?.exists) {
      data.push({ ...doc.data() });
    }
  });
  return data;
};

// Auth functions
export const registerWithEmail = async (data: any, callback: Function) => {
  const { email, password, profileImage, firstName, lastName } = data;
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userCredentials => {
      const userId = userCredentials?.user?.uid;

      const uploadedImage = await uploadImage(
        profileImage,
        `${STORAGE.PROFILE}/${userId}`,
      );

      if (uploadedImage !== 'false') {
        const dataToUpload = {
          uid: userId,
          firstName,
          lastName,
          email,
          isPhoneVerified: false,
          profileImage: uploadedImage,
          role: 'user',
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        await updateDocument(FIREBASE_COLLECTION.USERS, userId, dataToUpload);
      }
    })
    .catch(e => {
      if (e?.code === FIREBASE_ERROR.EMAIL_ALREADY_EXISTS) {
        showFlash('This email already exits');
        return;
      } else if (e?.code === FIREBASE_ERROR.INVALID_EMAIL) {
        showFlash('This is an invalid email');
        return;
      } else {
        showFlash(e?.message ? e?.message : e?.code);
      }
      console.error(e);
    })
    .finally(() => {
      callback(false);
    });
};

export const loginWithEmail = async (
  email: string,
  password: string,
  callBack: Function,
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(async data => {
      const fcmToken = await messaging().getToken();
      await updateDocument(FIREBASE_COLLECTION.USERS, data?.user?.uid, {
        fcmToken,
      });

      let userData = await fetchDocumentData(
        FIREBASE_COLLECTION.USERS,
        data.user.uid,
      );
      callBack(userData);
    })
    .catch(e => {
      callBack();
      if (e?.code === FIREBASE_ERROR.EMAIL_ALREADY_EXISTS) {
        showFlash('This email already exits');
        return;
      } else if (e?.code === FIREBASE_ERROR.WRONG_PASSWORD) {
        showFlash('This password is incorrect');
        return;
      } else if (e?.code === FIREBASE_ERROR.NO_USER_FOUND) {
        showFlash('user not found');
        return;
      } else if (e?.code === FIREBASE_ERROR.INVALID_EMAIL) {
        showFlash('This email is invalid');
        return;
      } else {
        showFlash(e?.message ? e?.message : e?.code);
      }
    });
};

export const resetPassword = async (email: string, callBack: Function) => {
  await auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      showFlash('Email sent!');
      callBack();
    })
    .catch(error => {
      callBack();
      if (error?.code === FIREBASE_ERROR.NO_USER_FOUND) {
        showFlash(`No user with ${email} found`);
        return;
      }
    });
};

export const logout = async (callBack: Function) => {
  await auth()
    .signOut()
    .then(() => callBack());
};

export const uploadImage = async (folder: string, path: string) => {
  const uri = path;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = isIOS() ? uri.replace('file://', '') : uri;

  const task = storage().ref(`${folder}/${filename}`).putFile(uploadUri);

  try {
    await task;
    const url = await storage().ref(`${folder}/${filename}`).getDownloadURL();
    return url;
  } catch (e) {
    console.error(e);
    return 'false';
  }
};
