import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseConfig } from 'src/app/environments/environment';
import { Policy } from '../../models/policy.interface';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdatePolicyService {
  selectedPolicyContent: string[] = [];
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  policyRef = collection(this.firestore, 'PolicyDetails');

  addPolicyDetails(data: Policy): Observable<Policy> {
    // return from(setDoc(doc(this.policyRef, policyType), data));
    return new Observable<Policy>((observer) => {
      console.log('uyguy');
      setDoc(doc(this.policyRef, data.policyType), data)
        .then(() => {
          console.log('service running', data);
          observer.next(data);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updatePolicyDetails(data: Policy) {
    return from(updateDoc(doc(this.policyRef, data.policyType), { ...data }));
  }

  patchValuetoForm(selectedPolicyType: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      getDocs(this.policyRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()['policyType'] === selectedPolicyType)
            this.selectedPolicyContent = doc.data()['policyList'];
        });
        observer.next(this.selectedPolicyContent);
        observer.complete();
      });
    });
  }
}
