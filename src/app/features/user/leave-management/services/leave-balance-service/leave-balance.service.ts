import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LeaveBalanceDetails } from '../../models/leaveBalanceDetails.interface';
import {
  LEAVE_BALANCE,
  LEAVE_BALANCE_DETAILS,
} from 'src/app/shared/constants/leaveDetails.constants';

@Injectable({
  providedIn: 'root',
})
export class LeaveBalanceService {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  userRef = collection(this.firestore, LEAVE_BALANCE);

  getLeaveBalance(userEmail: string): Observable<LeaveBalanceDetails> {
    return new Observable<LeaveBalanceDetails>((observer) => {
      getDoc(doc(this.userRef, userEmail))
        .then((docSnapshot) => {
          const leaveAvailable = docSnapshot.data();
          const leaveAvailableDetails: LeaveBalanceDetails = {
            annualLeaveRemaining:
              leaveAvailable?.[LEAVE_BALANCE_DETAILS.ANNUAL_LEAVE_REMAINING],
            annualLeaveTotal:
              leaveAvailable?.[LEAVE_BALANCE_DETAILS.ANNUAL_LEAVE_TOTAL],
            sickLeaveRemaining:
              leaveAvailable?.[LEAVE_BALANCE_DETAILS.SICK_LEAVE_REMAINING],
            sickLeaveTotal:
              leaveAvailable?.[LEAVE_BALANCE_DETAILS.SICK_LEAVE_TOTAL],
            specialLeaveTaken:
              leaveAvailable?.[LEAVE_BALANCE_DETAILS.SPECIAL_LEAVE_TAKEN],
          };
          observer.next(leaveAvailableDetails);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
