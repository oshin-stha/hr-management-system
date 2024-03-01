import { UserDetails } from "../../models/adduser.model";
import { AuthDetails } from "../../models/adduser.model";
export  interface UserState{
    user:UserDetails[];
    auth:AuthDetails[];
} 

export const initialState:UserState={
  user:[],
  auth:[]
}