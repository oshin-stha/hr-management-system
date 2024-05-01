import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { Policy } from '../../models/policy.interface';

@Injectable({
  providedIn: 'root',
})
export class GetPolicyService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  POLICY_DETAILS_REF = collection(this.FIRESTORE, 'PolicyDetails');
  policyDetail: Policy[] = [];

  getPolicyDetails(policyType: string): Observable<Policy> {
    this.policyDetail = [];
    return new Observable<Policy>((observer) => {
      getDocs(this.POLICY_DETAILS_REF).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()['policyType'] === policyType) {
            this.policyDetail.push(doc.data() as Policy);
          }
        });
        observer.next(this.policyDetail[0]);
        observer.complete();
      });
    });
  }
}
