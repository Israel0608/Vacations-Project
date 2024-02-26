import { createStore } from "redux";
import VacationsModel from "../Models/vacations-model";

export class VacationState {
    vacation: VacationsModel[] = [];
}

export enum VacationsActionTypes {
    SetVacations = "SetVacations",
    Addvacation = "AddVacation",
    Updatevacation = "Updatevacation",
    Deletevacation = "Deletevacation",
    ClearAll = "ClearAll",
    followe = "Followe",
    unFollowe = "UnFollowe",
}


export interface vacationsAction {
    type: VacationsActionTypes,
    payload?: any
}

function vacationsReducer(currentState = new VacationState(), action: vacationsAction): VacationState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionTypes.SetVacations:
            newState.vacation = action.payload;
            break;
        case VacationsActionTypes.Addvacation:
            newState.vacation.push(action.payload);
            break;
        case VacationsActionTypes.Updatevacation:
            const indexToUpdate = newState.vacation.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacation[indexToUpdate] = action.payload;
            break;
        case VacationsActionTypes.Deletevacation:
            const indexToDelete = newState.vacation.findIndex(v => v.vacationId === action.payload);
            newState.vacation.splice(indexToDelete, 1);
            break;
        case VacationsActionTypes.followe:
            const indexToFollowe = newState.vacation.findIndex(v => v.vacationId === action.payload)
            newState.vacation[indexToFollowe].followersCount++;
            newState.vacation[indexToFollowe].isFollowing = 1;
            break;
        case VacationsActionTypes.unFollowe:
            const indexToUnFollowe = newState.vacation.findIndex(v => v.vacationId === action.payload)
            newState.vacation[indexToUnFollowe].followersCount--;
            newState.vacation[indexToUnFollowe].isFollowing = 0;
            break;
        case VacationsActionTypes.ClearAll:
            newState.vacation = [];
            break;
    }

    return newState;

}


//5. store - create -> pass the reducer.
export const vacationsStore = createStore(vacationsReducer);

