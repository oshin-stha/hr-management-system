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
import { UserDetails } from 'src/app/shared/models/adduser.model';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { TodaysAttendanceState } from '../attendance-overview-store/attendance-overview.state';

@Injectable({
  providedIn: 'root',
})
export class AttendanceReportService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  attendanceRef = collection(this.FIRESTORE, 'attendance');
  userDetailsRef = collection(this.FIRESTORE, 'UserDetails');

  getTodaysAttendanceWithUserDetails(): Observable<TodaysAttendanceState[]> {
    return this.getAllEmails().pipe(
      switchMap((emails) => {
        const todaysAttendanceWithUserDetails: Observable<TodaysAttendanceState>[] =
          [];
        emails.forEach((email) => {
          const attendance$ = this.getTodaysAttendance(email);
          const userDetails$ = this.getUserDetails(email);
          todaysAttendanceWithUserDetails.push(
            forkJoin([attendance$, userDetails$]).pipe(
              map(([attendance, userDetails]) => {
                return {
                  attendance: attendance
                    ? attendance
                    : this.createAbsentAttendance(email),
                  userDetails: userDetails,
                } satisfies TodaysAttendanceState;
              }),
            ),
          );
        });
        return forkJoin(todaysAttendanceWithUserDetails);
      }),
    );
  }

  getTodaysAttendance(email: string): Observable<AttendanceState | undefined> {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    return from(getDocs(this.attendanceRef)).pipe(
      map((querySnapshot) => {
        const attendanceDocs = querySnapshot.docs;
        for (const doc of attendanceDocs) {
          const attendanceData = doc.data() as AttendanceState;
          const docCheckInTime = doc.data()['checkInTime']?.toDate();
          const docCheckInTimeYear = docCheckInTime.getFullYear();
          const docCheckInTimeMonth = docCheckInTime.getMonth();
          const docCheckInTimeDay = docCheckInTime.getDate();
          const docEmail = doc.data()['email'];
          if (
            docEmail === email &&
            docCheckInTimeYear === todayYear &&
            docCheckInTimeMonth === todayMonth &&
            docCheckInTimeDay === todayDay
          ) {
            return attendanceData;
          }
        }
        return undefined;
      }),
    );
  }

  getUserDetails(email: string): Observable<UserDetails> {
    return from(getDoc(doc(this.userDetailsRef, email))).pipe(
      map((querySnapshot) => {
        const UserDataDoc = querySnapshot.data();
        const UserDetails: UserDetails = {
          employeeId: UserDataDoc?.['employeeId'],
          firstName: UserDataDoc?.['firstName'],
          middleName: UserDataDoc?.['middleName'],
          lastName: UserDataDoc?.['lastName'],
          gender: UserDataDoc?.['gender'],
          contactNumber: UserDataDoc?.['contactNumber'],
          address: UserDataDoc?.['address'],
          dateOfBirth: UserDataDoc?.['dateOfBirth'],
          citizenshipNumber: UserDataDoc?.['citizenshipNumber'],
          startDate: UserDataDoc?.['startDate'],
          department: UserDataDoc?.['department'],
          role: UserDataDoc?.['role'],
          designation: UserDataDoc?.['designation'],
          email: UserDataDoc?.['email'],
        };
        return UserDetails;
      }),
    );
  }

  createAbsentAttendance(email: string): AttendanceState {
    return {
      email: email,
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

  getAllEmails(): Observable<string[]> {
    return from(getDocs(this.userDetailsRef)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => doc.data()['email']),
      ),
    );
  }
}
