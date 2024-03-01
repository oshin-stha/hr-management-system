import { createAction, props } from "@ngrx/store";

const LOGIN_START = '[Auth/API] login start';
const LOGIN_SUCCESS = '[Auth/API] login success';
const LOGIN_FAILURE = '[Auth/API] Login Failure';
const SET_ERROR_MESSAGE = '[Auth/API] Login Error';
export const loginStart = createAction(
    LOGIN_START, props<{email: string, password: string}>()
)

export const loginFailure = createAction(
    LOGIN_FAILURE ,
    props<{ error: string | null }>()
);

export const loginSuccess = createAction(
    LOGIN_SUCCESS
)
export const setErrorMessage = createAction(
    SET_ERROR_MESSAGE,
    props<{ message: string}>()
)