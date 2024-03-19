import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveOverviewService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  leaveDetails = collection(this.FIRESTORE, 'leaveApplicationDetails');
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');
  LEAVE_BALANCE_REF = collection(this.FIRESTORE, 'leaveBalance');

  updateLeaveStatus(id: string, newStatus: string): Observable<void> {
    const leaveDocRef = doc(this.FIRESTORE, 'leaveApplicationDetails', id);
    return from(updateDoc(leaveDocRef, { status: newStatus })).pipe(
      map(() => {
        alert('leave updated successfully');
      }),
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
          const leaveBalanceData = snapshot.data();
          let leaveRemainingField: string;
          let updateData = {};

          if (leaveType === 'Sick Leave') {
            leaveRemainingField = 'sickLeaveRemaining';
            const newLeaveRemaining =
              leaveBalanceData[leaveRemainingField] - totalLeaveDays;
            updateData = { [leaveRemainingField]: newLeaveRemaining };
          } else if (leaveType === 'Annual Leave') {
            leaveRemainingField = 'annualLeaveRemaining';
            const newLeaveRemaining =
              leaveBalanceData[leaveRemainingField] - totalLeaveDays;
            updateData = { [leaveRemainingField]: newLeaveRemaining };
          } else if (leaveType === 'Special Leave') {
            const leaveTakenField = 'specialLeaveTaken';
            const newLeaveTaken =
              leaveBalanceData[leaveTakenField] + totalLeaveDays;
            updateData = { [leaveTakenField]: newLeaveTaken };
          } else {
            throw new Error('Invalid leave type.');
          }

          return from(updateDoc(leaveBalanceDocRef, updateData));
        } else {
          throw new Error('Leave balance document does not exist.');
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
