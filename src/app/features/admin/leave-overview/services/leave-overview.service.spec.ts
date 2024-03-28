import { TestBed } from '@angular/core/testing';
import { getFirestore } from 'firebase/firestore';
import { of } from 'rxjs';
import { LeaveOverviewService } from './leave-overview.service';

xdescribe('LeaveOverviewService', () => {
  let service: LeaveOverviewService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let firestoreSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    const firestoreSpyObj = jasmine.createSpyObj('Firestore', [
      'collection',
      'doc',
      'getDoc',
      'updateDoc',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LeaveOverviewService,
        { provide: getFirestore, useValue: () => firestoreSpyObj },
      ],
    });

    service = TestBed.inject(LeaveOverviewService);
    firestoreSpy = TestBed.inject(getFirestore) as jasmine.SpyObj<any>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update leave status', () => {
    const id = '123';
    const newStatus = 'accepted';
    const updateDocSpy = firestoreSpy.updateDoc.and.returnValue(of(null));
    service.updateLeaveStatus(id, newStatus).subscribe(() => {
      expect(updateDocSpy).toHaveBeenCalledWith(jasmine.any(Object), {
        status: newStatus,
      });
    });
  });

  it('should accept leave request', () => {
    const id = '123';
    const updateDocSpy = firestoreSpy.updateDoc.and.returnValue(
      Promise.resolve(),
    );
    service.acceptLeaveRequest(id).subscribe(() => {
      expect(updateDocSpy).toHaveBeenCalledWith(jasmine.any(Object), {
        status: 'accepted',
      });
    });
  });

  it('should reject leave request', () => {
    const id = '123';
    const updateDocSpy = firestoreSpy.updateDoc.and.returnValue(
      Promise.resolve(),
    );
    service.rejectLeaveRequest(id).subscribe(() => {
      expect(updateDocSpy).toHaveBeenCalledWith(jasmine.any(Object), {
        status: 'rejected',
      });
    });
  });

  it('should update leave balance', () => {
    const email = 'test@example.com';
    const totalLeaveDays = 2;
    const leaveType = 'Sick';

    const leaveBalanceDocRefSpy = firestoreSpy.doc.and.returnValue({
      get: jasmine.createSpy().and.resolveTo({
        exists: true,
        data: () => ({
          sickLeaveRemaining: 5,
          annualLeaveRemaining: 10,
          specialLeaveTaken: 2,
        }),
      }),
    });

    const updateDocSpy = firestoreSpy.updateDoc.and.returnValue(of(null));

    service
      .updateLeaveBalance(email, totalLeaveDays, leaveType)
      .subscribe(() => {
        expect(leaveBalanceDocRefSpy).toHaveBeenCalledOnceWith(
          'leaveBalance/' + email,
        );
        expect(updateDocSpy).toHaveBeenCalledOnceWith(jasmine.any(Object), {
          sickLeaveRemaining: 3,
        });
      });
  });
});
