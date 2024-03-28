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
import { Router } from '@angular/router';
import {
  ATTENDANCE_REPORT_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AttendanceDetailsService {
  private APP = initializeApp(firebaseConfig);
  private FIRESTORE = getFirestore(this.APP);
  private userDetailsRef = collection(this.FIRESTORE, 'UserDetails');
  private attendanceRef = collection(this.FIRESTORE, 'attendance');

  constructor(private router: Router) {}

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
          const attendanceDataDoc = doc.data();
          if (attendanceDataDoc['email'] === email) {
            const attendanceData =
              this.extractAttendanceData(attendanceDataDoc);
            attendanceList.push(attendanceData);
          }
        });
        return attendanceList;
      }),
    );
  }

  private extractAttendanceData(
    attendanceDataDoc: DocumentData,
  ): AttendanceState {
    return {
      email: attendanceDataDoc?.['email'],
      checkInTime: attendanceDataDoc?.['checkInTime'],
      checkOutTime: attendanceDataDoc?.['checkOutTime'],
      checkInStatus: attendanceDataDoc?.['checkInStatus'],
      checkOutStatus: attendanceDataDoc?.['checkOutStatus'],
      checkInReason: attendanceDataDoc?.['checkInReason'],
      checkOutReason: attendanceDataDoc?.['checkOutReason'],
      workingHours: attendanceDataDoc?.['workingHours'],
      absent: attendanceDataDoc?.['absent'],
    };
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

  getEmployeeNameByEmployeeId(id: string): Observable<string> {
    return from(getDocs(this.userDetailsRef)).pipe(
      map((querySnapshot) => {
        let employeeName = '';
        querySnapshot.forEach((doc) => {
          if (doc.data()['employeeId'] === id) {
            employeeName = this.constructEmployeeName(doc.data());
          }
        });
        return employeeName;
      }),
    );
  }

  private constructEmployeeName(data: DocumentData): string {
    return `${data['firstName']} ${data['middleName']} ${data['lastName']}`;
  }

  attendanceOverviewRoute(): void {
    this.router.navigate([`/${SECURE_MODULE_PATH}/${ATTENDANCE_REPORT_PATH}`]);
  }
}
