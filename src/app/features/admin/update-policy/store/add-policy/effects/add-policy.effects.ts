import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UpdatePolicyService } from '../../../services/update-policy/update-policy.service';
import {
  addPolicyFailure,
  addPolicyStart,
  addPolicySuccess,
} from '../add-policy.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class AddPolicyEffect {
  addPolicy$ = createEffect(() =>
    this.action$.pipe(
      ofType(addPolicyStart),
      switchMap(({ policy }) => {
        return this.updatePolicyService.updatePolicyDetails(policy).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addPolicySuccess();
          }),
          catchError((error) => {
            const errorMessage = error.code;
            alert(errorMessage);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(addPolicyFailure({ error: errorMessage }));
          }),
        );
      }),
    ),
  );
  constructor(
    private action$: Actions,
    private store: Store,
    private updatePolicyService: UpdatePolicyService,
  ) {}
}
