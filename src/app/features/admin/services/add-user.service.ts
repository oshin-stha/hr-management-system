import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AUTH, USERDETAILSREF } from 'src/app/environments/environment';
import { UserDetails } from '../models/adduser.model';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  emailAlreadyExists = false;

  get emailAlreadyExistsStatus(): boolean {
    return this.emailAlreadyExists;
  }

  set emailExists(status: boolean) {
    this.emailAlreadyExists = status;
  }

  createAccount(email: string, password: string) {
    return createUserWithEmailAndPassword(AUTH, email, password);
  }

  addUserDetails(data: UserDetails, employeeId: string) {
    return setDoc(doc(USERDETAILSREF, employeeId), data);
  }

  getErrorMessage(message: string): boolean {
    if (message.includes('email-already-in-use')) {
      this.emailAlreadyExists = true;
      console.log('in error', this, this.emailAlreadyExists);
    }
    return this.emailAlreadyExists;
  }
}
