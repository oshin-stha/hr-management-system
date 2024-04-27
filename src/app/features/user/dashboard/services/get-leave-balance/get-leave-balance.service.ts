import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { RemainingLeaves } from '../../models/remaining-leave.interface';

@Injectable({
  providedIn: 'root',
})
export class GetLeaveBalanceService {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  userRef = collection(this.firestore, 'leaveBalance');

  getRemainingLeaveBalance(
    userEmail: string | null,
  ): Observable<RemainingLeaves> {
    return new Observable<RemainingLeaves>((observer) => {
      getDocs(this.userRef)
        .then((snapshot) => {
          let remainingLeaves: RemainingLeaves = {} as RemainingLeaves;
          snapshot.docs.forEach((doc) => {
            if (doc.id === userEmail) {
              remainingLeaves = {
                annualLeaveRemaining: doc.data()['annualLeaveRemaining'],
                sickLeaveRemaining: doc.data()['sickLeaveRemaining'],
                specialLeaveTaken: doc.data()['specialLeaveTaken'],
              };
            }
          });
          observer.next(remainingLeaves);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
