import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GetPolicyService } from '../../../services/get-policy/get-policy.service';
import { getPolicyStart, getPolicySuccess } from '../../view-policy.action';
import { map, switchMap } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/loader-store/loader-spinner.action';

@Injectable()
export class ViewPolicyEffect {
  viewPolicy$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getPolicyStart),
      switchMap(({ selectedPolicy }) => {
        return this.getPolicyService.getPolicyDetails(selectedPolicy).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return getPolicySuccess({ policy: data });
          }),
        );
      }),
    );
  });

  constructor(
    private action$: Actions,
    private store: Store,
    private getPolicyService: GetPolicyService,
  ) {}
}
