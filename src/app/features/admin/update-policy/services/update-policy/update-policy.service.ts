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
  selectedpolicyContent: string[] = [];
  selectedPolicyType = '';
  sickLeave = 0;
  annualLeave = 0;

  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  policyRef = collection(this.firestore, 'PolicyDetails');

  addPolicyDetails(data: Policy): Observable<Policy> {
    // return from(setDoc(doc(this.policyRef, policyType), data));
    return new Observable<Policy>((observer) => {
      setDoc(doc(this.policyRef, data.policyType), data)
        .then(() => {
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

  patchValuetoForm(selectedPolicyType: string): Observable<Policy> {
    return new Observable<Policy>((observer) => {
      getDocs(this.policyRef).then((snapshot) => {
        let selectedPolicyContents: Policy = {} as Policy;
        snapshot.docs.forEach((doc) => {
          if (doc.data()['policyType'] === selectedPolicyType)
            selectedPolicyContents = {
              policyType: doc.data()['policyType'],
              policyList: doc.data()['policyList'],
              sickLeave: doc.data()['sickLeave'],
              annualLeave: doc.data()['annualLeave'],
            };
        });
        observer.next(selectedPolicyContents);
        observer.complete();
      });
    });
  }
}
