import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { UserDetails } from '../../models/adduser.model';
import { leaveDetails } from '../models/leave-overview.model';
@Injectable({
  providedIn: 'root',
})
export class LeaveOverviewService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  leaveDetails = collection(this.FIRESTORE, 'leaveApplicationDetails');
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');
  LEAVE_BALANCE_REF = collection(this.FIRESTORE, 'leaveBalance');

  getLeaveDetails(): Observable<leaveDetails[]> {
    return new Observable<leaveDetails[]>((observer) => {
      getDocs(this.leaveDetails)
        .then((snapshot) => {
          const leave: leaveDetails[] = [];
          snapshot.docs.forEach((doc, index) => {
            const leaveDetail: leaveDetails = {
              id: doc.id,
              sn: (index + 1).toString(),
              employeeName: doc.data()['employeeName'],
              department: doc.data()['department'],
              email: doc.data()['email'],
              contactInformation: doc.data()['contactInformation'],
              leaveType: doc.data()['leaveType'],
              leaveFrom: doc.data()['leaveFrom'].toDate(),
              leaveTo: doc.data()['leaveTo'].toDate(),
              reasonForLeave: doc.data()['reasonForLeave'],
              status: doc.data()['status'],
              totalLeaveDays: doc.data()['totalLeaveDays'],
            };
            leave.push(leaveDetail);
          });
          console.log(leave);
          observer.next(leave);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

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
          console.log('hello from service');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.log('hello from error service');
          observer.error(error);
        });
    });
  }

  rejectLeaveRequest(id: string): Observable<void> {
    const leaveDocRef = doc(this.FIRESTORE, 'leaveApplicationDetails', id);
    return new Observable<void>((observer) => {
      updateDoc(leaveDocRef, { status: 'rejected' })
        .then(() => {
          console.log('hello from service');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.log('hello from error service');
          observer.error(error);
        });
    });
  }

  getUserDetails(): Observable<UserDetails[]> {
    return new Observable<UserDetails[]>((observer) => {
      getDocs(this.USER_DETAILS_REF)
        .then((snapshot) => {
          const user: UserDetails[] = [];
          snapshot.docs.forEach((doc) => {
            const userDetails: UserDetails = {
              employeeId: doc.data()['employeeId'],
              firstName: doc.data()['firstName'],
              middleName: doc.data()['middleName'],
              lastName: doc.data()['lastName'],
              gender: doc.data()['gender'],
              contactNumber: doc.data()['contactNumber'],
              address: doc.data()['address'],
              dateOfBirth: doc.data()['dateOfBirth'],
              citizenshipNumber: doc.data()['citizenshipNumber'],
              startDate: doc.data()['startDate'],
              department: doc.data()['department'],
              role: doc.data()['role'],
              designation: doc.data()['designation'],
              email: doc.data()['email'],
            };
            user.push(userDetails);
          });
          console.log(user);
          observer.next(user);
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
        console.error('Error getting leave balance document:', error);
        return throwError(() => error);
      }),
      switchMap((snapshot: DocumentSnapshot) => {
        if (snapshot.exists()) {
          const leaveBalanceData = snapshot.data();
          let leaveRemainingField: string;

          switch (leaveType) {
            case 'Sick Leave':
              leaveRemainingField = 'sickLeaveRemaining';
              break;
            case 'Annual Leave':
              leaveRemainingField = 'annualLeaveRemaining';
              break;
            case 'Special Leave':
              leaveRemainingField = 'specialLeaveRemaining';
              break;
            default:
              throw new Error('Invalid leave type.');
          }
          const newLeaveRemaining =
            leaveBalanceData[leaveRemainingField] - totalLeaveDays;
          const updateData = { [leaveRemainingField]: newLeaveRemaining };
          return from(updateDoc(leaveBalanceDocRef, updateData));
        } else {
          throw new Error('Leave balance document does not exist.');
        }
      }),
      catchError((error) => {
        console.error('Error updating leave balance:', error);
        return throwError(() => error);
      }),
    );
  }
}
