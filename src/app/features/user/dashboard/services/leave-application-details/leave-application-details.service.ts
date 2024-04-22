import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LeaveAppDetails } from '../../models/leave-app-details.interface';

@Injectable({
  providedIn: 'root',
})
export class LeaveApplicationDetailsService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  LEAVEAPPLICATION_DETAILS_REF = collection(
    this.FIRESTORE,
    'leaveApplicationDetails',
  );

  getCurrentUserLeaveApplicationDetails(): Observable<LeaveAppDetails[]> {
    return new Observable<LeaveAppDetails[]>((observer) => {
      getDocs(this.LEAVEAPPLICATION_DETAILS_REF).then((snapshot) => {
        const leaveApplicationDetails: LeaveAppDetails[] = [];
        snapshot.docs.forEach((doc) => {
          const leaveAppDetails: LeaveAppDetails = {
            id: doc.id,
            leaveType: doc.data()['leaveType'],
            leaveFrom: doc.data()['leaveFrom'],
            leaveTo: doc.data()['leaveTo'],
            reasonForLeave: doc.data()['reasonForLeave'],
            status: doc.data()['status'],
            totalLeaveDays: doc.data()['totalLeaveDays'],
            email: doc.data()['email'],
            fromDepartment: doc.data()['fromDepartment'],
          };
          if (leaveAppDetails.email === localStorage.getItem('Email')) {
            leaveApplicationDetails.push(leaveAppDetails);
          }
        });
        observer.next(leaveApplicationDetails);
        observer.complete();
      });
    });
  }
}
