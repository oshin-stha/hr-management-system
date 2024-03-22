import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { Observable, forkJoin, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { firebaseConfig } from 'src/app/environments/environment';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import {
  NameEmployeeId,
  TodaysAttendanceState,
} from '../attendance-overview-store/attendance-overview.state';

@Injectable({
  providedIn: 'root',
})
export class AttendanceReportService {
  private firestore = getFirestore(initializeApp(firebaseConfig));
  private attendanceRef = collection(this.firestore, 'attendance');
  private userDetailsRef = collection(this.firestore, 'UserDetails');

  getTodaysAttendanceWithUserDetails(): Observable<TodaysAttendanceState[]> {
    return this.getAllEmails().pipe(
      switchMap((emails) =>
        forkJoin(
          emails.map((email) =>
            forkJoin([
              this.getTodaysAttendance(email),
              this.getUserNameEmployeeId(email),
            ]).pipe(
              map(([attendance, userNameEmployeeID]) => ({
                attendance: attendance || this.createAbsentAttendance(email),
                userNameEmployeeID,
              })),
            ),
          ),
        ),
      ),
    );
  }

  private getTodaysAttendance(
    email: string,
  ): Observable<AttendanceState | undefined> {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    return from(getDocs(this.attendanceRef)).pipe(
      map(
        (querySnapshot) =>
          querySnapshot.docs
            .find((doc) => {
              const checkInTime = doc.data()['checkInTime']?.toDate();
              const docEmail = doc.data()['email'];
              return (
                docEmail === email &&
                checkInTime &&
                checkInTime.getFullYear() === todayYear &&
                checkInTime.getMonth() === todayMonth &&
                checkInTime.getDate() === todayDay
              );
            })
            ?.data() as AttendanceState,
      ),
    );
  }

  private getUserNameEmployeeId(email: string): Observable<NameEmployeeId> {
    return from(getDoc(doc(this.userDetailsRef, email))).pipe(
      map((querySnapshot) => {
        const UserDataDoc = querySnapshot.data();
        const UserNameEmployeeId: NameEmployeeId = {
          employeeId: UserDataDoc?.['employeeId'],
          firstName: UserDataDoc?.['firstName'],
          middleName: UserDataDoc?.['middleName'],
          lastName: UserDataDoc?.['lastName'],
        };
        return UserNameEmployeeId;
      }),
    );
  }

  private createAbsentAttendance(email: string): AttendanceState {
    return {
      email,
      checkInTime: null,
      checkOutTime: null,
      checkInStatus: null,
      checkOutStatus: null,
      checkInReason: null,
      checkOutReason: null,
      workingHours: null,
      absent: 'Absent',
    };
  }

  private getAllEmails(): Observable<string[]> {
    return from(getDocs(this.userDetailsRef)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => doc.data()['email']),
      ),
    );
  }
}
