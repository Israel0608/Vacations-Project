import axios from "axios";
import UsersModel from "../Models/users-model";
import appConfig from "../Utils/AppConfig";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";

class AuthService {

    public async register(user: UsersModel): Promise<void> {
        const response = await axios.post(appConfig.registerUrl, user);
        const token = response.data;
        const action: AuthAction = { type: AuthActionTypes.Register, payload: token }
        authStore.dispatch(action);
    }


    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);
        const token = response.data;
        const action: AuthAction = { type: AuthActionTypes.Login, payload: token }
        authStore.dispatch(action);

    }

    public logout(): void {
        const action: AuthAction = { type: AuthActionTypes.Logout };
        authStore.dispatch(action);
    }

}

const authService = new AuthService();

export default authService;