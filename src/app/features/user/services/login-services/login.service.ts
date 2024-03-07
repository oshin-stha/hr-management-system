import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, from, catchError } from 'rxjs';
import { AUTH } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logInUser(email: string, password: string): Observable<unknown> {
    return from(signInWithEmailAndPassword(AUTH, email, password)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
