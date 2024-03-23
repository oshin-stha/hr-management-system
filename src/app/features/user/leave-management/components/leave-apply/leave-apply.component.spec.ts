// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { ReducerManager, Store, StoreRootModule } from '@ngrx/store';
// import { LeaveFormService } from '../../services/leave-form-service/leave-form.service';
// import { LeaveApplyComponent } from './leave-apply.component';
// import { getLeavebalanceStart } from '../../store/leaveBalanceState/leaveBalance.action';
// import { MaterialModule } from 'src/app/shared/material/material.module';
// import { MockStore } from '@ngrx/store/testing';
// import { loadLeaveDetails } from 'src/app/shared/store/leave-overview-store/leave-overview.action';
// import { LeaveDetails } from '../../models/leaveDetails.interface';

// const reducerManagerMock = {
//   addFeature: () => {},
//   addReducer: () => {}
// };

// fdescribe('LeaveApplyComponent', () => {
//   let component: LeaveApplyComponent;
//   let fixture: ComponentFixture<LeaveApplyComponent>;
//   let storeMock: any;
//   let formServiceMock: any;

//   beforeEach(async () => {
//     storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);
//     formServiceMock = jasmine.createSpyObj('LeaveFormService', ['applyForLeave']);

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         MaterialModule
//       ],
//       declarations: [LeaveApplyComponent],
//       providers: [
//         { provide: Store, useValue: storeMock },
//         { provide: LeaveFormService, useValue: formServiceMock },
//         { provide: ReducerManager, useValue: reducerManagerMock },
//         StoreRootModule
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LeaveApplyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should update min date for leave to', () => {
//     const event = { value: new Date() } as MatDatepickerInputEvent<Date>;
//     component.updateMinDateForLeaveTo(event);
//     expect(component.minDateForLeaveTo).toBeDefined();
//   });

//   it('should start getting leave balance', () => {
//     spyOn(localStorage, 'getItem').and.returnValue('test@test.com');
//     component.startGetLeaveBalance();
//     expect(storeMock.dispatch).toHaveBeenCalledWith(getLeavebalanceStart({email: 'test@test.com'}));
//   });

//   it('getleavedetails', () => {
//     component.getLeaveDetails();
//     expect(storeMock.dispatch).toHaveBeenCalledWith(loadLeaveDetails());
//     leaveDetails: LeaveDetails[] = [];

//   });
// });
