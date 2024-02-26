import { jwtDecode } from "jwt-decode";
import { createStore } from "redux";
import UsersModel from "../Models/users-model";

export class AuthState {
    public user: UsersModel = null;
    public token: string = null;

    constructor() {
        this.token = sessionStorage.getItem('token');
        if (this.token) {
            this.user = jwtDecode<{ user: UsersModel }>(this.token).user;
        }
    }
}



export enum AuthActionTypes {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}


export interface AuthAction {
    type: AuthActionTypes,
    payload?: any 
}


function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionTypes.Register:
        case AuthActionTypes.Login:
        
            newState.user = jwtDecode<{ user: UsersModel }>(action.payload).user;
            newState.token = action.payload;
            sessionStorage.setItem(`token`, newState.token);
            
            break;
        case AuthActionTypes.Logout:
            newState.user = null;
            newState.token = null;
            sessionStorage.removeItem('token');
            break;
    }

    return newState

}

// 5. create store
export const authStore = createStore(authReducer);