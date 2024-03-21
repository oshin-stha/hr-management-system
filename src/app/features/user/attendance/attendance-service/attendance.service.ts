import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { firebaseConfig } from '../../../../environments/environment';
import { AttendanceState } from '../../../../shared/models/attendance.model';
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  attendanceRef = collection(this.FIRESTORE, 'attendance');

  addCheckIn(
    data: Partial<AttendanceState>,
  ): Observable<Partial<AttendanceState>> {
    return new Observable<Partial<AttendanceState>>((observer) => {
      const email = data.email;
      const checkInTime = data.checkInTime;

      if (typeof email === 'string' && checkInTime instanceof Date) {
        this.hasDuplicateCheckIn(email, checkInTime).subscribe(
          (hasDuplicate) => {
            if (hasDuplicate) {
              alert(
                'Another entry exists for the same email and check-in time',
              );
              observer.error(
                'Another entry exists for the same email and check-in time',
              );
            } else {
              addDoc(this.attendanceRef, data)
                .then(() => {
                  observer.next(data);
                })
                .catch((error) => {
                  observer.error(error);
                });
            }
          },
        );
      } else {
        observer.error('Invalid email or check-in time');
      }
    });
  }

  private hasDuplicateCheckIn(
    email: string,
    checkInTime: Date,
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const emailQuery = query(this.attendanceRef, where('email', '==', email));

      getDocs(emailQuery)
        .then((querySnapshot) => {
          let hasDuplicate = false;
          querySnapshot.forEach((doc) => {
            const docCheckInTime = doc.data()['checkInTime']?.toDate();
            const docCheckInDate = new Date(
              docCheckInTime.getFullYear(),
              docCheckInTime.getMonth(),
              docCheckInTime.getDate(),
            );
            const inputCheckInDate = new Date(
              checkInTime.getFullYear(),
              checkInTime.getMonth(),
              checkInTime.getDate(),
            );
            if (docCheckInDate.getTime() === inputCheckInDate.getTime()) {
              hasDuplicate = true;
              return;
            }
          });
          observer.next(hasDuplicate);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  setCheckOut(
    data: Partial<AttendanceState>,
  ): Observable<Partial<AttendanceState>> {
    return new Observable<Partial<AttendanceState>>((observer) => {
      const emailQuery = query(
        this.attendanceRef,
        where('email', '==', data.email),
      );
      getDocs(emailQuery)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docCheckInTime = doc.data()['checkInTime']?.toDate(); // Convert Timestamp to Date
            const dataCheckInTime = data.checkInTime;
            if (
              docCheckInTime &&
              dataCheckInTime &&
              docCheckInTime.toDateString() ===
                new Date(dataCheckInTime).toDateString()
            ) {
              if (data.checkOutTime) {
                const duration =
                  data.checkOutTime.getTime() - docCheckInTime.getTime();
                const durationInHours = parseInt(
                  Math.abs(duration / (1000 * 60 * 60)).toFixed(2),
                ); //convert string to number
                const docRef = doc.ref;

                const updateData: Partial<AttendanceState> = {
                  checkOutTime: data.checkOutTime,
                  checkOutStatus: data.checkOutStatus,
                  checkOutReason: data.checkOutReason,
                  workingHours: durationInHours,
                };
                updateDoc(docRef, updateData)
                  .then(() => {
                    observer.next(data);
                    observer.complete();
                  })
                  .catch((error) => {
                    alert(error);
                    observer.error(error);
                  });
              }
            }
          });
        })
        .catch((error) => {
          alert(error);
          observer.error(error);
        });
    });
  }

  getAttendanceData(email: string): Observable<AttendanceState[]> {
    const q = query(this.attendanceRef, where('email', '==', email));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const attendanceData: AttendanceState[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as AttendanceState;
          attendanceData.push({ ...data });
        });
        return attendanceData;
      }),
    );
  }
}
