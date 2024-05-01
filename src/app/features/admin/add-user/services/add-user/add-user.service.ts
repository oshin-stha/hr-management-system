import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { UserDetails, leaveBalance } from 'src/app/shared/models/adduser.model';

import { firebaseConfig } from 'src/app/environments/environment';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { TotalLeaves } from '../../models/totalLeaves.interface';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  emailAlreadyExists = false;
  employeeIdExist: Promise<boolean> | undefined;
  APP = initializeApp(firebaseConfig);
  FIRESTORE = getFirestore(this.APP);
  AUTH = getAuth(this.APP);
  USER_DETAILS_REF = collection(this.FIRESTORE, 'UserDetails');
  LOAD_BALANCE_REF = collection(this.FIRESTORE, 'leaveBalance');
  POLICY_REF = collection(this.FIRESTORE, 'PolicyDetails');
  get emailAlreadyExistsStatus(): boolean {
    return this.emailAlreadyExists;
  }

  set emailExists(status: boolean) {
    this.emailAlreadyExists = status;
  }

  createAccount(
    email: string,
    password: string,
    employeeId: string,
  ): Observable<UserCredential> {
    return from(this.getEmployeeIdStatusCheck(employeeId)).pipe(
      switchMap((employeeIdExist) => {
        if (employeeIdExist) {
          alert('Employee Id already exists');
          return throwError(() => 'EmployeeId already in use');
        } else {
          return from(
            createUserWithEmailAndPassword(this.AUTH, email, password),
          );
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  addUserDetails(data: UserDetails, email: string): Observable<void> {
    return from(setDoc(doc(this.USER_DETAILS_REF, email), data));
  }

  getLeaveBalance(): Observable<TotalLeaves> {
    return new Observable<TotalLeaves>((observer) => {
      getDocs(this.POLICY_REF).then((snapshot) => {
        let totalLeaves: TotalLeaves = {} as TotalLeaves;
        snapshot.docs.forEach((doc) => {
          totalLeaves = {
            sickLeave: doc.data()['sickLeave'],
            annualLeave: doc.data()['annualLeave'],
          };
        });
        observer.next({ ...totalLeaves });
        observer.complete();
      });
    });
  }

  addLoadLeaveBalance(email: string, leave: leaveBalance): Observable<void> {
    return from(setDoc(doc(this.LOAD_BALANCE_REF, email), leave));
  }

  getEmployeeIdStatusCheck(employeeId: string): Observable<boolean> {
    const employee_id_check = query(
      this.USER_DETAILS_REF,
      where('employeeId', '==', employeeId),
    );
    return from(getDocs(employee_id_check)).pipe(
      map((querySnapshot: QuerySnapshot) => !querySnapshot.empty),
    );
  }
  getErrorMessage(message: string): boolean {
    if (message.includes('email-already-in-use')) {
      this.emailAlreadyExists = true;
    }
    return this.emailAlreadyExists;
  }
}
