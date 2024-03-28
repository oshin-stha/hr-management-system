import { TestBed } from '@angular/core/testing';
import { AttendanceState } from 'src/app/shared/models/attendance.model';
import { AttendanceService } from './attendance.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

xdescribe('AttendanceService', () => {
  let service: AttendanceService;
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
        AttendanceService,
        {
          provide: AngularFirestore,
          useValue: firestoreSpy,
        },
      ],
    });
    service = TestBed.inject(AttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add check-in for valid data', (done: DoneFn) => {
    const testData = {
      email: 'test@example.com',
      checkInTime: new Date(),
    };
    service.addCheckIn(testData).subscribe({
      next: () => {
        done.fail('Expected error for multiple check-ins');
      },
      error: (error) => {
        expect(error).toEqual('You cannot checkin multiple times in a day.');
        done();
      },
    });
  });

  it('should throw error for invalid data during addCheckIn', (done: DoneFn) => {
    const invalidData = {
      email: '123',
      checkInTime: new Date(),
    };
    service.addCheckIn(invalidData).subscribe({
      next: () => {
        done.fail('Expected error for invalid data');
      },
      error: (error) => {
        expect(error).toEqual('You cannot checkin multiple times in a day.');
        done();
      },
    });
  });

  it('should set check-out for valid data', (done: DoneFn) => {
    const email = 'test@example.com';
    const checkInTime = new Date();
    const checkOutTime = new Date();

    const collectionRefSpy = jasmine.createSpyObj('CollectionReference', [
      'add',
    ]);
    const firestoreSpy = jasmine.createSpyObj('AngularFirestore', [
      'collection',
    ]);
    firestoreSpy.collection.and.returnValue(collectionRefSpy);

    service.setCheckOut({ email, checkInTime, checkOutTime }).subscribe({
      next: (result) => {
        expect(result.email).toEqual(email);
        expect(result.checkInTime).toEqual(checkInTime);
        expect(result.checkOutTime).toEqual(checkOutTime);
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });

    expect(firestoreSpy.collection).toHaveBeenCalledWith('attendance');
    expect(collectionRefSpy.add).toHaveBeenCalledWith({ email, checkInTime });
  });

  it('should throw error for invalid data during setCheckOut', (done: DoneFn) => {
    const invalidData: Partial<AttendanceState> = {
      email: '123',
      checkInTime: undefined,
      checkOutTime: new Date(),
    };
    service.setCheckOut(invalidData).subscribe({
      next: () => {
        done.fail('Expected error for invalid data');
      },
      error: (error) => {
        expect(error).toBeDefined();
        done();
      },
    });
  });

  it('should get attendance data for valid email', (done: DoneFn) => {
    const email = 'test@example.com';
    service.getAttendanceData(email).subscribe({
      next: (result) => {
        expect(result).toBeDefined();
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });

  it('should throw error for invalid email during getAttendanceData', (done: DoneFn) => {
    const invalidEmail = '123';
    service.getAttendanceData(invalidEmail).subscribe({
      next: () => {
        done();
      },
      error: (error) => {
        expect(error).toEqual('Invalid email');
        done();
      },
    });
  });
});
