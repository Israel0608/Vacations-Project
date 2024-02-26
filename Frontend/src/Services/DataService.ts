import axios, { HttpStatusCode } from "axios";
import VacationsModel from "../Models/vacations-model";
import appConfig from "../Utils/AppConfig";
import FollowersModel from "../Models/follwers-model";
import { VacationsActionTypes, vacationsAction, vacationsStore } from "../Redux/VacationState";
import notificationService from "./NotificationService";
import StatusCode from "../Models/status-codes";

class DataService {

    public async getAllVacationsByUser(userId: number): Promise<VacationsModel[]> {
        let vacations = vacationsStore.getState().vacation
        if (vacations.length === 0) {
            const response = await axios.get<VacationsModel[]>(appConfig.vacationsUrl + userId);
            vacations = response.data;
        }
        const action: vacationsAction = { type: VacationsActionTypes.SetVacations, payload: vacations };
        vacationsStore.dispatch(action);
        return vacations;
    }

    public async getVacationById(vacationId: number): Promise<VacationsModel> {
        const response = await axios.get<VacationsModel>(appConfig.vacationByIdUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }

    public async addVacation(vacation: VacationsModel): Promise<VacationsModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const response = await axios.post<VacationsModel>(appConfig.addVacationUrl, vacation, options);
        const addedVacation = response.data;
        const action: vacationsAction = { type: VacationsActionTypes.Addvacation, payload: addedVacation }
        vacationsStore.dispatch(action);
        return addedVacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.deleteVacationUrl + vacationId)
        const action: vacationsAction = {type: VacationsActionTypes.Deletevacation, payload: vacationId}
        vacationsStore.dispatch(action);
    }

    public async updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const response = await axios.put<VacationsModel>(appConfig.updateUrl + vacation.vacationId, vacation, options);
        const updatedVacation = response.data;
        const action = {type: VacationsActionTypes.Updatevacation, payload: updatedVacation}
        vacationsStore.dispatch(action);
        return updatedVacation
    }

    public async getAllFollowers(): Promise<FollowersModel[]> {
        const response = await axios.get<FollowersModel[]>(appConfig.followersUrl);
        const followers = response.data;
        return followers;
    }

    public async followe(userId: string, vacationId: string): Promise<void> {
        try {
            const response = await axios.post(appConfig.followersUrl + userId + "/" + vacationId)
            if (response.status === StatusCode.Created) {
                const action: vacationsAction = { type: VacationsActionTypes.followe, payload: vacationId }
                vacationsStore.dispatch(action)
            }
        } catch (err: any) {
            notificationService.error(err)
        }
    }


    public async unFollowe(userId: string, vacationId: string): Promise<void> {
        try {
            const response = await axios.delete(appConfig.followersUrl + userId + "/" + vacationId)
            if (response.status === StatusCode.Created) {
                const action: vacationsAction = { type: VacationsActionTypes.unFollowe, payload: vacationId }
                vacationsStore.dispatch(action)
            }
        } catch (err: any) {
            notificationService.error(err)
        }
    }
}


const dataService = new DataService();

export default dataService;
