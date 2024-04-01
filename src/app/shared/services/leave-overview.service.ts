import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { UserDetails } from '../models/adduser.model';
import { LeaveDetails } from '../models/leave-overview.model';
@Injectable({
  providedIn: 'root',
})
export class LeaveOverviewService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  leaveDetails = collection(this.FIRESTORE, 'leaveApplicationDetails');
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');

  getLeaveDetails(): Observable<LeaveDetails[]> {
    return new Observable<LeaveDetails[]>((observer) => {
      getDocs(this.leaveDetails)
        .then((snapshot) => {
          const leave: LeaveDetails[] = [];
          snapshot.docs.forEach((doc) => {
            // why forEach
            const leaveDetail: LeaveDetails = {
              id: doc.id,
              employeeName: doc.data()['employeeName'],
              department: doc.data()['department'],
              email: doc.data()['email'],
              contactInformation: doc.data()['contactInformation'],
              leaveType: doc.data()['leaveType'],
              leaveFrom: doc.data()['leaveFrom'],
              leaveTo: doc.data()['leaveTo'],
              reasonForLeave: doc.data()['reasonForLeave'],
              status: doc.data()['status'],
              totalLeaveDays: doc.data()['totalLeaveDays'],
              fromDepartment: doc.data()['fromDepartment'],
              firstOrSecondHalf: doc.data()['firstOrSecondHalf'],
            };
            leave.push(leaveDetail);
          });
          observer.next(leave);
          observer.complete();
        })
        .catch((error) => {
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
          observer.next(user);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
