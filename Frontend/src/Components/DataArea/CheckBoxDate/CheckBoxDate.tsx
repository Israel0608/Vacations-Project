import React, { useEffect, useState } from 'react';
import "./CheckBoxDate.css";
import VacationsModel from '../../../Models/vacations-model';
import { authStore } from '../../../Redux/AuthState';
import dataService from '../../../Services/DataService';

interface CheckBoxDateProps {
    vacations: VacationsModel[];
    setFilteredVacations: React.Dispatch<React.SetStateAction<VacationsModel[]>>;
}

function CheckBoxDate({ vacations, setFilteredVacations }: CheckBoxDateProps): JSX.Element {
    const [showNotStartedOnly, setShowNotStartedOnly] = useState(false);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    useEffect(() => {
        handleFilterChange();
    }, [showNotStartedOnly, showActiveOnly]);

    async function handleFilterChange() {
        let filteredVacations = vacations;

        if (showNotStartedOnly === true) {
            filteredVacations = filteredVacations.filter(vacation => new Date(vacation.checkIn).getTime() > new Date().getTime());
        } else if (!showNotStartedOnly === true) {
            const userId = authStore.getState().user?.userId;
            const vacationsByUser = await dataService.getAllVacationsByUser(userId);
            setFilteredVacations(vacationsByUser);
        }

        if (showActiveOnly === true) {
            filteredVacations = filteredVacations.filter(vacation => {
                const checkInTime = new Date(vacation.checkIn).getTime();
                const checkOutTime = new Date(vacation.checkOut).getTime();
                const currentTime = new Date().getTime();
                return checkInTime <= currentTime && checkOutTime >= currentTime;
            });
        }
        setFilteredVacations(filteredVacations);
    };

    return (
        <div className="checkboxDate">
            <label>
                Show Vacations Not Started Yet
                <input
                    type="checkbox"
                    onChange={() => setShowNotStartedOnly(!showNotStartedOnly)}
                    checked={showNotStartedOnly}
                />
            </label>
            <label>
                Show Active Vacations
                <input
                    type="checkbox"
                    onChange={() => setShowActiveOnly(!showActiveOnly)}
                    checked={showActiveOnly}
                />
            </label>
        </div>
    );
}

export default CheckBoxDate;
