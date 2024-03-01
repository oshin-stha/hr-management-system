import { AddUserReducer } from "./features/admin/add-user/store/add-user.reducer";
import { UserState } from "./features/admin/add-user/store/add-user.state";

export interface AppState{
    userState:UserState
}
export const appReducer={
    userReducer:AddUserReducer
}