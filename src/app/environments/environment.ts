import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBsx_T67LomjTHbKSyNGoOv_dVv35Nny4Q',
  authDomain: 'hr-management-system-cbc1f.firebaseapp.com',
  projectId: 'hr-management-system-cbc1f',
  storageBucket: 'hr-management-system-cbc1f.appspot.com',
  messagingSenderId: '542917674913',
  appId: '1:542917674913:web:b3c80e99c3c599376eede0',
};

export const APP = initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(APP);
export const AUTH = getAuth(APP);
export const USER_DETAILS_REF = collection(FIRESTORE, 'UserDetails');
