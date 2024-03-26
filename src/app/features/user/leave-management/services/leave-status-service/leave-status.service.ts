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
import {
  IS_EQUAL_TO,
  LEAVE_APPLICATION_DETAILS,
  LEAVE_DETAILS,
  USER_EMAIL,
} from 'src/app/shared/constants/leaveDetails.constants';

@Injectable({
  providedIn: 'root',
})
export class LeaveStatusService {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  userRef = collection(this.firestore, LEAVE_APPLICATION_DETAILS);

  getLeaveApplicationData(email: string): Observable<LeaveDetails[]> {
    return new Observable<LeaveDetails[]>((observer) => {
      getDocs(query(this.userRef, where(USER_EMAIL, IS_EQUAL_TO, email)))
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          const leaveDetails = querySnapshot.docs.map((doc) => doc.data());
          const leaveDetailsData: LeaveDetails[] = leaveDetails.map((data) => {
            return {
              email: data?.[USER_EMAIL],
              leaveFrom: data?.[LEAVE_DETAILS.LEAVE_FROM],
              leaveTo: data?.[LEAVE_DETAILS.LEAVE_TO],
              firstOrSecondHalf: data?.[LEAVE_DETAILS.FIRST_OR_SECOND],
              totalLeaveDays: data?.[LEAVE_DETAILS.TOTAL_LEAVE],
              leaveType: data?.[LEAVE_DETAILS.LEAVE_TYPE],
              reasonForLeave: data?.[LEAVE_DETAILS.REASON],
              status: data?.[LEAVE_DETAILS.STATUS],
              fromDepartment: data?.[LEAVE_DETAILS.DEPARTMENT],
            };
          });
          observer.next(leaveDetailsData);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
