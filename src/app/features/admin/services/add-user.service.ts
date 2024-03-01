import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { AUTH, USERDETAILSREF } from 'src/app/environments/environment';
import { AuthDetails, UserDetails } from '../models/adduser.model';
import { addDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  // constructor() { }
createAccount( data: AuthDetails){
    return createUserWithEmailAndPassword(AUTH, data.email, data.password);
  }

addUserDetails(data: UserDetails) {
  return addDoc(USERDETAILSREF, data)
}
checkEmailExists(email: string) {
  return fetchSignInMethodsForEmail(AUTH, email);
}
}
