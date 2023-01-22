import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reading } from '../interfaces/Reading';
import { Item } from '../interfaces/Item';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  // firebase integration

  getReading(): Observable<Reading[]> {
    const readingRef = collection(this.firestore, 'meter-reading');
    const orderByDate = query(readingRef, orderBy('date', 'desc'));
    return collectionData(orderByDate, { idField: 'id' }) as Observable<
      Reading[]
    >;
  }

  getReadingById(id): Observable<Reading[]> {
    const readingDocRef = doc(this.firestore, `meter-reading/${id}`);
    return docData(readingDocRef, { idField: 'id' }) as Observable<Reading[]>;
  }

  addReading(reading: any) {
    const readingRef = collection(this.firestore, 'meter-reading');
    return addDoc(readingRef, reading);
  }

  getItem(): Observable<Item[]> {
    const itemRef = collection(this.firestore, 'items');
    return collectionData(itemRef, { idField: 'id' }) as Observable<Item[]>;
  }

  addItem(item: any) {
    const itemRef = collection(this.firestore, 'items');
    return addDoc(itemRef, item);
  }

  deleteItem(item: any) {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return deleteDoc(itemDocRef);
  }

  getItemById(id): Observable<Item[]> {
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return docData(itemDocRef, { idField: 'id' }) as Observable<Item[]>;
  }

  updateItem(item: Item) {
    const itemDocRef = doc(this.firestore, `items${item.id}`);
    return updateDoc(itemDocRef, {
      name: item.name,
      watts: item.watts,
      hours: item.hours,
    });
  }

  deleteReading(reading: Reading) {
    const readingDocRef = doc(this.firestore, `meter-reading/${reading}`);
    return deleteDoc(readingDocRef);
  }

  getSettings() {
    const settingsRef = collection(this.firestore, 'settings');
    return collectionData(settingsRef, { idField: 'id' });
  }
}
