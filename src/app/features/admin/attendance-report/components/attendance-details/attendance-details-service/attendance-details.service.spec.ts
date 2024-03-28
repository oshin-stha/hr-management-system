/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { AttendanceDetailsService } from './attendance-details.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ATTENDANCE_REPORT_PATH,
  SECURE_MODULE_PATH,
} from 'src/app/shared/constants/routes.constants';

describe('AttendanceDetailsService', () => {
  let service: AttendanceDetailsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AttendanceDetailsService],
    });
    service = TestBed.inject(AttendanceDetailsService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAttendanceDetailsByEmployeeId', () => {
    it('should return attendance details for a given employee Id', () => {
      const id = 'AN1001';
      const email = 'hr@gmail.com';
      const attendanceData = [
        {
          absent: null,
          checkInReason: 'I am late due to traffic',
          checkInStatus: 'Late-Arrival',
          checkInTime: new Date(),
          checkOutReason: '',
          checkOutStatus: 'Checked-Out',
          checkOutTime: new Date(),
          email: 'hr@gmail.com',
          workingHours: 4,
        },
      ];

      spyOn<any>(service, 'getEmailByEmployeeId').and.returnValue(of(email));
      spyOn<any>(service, 'getAttendanceDetails').and.returnValue(
        of(attendanceData),
      );

      service.getAttendanceDetailsByEmployeeId(id).subscribe((result) => {
        expect(result.length).toBe(1);
        expect(result[0].email).toBe(email);
      });
    });
  });

  xdescribe('getEmployeeNameByEmployeeId', () => {
    it('should return employee name for a given employee Id', () => {
      const id = 'AN1001';
      const employeeName = 'Oshin Shrestha';
      const mockData = [{ employeeId: id, employeeName: 'Oshin Shrestha' }];
      const firestoreMock = {
        collection: () => ({
          get: () => Promise.resolve({ docs: mockData }),
        }),
      };

      spyOn(firestoreMock, 'collection').and.callThrough();

      service.getEmployeeNameByEmployeeId(id).subscribe((result) => {
        expect(result).toBe(employeeName);
      });
    });
  });

  describe('attendanceOverviewRoute', () => {
    it('should navigate to attendance report path', () => {
      spyOn(router, 'navigate');
      service.attendanceOverviewRoute();
      expect(router.navigate).toHaveBeenCalledWith([
        `/${SECURE_MODULE_PATH}/${ATTENDANCE_REPORT_PATH}`,
      ]);
    });
  });
});
