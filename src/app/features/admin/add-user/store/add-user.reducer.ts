import { createReducer, on } from "@ngrx/store";
import { addUserStart, signupSuccess } from "./add-user.action";
import { UserState, initialState } from "./add-user.state";
import { Action } from "@ngrx/store";
import { AuthDetails, UserDetails } from "../../models/adduser.model";
const _addUserReducer=createReducer(initialState,
    on(signupSuccess,(state,action:{data:AuthDetails})=>{
        return{
            ...state,
            auth: [...state.auth, action.data]
        }
    }),
    
    on(addUserStart,(state,action:{data:UserDetails})=>{
        return{
            ...state,
            user: [...state.user, action.data]
        }
    })
    )
    export function AddUserReducer(state:UserState | undefined, action:Action){
        return _addUserReducer(state,action)
    }