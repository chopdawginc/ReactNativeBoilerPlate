import {
  getFirestore,
  collection as fsCollection,
  doc as fsDoc,
  getDoc as fsGetDoc,
  setDoc as fsSetDoc,
  deleteDoc as fsDeleteDoc,
  getDocs as fsGetDocs,
  orderBy as fsOrderBy,
  where as fsWhere,
  query as fsQuery,
} from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FIRESTORE_FILTER, QUERY} from '@constant';

export default class BaseService<T> {
  protected collectionRef;

  constructor(collectionName: string) {
    this.collectionRef = fsCollection(getFirestore(), collectionName);
  }

  async create(data: T): Promise<void> {
    const docRef = fsDoc(this.collectionRef);
    const formattedData = {
      ...data,
      createdAt: new Date(),
      documentId: docRef.id,
    };
    return await fsSetDoc(docRef, formattedData);
  }

  async read(id: string): Promise<T | null> {
    const docRef = fsDoc(this.collectionRef, id);
    const doc = await fsGetDoc(docRef);
    if (!doc.exists()) {
      return null;
    }
    return doc.data() as T;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = fsDoc(this.collectionRef, id);
    await fsSetDoc(docRef, data as any, {merge: true});
  }

  async delete(id: string): Promise<void> {
    const docRef = fsDoc(this.collectionRef, id);
    await fsDeleteDoc(docRef);
  }

  async list(): Promise<T[]> {
    const q = fsQuery(this.collectionRef, fsOrderBy(FIRESTORE_FILTER.CREATED_AT, 'desc'));
    const snapshot = await fsGetDocs(q);
    return snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => doc.data() as T);
  }

  async where(key: string, value: any, queryOp: FirebaseFirestoreTypes.WhereFilterOp = QUERY.EQUAL): Promise<T[]> {
    const q = fsQuery(this.collectionRef, fsWhere(key, queryOp, value));
    const snapshot = await fsGetDocs(q);
    return snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => doc.data() as T);
  }
}
