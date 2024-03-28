import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { AttendanceReportService } from './attendance-overview.service';
import { TodaysAttendanceState } from '../attendance-overview-store/attendance-overview.state';
import { AttendanceState } from 'src/app/shared/models/attendance.model';

describe('AttendanceReportService', () => {
  let service: AttendanceReportService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const collectionSpy = jasmine.createSpyObj('CollectionReference', [
      'getDocs',
      'doc',
    ]);
    const docSpy = jasmine.createSpyObj('DocumentReference', ['get']);

    firestoreSpy = jasmine.createSpyObj('AngularFirestore', {
      collection: collectionSpy,
      doc: docSpy,
    });

    TestBed.configureTestingModule({
      providers: [
        AttendanceReportService,
        {
          provide: AngularFirestore,
          useValue: firestoreSpy,
        },
      ],
    });
    service = TestBed.inject(AttendanceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodaysAttendanceWithUserDetails', () => {
    it('should return todays attendance with user details', () => {
      const fakeEmails = ['test1@example.com'];
      const fakeAttendance: AttendanceState = {
        absent: null,
        checkInReason: 'I am late due to traffic',
        checkInStatus: 'Late-Arrival',
        checkInTime: new Date(),
        checkOutReason: '',
        checkOutStatus: 'Checked-Out',
        checkOutTime: new Date(),
        email: 'hr@gmail.com',
        workingHours: 4,
      };
      const fakeUserDetails = {
        employeeId: '123',
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
      };
      const expected: TodaysAttendanceState[] = [
        {
          attendance: fakeAttendance,
          userNameEmployeeID: fakeUserDetails,
        },
      ];
      spyOn<any>(service, 'getAllEmails').and.returnValue(of(fakeEmails));
      spyOn<any>(service, 'getTodaysAttendance').and.returnValue(
        of(fakeAttendance),
      );
      spyOn<any>(service, 'getUserNameEmployeeId').and.returnValue(
        of(fakeUserDetails),
      );

      service.getTodaysAttendanceWithUserDetails().subscribe((result) => {
        expect(result).toEqual(expected);
      });
    });
  });
});
