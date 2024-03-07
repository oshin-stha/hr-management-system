import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from, catchError } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  APP = initializeApp(firebaseConfig);
  AUTH = getAuth(this.APP);
  logInUser(email: string, password: string): Observable<unknown> {
    return from(signInWithEmailAndPassword(this.AUTH, email, password)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
