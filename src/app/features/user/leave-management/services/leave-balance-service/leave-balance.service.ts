import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
  app = initializeApp(firebaseConfig)
  firestore = getFirestore(this.app)
  userRef = collection(this.firestore, 'leaveBalance')

  getLeaveBalance(userEmail: string): Observable<LeaveBalanceDetails> {
    return new Observable<LeaveBalanceDetails>(observer => {
      getDoc(doc(this.userRef, userEmail))
        .then((docSnapshot) => {
          const leaveAvailable = docSnapshot.data();
          const leaveAvailableDetails: LeaveBalanceDetails = {
            totalLeave: leaveAvailable?.['totalLeave'],
            leaveAvailable: leaveAvailable?.['leaveAvailable']
          }
          observer.next(leaveAvailableDetails);
        })
        .catch(error => {
          observer.error(error);
        });
    });

  }
}
