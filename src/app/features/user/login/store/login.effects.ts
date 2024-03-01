import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { LoginService } from "../../services/login-services/login.service";
import { loginStart, loginSuccess, setErrorMessage } from "./login.actions";
import { catchError, exhaustMap, from, map, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(
        private store: Store,
        private action$: Actions,
        private loginService: LoginService,
        private router: Router
    ) { }

    login$ = createEffect(() => {
        return this.action$.pipe(
          ofType(loginStart),
          exhaustMap((action) => {
            return from(this.loginService.logInUser(action.email, action.password)).pipe(
              map(() => {
                return loginSuccess();
              }),
              catchError((error) => {
                const errorMessage = this.loginService.getErrorMessage(error.code);
                return of(setErrorMessage({ message: errorMessage }));
              })
            );
          })
        );
      });
    // login$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(loginStart),
    //         exhaustMap((action) => {
    //             return this.loginService.logInUser(action.email, action.password).pipe(
    //                 map(() => {
    //                     console.log("test1")
    //                     return loginSuccess()
    //                 }),
    //                 catchError((error) => {
    //                     console.log("test2")
    //                     const errorMessage = this.loginService.getErrorMessage(error.error.error.message);
    //                     return of(setErrorMessage({ message: errorMessage }));
    //                 })
    //             );
    //         })
    //     );
    // });

    redirectAfterLogin$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginSuccess),
            tap(() => this.navigateToAttendance())
        ),
        { dispatch: false }
    );

    private navigateToAttendance() {
        this.router.navigate(['/attendance']);
    }
}