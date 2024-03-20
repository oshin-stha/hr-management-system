import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LeaveDetails } from '../../models/leaveDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class LeaveStatusService {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  userRef = collection(this.firestore, 'leaveApplicationDetails');

  getLeaveApplicationData(email: string): Observable<LeaveDetails[]> {
    return new Observable<LeaveDetails[]>((observer) => {
      getDocs(query(this.userRef, where('email', '==', email))).then(
        (querySnapshot: QuerySnapshot<DocumentData>) => {
          const leaveDetails = querySnapshot.docs.map((doc) => doc.data());
          const leaveDetailsData: LeaveDetails[] = leaveDetails.map((data) => {
            return {
              email: data?.['email'],
              leaveFrom: data?.['leaveFrom'],
              leaveTo: data?.['leaveTo'],
              firstOrSecondHalf: data?.['firstOrSecondHalf'],
              totalLeaveDays: data?.['totalLeaveDays'],
              leaveType: data?.['leaveType'],
              reasonForLeave: data?.['reasonForLeave'],
              status: data?.['status'],
              fromDepartment: data?.['fromDepartment'],
            };
          });
          observer.next(leaveDetailsData);
        },
      );
    });
  }
}
