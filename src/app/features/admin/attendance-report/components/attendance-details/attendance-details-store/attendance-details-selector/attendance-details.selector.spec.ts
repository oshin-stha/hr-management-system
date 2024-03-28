import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  AttendanceListState,
  employeeNameState,
} from '../attendance-details.state';
import {
  selectAttendanceList,
  selectemployeeName,
} from './attendance-details.selector';

describe('Selectors', () => {
  let store: MockStore<{
    attendanceListIndividual: AttendanceListState;
    attendanceDetailsIndividual: employeeNameState;
  }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockStore({
          initialState: {
            attendanceListIndividual: { attendanceList: [], error: null },
            attendanceDetailsIndividual: { employeeName: '', error: null },
          },
        }),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('selectAttendanceList should return attendanceList from state', () => {
    const initialState = {
      attendanceListIndividual: {
        attendanceList: [
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
        ],
        error: null,
      },
      attendanceDetailsIndividual: { employeeName: '', error: null },
    };
    store.setState(initialState);

    const result = selectAttendanceList.projector(
      initialState.attendanceListIndividual,
    );

    expect(result[0].email).toEqual('hr@gmail.com');
  });

  it('selectemployeeName should return employeeName from state', () => {
    const initialState = {
      attendanceListIndividual: { attendanceList: [], error: null },
      attendanceDetailsIndividual: { employeeName: 'John Doe', error: null },
    };

    store.setState(initialState);

    const result = selectemployeeName.projector(
      initialState.attendanceDetailsIndividual,
    );

    expect(result).toEqual('John Doe');
  });
});
