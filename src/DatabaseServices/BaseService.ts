// // baseService.ts
import firestore from '@react-native-firebase/firestore'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export class BaseService<T> {
  protected collection

  constructor(collectionName: string) {
    this.collection = firestore().collection(collectionName)
  }

  async create(data: T): Promise<void> {
    const docRef = this.collection.doc()
    const formattedData = {
      ...data,
      createdAt: new Date(),
      documentId: docRef.id,
    }
    return await docRef.set(formattedData)
  }

  async read(id: string): Promise<T | null> {
    const docRef = this.collection.doc(id)
    const doc = await docRef.get()
    if (!doc.exists) {
      return null
    }
    return doc.data() as T
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = this.collection.doc(id)
    await docRef.set(data, { merge: true })
  }

  async delete(id: string): Promise<void> {
    const docRef = this.collection.doc(id)
    await docRef.delete()
  }

  async list(): Promise<T[]> {
    const snapshot = await this.collection.orderBy('createdAt', 'desc').get()
    return snapshot.docs.map(doc => doc.data() as T)
  }

  async where(key: string, value: any, query: FirebaseFirestoreTypes.WhereFilterOp = '=='): Promise<T[]> {
    const snapshot = await this.collection.where(key, query, value).get()
    return snapshot.docs.map(doc => doc.data() as T)
  }
}
