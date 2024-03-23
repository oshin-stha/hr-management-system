import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from, catchError } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../../../environments/environment';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { UserDetails } from 'src/app/shared/models/adduser.model';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  AUTH = getAuth(this.APP);
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');
  logInUser(email: string, password: string): Observable<unknown> {
    return from(signInWithEmailAndPassword(this.AUTH, email, password)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  getUserByEmail(email: string): Observable<UserDetails[]> {
    return new Observable<UserDetails[]>((observer) => {
      getDocs(this.USER_DETAILS_REF)
        .then((snapshot) => {
          const users: UserDetails[] = [];
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
            if (userDetails.email === email) {
              users.push(userDetails);
            }
          });

          observer.next(users);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
