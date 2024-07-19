// baseService.ts
import Firestore from '@react-native-firebase/firestore'

export class BaseService<T> {
  private collection;

  constructor(private firestore: Firestore, private collectionName: string) {
    this.collection = firestore.collection(collectionName);
  }

  async create(data: T): Promise<void> {
    const docRef = this.collection.doc();
    await docRef.set(data);
  }

  async read(id: string): Promise<T | null> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    return doc.data() as T;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = this.collection.doc(id);
    await docRef.update(data);
  }

  async delete(id: string): Promise<void> {
    const docRef = this.collection.doc(id);
    await docRef.delete();
  }

  async list(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data() as T);
  }
}
