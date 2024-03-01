import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ADDUSER_FAIL, SIGNUP_FAIL, addUserStart, addUserSuccess, signupStart, signupSuccess } from "./add-user.action"
import { catchError, mergeMap, of,map } from "rxjs"
import { Injectable } from "@angular/core"

import { AddUserService } from "../../services/add-user.service"
@Injectable()
export class AddUserEffect{
    constructor(private action$:Actions,private addUserService:AddUserService){}
    signup$ = createEffect(() =>
    this.action$.pipe(
      ofType(signupStart),
      mergeMap(action =>
        of(this.addUserService.createAccount(action.data)).pipe(
          map(() => signupSuccess({data:action.data})),
          catchError(() => of({ type: SIGNUP_FAIL })) 
        )
      )
    )
  );
  addUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(addUserStart),
      mergeMap(action =>
        of(this.addUserService.addUserDetails(action.data)).pipe(
          map(() => addUserSuccess({ data: action.data })),
          catchError(() => of({ type: ADDUSER_FAIL }))
        )
      )
    )
  );
}
