import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    orderBy,
    query,
    getDocs,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Reading } from '../interfaces/Reading';
import { Setting } from '../interfaces/Setting';
import { Item } from '../interfaces/Item';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private firestore: Firestore) {}

    /**
     * Firebase Integration
     */
    
    getReading(): Observable<Reading[]> {
        const readingRef = collection(this.firestore, 'meter-reading');
        const orderByDate = query(readingRef, orderBy('date', 'desc'));

        return from(getDocs(orderByDate)).pipe(
            map((querySnapshot) => {
                const readings: Reading[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    const date = data.date;
                    const reading = data.reading;
                    const inputType = data.inputType;
                    readings.push({
                        id,
                        date,
                        reading,
                        inputType,
                    });
                });
                return readings;
            })
        );
    }

    addReading(reading: any) {
        const readingRef = collection(this.firestore, 'meter-reading');
        return addDoc(readingRef, reading);
    }

    deleteReading(reading: Reading) {
        const readingDocRef = doc(this.firestore, `meter-reading/${reading}`);
        return deleteDoc(readingDocRef);
    }

    getItem(): Observable<Item[]> {
        const q = query(collection(this.firestore, 'items'));

        return from(getDocs(q)).pipe(
            map((querySnapshot) => {
                const items: Item[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    const name = data.name;
                    const watts = data.watts;
                    const hours = data.hours;
                    items.push({
                        id,
                        name,
                        watts,
                        hours,
                    });
                });
                return items;
            })
        );
    }

    addItem(item: any) {
        const itemRef = collection(this.firestore, 'items');
        return addDoc(itemRef, item);
    }

    deleteItem(item: any) {
        const itemDocRef = doc(this.firestore, `items/${item.id}`);
        return deleteDoc(itemDocRef);
    }

    updateItem(item: Item) {
        const itemDocRef = doc(this.firestore, `items${item.id}`);
        return updateDoc(itemDocRef, {
            name: item.name,
            watts: item.watts,
            hours: item.hours,
        });
    }

    getSetting(): Observable<any[]> {
        const q = query(collection(this.firestore, 'settings'));

        return from(getDocs(q)).pipe(
            map((querySnapshot) => {
                const settings: Setting[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    const energyRate = data.energyRate;
                    const standingChargeRate = data.standingChargeRate;
                    settings.push({
                        id,
                        energyRate,
                        standingChargeRate,
                    });
                });
                return settings;
            })
        );
    }

    updateSetting(updatedSettings: any): Observable<void> {
        const docRef = doc(this.firestore, 'settings', updatedSettings.id);
        const settingsToUpdate = {
            energyRate: updatedSettings.energyRate,
            standingChargeRate: updatedSettings.standingChargeRate,
        };

        return from(updateDoc(docRef, settingsToUpdate));
    }
}
