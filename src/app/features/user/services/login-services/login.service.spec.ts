// import { TestBed } from '@angular/core/testing';
// import { LoginService } from './login.service';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { Observable, of } from 'rxjs';

// describe('LoginService', () => {
//   let service: LoginService;
//   let signInWithEmailAndPasswordSpy: jasmine.Spy;

//   beforeEach(() => {
//     // Create a spy for signInWithEmailAndPassword function
//     signInWithEmailAndPasswordSpy = spyOn(signInWithEmailAndPassword, 'bind').and.returnValue(Promise.resolve(null));

//     TestBed.configureTestingModule({
//       providers: [LoginService]
//     });
//     service = TestBed.inject(LoginService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should log in user successfully', (done) => {
//     const email = 'test@test.com';
//     const password = 'password';

//     service.logInUser(email, password).subscribe(() => {
//       expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(null, email, password);
//       done();
//     });
//   });

//   it('should handle authentication failure', (done) => {
//     const email = 'test@test.com';
//     const password = 'password';
//     const errorCode = 'auth/invalid-credential';

//     // Mocking signInWithEmailAndPassword to return a rejected promise with error object
//     signInWithEmailAndPasswordSpy.and.returnValue(Promise.reject({ code: errorCode }));

//     service.logInUser(email, password).subscribe({
//       next: () => fail('Expected error but received success'),
//       error: (error) => {
//         expect(signInWithEmailAndPasswordSpy).toHaveBeenCalledWith(null, email, password);
//         expect(error.code).toEqual(errorCode); // Check against the code property of the error
//         done();
//       }
//     });
//   });
// });
