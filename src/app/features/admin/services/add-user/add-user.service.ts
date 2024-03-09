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
import { UserDetails } from '../../models/adduser.model';
import { firebaseConfig } from 'src/app/environments/environment';

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

  get emailAlreadyExistsStatus(): boolean {
    return this.emailAlreadyExists;
  }

  set emailExists(status: boolean) {
    this.emailAlreadyExists = status;
  }

  async createAccount(
    email: string,
    password: string,
    employeeId: string,
  ): Promise<UserCredential> {
    const employeeIdExist = await this.getEmployeeIdStatusCheck(employeeId);
    if (employeeIdExist) {
      alert('Employee Id already exists');
      throw new Error('EmployeeId already in use');
    }
    return createUserWithEmailAndPassword(this.AUTH, email, password);
  }

  addUserDetails(data: UserDetails, email: string): Promise<void> {
    return setDoc(doc(this.USER_DETAILS_REF, email), data);
  }

  getErrorMessage(message: string): boolean {
    if (message.includes('email-already-in-use')) {
      this.emailAlreadyExists = true;
    }
    return this.emailAlreadyExists;
  }

  async getEmployeeIdStatusCheck(employeeId: string): Promise<boolean> {
    const q = query(
      this.USER_DETAILS_REF,
      where('employeeId', '==', employeeId),
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}
