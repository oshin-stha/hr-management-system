import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AUTH, USER_DETAILS_REF } from 'src/app/environments/environment';
import { UserDetails } from '../models/adduser.model';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  emailAlreadyExists = false;
  employeeIdExist: Promise<boolean> | undefined;

  get emailAlreadyExistsStatus(): boolean {
    return this.emailAlreadyExists;
  }

  set emailExists(status: boolean) {
    this.emailAlreadyExists = status;
  }

  async createAccount(email: string, password: string, employeeId: string) {
    const employeeIdExist = await this.getEmployeeIdStatusCheck(employeeId);
    if (employeeIdExist) {
      alert('Employee Id already exists');
      throw new Error('EmployeeId already in use');
    }
    return createUserWithEmailAndPassword(AUTH, email, password);
  }

  addUserDetails(data: UserDetails, employeeId: string): Promise<void> {
    return setDoc(doc(USER_DETAILS_REF, employeeId), data);
  }

  getErrorMessage(message: string): boolean {
    if (message.includes('email-already-in-use')) {
      this.emailAlreadyExists = true;
    }
    return this.emailAlreadyExists;
  }
  async getEmployeeIdStatusCheck(employeeId: string): Promise<boolean> {
    const userDoc = doc(USER_DETAILS_REF, employeeId);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.exists();
  }
}
