import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LEAVE_OVERVIEW_ERRORS } from 'src/app/shared/constants/errors.constants';

@Injectable({
  providedIn: 'root',
})
export class LeaveOverviewService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  leaveDetails = collection(this.FIRESTORE, 'leaveApplicationDetails');
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');
  LEAVE_BALANCE_REF = collection(this.FIRESTORE, 'leaveBalance');
  leaveBalanceData: DocumentData | undefined;
  leaveRemainingField: string | undefined;
  updateData = {};

  updateLeaveStatus(id: string, newStatus: string): Observable<void> {
    const leaveDocRef = doc(this.FIRESTORE, 'leaveApplicationDetails', id);
    return from(updateDoc(leaveDocRef, { status: newStatus })).pipe(
      catchError((error) => throwError(() => new Error(error))),
    );
  }

  acceptLeaveRequest(id: string): Observable<void> {
    const leaveDocRef = doc(this.FIRESTORE, 'leaveApplicationDetails', id);
    return new Observable<void>((observer) => {
      updateDoc(leaveDocRef, { status: 'accepted' })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  rejectLeaveRequest(id: string): Observable<void> {
    const leaveDocRef = doc(this.FIRESTORE, 'leaveApplicationDetails', id);
    return new Observable<void>((observer) => {
      updateDoc(leaveDocRef, { status: 'rejected' })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateLeaveBalance(
    email: string,
    totalLeaveDays: number,
    leaveType: string,
  ): Observable<void> {
    const leaveBalanceDocRef = doc(this.LEAVE_BALANCE_REF, email);
    return from(getDoc(leaveBalanceDocRef)).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      switchMap((snapshot: DocumentSnapshot) => {
        if (snapshot.exists()) {
          this.leaveBalanceData = snapshot.data();
          if (leaveType === 'Sick') {
            this.leaveRemainingField = 'sickLeaveRemaining';
            const newLeaveRemaining =
              this.leaveBalanceData[this.leaveRemainingField] - totalLeaveDays;
            this.updateData = { [this.leaveRemainingField]: newLeaveRemaining };
          } else if (leaveType === 'Annual') {
            this.leaveRemainingField = 'annualLeaveRemaining';
            const newLeaveRemaining =
              this.leaveBalanceData[this.leaveRemainingField] - totalLeaveDays;
            this.updateData = { [this.leaveRemainingField]: newLeaveRemaining };
          } else if (leaveType === 'Special') {
            const leaveTakenField = 'specialLeaveTaken';
            const newLeaveTaken =
              this.leaveBalanceData[leaveTakenField] + totalLeaveDays;
            this.updateData = { [leaveTakenField]: newLeaveTaken };
          } else {
            throw new Error(LEAVE_OVERVIEW_ERRORS.INVALID_LEAVE);
          }
          return from(updateDoc(leaveBalanceDocRef, this.updateData));
        } else {
          throw new Error(LEAVE_OVERVIEW_ERRORS.LEAVE_BALANCE_ERROR);
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
