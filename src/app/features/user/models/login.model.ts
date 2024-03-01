export interface LoginState{
    email: string;
    password: string;
}

export interface AuthState{
    isLoggedIn: boolean;
    error: string | null;
}