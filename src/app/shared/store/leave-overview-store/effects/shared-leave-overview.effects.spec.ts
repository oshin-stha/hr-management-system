import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { LeaveDetails } from 'src/app/shared/models/leave-overview.model';
import { LeaveOverviewService } from 'src/app/shared/services/shared-leave-overview.service';
import { UserDetails } from '../../../models/adduser.model';
import {
  loadLeaveDetails,
  loadLeaveDetailsFail,
  loadLeaveDetailsSuccess,
  loadUserDetailsSuccess,
} from '../shared-leave-overview.action';
import { SharedLeaveOverviewEffects } from './shared-leave-overview.effects';

describe('SharedLeaveOverviewEffects', () => {
  let actions$: Observable<unknown>;
  let effects: SharedLeaveOverviewEffects;
  let leaveOverviewService: jasmine.SpyObj<LeaveOverviewService>;

  beforeEach(() => {
    const leaveOverviewServiceSpy = jasmine.createSpyObj(
      'LeaveOverviewService',
      ['getLeaveDetails', 'getUserDetails'],
    );

    TestBed.configureTestingModule({
      providers: [
        SharedLeaveOverviewEffects,
        provideMockActions(() => actions$),
        { provide: LeaveOverviewService, useValue: leaveOverviewServiceSpy },
      ],
    });

    effects = TestBed.inject(SharedLeaveOverviewEffects);
    leaveOverviewService = TestBed.inject(
      LeaveOverviewService,
    ) as jasmine.SpyObj<LeaveOverviewService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadLeaveDetails$', () => {
    it('should return loadLeaveDetailsSuccess action on successful loadLeaveDetails action', () => {
      const leaveDetails: LeaveDetails[] = [];

      leaveOverviewService.getLeaveDetails.and.returnValue(of(leaveDetails));

      actions$ = of(loadLeaveDetails());

      effects.loadLeaveDetails$.subscribe((result) => {
        expect(result).toEqual(loadLeaveDetailsSuccess({ leaveDetails }));
      });
    });

    it('should return loadLeaveDetailsFail action on error', () => {
      const error = 'Error occured';
      leaveOverviewService.getLeaveDetails.and.returnValue(
        throwError(() => error),
      );
      actions$ = of(loadLeaveDetails());
      effects.loadLeaveDetails$.subscribe((result) => {
        expect(result).toEqual(loadLeaveDetailsFail({ error: error }));
      });
    });
  });

  describe('loadUserDetails$', () => {
    it('should return loadUserDetailsSuccess action on successful loadLeaveDetails action', () => {
      const userDetails: UserDetails[] = [];
      leaveOverviewService.getUserDetails.and.returnValue(of(userDetails));
      actions$ = of(loadLeaveDetails());
      effects.loadUserDetails$.subscribe((result) => {
        expect(result).toEqual(loadUserDetailsSuccess({ userDetails }));
      });
    });

    it('should return loadLeaveDetailsFail action on error', () => {
      const error = 'Error occured';

      leaveOverviewService.getUserDetails.and.returnValue(
        throwError(() => error),
      );

      actions$ = of(loadLeaveDetails());

      effects.loadUserDetails$.subscribe((result) => {
        expect(result).toEqual(loadLeaveDetailsFail({ error: error }));
      });
    });
  });
});
