import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { AttendanceState } from '../../../../../../shared/models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceDetailsService {
  private APP = initializeApp(firebaseConfig);
  private FIRESTORE = getFirestore(this.APP);
  private userDetailsRef = collection(this.FIRESTORE, 'UserDetails');
  private attendanceRef = collection(this.FIRESTORE, 'attendance');

  getAttendanceDetailsByEmployeeId(id: string): Observable<AttendanceState[]> {
    return this.getEmailByEmployeeId(id).pipe(
      switchMap((email) => this.getAttendanceDetails(email)),
    );
  }

  private getAttendanceDetails(
    email: string | undefined,
  ): Observable<AttendanceState[]> {
    return from(getDocs(this.attendanceRef)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const attendanceList: AttendanceState[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          if (data['email'] === email) {
            attendanceList.push(data as AttendanceState);
          }
        });
        return attendanceList;
      }),
    );
  }

  private getEmailByEmployeeId(id: string): Observable<string | undefined> {
    return from(getDocs(this.userDetailsRef)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        let email: string | undefined;
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          if (doc.data()['employeeId'] === id) {
            email = doc.data()['email'];
          }
        });
        return email;
      }),
    );
  }

  getemployeeNameByEmployeeId(id: string): Observable<string> {
    return from(getDocs(this.userDetailsRef)).pipe(
      map((querySnapshot) => {
        let employeeName = '';
        querySnapshot.forEach((doc) => {
          if (doc.data()['employeeId'] === id) {
            employeeName =
              doc.data()['firstName'] +
              ' ' +
              doc.data()['middleName'] +
              ' ' +
              doc.data()['lastName'];
          }
        });
        return employeeName;
      }),
    );
  }
}
