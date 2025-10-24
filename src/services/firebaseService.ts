import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc as fsDoc,
  serverTimestamp,
  where as fsWhere,
  query as fsQuery,
  setDoc as fsSetDoc,
  getDoc as fsGetDoc,
  getDocs as fsGetDocs,
  orderBy as fsOrderBy,
  deleteDoc as fsDeleteDoc,
  collection as fsCollection,
} from '@react-native-firebase/firestore';
import {isIOS, showFlash} from '@shared/utils';
import {getMessaging, getToken} from '@react-native-firebase/messaging';
import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FIREBASE_COLLECTION, FIREBASE_ERROR, QUERY, STORAGE} from '@constant';
import {
  getStorage,
  ref as storageRef,
  putFile,
  getDownloadURL,
  uploadBytesResumable,
} from '@react-native-firebase/storage';

const db = getFirestore();

// Collection functions
export const fetchCollectionData = async (collection: string) => {
  let data: any[] = [];
  const q = fsQuery(fsCollection(db, collection), fsOrderBy('createdAt', 'desc'));
  const querySnapshot = await fsGetDocs(q);
  querySnapshot.forEach(function (docSnap: FirebaseFirestoreTypes.QueryDocumentSnapshot) {
    if (docSnap.exists()) {
      data.push({...docSnap.data()});
    } else {
      console.log('No document found!');
    }
  });
  return data;
};

export const fetchCollectionDataWithoutOrder = async (collection: string) => {
  let data: any[] = [];
  const querySnapshot = await fsGetDocs(fsCollection(db, collection));
  querySnapshot.forEach(function (docSnap: FirebaseFirestoreTypes.QueryDocumentSnapshot) {
    if (docSnap.exists()) {
      data.push({...docSnap.data()});
    } else {
      console.log('No document found!');
    }
  });
  return data;
};

export const fetchCollectionDataWithCondition = async (collection: string, key: string, id: string) => {
  let data: any = [];
  const q = fsQuery(fsCollection(db, collection), fsWhere(key as any, QUERY.EQUAL as any, id as any));
  const querySnapshot = await fsGetDocs(q);

  if (querySnapshot.empty) {
    return data;
  }
  querySnapshot.forEach(function (docSnap: FirebaseFirestoreTypes.QueryDocumentSnapshot) {
    if (docSnap.exists()) {
      data.push({...docSnap.data(), doc_id: docSnap.id});
    } else {
      console.log('No document found!');
    }
  });

  return data;
};

// Document functions
export const fetchDocumentData = async (collection: string, doc: string) => {
  let found = {};
  await fsGetDoc(fsDoc(db, collection, doc)).then(function (docSnap: FirebaseFirestoreTypes.DocumentSnapshot) {
    if (docSnap.exists()) {
      const dataObj = (docSnap.data() || {}) as Record<string, unknown>;
      found = {...dataObj, doc_id: docSnap?.id};
    }
  });
  return found;
};

export const addDocument = async (collection: string, jsonObject: any) => {
  try {
    const docRef = fsDoc(fsCollection(db, collection));
    jsonObject.documentId = docRef.id;
    jsonObject.createdAt = serverTimestamp();
    await fsSetDoc(docRef, jsonObject, {merge: true});
    return docRef.id;
  } catch (error) {
    console.error('Error writing document: ', error);
    return null;
  }
};

export async function updateDocument(collection: string, doc: string, jsonObject: any, merge = true) {
  await fsSetDoc(fsDoc(db, collection, doc), jsonObject, {merge}).catch(function (error) {
    console.error('Error writing document: ', error);
  });
}

export const deleteDocument = async (collection: string, doc: string) => {
  await fsDeleteDoc(fsDoc(db, collection, doc));
};

// SubCollections functions
export const saveDataInSubCollection = async (
  collection: string,
  doc: string,
  subCollection: string,
  jsonObject: any,
) => {
  const db = getFirestore();
  const subColRef = fsCollection(db, collection, doc, subCollection);
  const newDocRef = fsDoc(subColRef);

  await fsSetDoc(newDocRef, jsonObject, {merge: true})
    .then(() => {})
    .catch(error => console.log(error));
};

export const getSubCollectionData = async (collection: string, docId: string, subCollection: string) => {
  let data: any[] = [];
  const querySnapshot = await fsGetDocs(fsCollection(db, collection, docId, subCollection));
  querySnapshot.forEach(function (docSnap: FirebaseFirestoreTypes.QueryDocumentSnapshot) {
    if (docSnap?.exists()) {
      data.push({...docSnap.data()});
    }
  });
  return data;
};

// Auth functions
export const registerWithEmail = async (data: any, callback: Function) => {
  const {email, password, profileImage, firstName, lastName} = data;
  const authInstance = getAuth();
  await createUserWithEmailAndPassword(authInstance, email, password)
    .then(async userCredentials => {
      const userId = userCredentials?.user?.uid;

      const uploadedImage = await uploadFileToFirebaseStorage(profileImage, `${STORAGE.PROFILE}/${userId}`);

      if (uploadedImage !== 'false') {
        const dataToUpload = {
          uid: userId,
          firstName,
          lastName,
          email,
          isPhoneVerified: false,
          profileImage: uploadedImage,
          role: 'user',
          createdAt: serverTimestamp(),
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
    .then(() => {
      callback(false);
    });
};

export const loginWithEmail = async (email: string, password: string, callBack: Function) => {
  const authInstance = getAuth();
  signInWithEmailAndPassword(authInstance, email, password)
    .then(async data => {
      const fcmToken = await getToken(getMessaging());
      await updateDocument(FIREBASE_COLLECTION.USERS, data?.user?.uid, {
        fcmToken,
      });

      let userData = await fetchDocumentData(FIREBASE_COLLECTION.USERS, data.user.uid);
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
  const authInstance = getAuth();
  await sendPasswordResetEmail(authInstance, email)
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
  const authInstance = getAuth();
  await signOut(authInstance).then(() => callBack());
};

export const uploadFileToFirebaseStorage = (
  uri: string,
  path: string,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // iOS often needs file:// stripped when fetching
      const normalizedUri = isIOS() ? uri.replace(/^file:\/\//, '') : uri;

      const res = await fetch(normalizedUri);
      const blob = await res.blob();

      const storage = getStorage();
      const fileRef = storageRef(storage, path);

      const metadata = blob.type ? {contentType: blob.type} : undefined;

      const uploadTask = uploadBytesResumable(fileRef, blob, metadata);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        error => {
          reject(`Upload failed: ${error.message}`);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot?.ref as any);
            resolve(downloadURL);
          } catch (error: any) {
            reject(`Failed to retrieve download URL: ${error.message}`);
          }
        },
      );
    } catch (error: any) {
      reject(`Failed to start upload: ${error.message}`);
    }
  });
};

export const transformData = async (
  item: any,
  referenceFields: string[],
  setRelatedListener: (id: string, ref: FirebaseFirestoreTypes.DocumentReference) => void,
) => {
  let transformedItem = {...item};

  for (const field of referenceFields) {
    const ref = item[field];
    if (ref) {
      try {
        const docSnapshot = await ref.get();
        if (!docSnapshot.exists()) {
          throw new Error(`${field} document not found!`);
        }
        const relatedData = docSnapshot.data();

        setRelatedListener(ref.id, ref);

        transformedItem = {
          ...transformedItem,
          [`${field}Data`]: relatedData,
        };
      } catch (error) {
        console.error(`Error fetching ${field} data:`, error);
      }
    }
  }

  return transformedItem;
};
