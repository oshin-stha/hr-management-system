import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  // logInUser(email: string, password: string): Observable<unknown> {
  //   return of(signInWithEmailAndPassword(AUTH, email, password)).pipe(
  //     catchError((error) => {
  //       return throwError(() => this.getErrorMessage(error.code));
  //     })
  //   );
  // }

  logInUser(email: string, password: string): Promise<unknown> {
    return signInWithEmailAndPassword(AUTH, email, password)
      .catch((error) => {
        throw this.getErrorMessage(error.code);
      });
  }

getErrorMessage(message:string): string{
  alert(message);
  switch(message) {
      case 'EMAIL_NOT_FOUND':
          return 'Email Not Found.';
      case 'INVALID_PASSWORD':
          return 'Invalid Password.';
      case 'EMAIL_EXISTS':
          return 'Email Already Exists.';
      default:
          return 'Unknown Error Occurred Please Try Again.';
  }
}
}
