import React, { useState, useEffect } from 'react';
import dataService from "../../../Services/DataService";
import "./CheckBox.css";
import VacationsModel from '../../../Models/vacations-model';
import { authStore } from '../../../Redux/AuthState';
import notificationService from '../../../Services/NotificationService';

interface CheckBoxFilterProps {
    vacations: VacationsModel[];
    setFilteredVacations: React.Dispatch<React.SetStateAction<VacationsModel[]>>;
}

function CheckBox({ vacations, setFilteredVacations }: CheckBoxFilterProps): JSX.Element {
    const [checkedOnly, setCheckedOnly] = useState(false);

    useEffect(() => {
        handleFilterChange();
    }, [checkedOnly]);

    async function handleFilterChange() {
        try {
            if (checkedOnly === true) {
                const filteredVacations = vacations.filter(vacation => vacation.isFollowing);
                setFilteredVacations(filteredVacations);
            } else {
                const userId = authStore.getState().user?.userId;
                const vacationsByUser = await dataService.getAllVacationsByUser(userId);
                setFilteredVacations(vacationsByUser);
            }
        } catch (err: any) {
            notificationService.error(err)
        }
    }

    return (
        <div className='checkboxOfLikes'>
            <label>
                Vacations you liked
                <input type="checkbox" onChange={() => setCheckedOnly(!checkedOnly)} checked={checkedOnly} />
            </label>
        </div>
    );
}

export default CheckBox;