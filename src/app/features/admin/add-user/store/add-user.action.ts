import { createAction, props } from "@ngrx/store";
import { AuthDetails, UserDetails } from "../../models/adduser.model";

export const SIGNUP_START='[adduser page] signup start';
export const SIGNUP_SUCCESS='[adduser page] signup success';
export const SIGNUP_FAIL='[adduser page] signup fail';
export const ADDUSER_START='[adduser page] adduser start';
export const ADDUSER_SUCCESS='[adduser page] adduser success';
export const ADDUSER_FAIL='[adduser page] adduser fail';
export const signupStart=createAction(SIGNUP_START,props<{data:AuthDetails}>());
export const signupSuccess=createAction(SIGNUP_SUCCESS,props<{data:AuthDetails}>());
export const addUserStart=createAction(ADDUSER_START,props<{data: UserDetails}>());
export const addUserSuccess=createAction(ADDUSER_SUCCESS,props<{data:UserDetails}>())