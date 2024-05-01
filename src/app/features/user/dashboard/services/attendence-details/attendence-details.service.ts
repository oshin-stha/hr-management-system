import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { AttendanceStateForGettingDataWithTimestamp } from 'src/app/shared/models/attendance.model';
import { UserDetails } from 'src/app/shared/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class AttendenceDetailsService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  workHourDetails = collection(this.FIRESTORE, 'attendance');
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');

  getworkHourDetails(): Observable<
    AttendanceStateForGettingDataWithTimestamp[]
  > {
    return new Observable<AttendanceStateForGettingDataWithTimestamp[]>(
      (observer) => {
        getDocs(this.workHourDetails)
          .then((snapshot) => {
            const attendence: AttendanceStateForGettingDataWithTimestamp[] = [];
            snapshot.docs.forEach((doc) => {
              const attendenceDetail: AttendanceStateForGettingDataWithTimestamp =
                {
                  email: doc.data()['email'],
                  checkInTime: doc.data()['checkInTime'],
                  checkOutTime: doc.data()['checkOutTime'],
                  checkInStatus: doc.data()['checkInStatus'],
                  checkOutStatus: doc.data()['checkOutStatus'],
                  checkInReason: doc.data()['checkInReason'],
                  checkOutReason: doc.data()['checkOutReason'],
                  workingHours: doc.data()['workingHours'],
                  absent: doc.data()['absent'],
                };
              attendence.push(attendenceDetail);
            });

            attendence.sort((a, b) => {
              if (b.checkInTime && a.checkInTime)
                return b.checkInTime?.seconds - a.checkInTime?.seconds;
              else return -1;
            });
            observer.next(attendence);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      },
    );
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
