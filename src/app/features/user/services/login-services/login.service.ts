import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logInUser(email: string, password: string): Promise<unknown> {
    return signInWithEmailAndPassword(AUTH, email, password).catch((error) => {
      alert(error.code);
      throw this.getErrorMessage(error.code);
    });
  }

  getErrorMessage(message: string): string {
    return message;
  }
}
