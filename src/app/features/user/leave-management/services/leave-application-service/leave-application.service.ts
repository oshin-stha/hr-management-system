import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/app/environments/environment';
import { LeaveDetails } from '../../models/leaveDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class LeaveApplicationService {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(this.app);
  userRef = collection(this.firestore, 'leaveApplicationDetails');

  addLeaveApplicationDetails(data: LeaveDetails): Observable<LeaveDetails> {
    return new Observable<LeaveDetails>((observer) => {
      addDoc(this.userRef, data)
        .then(() => {
          observer.next(data);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
